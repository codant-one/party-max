<script setup>

import { ref } from 'vue'
import { useMiscellaneousStores } from '@/stores/miscellaneous' 
import Card from '@/components/blogs/Card.vue'
import Search from '@/components/blogs/Search.vue'
import Loader from '@/components/common/Loader.vue'

const blogsStores = useMiscellaneousStores()
const route = useRoute()

const blogs = ref([])
const tags = ref([])
const latestBlogs = ref([])
const isLoading = ref(true)

watchEffect(fetchData)

async function fetchData() {
  isLoading.value = true

  let data = {
    tag: route.query.tag ?? null,
    search: route.query.search ?? null,
  }
  
  let response = await blogsStores.blogs(data)
    
  blogs.value = response.blogs
  tags.value = response.tags
  latestBlogs.value = response.latestBlogs
  
  isLoading.value = false  
}

</script>

<template>
  <VContainer class="mt-1 mt-md-10">
    <Loader :isLoading="isLoading"/>
    <VRow 
      v-show="blogs.length"
      class="d-flex justify-center"
    >
      <VCol cols="12" md="8">
         <Card
            v-for="blog in blogs"
            :blog="blog"
            :type="1"
         />
      </VCol>

      <VCol cols="12" md="4">
        <Search
          :blogs="latestBlogs"
          :tags="tags"
        />   
      </VCol>
    </VRow> 
  </VContainer>
</template>

<style scoped>
  .bg-image {
    background-image: url()
  }

</style>