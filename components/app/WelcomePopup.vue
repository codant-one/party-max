<script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import popupImage from '@assets/images/discount-desktop.webp';
import popupImageMobile from '@assets/images/discount-mobile.webp';

const show = ref(false)
const router = useRouter()
const { isMobile } = useDevice();

onMounted(() => {
  const shown = localStorage.getItem('welcome_popup_shown')
  if (!shown) {
    show.value = true
    localStorage.setItem('welcome_popup_shown', 'true')
  }
})

function goToRegister() {
  show.value = false
  router.push('/register/form_client')
}
</script>

<template>
    <VDialog v-model="show" max-width="600" transition="dialog-top-transition" role="dialog" id="welcome" title="Welcome">
        <VCard class="tw-relative p-0 card-welcome">
        <VCardText class="p-0 line">
            <img 
                fetchpriority=high 
                :src="isMobile ? popupImageMobile : popupImage" 
                alt="discount" 
                class="w-100 h-100" 
                width="546" 
                height="621"
            />
        </VCardText>
        <div class="tw-absolute tw-bottom-4 tw-right-0 tw-z-10">
            <VBtn 
                variant="flat"
                width="auto"
                :height="isMobile ? 32 : 48"
                class="btn-register tw-text-white tw-bg-primary button-hover me-3"
                @click="goToRegister"
            >
                Registrarse
            </VBtn>
        </div>
    </VCard>
  </VDialog>
</template>

<style scoped>

    .line {
        line-height: 0 !important;
    }

    .card-welcome {
        border-radius: 16px!important;
    }

    .button-hover:hover {
        background-color: #FF27B3 !important;
        box-shadow: 0px 0px 24px 0px #FF27B3;
    }

    .btn-register {
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 14px;
        border-radius: 32px;
    }

    @media only screen and (max-width: 767px) {
        .btn-register {
            font-size: 12px;
            font-weight: 600;
            line-height: 8px;
        }
    }

</style>

