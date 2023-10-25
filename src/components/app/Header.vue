<script setup>
  
  import logo from '@/assets/images/logo.svg';
  import heart from '@/assets/icons/heart.svg';
  import shoppinp_cart from '@/assets/icons/shoppinp_cart.svg';
  import user from '@/assets/icons/user.svg';

</script>

<template>
  <section>
    <VAppBar flat class="header">
      <VContainer class="tw-bg-white">
        <VRow no-gutters>
          <VCol cols="10" class="d-flex">
            <img :src="logo" width="255" cover/>
            <VTextField
              class="ms-8 me-24 pt-5"
              placeholder="Quiero..."
              color="#FF0090"
              flat
              variant="solo">
              <template v-slot:prepend-inner>
                <VAutocomplete
                  class="tw-text-primary h-100 search-select "
                  placeholder="Todos"
                  flat
                  variant="solo"
                  menu-icon=""
                  append-inner-icon="mdi-chevron-down"
                  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                />
              </template>
              <template v-slot:append-inner>
                <VBtn class="tw-bg-primary tw-text-white h-100 search-button">Buscar</VBtn>
              </template>
            </VTextField>
          </VCol>
          <VCol cols="2" class="d-flex align-center align-items-stretch flex-shrink-0 ms-n14">
            <VBtn width="20" class="p-0"><img :src="heart"/></VBtn>
            <VBtn width="20" class="p-0"><img :src="shoppinp_cart"/></VBtn>
            <VBtn width="20" class="p-0"><img :src="user"/></VBtn>
            <span class="d-flex align-center tw-text-terciary">
              Ingresar o Registrarme
            </span>
          </VCol>
        </VRow>
      </VContainer>
    </VAppBar>
    <VAppBar flat class="tw-bg-primary">
      <VContainer class="p-0 tw-text-white">sadsa</VContainer>
    </VAppBar>
  </section>
</template>

<style scoped>
  
  .search-select {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    border-right: 2px solid #FF0090;
    font-size: 11.5px;
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
    margin-inline-end: 90px !important;
  }

  .v-text-field::v-deep(.v-field) { 
    border-radius: 100px; 
    border: 2px solid #FF0090;
    height: 43px;
    padding-left: 50px;
  } 

  .v-text-field::v-deep(::placeholder) { 
    color: #FF0090;
    opacity: inherit;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
  }
  .v-text-field::v-deep(input) { 
    padding-top: 0 ;
    padding-bottom: 18px;
    margin-left: 60px;
  }

  .v-autocomplete::v-deep(input) {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-left: 0 !important;
   }
  .v-autocomplete::v-deep(.v-field) { 
    border-radius: 0 !important;
    border-top-left-radius: 20px !important;
    border-bottom-left-radius: 20px !important;
    border: none !important;
    width: 100px;
    height: 0;
    padding: 0 !important;
  } 

  
</style>
