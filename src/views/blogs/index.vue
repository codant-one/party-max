<script setup lang="ts">

import { ref } from 'vue'
import blogsCard from '@/components/blogs/blogCard.vue'
import blogSearchCard from '@/components/blogs/blogSearchCard.vue'
import { useMiscellaneousStores } from '@/stores/miscellaneous' 

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')
const blogsStores = useMiscellaneousStores()

const blogs = ref([])
const categories = ref([])

const fetchData = async () => {
  let response = await blogsStores.blogs()
    
  blogs.value = response.blogs
  categories.value = response.categories
}

fetchData()

</script>

<template>
  <VContainer class="mt-10">
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