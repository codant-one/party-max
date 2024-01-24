<script setup>

import profile from '@assets/icons/icon-perfil-white.svg?inline';
import home from '@assets/icons/lineas-de-cuadricula.svg?inline';
import favorites from '@assets/icons/heart2.svg?inline';
import purchases from '@assets/icons/icon-compras.svg?inline';

const name = ref(null)
const usermail = ref(null)
   
const isMobile = /Mobi/i.test(navigator.userAgent)
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
                <router-link :to="{ name: 'dashboard' }" class="link-menu" exact>
                    <VListItem 
                        :class="{ 'v-list-item--active': ($route.name === 'dashboard') }"
                        class="items-list" title="Home" value="dashboard" >
                        <template v-slot:prepend>
                            <home style="width: 24px; height: 24px;"></home>
                        </template>
                    </VListItem>
                </router-link>
                <router-link :to="{ name: 'profile' }" class="link-menu" exact>
                    <VListItem 
                        :class="{ 'v-list-item--active': $route.name === 'profile' }"
                        class="items-list" style="margin-top: 40px;" title="Mi perfil" value="profile">
                        <template v-slot:prepend>
                            <profile class="icon-profile"></profile>
                        </template>
                    </VListItem>
                </router-link>
                <router-link :to="{ name: 'purchases' }" class="link-menu" exact>
                    <VListItem 
                        :class="{ 'v-list-item--active': $route.name === 'purchases' }"
                        class="items-list" style="margin-top: 16px;" title="Compras" value="purchases">
                        <template v-slot:prepend>
                            <purchases style="width: 24px; height: 24px;"></purchases>
                        </template>
                    </VListItem>
                </router-link>
                <router-link :to="{ name: 'favorites' }" class="link-menu" exact>
                    <VListItem 
                        :class="{ 'v-list-item--active': $route.name === 'favorites' }"
                        class="items-list" style="margin-top: 16px;" title="Mis Favoritos" value="favorites">
                        <template v-slot:prepend>
                            <favorites></favorites>
                        </template>
                    </VListItem>
                </router-link>
            </VList>
        </VNavigationDrawer>
        <VMain style="min-height: 750px; background-color: #E2F8FC;">
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

    .text-menu {
        color: #FFFFFF;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin: 0;    
    }

    .link-menu {
        text-decoration: none;
        color: #FFFFFF;
    }

    .items-list::v-deep(.v-list-item-title) {
        text-align: left;
        margin-left: 12px;
    }

    .router-link-exact-active {
        color: #FFC549!important;
    }

    .router-link-exact-active::v-deep(path) {
        stroke: #FFC549 !important;
    }

    .v-list-item--nav {
        padding-inline: 15px !important
    }

    .v-list-item--active::v-deep(.v-list-item__overlay) {
        opacity: 0 !important;
    }
</style>