<script setup>

    import { useTestingStores } from '~/stores/testing'

    const testingStores = useTestingStores()


    const permissions = ref([])

    watchEffect(fetchData)

    async function fetchData() {

        await testingStores.fetchPermissions()
        permissions.value = testingStores.getPermissions
    
    }

</script>

<template>
  {{ permissions }}
</template>
