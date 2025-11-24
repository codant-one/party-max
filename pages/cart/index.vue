<script setup>

import { ref } from 'vue'
import { requiredValidator, phoneValidator } from '@validators'
import { useAddressesStores } from '@/stores/addresses'
import { useHomeStores } from '@/stores/home'
import { useCartStores } from '@/stores/cart'
import { useCountriesStores } from '@/stores/countries'
import { useProvincesStores } from '@/stores/provinces'
import { useOrdersStores } from '@/stores/orders'
import { usePaymentsStores } from '@/stores/payments'
import { useDocumentTypesStores } from '@/stores/document-types'
import { useMiscellaneousStores } from "@/stores/miscellaneous";
import { useCouponsStores } from '@/stores/coupons'
import { useRuntimeConfig } from '#app'
import axios from 'axios'
import Payu from '@/assets/icons/logo-Payu.png'

import { useRouter, useRoute } from 'vue-router'
import dayjs from 'dayjs';

import Summary from '@/components/cart/Summary.vue'
import Location from '@/components/cart/Location.vue'
import Payments from '@/components/cart/Payments.vue'
import User from '@/components/cart/User.vue'
import Confirmation from '@/components/cart/Confirmation.vue'

import check_circle from '@assets/icons/check-circle.svg';
import error_circle from '@assets/icons/error-circle.svg';
import maintenance_circle from '@assets/icons/maintenance-circle.svg';

import Loader from '@/components/common/Loader.vue'

import cart from '@assets/icons/cart.svg?inline'
import cart_mobile from '@assets/icons/cart_mobile.svg?inline'
import info from '@assets/icons/info-circle.svg?inline';

const homeStores = useHomeStores()
const cartStores = useCartStores()
const addressesStores = useAddressesStores()
const provincesStores = useProvincesStores()
const countriesStores = useCountriesStores()
const ordersStores = useOrdersStores()
const paymentsStores = usePaymentsStores()
const documentTypesStores = useDocumentTypesStores()
const miscellaneousStores = useMiscellaneousStores();
const couponsStores = useCouponsStores();
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

const { isMobile } = useDevice();
const refVForm = ref()
const load = ref(false)
const dialog = ref(false)
const isDialogVisible = ref(false)
const message = ref()
const isError = ref(false)
const data = ref(null)
const addresses = ref([])
const products = ref([])
const client_id = ref(null)
const address_id = ref(0)
const send_id = ref(0)
const province_id = ref(293)
const ip = ref(null)
const notAllowedIPs = ref([])
const coupon = ref(null)

const summary = ref({
    subTotal: 0,
    send: '19000.00',
    shipping_express: 0,
    discount: 0,
    subTotalDiscount: 0,
    coupon_id: 0,
    coupon_code: '',
    total: 0
})

const discount = ref(false)

const selectedAddress = ref({
    id: 0,
    addresses_type_id: '1',
    country_id: 'Colombia',
    province_id: '',
    title: '',
    street: '',
    city: 'Bogota',
    address: '',
    phone: '',
    postal_code: null,
    default: false
})

const listCountries = ref([])
const listProvinces = ref([])
const listProvincesByCountry = ref([])
const client_country_id = ref(null)
const provinceOld_id = ref('')
const documentTypes = ref([])

const currentStep = ref(0)
const isLoading = ref(false)
// Indica si ya se intentó cargar el carrito al menos una vez
const hasLoadedCart = ref(false)
const isActiveStepValid = ref(false)

const getProvinces = computed(() => {
  return listProvincesByCountry.value.map((province) => {
    return {
      title: province.name,
      value: province.id,
    }
  })
})

const paymentsRef = ref(null)

// Evitar que se escriban caracteres no numéricos en inputs numéricos (teléfono, código postal, etc.)
const handleNumericKeypress = event => {
    const char = String.fromCharCode(event.which || event.keyCode)
    if (!/[0-9]/.test(char)) {
        event.preventDefault()
    }
}

onMounted(async () => {

    await countriesStores.getAll();
    await provincesStores.getAll();

    loadCountries()
    loadProvinces()

    selectCountry(selectedAddress.value.country_id)

    // Cargar carrito una sola vez al montar; el resto de llamadas son explícitas
    await fetchData()
})

async function fetchData() {

    isLoading.value = true

    // OPCIONAL: Cargar datos de usuario si está logueado
    if(process.client && localStorage.getItem('user_data')){
        const userData = localStorage.getItem('user_data')
        const userDataJ = JSON.parse(userData)

        client_id.value = userDataJ.client.id
        // Alinear province_id con Payments: usar province desde user_data si existe
        const userProvince = Number(userDataJ?.user_details?.province?.id ?? userDataJ?.user_details?.province_id ?? NaN)
        if (!Number.isNaN(userProvince)) {
            province_id.value = userProvince
        }
        selectedAddress.value.client_id = userDataJ.client.id
    }

    // Si no está logueado, puede continuar como invitado (client_id quedará null)
    if(cartStores.getCount > 0) {
        await homeStores.fetchData()
        data.value = homeStores.getData

        let data_ = {
            limit: -1,
            client_id: client_id.value
        }

        await cartStores.fetchCart()
        products.value = cartStores.getData

        let sum = 0
         products.value.forEach(element => {
            let cupcake = element.type === 0 ? null : element.cupcakes.find(item => item.cake_size_id === element.cake_size_id)
            let value = 
            element.type === 0 ? element.product.price_for_sale :
              (element.cake_size_id === 0 ? element.price : cupcake.price)

            sum += (parseFloat(value) * element.quantity)
        });
        summary.value.subTotal = sum.toFixed(2)

        if(coupon.value !== null) {
            if(coupon.value.is_percentage)// es porcentaje
                summary.value.discount = ((summary.value.subTotal * coupon.value.amount) / 100).toFixed(2)
            else
                summary.value.discount = Number(coupon.value.amount).toFixed(2)

            summary.value.subTotalDiscount = (summary.value.subTotal - summary.value.discount).toFixed(2)
        } else {
            summary.value.discount = 0
        }

        summary.value.total = (parseFloat(summary.value.send) + parseFloat(summary.value.subTotal) - parseFloat(summary.value.discount)).toFixed(2)

        if (province_id.value === 293 && parseFloat(summary.value.subTotal) <= parseFloat('150000')) {
            chanceSend('sendToBogota')
            send_id.value = 2
        } else if (province_id.value === 293 && parseFloat(summary.value.subTotal) > parseFloat('150000')) {
            chanceSend('free')
            send_id.value = 0
        } else {
            // Fuera de Bogotá: siempre Nacional
            chanceSend('send')
            send_id.value = 1
        } 

        // OPCIONAL: Si hay usuario logueado, cargar sus direcciones guardadas
        if(client_id.value) {
            await addressesStores.fetchAddresses(data_)
            addresses.value = addressesStores.getAddresses

            let index = addresses.value.findIndex((item) => item.default === 1) 
            if (addresses.value.length > 0) {
                address_id.value = (index > -1) ? addresses.value[index].id : addresses.value[0].id 
                // No sobreescribir province_id; mantener el que proviene de login/Payments
                // selectedAddress solo para UI interna
                const addrProvince = addresses.value.filter(address => address.id === address_id.value)[0]?.province_id
                if (addrProvince !== undefined) {
                    selectedAddress.value.province_id = addrProvince
                }
            } 

            isActiveStepValid.value = (address_id.value === 0 ) ? true : false
        }
        // Si no hay usuario (invitado), puede ingresar dirección manualmente en el formulario
    }

    if(route.query.merchantId) {
        currentStep.value = 3
        isActiveStepValid.value = true
    }

    await documentTypesStores.fetchDocumentTypes()
    documentTypes.value = documentTypesStores.getData

    const response = await axios.get('https://checkip.amazonaws.com/');
    ip.value = response.data

    notAllowedIPs.value = await miscellaneousStores.ips();

    hasLoadedCart.value = true
    isLoading.value = false
}

const checkUserIP = async () => {
    try {
        const response = await fetch('https://api64.ipify.org?format=json');
        const data = await response.json();
        const userIP = data.ip;

        if (notAllowedIPs.value.includes(userIP)) {
            isDialogVisible.value = true
            isError.value = true
            isBlocked.value = true
            message.value = 'Su acceso ha sido bloqueado debido a actividad fraudulenta. Para más información, por favor contacte con soporte.'

            setTimeout(() => {
                isDialogVisible.value = false
                message.value = ''
                isError.value = false
                isBlocked.value = false
            }, 10000)
            return true
        } else
            return false
    } catch (error) {
        console.error('Error al obtener la IP:', error);
    }
}

const getDocumentTypes = computed(() => {
    return documentTypes.value.map((documentType) => {
        return {
            // title completo por si algún componente lo necesita
            title: '(' + documentType.code + ') - ' + documentType.name,
            // nombre “limpio” para usar como label en los selects
            name: documentType.name,
            value: documentType.id,
        }
    })
})

const loadCountries = () => {
  listCountries.value = countriesStores.getCountries
}

const loadProvinces = () => {
  const provinces = provincesStores.getProvinces || []
  // Ordenar: primero Bogotá, luego el resto en orden alfabético por nombre
  listProvinces.value = [...provinces].sort((a, b) => {
    const isBogotaA = a.id === 293 || (a.name && a.name.toLowerCase().includes('bogota'))
    const isBogotaB = b.id === 293 || (b.name && b.name.toLowerCase().includes('bogota'))

    if (isBogotaA && !isBogotaB) return -1
    if (!isBogotaA && isBogotaB) return 1

    if (!a.name || !b.name) return 0
    return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })
  })
}

// Ensure provinces list is populated each time the Add Address dialog opens
watch(() => dialog.value, (isOpen) => {
    if (isOpen) {
        selectCountry(selectedAddress.value.country_id)
    }
})

const selectCountry = country => {
  if (country) {
    let _country = listCountries.value.find(item => item.name === country)
    client_country_id.value = _country.name
 
    selectedAddress.value.province_id = null
    
    listProvincesByCountry.value = listProvinces.value.filter(item => item.country_id === _country.id)
  }
}

const changeAddreess = (id) => {
    address_id.value = id
    const addr = addresses.value.find(a => a.id === id)
    if (addr) {
        province_id.value = Number(addr.province_id)
        if (province_id.value === 293 && parseFloat(summary.value.subTotal) <= parseFloat('150000')) {
            chanceSend('sendToBogota')
            send_id.value = 2
        } else if (province_id.value === 293 && parseFloat(summary.value.subTotal) > parseFloat('150000')) {
            chanceSend('free')
            send_id.value = 0
        } else {
            chanceSend('send')
            send_id.value = 1
        }
    }
}

const deleteProduct = async (product_color_id) => {
    await cartStores.delete({ type: 0, product_color_id: Number(product_color_id) })
    await fetchData()
}

const deleteService = async (service_id) => {
    await cartStores.delete({type: 1, service_id: parseInt(service_id)})
    await fetchData()   
}

const couponApply = async (code) => {
    isLoading.value = true
    
    await couponsStores.show_by_code(code)
      
    coupon.value = couponsStores.getData

    isLoading.value = false

    if(coupon.value === null) {
        isDialogVisible.value = true
        message.value = 'Cupón inválido. Verifica el código e intenta nuevamente.'
        isError.value = true
    } else if (client_id.value !== coupon.value.client_id) {
        isDialogVisible.value = true
        message.value = '¡Oh no! Este cupón ya tiene dueño, pertenece a otro usuario.'
        isError.value = true
    } else if(new Date(coupon.value.expiration_date) < new Date() && coupon.value.purchase_date === null) {
        isDialogVisible.value = true
        message.value = 'Cupón expirado, ¡Prueba con otro o revisa nuestras ofertas!'
        isError.value = true
    } else if (coupon.value.is_used) {
        isDialogVisible.value = true
        message.value = 'Este cupón no es válido, ya fue canjeado. ¡Pero no te preocupes! Revisa tu correo o nuestras redes sociales para más promociones.'
        isError.value = true
    } else {
        if(coupon.value.is_percentage)// es porcentaje
            summary.value.discount = ((summary.value.subTotal * coupon.value.amount) / 100).toFixed(2)
        else
            summary.value.discount = Number(coupon.value.amount).toFixed(2)

        summary.value.subTotalDiscount = (summary.value.subTotal - summary.value.discount).toFixed(2)
        summary.value.total = (summary.value.total - summary.value.discount).toFixed(2)
        summary.value.coupon_id = coupon.value.id
        summary.value.coupon_code = coupon.value.code

        isDialogVisible.value = true
        message.value = 'Gracias por usar tu cupón. ¡Disfruta tu ahorro!'
    }

    setTimeout(() => {
        isDialogVisible.value = false
        message.value = ''
        isError.value = false
    }, 5000)
}

const addCart = async (data) =>{

    var data_ = {}

    if(data.type === 0) {
        data_ = {
            date: null,
            service_id: null,
            cake_size_id: null,
            flavor_id: null,
            filling_id: null,
            order_file_id: null,
            product_color_id: data.product_color_id,
            quantity: data.quantity,
            type: 0
        }
    } else {
        data_ = {
            date: data.date,
            service_id: data.service_id,
            cake_size_id: data.cake_size_id,
            flavor_id: data.flavor_id,
            filling_id: data.filling_id,
            order_file_id: data.order_file_id,
            product_color_id: null,
            quantity: data.quantity,
            type: 1
        }
    }

    await cartStores.add(data_)

    await fetchData()
}

const onSubmit = () => {
    refVForm.value?.validate().then(({ valid: isValid }) => {
        if (isValid) {
            if(client_id.value) {
                addAddress()
            } else {
                address_id.value++
                //selectedAddress.value.default = (selectedAddress.value.default === false) ? 0 : 1
                selectedAddress.value.default = 1
                selectedAddress.value.province_id = (Number.isInteger(selectedAddress.value.province_id)) ? selectedAddress.value.province_id : provinceOld_id.value
                selectedAddress.value.province = listProvincesByCountry.value.filter(item => item.id === selectedAddress.value.province_id)[0]
                selectedAddress.value.id = address_id.value
                addresses.value.push(selectedAddress.value)
                
                province_id.value = selectedAddress.value.province_id

                if(province_id.value === 293 && parseFloat(summary.value.subTotal) <= parseFloat('150000')) {
                    chanceSend('sendToBogota')
                    send_id.value = 2
                } else if(province_id.value === 293 && parseFloat(summary.value.subTotal) > parseFloat('150000')) {
                    chanceSend('free') 
                    send_id.value = 0
                } else if(province_id.value !== 293 && parseFloat(summary.value.subTotal) <= parseFloat('150000')) {
                    chanceSend('send') 
                    send_id.value = 1
                } else if(province_id.value !== 293 && parseFloat(summary.value.subTotal) > parseFloat('150000')) {
                    chanceSend('free') 
                    send_id.value = 0
                } 

                isDialogVisible.value = true
                message.value = 'Dirección agregada exitosamente'
                closeDialog()

                setTimeout(() => {
                    isDialogVisible.value = false
                    message.value = ''
                    isError.value = false
                }, 2000)

                load.value = false               

            }
        }
    })

}

const addAddress = () => {
    load.value = true

    //selectedAddress.value.default = (selectedAddress.value.default === false) ? 0 : 1
    selectedAddress.value.default = 1
    selectedAddress.value.province_id = (Number.isInteger(selectedAddress.value.province_id)) ? selectedAddress.value.province_id : provinceOld_id.value,

    addressesStores.addAddress(selectedAddress.value)
        .then(response => {

            isDialogVisible.value = true
            message.value = 'Dirección creada exitosamente'
            closeDialog()

            fetchData()

            setTimeout(() => {
                isDialogVisible.value = false
                message.value = ''
                isError.value = false
            }, 3000)

            load.value = false                    
            
        }).catch(err => {

            load.value = false

            if(err.message === 'error'){
                isDialogVisible.value = true
                message.value = err.errors
                isError.value = true
            } else {
                isDialogVisible.value = true
                isError.value = true
                message.value = 'Se ha producido un error...! (Server Error)'
            }                    

            setTimeout(() => {
                isDialogVisible.value = false
                message.value = ''
                isError.value = false
            }, 3000)

            // console.error(err.message)
        })

}

// FUNCIÓN DE PAGO: Acepta tanto usuarios logueados (client_id) como invitados (client_id = null)
const sendPayU = async (billingDetail) => {

    let product_color_id = []
    let service_id = []
    let price_product = []
    let quantity_product = []
    let price_service = []
    let quantity_service = []
    let date = []
    let cake_size_id = []
    let flavor_id = []
    let filling_id = []
    let order_file_id = []
    let product_type = 0
    let service_type = 0
    let type = 0

    products.value.forEach(element => {

        if(element.type === 0) {
            product_color_id.push(element.product_color_id)
            price_product.push(element.product.price_for_sale)
            quantity_product.push(element.quantity)
            product_type = 1
        } else {
            let cupcake = element.cupcakes.find(item => item.cake_size_id === element.cake_size_id)
            let date_ = dayjs(element.date, "YYYY-MM-DD hh:mm A");

            service_id.push(element.id)
            price_service.push(element.cake_size_id === 0 ? element.price : cupcake.price)
            quantity_service.push(element.quantity)
            date.push(date_.format("YYYY-MM-DD HH:mm:ss"))
            cake_size_id.push(element.cake_size_id === 0 ? null : element.cake_size_id)
            flavor_id.push(element.cake_size_id > 0 ? element.flavor.id : null)
            filling_id.push(element.cake_size_id > 0 ? element.filling.id : null)
            order_file_id.push(element.order_file_id === '0' ? null : element.order_file_id)
            service_type = 1
        }
    });

    if(product_type === 1 && service_type === 1)
        type = 2
    else
        type = (product_type === 1) ? 0 : 1
    
    let checkIp = await checkUserIP()
    
    if(!checkIp) {
        let response = await cartStores.checkAvailability()
        
        if(response.allAvailable === false) {

            currentStep.value = 0
            await fetchData()

            message.value = "Todos los productos no estan disponibles"
            isDialogVisible.value = true
            isError.value = true

            setTimeout(() => {
                isDialogVisible.value = false
                message.value = ''
                isError.value = false
            }, 5000)

            isLoading.value = false
        } else {

            // client_id puede ser null para compras como invitado
            let data = {
                client_id:  client_id.value, // null = invitado
                address_id: address_id.value,
                addresses: addresses.value,
                sub_total: summary.value.subTotal,
                shipping_total: summary.value.send,
                shipping_express: summary.value.shipping_express,
                tax: 0,
                total: summary.value.total,
                product_color_id: product_color_id,
                service_id: service_id,
                price_product: price_product,
                quantity_product: quantity_product,
                price_service: price_service,
                quantity_service: quantity_service,
                date: date,
                cake_size_id: cake_size_id,
                flavor_id: flavor_id,
                filling_id: filling_id,
                order_file_id: order_file_id,
                province_id: billingDetail.province_id,
                document_type_id: billingDetail.document_type_id,
                document: billingDetail.document,
                name: billingDetail.name,
                last_name: billingDetail.last_name,
                company: billingDetail.company,
                email: billingDetail.email,
                phone: billingDetail.phone,
                address: billingDetail.address,
                street: billingDetail.street,
                city: billingDetail.city,
                postal_code: billingDetail.postal_code,
                note: billingDetail.note,
                type: type,
                ip: ip.value,
                user_agent: navigator.userAgent,
                coupon_id: summary.value.coupon_id,
                wholesale: 0
            }

            isLoading.value = true 

            let order = await ordersStores.addOrder(data)
            let payment = await paymentsStores.signature({referenceCode: order.reference_code, amount: summary.value.total})
            
            localStorage.setItem('order_id', order.id)

            const formData = new URLSearchParams();

            formData.append('merchantId', payment.merchantId);
            formData.append('accountId', payment.accountId);
            formData.append('description', 'Order #'+ order.id);
            formData.append('referenceCode', payment.referenceCode);
            formData.append('amount', summary.value.total);
            formData.append('tax', '0');
            formData.append('taxReturnBase', '0');
            formData.append('currency', 'COP');
            formData.append('signature', payment.signature);
            formData.append('test', (payment.test) ? '1' : '0');
            formData.append('buyerEmail', billingDetail.email);
            formData.append('buyerFullName', billingDetail.name + ' ' + billingDetail.last_name);
            formData.append('mobilePhone', billingDetail.phone);
            formData.append('telephone', billingDetail.phone);
            formData.append('logoUrl', config.public.APP_DOMAIN_API_URL + '/logos/slogan.png');
            formData.append('shippingAddress', billingDetail.address);
            formData.append('shippingCity', billingDetail.city);
            formData.append('shippingCountry', 'CO');
            formData.append('responseUrl', payment.responseUrl);
            formData.append('confirmationUrl', payment.confirmationUrl);

            paymentsStores.redirectToPayU(formData)
                .then(response => {
                    isLoading.value = false
                    window.location.href = response.url;
                })
                .catch(error => {
                    
                    isLoading.value = false
                    isDialogVisible.value = true
                    message.value = error
                    isError.value = true             

                    setTimeout(() => {
                        isDialogVisible.value = false
                        message.value = ''
                        isError.value = false
                    }, 2000)
                    // console.error('Error:', error);
                });
        }
    }
}

const handlePayClick = async () => {
    try {
        const res = await paymentsRef.value?.validateAndGetBillingDetail()
        if (res && res.valid) {
            await sendPayU(res.data)
        } else {
            isDialogVisible.value = true
            message.value = 'Por favor completa los datos de facturación.'
            isError.value = true
            setTimeout(() => {
                isDialogVisible.value = false
                message.value = ''
                isError.value = false
            }, 2000)
        }
    } catch (e) {
        // no-op
    }
}

const deleteAll = async () => {
    if(process.client) {
        localStorage.removeItem('shoppingCart') 
    }
}

const updatePaymentState = async (payment_state_id) => {
    if(process.client)
        await ordersStores.updatePaymentState({ 
            payment_state_id: payment_state_id
        }, localStorage.getItem('order_id'))
}

const completed = () => {
    window.location.href = router.resolve({ name: 'products' }).href
}

const refresh = () => {
    window.location.href = router.resolve({ name: 'cart' }).href
}

const handleLoggedIn = async () => {
    try {
        if (process.client && localStorage.getItem('user_data')) {
            const userDataJ = JSON.parse(localStorage.getItem('user_data'))
            client_id.value = userDataJ?.client?.id || client_id.value
            // Guardar para usar después de fetchData
            var userProvinceAfterLogin = Number(userDataJ?.user_details?.province?.id ?? userDataJ?.user_details?.province_id ?? NaN)
        }
    } catch (e) {}
    await fetchData()
    // Asegurar province_id actualizado tras login desde user_details (coincidir con Payments)
    if (!Number.isNaN(userProvinceAfterLogin)) {
        province_id.value = userProvinceAfterLogin
        if (province_id.value === 293 && parseFloat(summary.value.subTotal) <= parseFloat('150000')) {
            chanceSend('sendToBogota')
            send_id.value = 2
        } else if (province_id.value === 293 && parseFloat(summary.value.subTotal) > parseFloat('150000')) {
            chanceSend('free')
            send_id.value = 0
        } else {
            chanceSend('send')
            send_id.value = 1
        }
    }
    // Sincronizar inmediatamente los datos de usuario (nombre, apellido, email, documento) en Payments
    try {
        if (paymentsRef?.value?.updateBillingFromUser) {
            paymentsRef.value.updateBillingFromUser()
        }
    } catch (e) {}
}

const handleProvinceChanged = (val) => {
    if (!val) return
    province_id.value = Number(val)
    if (province_id.value === 293 && parseFloat(summary.value.subTotal) <= parseFloat('150000')) {
        chanceSend('sendToBogota')
        send_id.value = 2
    } else if (province_id.value === 293 && parseFloat(summary.value.subTotal) > parseFloat('150000')) {
        chanceSend('free')
        send_id.value = 0
    } else {
        chanceSend('send')
        send_id.value = 1
    }
}

const closeDialog = () => {
    dialog.value = false
    selectedAddress.value = {
        id: 0,
        addresses_type_id: '1',
        country_id: 'Colombia',
        province_id: '',
        title: '',
        street: '',
        city: 'Bogotá',
        address: '',
        phone: '',
        postal_code: null,
        default: false
    }

    selectCountry(selectedAddress.value.country_id)
}

const dialog_error = ()=> {
    message.value = "Debes agregar una dirección de envío"
    isDialogVisible.value = true
    isError.value = true

    setTimeout(() => {
        isDialogVisible.value = false
        message.value = ''
        isError.value = false
    }, 3000)
}

const getFlagCountry = country => {
  let val = listCountries.value.find(item => {
    return item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === country.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  })

  if(val)
    return 'https://hatscripts.github.io/circle-flags/flags/'+val.iso.toLowerCase()+'.svg'
  else
    return ''
}

const chanceSend = value => {
    switch (value) {
        case 'free':
            summary.value.shipping_express = 0
            summary.value.send = '0.00'
            send_id.value = 0
        break;
        case 'send':
            summary.value.shipping_express = 0
            summary.value.send = '19000.00'
            send_id.value = 1
        break;
        case 'sendToBogota':
            summary.value.shipping_express = 0
            summary.value.send = '12000.00'
            province_id.value = 293
            send_id.value = 2
        break;
        case 'shipping_express':
            summary.value.shipping_express = 1
            summary.value.send = '17000.00'
            province_id.value = 293
            send_id.value = 3
        break;
        case 'default':
            summary.value.shipping_express = 0
            summary.value.send = '12000.00'
            province_id.value = 293
            send_id.value = 2
    }

    let sum = 0
    
    products.value.forEach(element => {
        let cupcake = element.type === 0 ? null : element.cupcakes.find(item => item.cake_size_id === element.cake_size_id)
        let value = 
            element.type === 0 ? element.product.price_for_sale :
              (element.cake_size_id === 0 ? element.price : cupcake.price)
              
        sum += (parseFloat(value) * element.quantity)
    });

    summary.value.subTotal = sum.toFixed(2)
    summary.value.total = (parseFloat(summary.value.send) + parseFloat(summary.value.subTotal) - parseFloat(summary.value.discount)).toFixed(2)
}

</script>


<template>
    <Loader :isLoading="isLoading"/>
    <div class="checkout-page mb-15">
        <VContainer 
            class="mt-2 checkout-card"
            :class="currentStep === 2 ? 'w-60': ''">
            <h1 v-if="products.length > 0 && (typeof route.query.merchantId === 'undefined')" class="tw-text-2xl tw-font-bold tw-text-primary">
                GENIAL, ¡FINALIZA TU COMPRA!
            </h1>     
            <VRow v-if="products.length > 0 && (typeof route.query.merchantId === 'undefined')">
                <VCol cols="12" md="8">
                    <VCard class="card-products p-0">
                        <!-- <User @logged-in="handleLoggedIn" /> -->
                        
                        <Payments 
                            ref="paymentsRef"
                            v-model:current-step="currentStep"
                            :address_id="address_id"
                            :addresses="addresses"
                            :products="products"
                            :summary="summary"
                            :countries="listCountries"
                            :provinces="listProvinces"
                            :document_types="getDocumentTypes"
                            :step="currentStep"
                            @send="chanceSend"
                            @dialog_error = "dialog_error"
                            @province-changed="handleProvinceChanged"
                        />

                        <Location 
                            :key="province_id + '-' + send_id"
                            v-model:current-step="currentStep"
                            :address_id="address_id"
                            :province_id="province_id"
                            :send_id="send_id"
                            :is-dialog-open="dialog"
                            :addresses="addresses"
                            :summary="summary"
                            @changeAddreess="changeAddreess"
                            @dialog="dialog = true"
                            @dialog_error = "dialog_error"
                            @send="chanceSend"
                        />
                        
                        <h3 class="text-h6 font-weight-bold mb-0 px-5">Medios de pago</h3>
                        <VCardText class="d-block row-payu align-center text-center mb-10 px-5">
                            <div class="payu-option">
                                <span class="payu-bullet" aria-hidden="true"></span>
                                <img :src="Payu" class="payu-logo"/>
                                <p class="payu-desc">Paga con tarjeta de crédito, debito o transacción bancaria de forma segura a través de los servidores seguros de PayU.</p>
                            </div>
                        </VCardText>
                    </VCard>

                    <div class="d-flex justify-end px-5">
                        <!-- RESTRICCIÓN DESHABILITADA: Antes requería client_id (usuario logueado) -->
                        <!-- Ahora permite compras como invitado -->
                        <VBtn
                            :disabled="false"
                            variant="flat"
                            class="btn-pay"
                            @click="handlePayClick">
                                IR A PAGAR
                        </VBtn>
                    </div>
                </VCol>
                <VCol cols="12" md="4">
                    <!-- NOTA: client_id se pasa al componente Summary para funcionalidad de cupones -->
                    <!-- Si es null (invitado), los cupones no aplican -->
                    <Summary
                        v-model:current-step="currentStep"
                        :products="products"
                        :summary="summary"
                        :discount="discount"
                        :client_id="client_id !== null ? true : false"
                        @deleteProduct="deleteProduct"
                        @deleteService="deleteService"
                        @addCart="addCart"
                        @couponApply="couponApply"
                    />
                </VCol>         
                
            </VRow>
            
            <Confirmation 
                v-if="typeof route.query.merchantId !== 'undefined'"
                @refresh="refresh"
                @completed="completed"
                @updatePaymentState="updatePaymentState"
                @deleteAll="deleteAll"/>
          

            <VCard 
                v-if="hasLoadedCart && products.length === 0 && (typeof route.query.merchantId === 'undefined') && !isLoading"
                class="mb-10 card-timeline px-0">
                <VCardText class="d-flex flex-column align-center text-center justify-content-center">
                    <VCardItem class="d-block align-center text-center justify-content-center cart-svg">
                        <cart v-if="!isMobile" class="d-block mx-auto mb-5"/>
                        <cart_mobile v-else class="d-block mx-auto mb-5"/>
                        <span class="d-block cart-empty">Tu carrito esta vacio.</span>
                    </VCardItem>
               </VCardText>
            </VCard>

        </VContainer>
        
        <!--MODAL ADD ADDRESS-->
        <VDialog v-model="dialog" transition="dialog-top-transition">
            <VForm
                ref="refVForm"
                @submit.prevent="onSubmit"
            > 
                <VCard class="pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto">
                    <VCardText class="subtitle-register p-0 mt-0 mt-md-7 d-block">
                        <span class="d-block">AGREGAR NUEVA DIRECCIÓN</span>
                        <span v-if="products.some(product => product.type === 1)" class="tw-text-sm tw-text-gray d-flex mt-1 justify-content-center">
                            <info class="me-1"/>
                            Servicios válidos únicamente para Bogotá D.C.
                        </span>
                    </VCardText>           
                    <VCardItem class="pb-0 px-3 px-md-10">
                        <VRow no-gutters class="text-left align-center">
                            <VCol cols="12" md="6" class="textinput mb-0 mb-md-2 mt-3">
                                <VAutocomplete
                                    variant="outlined"
                                    v-model="selectedAddress.country_id"
                                    label="País"
                                    :rules="[requiredValidator]"
                                    :items="listCountries"
                                    item-title="name"
                                    item-value="name"
                                    :menu-props="{ maxHeight: '200px' }"
                                    readonly
                                    @update:model-value="selectCountry"
                                    class="me-0 me-md-2"
                                    >
                                    <template
                                        v-if="selectedAddress.country_id"
                                        #prepend
                                        >
                                        <VAvatar
                                            start
                                            style="margin-top: -8px;"
                                            :size="isMobile ? '30' : '36'"
                                            :image="getFlagCountry(selectedAddress.country_id)"
                                        />
                                    </template>
                                </VAutocomplete>
                            </VCol>  
                            <VCol cols="12" md="6" class="textinput mb-0 mb-md-2 mt-3">
                                <VAutocomplete
                                    variant="outlined"
                                    v-model="selectedAddress.province_id"
                                    label="Departamento"
                                    item-title="title"
                                    item-value="value"
                                    :rules="[requiredValidator]"
                                    :items="getProvinces"
                                    :menu-props="{ maxHeight: '200px' }"
                                />    
                            </VCol> 
                            <VCol cols="12" md="6" class="textinput mb-0 mb-md-2">
                                <VTextField
                                    label="Ciudad"
                                    v-model="selectedAddress.city"
                                    variant="outlined"
                                    :rules="[requiredValidator]"
                                    class="me-0 me-md-2"
                                    />
                            </VCol>  
                            <VCol cols="12" md="6" class="textinput mb-0 mb-md-2">
                                <VTextField
                                    label="Localidad / Barrio"
                                    v-model="selectedAddress.street"
                                    variant="outlined"
                                    /> 
                            </VCol> 
                            <VCol cols="12">
                                <VTextarea
                                    v-model="selectedAddress.address"
                                    rows="2"
                                    label="Dirección"
                                    variant="outlined"
                                    :rules="[requiredValidator]"
                                />
                            </VCol>
                            <VCol cols="12" md="6" class="textinput mb-0 mb-md-2">
                                <VTextField
                                    v-model="selectedAddress.phone"
                                    type="tel"
                                    label="Teléfono"
                                    placeholder="+57 23 456 7890"
                                    variant="outlined"
                                    class="me-0 me-md-2"
                                    :rules="[requiredValidator, phoneValidator]"
                                    @keypress="handleNumericKeypress"
                                    @paste.prevent
                                />
                            </VCol>  
                            <VCol cols="12" md="6" class="textinput mb-0 mb-md-2">
                                <VTextField
                                    v-model="selectedAddress.postal_code"
                                    label="Código Postal"
                                    type="tel"
                                    variant="outlined"
                                    @keypress="handleNumericKeypress"
                                    @paste.prevent
                                />    
                            </VCol> 
                            <VCol cols="12" md="12" class="textinput mb-2 mb-md-2">
                                <VTextField
                                    label="Descripción (Ejemplo: CASA)"
                                    v-model="selectedAddress.title"
                                    variant="outlined"
                                    :rules="[requiredValidator]"
                                    />
                            </VCol>
                            <VCol cols="12" md="7"></VCol>
                            <VCol cols="12" md="5" class="mb-3 mb-md-0 d-none" v-if="client_id">
                                <VCheckbox
                                    v-model="selectedAddress.default"
                                    color="primary"
                                    label="Dirección por Defecto"
                                    true-icon="mdi-check-bold"
                                    false-icon="mdi-window-close"
                                    class="ms-md-3"
                                />
                            </VCol>
                        </VRow>
                    </VCardItem>
                    <VCardActions class="px-10 d-flex justify-content-center">
                        <VSpacer class="d-none d-md-block"/>
                        <VBtn
                            variant="flat"   
                            type="submit"
                            class="btn-register tw-text-white tw-bg-primary button-hover"
                            >
                            Enviar
                            <VProgressCircular
                                v-if="load"
                                indeterminate
                                color="#fff"
                            />
                        </VBtn>
                        <VBtn
                            color="primary"
                            variant="outlined"
                            class="btn-register"
                            @click="closeDialog"
                        >
                        Cerrar
                        </VBtn>
                    </VCardActions>
                </VCard>
            </VForm>
        </VDialog>

        <!--PopUp Message-->
        <VDialog v-model="isDialogVisible" >
            <VCard
                class="px-10 py-14 pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto">
                <VImg :width="isMobile ? '120' : '180'" :src="isError ? (isBlocked ? maintenance_circle : error_circle) : check_circle" class="mx-auto"/>
                <VCardText class="text-message mb-5 px-0 px-md-5 pt-0">
                    {{ message }}
                </VCardText>
            </VCard>
        </VDialog>
    </div>
</template>

<style lang="scss">

    /* PayU option styled like selected radio */
    .payu-option {
        display: flex;
        align-items: center;
        gap: 16px;
        background: #EEF0EF;
        border-radius: 16px;
        padding: 16px 20px;
    }

    .payu-logo {
        height: 72px;
    }

    .payu-desc {
        margin: 0;
        color: #0A1B33;
        text-align: left;
    }

    .payu-bullet {
        width: 22px;
        height: 22px;
        min-width: 22px;
        border: 3px solid #FFFFFF;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        position: relative;
    }

    .payu-bullet::after {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #FF0090;
        display: block;
    }


    .card-products {
        background-color:#FFFFFF;
        padding:16px 32px;
        border-radius: 24px;
        margin-top:16px;
        box-shadow: none;
    }

    .cart-empty {
        color: #FF0090;
        text-align: center;
        font-size: 24px;
        font-weight: 600;
        line-height: 30px;
    }

    .w-60 {
        width: 65%;
    }

    .card-timeline {
        padding: 16px 0px;
        border-radius: 24px;
        box-shadow: none;
    }

    .btn-pay {
    display: flex;
    width: 50%;
    padding: 24px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: #FF0090 !important;
    color: #FFF !important;
    font-size: 24px;
    font-weight: 700;
    line-height: 24px;
    box-shadow: 0px 0px 24px 0px rgba(255, 39, 179, 0.5);
    z-index: 1000;
    margin-top: -25px;
    }

    .btn-pay:hover {
        background: #FF27B3 !important;
        box-shadow: 0px 0px 28px 4px rgba(255, 39, 179, 0.6);
    }

    .checkout-card {
        margin-block-end: 2rem;
        margin-block-start: 9.75rem;
    }
    .form-payment .v-card-item .v-card-item__content {
        overflow: visible;
        }
    @media (max-width: 960px) and (min-width: 600px) {
        .checkout-page {
            .v-container {
             padding-inline: 2rem !important;
            }
        }
    }

    @media (max-width: 600px){
        .checkout-card {
            margin-block-start: 6rem;
            margin-block-end: 0 !important;
        }

        .btn-pay{
            font-size: 16px;
        }

        .payu-logo {
            height: 48px;
        }
    }
</style>
<style scoped>

    .swiper {
      height: 300px!important;
    }

    .swiper::v-deep(.swiper-pagination-bullet-active) {
      background: #FF0090 !important;
    }

    .swiper::v-deep(.swiper-pagination-horizontal ) {
      top: 92%;
    }    

    .btn-register {
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 14px;
        border-radius: 32px;
    }

    .card-register {
        width: 500px;
        border-radius: 32px!important;
    }

    .textinput .v-text-field::v-deep(.v-field) { 
        border-radius: 24px;
        height: 35px;
        font-size: 14px;
    }

    .v-text-field::v-deep(.v-field__outline__start) {
        flex: 0 0 17px !important;
    }

    .v-text-field::v-deep(::placeholder) { 
        color: #999999 !important;
        opacity: inherit;
    }

    .v-text-field::v-deep(input) { 
        padding-top: 0 !important;
        padding-left: 20px !important;
    }

    .v-text-field::v-deep(.v-input__details) {
        min-height: 15px !important;
    }

    .textinput .v-text-field::v-deep(.v-field-label) {
        top: 33% !important;
        font-size: 14px !important;
    }

    .v-textarea::v-deep(.v-field-label) {
        top: 10% !important;
        font-size: 14px !important;
    }

    .v-text-field::v-deep(.v-field__append-inner) { 
        padding-top: 8px !important;
        align-items: start !important;
    }

    .v-autocomplete::v-deep(.v-field__overlay) {
        background: white !important;
    }

    .v-autocomplete::v-deep(.v-field__input) { 
        padding-top: 0 !important;
    }

    .v-autocomplete::v-deep(.v-input__prepend) {
        margin-inline-end: 0 !important;
    }

    .v-textarea::v-deep(.v-field) { 
        border-radius: 24px !important;
    }

    .v-checkbox::v-deep(.v-input__details) { 
        min-height: 0 !important;
        padding: 0 !important;
        height: 0 !important;
    }

    .v-checkbox::v-deep(.v-label) {
        color:#0A1B33;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px; /* 138.462% */
        margin-left: 10px;
    }

    .text-message {
        color:  #FF0090;
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px !important;
        padding: 0 60px !important;
    }

    @media only screen and (max-width: 767px) {
        .card-products {
            padding: 16px 10px;
        }

        .cart-svg::v-deep(path) {
            fill: #FF0090 !important;
        }

        .v-checkbox::v-deep(.v-selection-control) {
            text-align: center;
            align-items: center; 
            justify-content: center; 
            min-height: 35px;
        }

        .text-message {
            padding: 0 20px !important;
            font-size: 18px;
        }

        .card-register {
            padding: 20px;
            width: auto;
        }

        .w-60 {
            width: 100%;
        }

        .text-left {
            line-height: 24px;
        }

    }
</style>