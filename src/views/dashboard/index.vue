<script setup>

import default_image from '@assets/images/default-image-client.png';
import icon_misdatos from '@assets/icons/icon-misdatos.svg';
import icon_seguridad from '@assets/icons/icon-seguridad.svg';
import icon_card from '@assets/icons/icon-card.svg';
import icon_address from '@assets/icons/icon-address.svg';
import icon_privacity from '@assets/icons/icon-privacity.svg';
import icon_comunications from '@assets/icons/icon-comunications.svg';
import icon_right from '@assets/icons/right-icon.svg';
import icon_profile from '@assets/icons/icon-perfil-white.svg?inline';
import icon_account from '@assets/icons/lineas-de-cuadricula.svg?inline';
import icon_favorites from '@assets/icons/heart2.svg?inline';

import icon_compras from '@assets/icons/icon-compras.svg?inline';

const name = ref(null)
const usermail= ref(null)
   
const isMobile = /Mobi/i.test(navigator.userAgent);
const drawer = ref(isMobile ? false : true)

const me = async () => {
    if(localStorage.getItem('user_data')){
      const userData = localStorage.getItem('user_data')
      const userDataJ = JSON.parse(userData)

      name.value = userDataJ.name + ' ' +(userDataJ.last_name ?? '')
      usermail.value = userDataJ.email
    }
  }

  me()

</script>

<template>
    <VLayout>
        <VNavigationDrawer 
        v-model="drawer"
            class="custom-background"
            app 
            floating
            permanent
        >
            <VList density="compact" nav class="mt-5">
                <VListItem class="items-list" title="Home" value="account" >
                    <template v-slot:prepend>
                            <icon_account style="width: 24px; height: 24px;"></icon_account>
                    </template>
                </VListItem>
                <router-link to="/dashboard" class="link-menu" active-class="active-link">
                    <VListItem class="items-list" style="margin-top: 40px;" title="Mi perfil" value="profile">
                        <template v-slot:prepend>
                            <icon_profile class="icon-profile"></icon_profile>
                        </template>
                    </VListItem>
                </router-link>
                <router-link to="/my-purchases" class="link-menu" active-class="active-link" exact>
                    <VListItem class="items-list" style="margin-top: 16px;" title="Compras" value="Compras">
                        <template v-slot:prepend>
                            <icon_compras style="width: 24px; height: 24px;"></icon_compras>
                        </template>
                    </VListItem>
                </router-link>
                <router-link to="/my-favorites" class="link-menu" active-class="active-link" exact>
                    <VListItem class="items-list" style="margin-top: 16px;" title="Mis Favoritos" value="Mis favoritos">
                        <template v-slot:prepend>
                            <icon_favorites></icon_favorites>
                        </template>
                    </VListItem>
                </router-link>
            </VList>
        </VNavigationDrawer>
        <VMain class="d-flex align-center justify-center" style="min-height: 300px; background-color: #E2F8FC;">

            <router-view/>
           
        </VMain>
    </VLayout>

</template>

<style scoped>

    .container-dashboard {
        padding: 10px 200px;
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
    }

    .items-profile {
        padding: 14px 0px;
    }

    .icon_profile {
        width: 56px;
        height: 74.8px;
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

    .link-menu
    {
        text-decoration: none;
        color: #FFFFFF;
    }

    .items-list::v-deep(.v-list-item-title)
    {
        text-align: left;
        margin-left: 12px;
    }

    .active-link
    {
        color: #FFC549!important;
    }




</style>