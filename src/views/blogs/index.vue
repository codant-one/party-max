<script setup lang="ts">
// import { ref } from 'vue'
import blogsCard from '@/components/blogs/blogCard.vue'
import { useMiscellaneousStores } from '@/stores/miscellaneous' 


const blogsStores = useMiscellaneousStores()

const blogs = ref([])

const fetchData = async () => {
    let response = await blogsStores.blogs()
    blogs.value = response.blogs
}

fetchData()


</script>

<template>
 

  <VContainer class="content py-13 text-center w-100">
   
   <blogsCard
    v-for="blog in blogs.slice(0, 3)"
    :id="blog.id"
    :title="blog.title"
    :description="blog.description"
    :image="blog.image"
    :user="blog.user.name"
    :date="blog.date"
   >
   </blogsCard>
    
  </VContainer>
</template>