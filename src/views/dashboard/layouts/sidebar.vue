<script setup>
import {ref} from 'vue'

import icon_compras from '@assets/icons/icon-compras.svg';
</script>

<template>

    <v-card class="container-sidebar">
        <v-layout>
            <v-navigation-drawer app class="custom-background"
                floating
                permanent
            >
                <v-list
                density="compact"
                nav
                >
                <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="Mi cuenta"></v-list-item>
                <v-list-item prepend-icon="mdi-forum" title="Compras" value="Compras"></v-list-item>
                <v-list-item prepend-icon="mdi-view-dashboard" title="Profile" value="Mi perfil"></v-list-item>
                <v-list-item prepend-icon="mdi-forum" title="Configuracion" value="Configuración"></v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-main style="height: 250px"></v-main>
        </v-layout>
    </v-card>

</template>

<style scoped>

.container-sidebar
{
    padding: 40px 5px;
}

.custom-background
{
    background-color:#0A1B33;
    color: #FFFFFF;
    
}

.custom-background .v-list-item-title
{

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18.2px;
}


</style>