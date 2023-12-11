<script setup>

import { ref } from 'vue'
import router from '@/router'
const redirect = (name) => {
    router.push({ name : name})
}

</script>

<template>

    <VContainer class="mt-10">

        <VRow>
            <VCol cols="12" md="8">
                <h1 class="title-delivery">Elige la forma de entrega</h1>

                <VCard class="card-delivery">
                    <h2 class="title-card">Enviar a domicilio</h2>
                    <!--item 1-->
                    <VRow class="row-card">
                        <VCol cols="12" md="7">
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

                        <VCol cols="12" md="5" class="text-right">
                            <span>$0.000</span>
                        </VCol>
                    </VRow>

                    <!--item 2-->
                    <VRow class="row-card2">
                        <VCol cols="12" md="7">
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

                        <VCol cols="12" md="5" class="text-right">
                            <span>$0.000</span>
                        </VCol>
                    </VRow>

                    <!--item 3-->
                    <VRow class="row-card3">
                        <span>Editar o elegir otro domicilio</span>
                    </VRow>

                    
                </VCard>

                <VCard class="card-delivery">
                    <h2 class="title-card">Retirar en un punto físico </h2>
                    <!--item 1-->
                    <VRow class="row-card">
                        <VCol cols="12" md="7">
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

                        <VCol cols="12" md="5" class="text-right">
                            <span class="free-text">Gratis</span>
                        </VCol>
                    </VRow>

                    <!--item 2-->
                    <VRow class="row-card2">
                        <VCol cols="12" md="7">
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

                        <VCol cols="12" md="5" class="text-right">
                            <span class="free-text">Gratis</span>
                        </VCol>
                    </VRow>                    
                </VCard>

                

                <VCol cols="12" class="text-right">
                    <VBtn
                        variant="flat"
                        width="25%"
                        style="border-radius:32px;"
                        class="btn-register tw-text-white tw-bg-primary button-hover mt-2"
                        @click="redirect('shopping_summary')">
                        Continuar
                    </VBtn>
                </VCol>

            </VCol>

            <!--SUMMARY CARD-->
            <VCol cols="12" md="4">
                <VCard class="card-summary">
                    <h3 class="subtitle-card">Resumen de compra</h3>
                    <VRow class="row-summary">
                        <VCol cols="12" md="6" class="text-left">
                            <span>Productos</span>
                        </VCol>
                        <VCol cols="12" md="6" class="text-right">
                            <span>$5.600</span>
                        </VCol>
                        <VCol cols="12" md="6" class="text-left">
                            <span>Envío</span>
                        </VCol>
                        <VCol cols="12" md="6" class="text-right">
                            <span>$2.000</span>
                        </VCol>
                        <VCol cols="12" md="6" class="text-left">
                            <h4>Total</h4>
                        </VCol>
                        <VCol cols="12" md="6" class="text-right">
                            <h4>$7.600</h4>
                        </VCol>
                        
                    </VRow>
                </VCard>
            </VCol>
        </VRow>
        
    </VContainer>

</template>

<style scoped>
.title-delivery
{
    color: #0A1B33;
    font-size: 32px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.title-card{
    color: #0A1B33;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}
.card-summary
{
    background-color:#F3FCFE;
    padding:24px 32px;
    border-radius: 24px;
    
}

.row-summary
{
    margin-top:24px;
    border-top: 1px solid #D9EEF2;
}

.row-summary span
{
    color: #0A1B33;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
}

.row-summary h4
{
    color:#0A1B33;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.subtitle-card{
    color: #0A1B33;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.card-delivery
{
    background-color:#FFFFFF;
    padding:16px 32px;
    border-radius: 24px;
    margin-top:16px;
}

.row-card
{
    margin-top:16px;
    padding: 24px 0px;
    border-bottom: 1px solid  #D9EEF2;
}
.row-card2
{
    padding: 24px 0px;
    border-bottom: 1px solid  #D9EEF2;
}
.row-card3
{
    padding: 24px 32px;
}
.row-card3 span, .free-text
{
    color: #FF0090;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
}
</style>