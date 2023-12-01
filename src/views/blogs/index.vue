<script setup lang="ts">

import { ref } from 'vue'
import blogsCard from '@/components/blogs/blogCard.vue'
import blogSearchCard from '@/components/blogs/blogSearchCard.vue'
import { useMiscellaneousStores } from '@/stores/miscellaneous' 
import bg from '@assets/images/blogs.jpg';

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')
const backgroundStyle = ref({})
const blogsStores = useMiscellaneousStores()

const blogs = ref([])
const categories = ref([])

const fetchData = async () => {
    let response = await blogsStores.blogs()
    blogs.value = response.blogs
    categories.value = response.categories
}

fetchData()

backgroundStyle.value = {
    backgroundImage: `url(${bg})`,
    backgroundRepeat: 'repeat'
  }

</script>

<template>
 

  <VContainer 
    :fluid=true
    class="content py-0 my-0 text-center w-100" 
    :style="backgroundStyle"
  >
   
    <VRow
      class="d-flex justify-center py-16 px-16"
    >
      <VCol
        cols="7"
      >
         <blogsCard
            v-for="blog in blogs.slice(0, 3)"
            :id="blog.id"
            :title="blog.title"
            :description="blog.description"
            :image="baseURL + blog.image"
            :user="blog.user.name"
            :date="blog.date"
         >
         </blogsCard>
      </VCol>

      <VCol
        cols="5"
      >
        <blogSearchCard
          :blogs="blogs.slice(0, 4)"
          :categories="categories"
         >
         </blogSearchCard>
      </VCol>
    </VRow>
    
  </VContainer>
</template>

<style scoped>
  .bg-image {
      background-image: url()
    }
</style>