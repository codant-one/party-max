<script setup>
import { ref } from 'vue'

import default_image from '@assets/images/default-image-client.png';
import icon_misdatos from '@assets/icons/icon-misdatos.svg';
import icon_seguridad from '@assets/icons/icon-seguridad.svg';
import icon_card from '@assets/icons/icon-card.svg';
import icon_address from '@assets/icons/icon-address.svg';
import icon_privacity from '@assets/icons/icon-privacity.svg';
import icon_comunications from '@assets/icons/icon-comunications.svg';
import icon_right from '@assets/icons/right-icon.svg';
</script>

<template>

    <VContainer class="mt-10 mb-15">

        <VRow align="center" no-gutters>
            <VCol cols="1">
                <VImg :src="default_image" class="profile-image"/>
            </VCol>
            <VCol cols="11">
                <span class="name-client">Diego Bolivar</span> <br>
                <span class="text-titles">dbolivarv90@gmail.com</span>
            </VCol>
        </VRow>
        <!--Contenido del perfil-->
        <VRow no-gutters>
            <VCol cols="12">
                <VCard class="card-profile">
                    <!--Mis Datos-->
                    <VRow align="center" no-gutters class="items-profile">
                        <VCol cols="12" md="1">
                            <VImg :src="icon_misdatos" class="icon_profile"/>
                        </VCol>
                        <VCol cols="12" md="10">
                            <span class="text-titles">Mis datos</span> <br>
                            <span class="text-subtitles">Valida tus datos.</span>
                        </VCol>
                        <VCol cols="1">
                            <VImg :src="icon_right" class="icon-right"/>
                        </VCol>
                    </VRow>
                    <!--Seguridad-->
                    <VRow align="center" no-gutters class="items-profile">
                        <VCol cols="12" md="1">
                            <VImg :src="icon_seguridad" class="icon_profile"/>
                        </VCol>
                        <VCol cols="12" md="10">
                            <span class="text-titles">Seguridad</span> <br>
                            <span class="text-subtitles">Tienes configuraciones pendientes.</span>
                        </VCol>
                        <VCol cols="1">
                            <VImg :src="icon_right" class="icon-right"/>
                        </VCol>
                    </VRow>
                    <!--Tarjetas-->
                    <VRow align="center" no-gutters class="items-profile">
                        <VCol cols="12" md="1">
                            <VImg :src="icon_card" class="icon_profile"/>
                        </VCol>
                        <VCol cols="12" md="10">
                            <span class="text-titles">Tarjetas</span> <br>
                            <span class="text-subtitles">Tarjetas guardadas en tu cuenta.</span>
                        </VCol>
                        <VCol cols="1">
                            <VImg :src="icon_right" class="icon-right"/>
                        </VCol>
                    </VRow>
                    <!--Direcciones-->
                    <VRow align="center" no-gutters class="items-profile">
                        <VCol cols="12" md="1">
                            <VImg :src="icon_address" class="icon_profile"/>
                        </VCol>
                        <VCol cols="12" md="10">
                            <span class="text-titles">Direcciones</span> <br>
                            <span class="text-subtitles">Direcciones guardadas en tu cuenta.</span>
                        </VCol>
                        <VCol cols="1">
                            <VImg :src="icon_right" class="icon-right"/>
                        </VCol>
                    </VRow>
                    <!--Privacidad-->
                    <VRow align="center" no-gutters class="items-profile">
                        <VCol cols="12" md="1">
                            <VImg :src="icon_privacity" class="icon_profile"/>
                        </VCol>
                        <VCol cols="12" md="10">
                            <span class="text-titles">Privacidad</span> <br>
                            <span class="text-subtitles">Preferencias y control sobre el uso de tus datos.</span>
                        </VCol>
                        <VCol cols="1">
                            <VImg :src="icon_right" class="icon-right"/>
                        </VCol>
                    </VRow>
                    <!--Comunicaciones-->
                    <VRow align="center" no-gutters class="items-profile">
                        <VCol cols="12" md="1">
                            <VImg :src="icon_comunications" class="icon_profile"/>
                        </VCol>
                        <VCol cols="12" md="10">
                            <span class="text-titles">Comunicaciones</span> <br>
                            <span class="text-subtitles">Elige qué tipo de información quieres recibir.</span>
                        </VCol>
                        <VCol cols="1">
                            <VImg :src="icon_right" class="icon-right"/>
                        </VCol>
                    </VRow>
                </VCard>
            </VCol>
        </VRow>

    </VContainer>

</template>

<style scoped>

.profile-image
{
    border-radius: 40px;
    height:80px;
    width:80px;
}

.name-client
{
    color:#0A1B33;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 25px; /* 147.059% */
}
.text-titles
{
    color: #0A1B33;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 133.333% */
}

.text-subtitles
{

    color: var(--Grey-1, #999);
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 120% */
}

.card-profile
{
    padding: 16px 32px;
    margin-top: 24px;
    border-radius: 16px;
}
.items-profile{
    padding: 14px 0px;
}
.icon_profile
{
    width: 56px;
    height: 74.8px;
}

.icon-right
{
    width: 20px;
}
</style>