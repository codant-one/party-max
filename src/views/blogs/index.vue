<script setup lang="ts">

import { ref } from 'vue'
import { useMiscellaneousStores } from '@/stores/miscellaneous' 
import blogsCard from '@/components/blogs/blogCard.vue'
import blogSearchCard from '@/components/blogs/blogSearchCard.vue'
import Loader from '@/components/common/Loader.vue'

const blogsStores = useMiscellaneousStores()

const blogs = ref([])
const categories = ref([])
const isLoading = ref(true)

const fetchData = async () => {
  isLoading.value = true
  
  let response = await blogsStores.blogs()
    
  blogs.value = response.blogs
  categories.value = response.categories
  
  isLoading.value = false  
}

fetchData()

</script>

<template>
  <VContainer class="mt-10">
    <Loader :isLoading="isLoading"/>
    <!-- slider -->
    <VRow class="d-flex justify-center">
      <VCol cols="7" >
         <blogsCard
            v-for="blog in blogs.slice(0, 3)"
            :blog="blog"
         />
      </VCol>

      <VCol cols="5" >
        <blogSearchCard
          :blogs="blogs.slice(0, 4)"
          :categories="categories"
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