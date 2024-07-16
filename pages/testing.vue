<script setup>

    import { useTestingStores } from '~/stores/testing'

    const testingStores = useTestingStores()

    const { data: permissions } = await useAsyncData('testingStores', async () => {
      await testingStores.fetchPermissions()

      return testingStores.getPermissions
    })

    useHead({
      title: permissions.value[0]?.name || 'Testing',
      meta: [
        { name: 'description', content: 'Testing description' }
      ]
    })

</script>

<template>
  <div>
    <div>{{ permissions }}</div>
  </div>
</template>
