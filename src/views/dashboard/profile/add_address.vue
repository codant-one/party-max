<script setup>

import icon_more from '@assets/icons/more-vertical.svg';
import icon_address from '@assets/icons/icon-domicilio.svg';

const name = ref(null)
const usermail= ref(null)
const phone= ref(null)

const me = async () => {
    if(localStorage.getItem('user_data')){
      const userData = localStorage.getItem('user_data')
      const userDataJ = JSON.parse(userData)

      name.value = userDataJ.name + ' ' +(userDataJ.last_name ?? '')
      usermail.value = userDataJ.email
      phone.value = userDataJ.user_details.phone

      console.log(phone.value)
    }
  }

  me()
</script>

<template>
 

  <VContainer class="mt-15 mb-15 container-dashboard">
   
    <VRow>
        <VCol cols="12" class="d-block">
            <h2 class="data-title">Agregar domicilio</h2>

            <VCard class="card-profile">

                <v-form>

                    <VRow align="center">
                        <VCol cols="12" md="5" class="col-inputs">
                            <label>Departamento</label>
                            <v-select
                            label="Select"
                            :items="['Bogotá D.C', 'Antioquia', 'Valle', 'Atlantico', 'Bolivar', 'Santander']"
                            ></v-select>
                        </VCol>
                        <VCol cols="12" md="5" class="col-inputs">
                            <label>Ciudad</label>
                            <v-select
                            label="Select"
                            :items="['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga']"
                            ></v-select>
                        </VCol>
                    </VRow>

                    <VRow align="center">
                        <VCol cols="12" md="5" class="col-inputs">
                            <label>Barrio</label>
                            <v-text-field
                            label="Name"
                            required
                            ></v-text-field>
                        </VCol>
                    </VRow>

                    <VRow align="center">
                        <VCol cols="12" md="5" class="col-inputs">
                            <label>Teléfono de contacto</label>
                            <v-text-field
                            label="Phone"
                            required
                            ></v-text-field>
                        </VCol>
                    </VRow>

                </v-form>

            </VCard>
        </VCol>
    </VRow>
    
  </VContainer>
</template>

<style scoped>
.container-dashboard {
        padding: 10px 200px;
    }
.data-title
{

    color: #0A1B33;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: left;

}

.card-profile {
        padding: 16px 32px;
        margin-top: 24px;
        border-radius: 16px;
        box-shadow: none;
    }
.labels
{
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 133.333% */
}

.icon-more
{
    width: 24px;
    height: 24px;
    margin: auto;
}
.icons
{
    width: 56px;
    height: 56px;
    border-radius: 27px;
    border: 1px solid var(--Grey-2, #E1E1E1);
    background: var(--White, #FFF);
}

.add-address
{
    padding: 24px;
    border-top: 1px solid var(--Grey-2, #E1E1E1);
}

.col-inputs
{
    padding: 30px 30px;
}

@media only screen and (max-width: 767px) 
    {
        .container-dashboard
        {
            padding: 0px 16px;
        }
    }


</style>