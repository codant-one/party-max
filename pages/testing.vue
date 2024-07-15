<script setup>

    import { useTestingStores } from '~/stores/testing'

    const testingStores = useTestingStores()

    const permissions = ref([])

    const { status, data } = await useLazyAsyncData('testingStores', async () => {
      await testingStores.fetchPermissions()

      return testingStores.getPermissions
    })

    watch(data, (value) => {
      permissions.value = value
      console.log('permissions', value)
    })

</script>

<template>
  <div>
    <Head>
      <Title>{{ data[0].name }}</Title>
    </Head>
    <div>{{ permissions }}</div>
  </div>
</template>
