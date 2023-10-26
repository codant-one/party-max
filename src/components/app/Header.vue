<script setup>
  
  import logo from '@/assets/images/logo.svg';
  import heart from '@/assets/icons/heart.svg';
  import shoppinp_cart from '@/assets/icons/shoppinp_cart.svg';
  import user from '@/assets/icons/user.svg';
  import arrow_right from '@/assets/icons/arrow_right.svg';

</script>

<template>
  <section>
    <VAppBar flat class="header">
      <VContainer class="tw-bg-white">
        <VRow no-gutters>
          <VCol cols="10" class="d-flex">
            <router-link to="/" class="tw-no-underline tw-text-white ms-2">
              <img :src="logo" width="255" cover/>
            </router-link>
            <VLayout>
              <VSelect
                class="ms-8 pt-4 tw-text-primary w-15"
                placeholder="Todos"
                variant="plain"
                menu-icon="mdi-chevron-down"
                :items="['Fiesta Infantiles', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
              />
              <VTextField
                class="me-24 pt-4 w-100"
                placeholder="Quiero..."
                color="#FF0090"
                flat
                variant="solo">
                <template v-slot:append-inner>
                  <VBtn class="tw-bg-primary tw-text-white h-100 search-button">Buscar</VBtn>
                </template>
              </VTextField>
              <VSpacer />
            </VLayout>
          </VCol>
          <VCol cols="2" class="d-flex align-center align-items-stretch flex-shrink-0 ms-n70">
            <VBtn variant="plain" icon class="pb-2 me-4 index"><img :src="heart" width="35"/></VBtn>
            <VBtn variant="plain" icon class="pb-2 me-4"><img :src="shoppinp_cart" width="35"/></VBtn>
            <VBtn variant="plain" icon class="pb-2"><img :src="user" width="33"/></VBtn>
            <span class="d-flex align-center tw-text-terciary font-size-16 pb-2">
              Ingresar o Registrarme
            </span>
          </VCol>
        </VRow>
      </VContainer>
    </VAppBar>
    <VAppBar flat class="second-header tw-bg-primary">
      <VContainer class="p-0 tw-text-white d-flex align-center">
        
          <VAppBarNavIcon variant="text"/>
          <span class="font-size-16 me-7">Productos</span>
        
          <VAppBarNavIcon variant="text"/>
          <span class="font-size-16">Servicios</span>
      
          <span class="ms-5">Mayoristas</span>
          <VBtn class="p-0 index"><img :src="arrow_right"/></VBtn>

          <VSpacer />

          <router-link to="/about-us" class="ms-5 tw-no-underline tw-text-white">Quiénes somos</router-link>
          <VDivider class="hr" vertical/>
          <router-link to="/blogs" class="ms-5 tw-no-underline tw-text-white">Blogs</router-link>
          <VDivider class="hr" vertical/>
          <router-link to="/help" class="ms-5 tw-no-underline tw-text-white me-3">Ayuda</router-link>

      </VContainer>
    </VAppBar>
  </section>
</template>

<style scoped>

.v-toolbar::v-deep(.mdi-menu) { 
 
    font-size: 30px !important;
  }

  .hr {
    width: 2px;
    margin: 15px 0 15px 15px;
    background-color: white;
    opacity: 1 !important;
  }

  .second-header {
    top: 96px !important;
  }

  .index {
    z-index: 9999;
  }
  .ms-n70 {
    margin-inline-start: -55px !important;
  }
  .w-15 {
    width: 15%;
  }
  .w-30 {
    width: 30%;
  }

  .search-button {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    font-size: 11.5px;
  }
 
  .me-24 {
    margin-inline-end: 82px !important;
  }

  .v-text-field::v-deep(.v-field) { 
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border: 1.5px solid #FF0090;
    height: 43px;
  } 

  .v-text-field::v-deep(::placeholder) { 
    color: #FF0090 !important;
    opacity: inherit;
  }

  .v-text-field::v-deep(input) { 
    padding-top: 0 !important;
    padding-bottom: 18px;
  }

  .v-select::v-deep(.v-field__input) {
    padding-top: 10%;
    padding-left: 25%;
   }

   .v-select::v-deep(.v-field__append-inner) {
    padding-top: 30% !important;
    padding-right: 10% !important;
   }
   

  .v-select::v-deep(.v-field) { 
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
    border: 1.5px solid #FF0090 !important;
    padding: 0 !important;
  }
  
</style>
