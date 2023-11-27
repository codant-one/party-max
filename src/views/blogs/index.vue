<script setup lang="ts">
// import { ref } from 'vue'
import blogsCard from '@/components/blogs/blogCard.vue'
import { useMiscellaneousStores } from '@/stores/miscellaneous' 
import bg from '@assets/images/blogs.jpg';

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')
const backgroundStyle = ref({})
const blogsStores = useMiscellaneousStores()

const blogs = ref([])

const fetchData = async () => {
    let response = await blogsStores.blogs()
    blogs.value = response.blogs
}

fetchData()

backgroundStyle.value = {
    backgroundImage: `url(${bg})`,
    backgroundRepeat: 'repeat'
  }

</script>

<template>
 

  <VContainer 
    class="content py-13 text-center w-100" 
    :style="backgroundStyle"
    fluid=true
  >
   
    <VRow
      class="d-flex justify-center"
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
        cols="3"
      >
        TAL
      </VCol>
    </VRow>
    
  </VContainer>
</template>

<style scoped>
  .bg-image {
      background-image: url()
    }
</style>