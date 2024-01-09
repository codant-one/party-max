<script setup>

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const props = defineProps({
    blog: {
        type: Object,
        required: true
    }, 
    type: {
        type: Number,
        required: true
    }
});

const id = ref(null)
const name = ref(null)
const title = ref(null)
const description = ref(null)
const image = ref(null)
const user = ref(null)
const slug = ref(null)
const dateBlog = ref(null)
const paragraphs = ref(null)

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')

watchEffect(() => {

    if (!(Object.entries(props.blog).length === 0) && props.blog.constructor === Object) {
        id.value = props.blog.id
        name.value = props.blog.name
        title.value = props.blog.title
        description.value = props.blog.description
        image.value = props.blog.image
        user.value = props.blog.user.name + ' ' + (props.blog.user.last_name ?? '')
        slug.value = props.blog.slug
        dateBlog.value = props.blog.date

        var blogContent = description.value; 

        if (props.type == 1 && typeof blogContent == 'string' )
        {
            if ( blogContent.includes("<p>") ){
                blogContent = blogContent.replace(/<p>/g, "");
                blogContent = blogContent.split("</p>");
            } else if( blogContent.includes('\n') ) {
                blogContent = blogContent.split('\n');
            } else {
                blogContent = blogContent.split(".");
            }
            paragraphs.value = blogContent[0];
        } else {
            paragraphs.value = description.value;
        }
    }
})

// const firstParagraph = async() => {
//   const blogContent = description.value;
//   if (typeof blogContent == 'string' )
//   {
//     if ( blogContent.includes("<p>") ){
//         blogContent = blogContent.replace(/<p>/g, "");
//         blogContent.value = blogContent.split("</p>");
//     } else if( blogContent.includes("\n") ) {
//         blogContent.value = blogContent.split("\n");
//     } else {
//         blogContent.value = blogContent.split(".");
//     }
//     paragraphs.value = blogContent.value[0];
//   }
// }

</script>

<template>
    <VCard class="text-justify card-header mb-6 pb-2 card-information no-shadown">
        <VCardItem class="p-0">
            <VImg
                class="img-style"
                :src="baseURL + image"
            />
        </VCardItem>

        <VCardSubtitle class="text-justify subtitle-text my-6 px-0">
            <VIcon size="20px" icon="mdi-account-outline" class="subtitle-text"></VIcon> by {{ user }} 
            <VIcon size="20px" :end=true icon="mdi-clock-outline" class="subtitle-text"></VIcon>
            {{  format(dateBlog, 'MMMM d, yyyy', { locale: es }).replace(/(^|\s)\S/g, (char) => char.toUpperCase()) }}
        </VCardSubtitle>

        <VCardTitle class="text-justify title-text px-0 pt-0">
            {{ title }}
        </VCardTitle>

        <VCardText class="text-justify description-text px-0">
            {{ paragraphs }}
        </VCardText>

        <router-link 
            :to="{
                name: 'blogDetail',
                params: {
                    slug: slug
                }
            }"
        >
            <VBtn
                variant="plain"
                append-icon="mdi-arrow-right"
                color="#0A1B33"
                text="Leer más"
                class="text-none text-justify description-text px-0 mb-2 tw-text-tertiary hover:tw-text-primary"
            
            />
        </router-link>
    </VCard>
</template>

<style scoped>
    .title-text {
        color:  #FF0090!important;
        font-size: 36px;
        font-style: normal;
        font-weight: 600;
        line-height: 43.488px;
        word-wrap: break-word;
        white-space: inherit;
    }

    .description-text{
        color: var(--Maastricht-Blue, #0A1B33);
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 28px;
    }

    .subtitle-text{
        color: var(--Grey-1, #999);
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 26px;
    }

    .card-information {
        padding: 24px;
        border-radius: 16px;
    }

    .img-style {
        border-radius: 16px;
    }

    @media only screen and (max-width: 767px)
    {
        .title-text
        {
            font-size: 20px;
        }
        .description-text
        {        
            font-size: 14px;
            line-height: 24px; /* 171.429% */
        }

        .subtitle-text
        {
            font-size: 14px;
            line-height: 16px; /* 114.286% */
        }
    }
</style>