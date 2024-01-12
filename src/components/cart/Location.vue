<script setup>

const emit = defineEmits(['update:currentStep'])

</script>

<template>
   <VRow>
        <VCol cols="12" md="8">
            <VCard class="card-products px-0">
                <VCardTitle class="title-card">Elige la forma de entrega</VCardTitle>
                <VCardText class="row-cardp px-0 pt-2">
                    <h2 class="home px-5 mb-5">Enviar a domicilio</h2>
                    <VRow class="row-card px-5">
                        <VCol cols="8" md="7">
                            <VRow>
                                <VCol cols="2" class="text-center">    
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                        <circle cx="7.5" cy="8.25" r="6.5" stroke="#FF0090" stroke-width="2"/>
                                    </svg>
                                </VCol>
                                <VCol cols="9">
                                    <span>Calle 000 #000-00</span>
                                </VCol>
                            </VRow>
                        </VCol>

                        <VCol cols="4" md="5" class="text-right">
                            <span>$0.000</span>
                        </VCol>
                    </VRow>

                    <!--item 2-->
                    <VRow class="row-card2 px-5">
                        <VCol cols="8" md="7">
                            <VRow>
                                <VCol cols="2" class="text-center">    
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                        <circle cx="7.5" cy="8.25" r="6.5" stroke="#FF0090" stroke-width="2"/>
                                    </svg>
                                </VCol>
                                <VCol cols="9">
                                    <span>Calle 000 #000-00</span>
                                </VCol>
                            </VRow>
                        </VCol>

                        <VCol cols="4" md="5" class="text-right">
                            <span>$0.000</span>
                        </VCol>
                    </VRow>
                </VCardText>
                <VRow class="row-cardp3">
                    <VCol cols="12" md="6" class="text-left">
                        <span>Editar o elegir otro domicilio</span>
                    </VCol>
                </VRow>
            </VCard>

            <VCard class="card-products px-0 mt-5">
                <VCardTitle class="home">Retirar en un punto físico </VCardTitle>
                <VCardText class="row-cardp_ px-0 pt-2">
                    <VRow class="row-card px-5 mt-2">
                        <VCol cols="8" md="7">
                            <VRow>
                                <VCol cols="2" class="text-center">    
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                        <circle cx="7.5" cy="8.25" r="6.5" stroke="#FF0090" stroke-width="2"/>
                                    </svg>
                                </VCol>
                                <VCol cols="9">
                                    <span>Calle 000 #000-00</span>
                                </VCol>
                            </VRow>
                        </VCol>

                        <VCol cols="4" md="5" class="text-right">
                            <span class="free-text">Gratis</span>
                        </VCol>
                    </VRow>

                    <!--item 2-->
                    <VRow class="row-card2 px-5">
                        <VCol cols="8" md="7">
                            <VRow>
                                <VCol cols="2" class="text-center">    
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                        <circle cx="7.5" cy="8.25" r="6.5" stroke="#FF0090" stroke-width="2"/>
                                    </svg>
                                </VCol>
                                <VCol cols="9">
                                    <span>Calle 000 #000-00</span>
                                </VCol>
                            </VRow>
                        </VCol>

                        <VCol cols="4" md="5" class="text-right">
                            <span class="free-text">Gratis</span>
                        </VCol>
                    </VRow>
                </VCardText>
            </VCard>

            <VCol cols="12" class="text-right">
                <VBtn
                    variant="flat"
                    style="border-radius:32px;"
                    class="btn-register tw-text-white tw-bg-primary button-hover mt-2"
                    @click="emit('update:currentStep', 2)">
                    Continuar
                </VBtn>
            </VCol>
        </VCol>
        <VCol cols="12" md="4">
            <VCard class="card-summary px-0">
                <VCardTitle class="subtitle-card row-buy pb-8">Resumen de compra</VCardTitle>
                <VCardText class="px-10 mt-5">
                    <VRow align="center">
                        <VCol cols="9" md="6" class="text-left">
                            <span>Productos</span>
                        </VCol>
                        <VCol cols="3" md="6" class="text-right">
                            <span>$5.600</span>
                        </VCol>
                        <VCol cols="9" md="6" class="text-left">
                            <span>Envío</span>
                        </VCol>
                        <VCol cols="3" md="6" class="text-right">
                            <span>$2.000</span>
                        </VCol>
                        <VCol cols="9" md="6" class="text-left">
                            <h4>Total</h4>
                        </VCol>
                        <VCol cols="3" md="6" class="text-right">
                            <h4>$7.600</h4>
                        </VCol>
                    </VRow>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>

<style scoped>

    .card-summary {
        background-color:#F3FCFE;
        padding:24px 32px;
        border-radius: 24px;
        box-shadow: none;
        
    }

    .row-card3 span, .free-text {
        color: #FF0090;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
    }

    .home { 
        color:  #0A1B33;
        font-size: 20px;
        font-weight: 500;
        line-height: normal; 
    }

    .btn-register {
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 14px;
        border-radius: 32px;
        height: 54px;
        width: 25%;
    }
    .button-hover:hover {
        background-color: #FF27B3 !important;
        box-shadow: 0px 0px 24px 0px #FF27B3;
    }

    .card-products {
        background-color:#FFFFFF;
        padding:16px 32px;
        border-radius: 24px;
        box-shadow: none;
    }

    .card-buy {
        background-color:#FFFFFF;
        padding:24px 32px;
        border-radius: 24px;
        box-shadow: none;
    }

    .title-card {
        color: #0A1B33;
        font-size: 32px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    .subtitle-card {
        color: #0A1B33;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }

    .row-cardp {
        border-bottom: 1px solid #D9EEF2;
        border-top: 1px solid #D9EEF2;
        margin-top:11px;
        padding: 32px;
    }

    .row-cardp_ {
        border-top: 1px solid #D9EEF2;
        margin-top:11px;
        padding: 32px;
    }

    .row-cardp2 {
        border-bottom: 1px solid #D9EEF2;
        height:100px;
        padding: 32px;

    }

    .row-cardp3 {
        padding: 16px 32px;
    }

    .row-cardp3 span {
        color: #FF0090;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .row-cardp3 h4 {
        color:#0A1B33;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    .row-buy {
        border-bottom: 1px solid #D9EEF2;
    }

    .row-buy span {
        color: #0A1B33;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
    }

    .row-buy h4 {
        color:#0A1B33;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }

    @media only screen and (max-width: 767px)
    {
        .title-card
        {
            font-size: 20px;
        }
        .btn-register
        {
            width: 100%;
        }
    }

</style>