<script setup>

import mayorista_1 from '@assets/images/mayoristas1.png';
import mayorista_2 from '@assets/images/mayoristas2.png';
import arrow_right from '@assets/icons/arrow_right_dark.svg?inline';

</script>

<template>

    <VContainer class="mt-1 mt-md-10">
        <h1 class="tw-text-primary text-title text-center">Proveedores oficiales en PartyMax</h1>
        <p class="tw-text-tertiary text-center text-subtitle mt-3 pb-3">Consigue los mejores precios del mercado</p>

        <VRow class="row-list">
            
            <VCol cols="12" class="col-main">
                <h2 class="letter tw-text-tertiary">A</h2>
                <VRow align="center" class="mt-5">
                    <VCol cols="12" md="3">
                        <VImg :src="mayorista_1" class="img-style"/>
                    </VCol>
                    <VCol cols="12" md="7" class="align-items-center justify-content-center d-flex">
                        <p><span class="tw-text-tertiary text-store">A - Tienda 01</span> <br>
                        <span class="tw-text-tertiary text-sales">145  Ordenes</span> <br>
                        <p class="tw-text-gray text-description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vehicula velit quam, 
                            ac tincidunt eros accumsan vel. Nulla a nisl malesuada, congue nisl vitae, 
                            ultricies libero. Orci varius natoque penatibus et magnis dis parturient montes, 
                            nascetur ridiculus mus. Nullam euismod at quam nec hendrerit.
                        </p>
                        </p>
                    </VCol>
                    <VCol cols="12" md="2">
                        <router-link to="/products" class="d-flex my-6 tw-no-underline tw-text-tertiary hover:tw-text-primary hover-icon-arrow-right justify-content-center" style="margin: auto;">
                            
                            <span class="ms-5">Conocer más</span>
                            <arrow_right class="ms-2" />
                            
                        </router-link>
                    </VCol>
                </VRow>

            </VCol>
        </VRow>
    </VContainer>

</template>

<style scoped>

.hover-icon-arrow-right:hover::v-deep(path) {
        fill: #FF0090;
    }
.text-title
{

    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 75% */

}


.text-subtitle
{ 
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 100% */
}

.row-list
{
    padding:30px 80px;
}

.col-main
{
    border-top: 1px solid var(--Maastricht-Blue, #0A1B33);
}

.img-style
{
    width: 173.96px;
    height: 173.96px;
    max-width: 173.96px;
    border-radius: 16px;
    border: 1px solid var(--Light-Cyan-1, #E2F8FC);
}

.letter
{
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 80% */
    padding:16px;
}

.text-store
{
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 100% */
}

.text-sales
{
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 8px; /* 57.143% */
}

.text-description
{
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 19.6px; /* 140% */
    width: 265px;
    margin-top: 24px;
    
}

@media only screen and (max-width: 767px) 
{

    .text-title
    {
        font-size: 24px;
    }

    .text-subtitle
    {
        font-size: 14px;
    }

    .row-list
    {
        padding:20px 10px;
    }

}
</style>