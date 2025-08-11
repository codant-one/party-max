<script setup>

import Loading from 'vue3-loading-overlay';

const props = defineProps({
    isLoading: {
        type: Boolean,
        required: true
    }
})

const fullPage = ref(true);
const color = ref('#FF0090')
const loader = ref('Bars')

</script>

<template>
    <ClientOnly>
    <Loading 
        :active="isLoading" 
        :can-cancel="true" 
        :is-full-page="fullPage"
        :color="color"
        :loader="loader"
        :height="80"
        :width="80"
        role="status">
 
    </Loading>
    </ClientOnly>
</template>
