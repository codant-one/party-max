<script setup>

import { ref } from 'vue'
import { useProfileStores } from '@/stores/profile';
import { useAuthStores } from '@/stores/auth'
import { avatarText} from '@formatters'
import Loader from '@/components/common/Loader.vue'
import my_data_error from '@assets/icons/my_data_error.svg?inline';
import my_data_success from '@assets/icons/my_data_success.svg?inline';

import security from '@assets/icons/icon-seguridad.svg?inline';
import icon_address from '@assets/icons/icon-address.svg?inline';
import icon_right from '@assets/icons/right-icon.svg?inline';
import check_circle from '@assets/icons/check-circle.svg';
import error_circle from '@assets/icons/error-circle.svg';

const profileStores = useProfileStores()
const authStores = useAuthStores()

const isLoading = ref(true)
const name = ref(null)
const usermail= ref(null)
const avatar = ref('')
const avatarOld = ref('')
const fileInput = ref()

const isMobile = /Mobi/i.test(navigator.userAgent);
const isDialogVisible = ref(false)
const message = ref()
const isError = ref(false)

const onImageSelected = event => {
  const file = event.target.files[0]

  if (!file) return
  // avatarOld.value = file

  URL.createObjectURL(file)

  resizeImage(file, 400, 400, 0.9)
    .then(async blob => {
      avatarOld.value = blob
      let r = await blobToBase64(blob)
      avatar.value = 'data:image/jpeg;base64,' + r

      updateAvatar()
    })
}

const resizeImage = function(file, maxWidth, maxHeight, quality) {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.src = URL.createObjectURL(file)
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      let width = img.width
      let height = img.height

      if (maxWidth && width > maxWidth) {
        height *= maxWidth / width
        width = maxWidth
      }

      if (maxHeight && height > maxHeight) {
        width *= maxHeight / height
        height = maxHeight
      }

      canvas.width = width
      canvas.height = height

      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob(blob => {
        resolve(blob)
      }, file.type, quality)
    }
    img.onerror = error => {
      reject(error)
    }
  })
}

const blobToBase64 = blob => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(blob)
    reader.onload = () => {
      resolve(reader.result.split(',')[1])
    }
    reader.onerror = error => {
      reject(error)
    }
  })
}

const updateAvatar = () => {

    isLoading.value = true

    let formData = new FormData()
    formData.append('image', avatarOld.value)

    profileStores.change_avatar(formData)
        .then(response => {

            isDialogVisible.value = true
            message.value = "Se cambio su imagen correctamente"

            refresh()
            setTimeout(() => {
                isDialogVisible.value = false
                message.value = ''
                isError.value = false 
            }, 5000)

            isLoading.value = false                    
                    
        }).catch(err => {
            isLoading.value = false  

            if(err.message === 'error'){
                isDialogVisible.value = true
                message.value = err.errors
            } else {
                isDialogVisible.value = true
                message.value = 'Se ha producido un error...! (Server Error)'
            }                    

            setTimeout(() => {
                isDialogVisible.value = false
                message.value = ''
                isError.value = false
            }, 5000)

            console.error(err.message)
    })
}

const triggerFileInput = () => {
    fileInput.value.$el.querySelector('input[type=file]').click();
}

const refresh = async () => {
    if(localStorage.getItem('user_data')){
        const userData = localStorage.getItem('user_data')
        const userDataJ = JSON.parse(userData)

        const { user_data, userAbilities } = await authStores.me(userDataJ.hash)

        localStorage.setItem('userAbilities', JSON.stringify(userAbilities))
        localStorage.setItem('user_data', JSON.stringify(user_data))
    }
}

const me = async () => {

    isLoading.value = true
    if(localStorage.getItem('user_data')){
        const userData = localStorage.getItem('user_data')
        const userDataJ = JSON.parse(userData)

        name.value = userDataJ.name + ' ' +(userDataJ.last_name ?? '')
        usermail.value = userDataJ.email

        avatarOld.value = userDataJ.avatar
        avatar.value = userDataJ.avatar
    }

    isLoading.value = false
}

me()

</script>

<template>  
    <Loader :isLoading="isLoading"/>
    <VContainer class="mt-1 mt-md-10 container-dashboard">
        <VCard class="no-shadown card-information p-0 transparent">
            <VCardTitle class="p-0 d-flex align-center">
                <VRow no-gutters>
                    <VCol cols="4" md="2" class="d-flex justify-md-end">
                        <VCardText class="d-block d-md-flex">
                            <VBadge
                                class="tw-cursor-pointer"
                                color="primary"
                                location="bottom end" 
                                icon="mdi-camera-plus"
                                @click="triggerFileInput">
                                <VAvatar
                                    :size="isMobile ? '80': '100'"
                                    :color="avatar ? 'default' : 'primary'"
                                    variant="tonal"
                                >
                                    <VImg
                                        v-if="avatar"
                                        style="border-radius: 6px;"
                                        :src="avatar"
                                    />
                                    <span
                                        v-else
                                        class="text-5xl font-weight-semibold"
                                    >
                                        {{ avatarText(name) }}
                                    </span>
                            </VAvatar>
                            
                            </VBadge>
                            
                            <!-- 👉 Upload Photo -->
                            <VFileInput  
                                ref="fileInput"          
                                class="d-none"              
                                label="Avatar"
                                accept="image/png, image/jpeg, image/bmp"
                                placeholder="Avatar"
                                prepend-icon="tabler-camera"
                                @change="onImageSelected"
                            />
                        </VCardText>
                    </VCol>
                    <VCol cols="8" md="10" class="ps-3 d-flex align-center">
                        <div class="d-block">
                            <span class="d-block name-client">{{ name }}</span>
                            <span class="d-block text-subtitles">{{ usermail }}</span>
                        </div>
                    </VCol>
                </VRow>
            </VCardTitle>
        </VCard>

        <VCard class="card-profile">
            <VCardText class="py-0">
                <router-link 
                    to="/mydata"
                    class="tw-no-underline d-flex align-center items-profile">
                    <my_data_error class="mt-5 mt-md-3"/>
                    <div class="d-block ms-2 ms-md-5">
                        <span class="d-block text-titles">Mis datos</span>
                        <span class="d-block text-subtitles">Valida tus datos.</span>
                    </div>
                    <VSpacer />
                    <icon_right class="icon-right"/>
                </router-link>
            </VCardText>
            <VCardText class="py-0">
                <router-link 
                    to="/security"
                    class="tw-no-underline d-flex align-center items-profile">
                    <security class="mt-5 mt-md-3"/>
                    <div class="d-block ms-2 ms-md-5">
                        <span class="d-block text-titles">Seguridad</span>
                        <span class="d-block text-subtitles">Tienes configuraciones pendientes.</span>
                    </div>
                    <VSpacer />
                    <icon_right class="icon-right"/>
                </router-link>
            </VCardText>
            <VCardText class="py-0">
                <router-link
                    to="/client-address"
                    class="tw-no-underline d-flex align-center items-profile">
                    <icon_address class="mt-5 mt-md-3"/>
                    <div class="d-block ms-2 ms-md-5">
                        <span class="d-block text-titles">Direcciones</span>
                        <span class="d-block text-subtitles">Direcciones guardadas en tu cuenta.</span>
                    </div>
                    <VSpacer />
                    <icon_right class="icon-right"/>
                </router-link>
            </VCardText>
        </VCard>
    </VContainer>
    <VDialog v-model="isDialogVisible" >
        <VCard
            class="px-10 py-14 pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto">
            <VImg width="100" :src="isError ? error_circle : check_circle" class="mx-auto"/>
            <VCardText class="text-message mt-10 mb-5">
                {{ message }}
            </VCardText>
        </VCard>
    </VDialog>
</template>

<style scoped>

    .text-message {
        color:  #FF0090;
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 30px; 
        padding: 0 80px !important;
    }

    .card-register {
        width: 500px;
        padding: 20px;
        border-radius: 32px !important;
    }
    
    .transparent {
        background: transparent !important;
    }
    .container-dashboard {
        padding: 0 200px;
    }

    .profile-image {
        border-radius: 40px;
        height:80px;
        width:80px;
    }

    .name-client {
        color:#0A1B33;
        font-size: 17px;
        font-style: normal;
        font-weight: 600;
        line-height: 25px; /* 147.059% */
    }

    .text-titles {
        color: #0A1B33;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 133.333% */
    }

    .text-subtitles {
        color: var(--Grey-1, #999);
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px; /* 120% */
    }
 
    .card-profile {
        padding: 16px 32px;
        margin-top: 24px;
        border-radius: 16px;
        box-shadow: none !important;
    }

    .items-profile {
        padding: 5px 0px;
    }

    .icon-right {
        width: 20px;
    }

    .container-sidebar {
        padding: 40px 5px;
    }

    .custom-background {
        background-color: #0A1B33;
        color: #FFFFFF;
        
    }

    .custom-background .VListItem-title {
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 18.2px;
    }

    .text-menu
    {
        color: #FFFFFF;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin: 0;    
    }

    .link-menu {
        text-decoration: none;
    }

    .v-badge__wrapper::deep(.v-badge__badge)  {
        background: transparent !important;
    }

    @media only screen and (max-width: 767px) {
        .container-dashboard {
            padding: 0px 20px;
        }

        .name-client {
            font-size: 15px;
        }

        .card-profile {
            padding: 16px 10px !important;
        }

        .text-subtitles {
            font-size: 11px;
        }

        .card-register {
            width: auto;
            padding: 40px 20px !important;
        }

        .text-message {
            padding: 0 30px !important;
            font-size: 18px;
        }
    }

</style>