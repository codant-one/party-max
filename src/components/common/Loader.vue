<script setup>

import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

const props = defineProps({
    isLoading: {
        type: Boolean,
        required: true
    }
})

const fullPage = ref(true);
const color = ref('#FF0090')
const loader = ref('Bars')
console.log('lalala')
</script>

<template>
    <Loading :active="isLoading" 
      :can-cancel="true" 
      :is-full-page="fullPage"
      :color="color"
      :loader="loader"
      :height="80"
      :width="80" />
</template>
