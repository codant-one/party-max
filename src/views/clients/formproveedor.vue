
import type { type } from 'os';
<script setup lang="ts">
import icon1 from '@assets/icons/Mail.svg';
import icon2 from '@assets/icons/input-user.svg';
import icon3 from '@assets/icons/Phone.svg';
import icon4 from '@assets/icons/nit-icon.svg';
</script>

<template>
 

  <VContainer class="content py-13 text-center w-100">
    
    <VRow no-gutters>

        <VCol cols="12" md="3"></VCol>
        <VCol cols="12" md="6" class="text-center">
            <VCard class="mt-4 no-shadown card-register d-block text-center mx-auto">
                
                <VCardItem class="subtitle-register">
                    Completa los datos para solicitar tu <br> cuenta como proveedor
                </VCardItem>
                <VCardItem class="client-card mt-4">
                    

                    <!--INPUT NAME-->

                    <VRow class="text-left align-center">
                       <VCol cols="2" class="text-left">
                        <img :src="icon2" class="me-3 ms-4"/>
                       </VCol> 
                       <VCol cols="10" class="d-block">
                        <p class="text-client text-left">Nombre de tu empresa</p> <br>
                        <p class="p-client text-left">Cuéntanos cómo quieres que te llamemos.</p>
                       </VCol>
                       <VCol cols="12">
                            <v-text-field
                                label="Name"
                                placeholder=""
                                variant="outlined"
                            ></v-text-field>
                       </VCol>

                       <VCol cols="2" class="text-left">
                        <img :src="icon4" class="me-3 ms-4"/>
                       </VCol> 
                       <VCol cols="10" class="d-block">
                        <p class="text-client text-left">Agrega tu NIT</p> <br>
                        <p class="p-client text-left">Nos ayudará a identificar tu negocio.</p>
                       </VCol>
                       <VCol cols="12">
                            <v-text-field
                                label="NIT"
                                placeholder=""
                                variant="outlined"
                            ></v-text-field>
                       </VCol>
                    </VRow>

                    <!--INPUT EMAIL-->
                    <VRow class="text-left align-center">
                       <VCol cols="2" class="text-left">
                        <img :src="icon1" class="me-3 ms-4"/>
                       </VCol> 
                       <VCol cols="10" class="d-block">
                        <p class="text-client text-left">Agrega tu e-mail</p> <br>
                        <p class="p-client text-left">Recibirás información de tu cuenta.</p>
                       </VCol>
                       <VCol cols="12">
                            <v-text-field
                                label="E-mail"
                                placeholder=""
                                variant="outlined"
                            ></v-text-field>
                       </VCol>
                    </VRow>

                     <!--INPUT Phone-->
                     <VRow class="text-left align-center">
                       <VCol cols="2" class="text-left">
                        <img :src="icon3" class="me-3 ms-4"/>
                       </VCol> 
                       <VCol cols="10" class="d-block">
                        <p class="text-client text-left">Valida tu teléfono</p> <br>
                        <p class="p-client text-left">Podrás usarlo para ingresar a tu cuenta.</p>
                       </VCol>
                       <VCol cols="12">
                            <v-text-field
                                label="Teléfono"
                                placeholder=""
                                variant="outlined"
                            ></v-text-field>
                       </VCol>
                    </VRow>

                    <!--INPUT NIT-->

                    <VRow class="text-left align-center">
                       

                       <VCol cols="12">
                            <v-checkbox label="Acepto los Términos y condiciones y autorizo el 
                                uso de mis datos de acuerdo a la Declaración de Privacidad." class="p-register"></v-checkbox>
                       </VCol>
                       <VCol cols="12" class="text-center">
                            <v-btn class="tw-bg-primary button-register w-100" density="default">Continuar</v-btn>
                       </VCol>
                    </VRow>

                    
                    
                </VCardItem>   
                
            </VCard>
        
        </VCol>
        <VCol cols="12" md="3"></VCol>

    </VRow>

    
  </VContainer>
</template>

<style scoped>

.card-register
{
    padding: 48px;
    border-radius: 32px;
}

.subtitle-register
{
    color: #FF0090;
    text-align: center;
    font-size: 23px;
    font-style: normal;
    font-weight: 600;
    line-height: 30px;
    margin-top: 34px;    
}

.text-register
{
    color:#0A1B33;
    text-align: center;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 133.333% */
}
.p-register
{
    margin-top: 34px;
   
}

.v-checkbox::v-deep(.v-label)
{

    color:#0A1B33;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 138.462% */
}
.text-client
{
    color: #0A1B33;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 8px; /* 50% */
}

.p-client
{
    color:  #999;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 8px; /* 50% */
}

.client-card
{
    align-items: center;
    border-radius: 16px;
    padding: 16px;
    margin: auto;
}
.button-register
{

    color: #FFFFFF;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 14px; /* 87.5% */
    border-radius: 32px;

}
.v-text-field::v-deep(.v-field__outline)
{
   
}

</style>