<script setup>

import { ref } from 'vue'
import { useMiscellaneousStores } from '@/stores/miscellaneous' 
import Card from '@/components/blogs/Card.vue'
import Search from '@/components/blogs/Search.vue'
import Loader from '@/components/common/Loader.vue'

const blogsStores = useMiscellaneousStores()

const blog = ref(null)
const latestBlogs = ref([])
const tags = ref([])
const isLoading = ref(true)
const route = useRoute()

watchEffect(fetchData)

async function fetchData() {
  isLoading.value = true
  
  let response = await blogsStores.getBlog(route.params.slug)
    
  blog.value = response.blog
  latestBlogs.value = response.latestBlogs
  tags.value = response.tags

  isLoading.value = false  
}

</script>

<template>
  <VContainer class="mt-1 mt-md-10">
    <Loader :isLoading="isLoading"/>
    <!-- slider -->
    <VRow class="d-flex justify-center" v-if="blog">
      <VCol cols="12" md="8">
         <Card
            :blog="blog"
            :type="2"
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