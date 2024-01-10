<script setup>

import default_image from '@assets/images/default-image-client.png';
import icon_misdatos from '@assets/icons/icon-misdatos.svg';
import icon_seguridad from '@assets/icons/icon-seguridad.svg';
import icon_card from '@assets/icons/icon-card.svg';
import icon_address from '@assets/icons/icon-address.svg';
import icon_privacity from '@assets/icons/icon-privacity.svg';
import icon_comunications from '@assets/icons/icon-comunications.svg';
import icon_right from '@assets/icons/right-icon.svg';
import icon_profile from '@assets/icons/perfil.svg';
import icon_account from '@assets/icons/lineas-de-cuadricula.svg';
import icon_favorites from '@assets/icons/heart2.svg';

import icon_compras from '@assets/icons/icon-compras.svg';

const name = ref(null)
const usermail= ref(null)

   


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
            class="custom-background"
            app 
            floating
            permanent
        >
            <VList density="compact" nav class="mt-5">
                <VListItem :prepend-avatar="icon_account" title="Home" value="account"></VListItem>
                <router-link to="/dashboard" class="link-menu"><VListItem :prepend-avatar="icon_profile" style="margin-top: 40px;" title="Mi perfil" value="profile"></VListItem></router-link>
                <router-link to="/my-purchases" class="link-menu"><VListItem :prepend-avatar="icon_compras" style="margin-top: 16px;" title="Compras" value="Compras"></VListItem></router-link>
                <router-link to="/my-favorites" class="link-menu"><VListItem :prepend-avatar="icon_favorites" style="margin-top: 16px;" title="Mis Favoritos" value="Mis favoritos"></VListItem></router-link>
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




</style>