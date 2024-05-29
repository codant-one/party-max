<script setup>

import festin_2 from '@/assets/images/festin_2.png'

const items = [
  'Ha leído y comprendido estos términos y acepta cumplir con ellos.',
  'Es mayor de edad y tiene capacidad legal para celebrar contratos vinculantes.',
  'Tiene la autoridad necesaria para aceptar estos términos, ya sea en nombre personal o en representación de una entidad legal.',
  'Si no está de acuerdo con estos términos, no debe acceder ni utilizar Partymax Marketplace.'
]

</script>

<template>
  <VContainer class="content py-13 w-100">
    <VRow align="center" no-gutters>
      <VCol cols="12" md="12">
        <h1 class="tw-text-primary title text-center">
            Términos y condiciones de PARTYMAX
        </h1>
        <h2 class="tw-text-primary text-center">¡Todo lo que necesitas saber sobre la letra pequeña!</h2>
      </VCol>
      <VCol cols="12" md="2" class="align-right mt-10">
        <v-img
          class="bg-white align-imagel"
          width="auto"
          :src="festin_2"
        />
      </VCol>
      <VCol cols="12" md="10" class="align-left text pl-5">
        <span class="mb-2">Bienvenido a <strong class="tw-text-primary">Partymax</strong> Marketplace!.</span><br>
        <span>
            el espacio ideal para amantes de las fiestas que buscan la máxima variedad y 
            calidad en productos para celebrar. Estamos comprometidos con la creación de un ambiente seguro, 
            eficiente y amigable para que tanto clientes como proveedores puedan interactuar y 
            realizar transacciones. <br>        
        </span>
        </VCol>
        <VCol cols="12" md="12" class="align-left text pl-5">
        <span class="mb-2">
            <strong>1. Aceptación de los términos</strong><br>
            Al utilizar los servicios de <strong class="tw-text-primary">Partymax</strong> Marketplace, 
            incluidos nuestro sitio web, aplicaciones y cualquier servicio asociado, usted acepta estar 
            vinculado por estos términos y condiciones. Estos términos rigen su acceso y uso de 
            <strong class="tw-text-primary">Partymax</strong> Marketplace y constituyen un acuerdo legal entre usted y 
            <strong class="tw-text-primary">Partymax</strong>.<br>

            Usted declara que:<br>
            
            <VList >
                <VListItem
                    v-for="(item, index) in items"
                    :key="index"
                    class="items-list">
                    <template #prepend>
                        <VIcon icon="mdi-auto-fix" />
                    </template>
                    <VListItemTitle>
                        {{ item }}
                    </VListItemTitle>
                </VListItem>
            </VList><br>

            <strong>2. Uso de nuestro Marketplace</strong><br>

            <strong class="tw-text-primary">Partymax</strong> Marketplace es una plataforma que permite a los vendedores 
            externos ofrecer y vender sus productos. Cada vendedor es responsable de asegurar que sus productos cumplan 
            con nuestras políticas de calidad y legalidad. <strong class="tw-text-primary">Partymax</strong> no se hace 
            responsable de la exactitud, calidad, seguridad o legalidad de los productos ofrecidos.<br><br>

            <strong>3. Cuentas de Usuario</strong><br>

            Para acceder a determinadas funciones de nuestro marketplace, puede ser necesario crear una cuenta.
            Es responsabilidad del usuario mantener la confidencialidad de su contraseña y de toda la actividad 
            que ocurra en su cuenta. <strong class="tw-text-primary">Partymax</strong> no es responsable de cualquier 
            pérdida o daño resultante de su incumplimiento en la seguridad de su cuenta.<br><br>

            <strong>4. Modificaciones a los términos</strong><br>

            <strong class="tw-text-primary">Partymax</strong> se reserva el derecho de modificar estos términos en 
            cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en nuestro 
            sitio. Su uso continuado de nuestros servicios indica su aceptación de los términos modificados.<br><br>

            <strong>5. Contacto</strong><br>

            Si tiene alguna pregunta o inquietud sobre estos términos, por favor contáctenos o verifica  
            <router-link
                :to="{ name: 'help' }"
                class="tw-text-primary tw-no-underline hover:tw-text-secondary">
                Preguntas Frecuentes.
            </router-link><br><br>

            Agradecemos su elección de <strong class="tw-text-primary">Partymax</strong> Marketplace para 
            celebrar sus momentos especiales. Estamos aquí para asegurar que su experiencia sea tan emocionante 
            y satisfactoria como la fiesta misma.
        </span>
      </VCol>
    </VRow>    
  </VContainer>
</template>

<style scoped>
    .title {
        font-size: 60px;
        font-style: normal;
        font-weight: 700;
        line-height: 63px;
        text-align: center;
    }

    .text {
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 38px;
        text-align: left;
        color: #0A1B33;
        margin-top: 40px;
    }

    .items-list::v-deep(.v-list-item-title) {
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 38px;
        text-align: left;
        color: #0A1B33;
        white-space: pre-wrap;
    }

    .align-imagel {
        float: left;
    }

    @media only screen and (max-width: 767px) {
        .title {
            font-size: 24px;
            line-height: 32px;
            text-align: center;
            margin-top: 24px;
        }

        .text {
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px; /* 150% */
        }
    }
</style>