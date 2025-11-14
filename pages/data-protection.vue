<script setup>

import partymax_logo from '@assets/images/logo.svg';

useHead({
  title: 'Protección de Datos Personales | Partymax',
  meta: [
    { hid: 'description', name: 'description', content: 'En Partymax, estamos comprometidos en proteger la privacidad y seguridad de sus datos personales. Lea nuestra política de protección de datos para más información.' },
    { name: 'robots', content: 'noindex, follow' },
    { name: 'description', content: 'En Partymax, estamos comprometidos en proteger la privacidad y seguridad de sus datos personales. Lea nuestra política de protección de datos para más información.' },
    { property: 'og:title', content: 'Protección de Datos Personales | Partymax' },
    { property: 'og:description', content: 'En Partymax, estamos comprometidos en proteger la privacidad y seguridad de sus datos personales. Lea nuestra política de protección de datos para más información.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://partymax.co/data-protection' },
    { property: 'og:image', content: partymax_logo },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Protección de Datos Personales | Partymax' },
    { name: 'twitter:description', content: 'En Partymax, estamos comprometidos en proteger la privacidad y seguridad de sus datos personales. Lea nuestra política de protección de datos para más información.' },
    { name: 'twitter:image', content: partymax_logo }
  ]
})

</script>

<template>
    <VContainer class="content py-md-13 w-100">
        <VRow align="center" no-gutters>
            <VCol cols="12" md="12">
                <section id="dp-content" class="">
                    <h1 class="tw-text-primary title text-center mt-10 mb-10">
                        Marco Legal Sobre Protección de Datos Personales
                    </h1>

                    <h2 class="subtitle tw-mt-[100px] mb-4">1. Introducción</h2>
                    <p class="text mt-2">
                        El presente documento tiene como finalidad establecer los lineamientos legales para el tratamiento de datos personales dentro del Marketplace, conforme a la normatividad colombiana vigente en materia de protección de datos. 
                    </p>
                    <p class="text mt-2">
                        El Marketplace se compromete a garantizar la seguridad, confidencialidad y uso adecuado de los datos personales recolectados de sus usuarios, proveedores y aliados comerciales, en estricto cumplimiento de la legislación aplicable.
                    </p>

                    <h2 class="subtitle mt-10 mb-4">2. Normativa Aplicable</h2>
                    <p class="text tw-pl-7"><strong>2.1 Ley 1581 de 2012 – Régimen General de Protección de Datos Personales</strong></p>
                    <p class="text tw-pl-7">Esta ley establece el marco normativo para la protección de datos personales en Colombia. Dentro de sus disposiciones más relevantes para el marketplace, se encuentran:</p>
                    <div class="tw-pl-7">
                        <ul class="tw-pl-10">
                            <li class="text mt-1"><strong>Autorización previa:</strong> El tratamiento de datos personales debe contar con el consentimiento previo, expreso e informado del titular.</li>
                            <li class="text mt-1"><strong>Principios rectores:</strong> Legalidad, finalidad, libertad, veracidad, transparencia, acceso y circulación restringida, seguridad y confidencialidad. </li>
                            <li class="text mt-1"><strong>Derechos de los titulares:</strong> Conocer, actualizar, rectificar y suprimir sus datos personales.</li>
                            <li class="text mt-1"><strong>Obligaciones del responsable y encargado del tratamiento:</strong> Garantizar la seguridad y confidencialidad de los datos personales, además de implementar medidas de protección adecuadas.</li>
                        </ul>
                    </div>

                    <p class="text tw-pl-7"><strong>2.2 Decreto 1377 de 2013 – Reglamentación de la Ley 1581 de 2012</strong></p>
                    <p class="text tw-pl-7">Este decreto complementa la <strong>Ley 1581 de 2012</strong> e impone obligaciones adicionales a las empresas que manejan datos personales. Aspectos clave:</p>
                    <div class="tw-pl-7">
                        <ul class="tw-pl-10">
                            <li class="text mt-1"><strong>Política de tratamiento de datos:</strong> El Marketplace debe contar con una política clara y accesible sobre la recolección, uso y almacenamiento de datos personales.</li>
                            <li class="text mt-1"><strong>Aviso de privacidad:</strong> Se debe informar a los usuarios sobre la existencia de la política de tratamiento de datos y cómo ejercer sus derechos.</li>
                            <li class="text mt-1"><strong>Transferencia de datos a terceros:</strong> En caso de compartir información con aliados estratégicos o proveedores de servicios, se deben establecer contratos con cláusulas de confidencialidad y protección de datos.</li>
                        </ul>
                    </div>

                    <p class="text tw-pl-7"><strong>2.3 Ley 1266 de 2008 – Protección de Datos Financieros</strong></p>
                    <p class="text tw-pl-7">Si el Marketplace maneja información financiera o crediticia de los usuarios, debe cumplir con esta ley, que regula el tratamiento de datos de carácter financiero y comercial, garantizando la transparencia y el acceso de los titulares a su información.</p>

                    <p class="text tw-pl-7"><strong>2.4 Ley 1273 de 2009 – Delitos Informáticos.</strong></p>
                    <p class="text tw-pl-7">Para proteger la integridad de los datos personales y evitar fraudes electrónicos, el Marketplace debe implementar medidas de seguridad que prevengan delitos como:</p>
                    <div class="tw-pl-7">
                        <ul class="tw-pl-10">
                            <li class="text mt-1">Acceso abusivo a sistemas informáticos.</li>
                            <li class="text mt-1">Hurto y uso indebido de información personal.</li>
                            <li class="text mt-1">Suplantación de identidad y fraudes electrónicos.</li>
                        </ul>
                    </div>
                    <p class="text tw-pl-7"><strong>2.5 Ley 2300 de 2023 – Regulación de Contacto con Usuarios</strong></p>
                    <p class="text tw-pl-7">Esta ley establece que las empresas solo pueden contactar a los usuarios con su consentimiento expreso, limitando el uso de datos para estrategias comerciales o publicitarias sin autorización previa.</p>

                    <h2 class="subtitle mt-10 mb-4">3. Implementación en el Marketplace</h2>
                    <p class="text mt-2">
                        Para garantizar el cumplimiento de la normatividad, el Marketplace adoptará las siguientes medidas:
                    </p>
                    <ul class="tw-pl-10">
                        <li class="text mt-1"><strong>Política de Privacidad y Tratamiento de Datos:</strong> Publicación de un documento accesible a los usuarios explicando cómo se manejarán sus datos personales.</li>
                        <li class="text mt-1"><strong>Consentimiento Expreso:</strong> Implementación de un sistema de aceptación de términos y condiciones al momento del registro.</li>
                        <li class="text mt-1"><strong>Derechos de los Titulares:</strong> Creación de un canal de atención para que los usuarios puedan ejercer sus derechos de acceso, actualización, rectificación y supresión de sus datos.</li>
                        <li class="text mt-1"><strong>Seguridad de la Información:</strong> Implementación de protocolos de encriptación, acceso restringido a la información y auditorías periódicas para prevenir vulneraciones de datos.</li>
                        <li class="text mt-1"><strong>Acuerdos con Terceros:</strong> Todo proveedor de servicios que tenga acceso a datos personales deberá firmar contratos que garanticen el cumplimiento de la normativa de protección de datos.</li>
                    </ul>

                    <h2 class="subtitle mt-10 mb-4">4. Responsabilidad y Sanciones</h2>
                    <p class="text mt-2">
                        El incumplimiento de las normativas de protección de datos puede generar sanciones económicas y legales impuestas por la Superintendencia de Industria y Comercio (SIC). Para evitarlo, el Marketplace se compromete a realizar auditorías periódicas y a actualizar sus políticas conforme a cambios en la legislación.
                    </p>

                    <h2 class="subtitle mt-10 mb-4">5. Conclusión</h2>
                    <p class="text mt-2">
                        El cumplimiento de la normatividad de protección de datos personales en Colombia es fundamental para garantizar la confianza de los usuarios y la legalidad del Marketplace. Este documento servirá como base para establecer una política clara y transparente en el tratamiento de la información personal de clientes, proveedores y aliados estratégicos.
                    </p>

                    <p class="text tw-uppercase mt-10">
                        <strong>Este marco legal se desarrolla en el manual de proteccion de datos inscrito ante la SIC.</strong>
                    </p>

                </section>
            </VCol>
        </VRow>
    </VContainer>
</template>

<style scoped>
    #dp-content h1, #dp-content h2, #dp-content h3, #dp-content strong {
        font-family: 'Poppins', sans-serif;
    }
    .title {
        font-size: 45px;
        font-style: normal;
        font-weight: 900;
        line-height: 48px;
        text-align: center;
    }

    .subtitle {
        font-family: 'Poppins', sans-serif;
        font-size: 26px;
        font-style: normal;
        font-weight: 700;
        line-height: 30px;
        color: #777;
    }

    .text {
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        text-align: justify;
        color: #0A1B33;
    }

    .items-list::v-deep(.v-list-item-title),  .list-1::v-deep(.v-list-item-title){
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 38px;
        text-align: left;
        color: #0A1B33;
        white-space: pre-wrap;
    }

    .items-list::v-deep(.v-list-item-subtitle), .list-1::v-deep(.v-list-item-subtitle){
        white-space: pre-wrap;
        -webkit-box-orient: unset !important;
    }

    .items-list::v-deep(.v-list-item__prepend) {
        width: 15px;
    }

    .align-imagel {
        float: left;
    }

    @media only screen and (max-width: 767px) {
        .title {
            font-size: 24px;
            line-height: 32px;
            /* text-align: center; */
        }

        .subtitle {
            font-size: 22px;
            line-height: 26px;
        }

        .text {
            /* text-align: center; */
            font-size: 16px;
            font-weight: 400;
            line-height: 24px; /* 150% */
        }

        .v-list::v-deep(.v-list-item-title) {
            font-size: 16px;
            line-height: 20px;
        }

        .v-list::v-deep(.v-list-item-subtitle) {
            text-align: justify;
        }
    }
</style>