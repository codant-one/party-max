<script setup lang="ts">

import { ref } from 'vue'
import { useMiscellaneousStores } from '@/stores/miscellaneous' 
import blogsCard from '@/components/blogs/blogCard.vue'
import blogSearchCard from '@/components/blogs/blogSearchCard.vue'
import Loader from '@/components/common/Loader.vue'

const blogsStores = useMiscellaneousStores()

const blogs = ref([])
const blogsAll = ref([])
const categories = ref([])
const isLoading = ref(true)
const route = useRoute()

const fetchData = async () => {
  isLoading.value = true
  
  let response = await blogsStores.blogsByCategory(route.params.slug)
    
  blogs.value = response.blogs
  blogsAll.value = response.blogsAll
  categories.value = response.categories
  
  isLoading.value = false  
}

fetchData()

</script>

<template>
  <VContainer class="mt-10">
    <Loader :isLoading="isLoading"/>
    <!-- slider -->
    <VRow 
      v-show="blogs.length"
      class="d-flex justify-center"
    >
      <VCol cols="12" md="8">
         <blogsCard
            v-for="blog in blogs.slice(0, 4)"
            :blog="blog"
            :type="1"
         />
      </VCol>

      <VCol cols="12" md="4">
        <blogSearchCard
          :blogs="blogsAll.slice(0, 4)"
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