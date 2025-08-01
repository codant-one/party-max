<script setup>

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRuntimeConfig } from '#app'

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
const tags = ref(null)

const config = useRuntimeConfig()
const baseURL = ref(config.public.APP_DOMAIN_API_URL + '/storage/')
const { isMobile } = useDevice();

const searchWhatsapp = ref(null)
const searchFacebook = ref(null)
const searchTwitter = ref(null)
const searchPinterest = ref(null)

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
        tags.value = props.blog.tags

        searchWhatsapp.value = `https://wa.me/?text=${import.meta.env.VITE_MY_DOMAIN}/blogs/${props.blog.slug}`
        searchFacebook.value = `https://www.facebook.com/sharer/sharer.php?u=${import.meta.env.VITE_MY_DOMAIN}/blogs/${props.blog.slug}`
        searchTwitter.value = `https://twitter.com/intent/tweet?text=https://${import.meta.env.VITE_MY_DOMAIN}/blogs/${props.blog.slug}`
        searchPinterest.value = `https://pinterest.com/pin/create/button/?url=&media=https://${import.meta.env.VITE_MY_DOMAIN}/blogs/${props.blog.slug}`

        var blogContent = description.value; 

        if (props.type == 1 && typeof blogContent == 'string' ) {
            if ( blogContent.includes("<p>") ) {
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

</script>

<template>
    <VCard class="text-justify card-header mb-6 pb-2 card-information no-shadown">
        <VCardItem class="p-0">
            <NuxtLink
                v-if="props.type == 1"
                :to="{
                    name: 'blogs-slug',
                    params: { slug: slug },
                    replace:true
                }"
                class="tw-no-underline"
            >
                <img class="img-style" :src="baseURL + image" />
            </NuxtLink>
            <img v-else class="img-style" :src="baseURL + image" />
        </VCardItem>

        <VCardSubtitle class="text-justify subtitle-text my-2 my-md-6 px-0 d-block d-md-flex">
            <div>
                <VIcon size="20px" icon="mdi-account-outline" class="subtitle-text" /> 
                {{ user }} 
            </div>
            <div>  
                <VIcon size="20px" :end="!isMobile" icon="mdi-clock-outline" class="subtitle-text" />
                {{  format(dateBlog, 'MMMM d, yyyy', { locale: es }).replace(/(^|\s)\S/g, (char) => char.toUpperCase()) }}
            </div>
        </VCardSubtitle>

        <VCardTitle class="px-0 pt-0 title-text">
            <NuxtLink 
                v-if="props.type == 1"
                :to="{
                    name: 'blogs-slug',
                    params: { slug: slug },
                    replace:true
                }"
                class="text-justify tw-no-underline"
            >
                <span class="tw-text-primary hover:tw-text-secondary"> {{ title }} </span>
            </NuxtLink>
            <span v-else class="text-justify tw-text-primary"> {{ title }} </span>
        </VCardTitle>

        <VCardText class="text-justify description-text py-1 py-md-5 px-0 content-blog">
            <div v-html="paragraphs"></div>
        </VCardText>

        <NuxtLink 
            v-if="props.type == 1"
            :to="{
                name: 'blogs-slug',
                params: { slug: slug },
                replace:true
            }"
        >
            <VBtn
                variant="plain"
                append-icon="mdi-arrow-right"
                color="#0A1B33"
                text="Leer más"
                class="text-none text-justify description-text px-0 mb-2 tw-text-tertiary hover:tw-text-primary"
            />
        </NuxtLink>

        <VRow v-if="props.type === 2" class="mb-6">
            <hr class="col-12 v-divider v-theme--myCustomLightTheme mb-2 mt-4" />
            <VCol cols="12" md="12" class="d-none flex-row align-center px-1 py-1">
                <VCol cols="2" class="px-1 py-1 foot-data-text">
                    Tags:
                </VCol>
                <VCol cols="10" class="d-flex flex-wrap justify-space-around px-1 py-2 ga-2">
                    <VCard v-for="tag in tags" class="px-1 py-1" variant="flat" >
                        <VCardText class="px-1 py-1" >
                            {{tag.tag.name}}
                        </VCardText>
                    </VCard>
                </VCol>
            </VCol>

            <VCol cols="12" md="12" class="d-flex flex-row align-center px-1 py-1">
                <VCol cols="4" md="2" class="px-1 py-1 foot-data-text">
                    Compartir en:
                </VCol>
                <VCol cols="8" md="10" class="d-flex align-center px-1 py-0 ga-2 ga-md-4">
                    <VCard class="px-1 py-0" variant="flat">
                        <VCardText class="px-1 py-0 d-flex align-center">
                            <a :href="searchWhatsapp" target="_blank" class="tw-no-underline hover:tw-text-secondary">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6034 2.3252C12.1065 0.826563 10.1158 0.000878905 7.99502 0C3.6249 0 0.0682617 3.55654 0.0665039 7.92783C0.065918 9.3252 0.430957 10.6893 1.1248 11.8916L0 16L4.20303 14.8975C5.36113 15.5292 6.66494 15.8621 7.9918 15.8625H7.99512C12.3647 15.8625 15.9218 12.3057 15.9234 7.93418C15.9243 5.81563 15.1004 3.82373 13.6034 2.3252ZM7.99502 14.5235H7.99228C6.80986 14.523 5.6502 14.2053 4.63828 13.605L4.39775 13.4621L1.90361 14.1164L2.56934 11.6847L2.4126 11.4354C1.75293 10.3861 1.40459 9.17344 1.40518 7.92832C1.40654 4.29502 4.36279 1.33906 7.99766 1.33906C9.75781 1.33965 11.4124 2.02598 12.6565 3.27158C13.9007 4.51719 14.5854 6.17285 14.5849 7.93369C14.5833 11.5673 11.6272 14.5235 7.99502 14.5235ZM11.6097 9.58809C11.4116 9.48887 10.4376 9.00977 10.256 8.94355C10.0745 8.87744 9.94228 8.84453 9.81035 9.04277C9.67822 9.24102 9.29863 9.6873 9.18301 9.81943C9.06738 9.95166 8.95195 9.96826 8.75381 9.86904C8.55566 9.76992 7.91738 9.56065 7.16064 8.88574C6.57178 8.36045 6.17422 7.71172 6.05859 7.51348C5.94316 7.31504 6.05762 7.21816 6.14551 7.10918C6.35996 6.84287 6.57471 6.56367 6.64072 6.43154C6.70684 6.29932 6.67373 6.18359 6.62412 6.08447C6.57471 5.98535 6.17852 5.01025 6.01348 4.61348C5.85254 4.22734 5.68936 4.27949 5.56768 4.27344C5.45225 4.26768 5.32012 4.2665 5.18799 4.2665C5.05596 4.2665 4.84131 4.31602 4.65967 4.51445C4.47812 4.71279 3.96641 5.19199 3.96641 6.16709C3.96641 7.14219 4.67627 8.08418 4.77529 8.21641C4.87432 8.34863 6.17227 10.3496 8.15947 11.2076C8.63213 11.4119 9.00107 11.5337 9.28887 11.625C9.76348 11.7758 10.1952 11.7545 10.5366 11.7035C10.9173 11.6466 11.7086 11.2242 11.8738 10.7615C12.0389 10.2987 12.0389 9.90215 11.9893 9.81943C11.9398 9.73682 11.8077 9.6873 11.6097 9.58809Z" fill="#0A1B33"/>
                                </svg>
                            </a>
                        </VCardText>
                    </VCard>
                    <VCard class="px-1 py-0" variant="flat">
                        <VCardText class="px-1 py-0 d-flex align-center">
                            <a :href="searchTwitter" target="_blank" class="tw-no-underline hover:tw-text-secondary">
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.2409 6.77491L16.0692 0H14.6881L9.62735 5.88256L5.58539 0H0.923462L7.03571 8.89547L0.923462 16H2.30466L7.64888 9.78782L11.9175 16H16.5794L10.2405 6.77491H10.2409ZM8.34915 8.97384L7.72985 8.08805L2.80232 1.03974H4.92376L8.90033 6.72795L9.51963 7.61374L14.6887 15.0075H12.5673L8.34915 8.97418V8.97384Z" fill="#0A1B33"/>
                                </svg>
                            </a>
                        </VCardText>
                    </VCard>
                    <VCard class="px-1 py-0" variant="flat">
                        <VCardText class="px-1 py-0 d-flex align-center">
                            <a :href="searchFacebook" target="_blank" class="tw-no-underline hover:tw-text-secondary">
                                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.6106 9H6.26685V16H3.14185V9H0.579346V6.125H3.14185V3.90625C3.14185 1.40625 4.64185 0 6.9231 0C8.01685 0 9.1731 0.21875 9.1731 0.21875V2.6875H7.89185C6.64185 2.6875 6.26685 3.4375 6.26685 4.25V6.125H9.0481L8.6106 9Z" fill="#0A1B33"/>
                                </svg>
                            </a>
                        </VCardText>
                    </VCard>                    
                    <VCard class="px-1 py-0" variant="flat">
                        <VCardText class="px-1 py-0 d-flex align-center">
                            <a :href="searchPinterest" target="_blank" class="tw-no-underline hover:tw-text-secondary">
                                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.2981 13.9844H0.391846V4.64062H3.2981V13.9844ZM1.82935 3.39062C0.923096 3.39062 0.173096 2.60938 0.173096 1.67188C0.173096 0.765625 0.923096 0.015625 1.82935 0.015625C2.76685 0.015625 3.51685 0.765625 3.51685 1.67188C3.51685 2.60938 2.76685 3.39062 1.82935 3.39062ZM14.1418 13.9844H11.2668V9.45312C11.2668 8.35938 11.2356 6.98438 9.7356 6.98438C8.2356 6.98438 8.01685 8.14062 8.01685 9.35938V13.9844H5.1106V4.64062H7.89185V5.92188H7.9231C8.32935 5.20312 9.26685 4.42188 10.6731 4.42188C13.6106 4.42188 14.1731 6.35938 14.1731 8.85938V13.9844H14.1418Z" fill="#0A1B33"/>
                                </svg>
                            </a>
                        </VCardText>
                    </VCard>
                </VCol>
            </VCol>
        </VRow>
    </VCard>
</template>

<style scoped>

    .content-blog {
        position: relative;
        padding: 20px 70px;

        :deep(img)  {
            max-width: 100%;
        }

        :deep(a){
            color: rgb(var(--v-theme-primary)) !important;
            text-decoration: none;
        }

        :deep(a:hover){
            color: rgb(var(--v-theme-secondary)) !important;
        }

        :deep(p) {
            margin-block-end: 1rem;
        }

        :deep(ul)  {
            list-style: disc;
            padding-left: 1.5em;
        }

        :deep(li .ql-indent-1) {
            padding-left: 1em;
        }

        :deep(.zoomed)  {
            position: fixed;
            top: 15%;
            left: 18%;
            width: 59%;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            border: 3px solid #000;

            @media (max-width: 767px) {
                top: 15%;
                left: 2%;
                width: 95%;
            }
        }

        :deep(.ql-video) {
            padding: 0 15% !important;
            width: 100% !important;
            height: 400px !important;

            @media (max-width: 767px) {
                height: 200px !important;
                padding: 0 10% !important;
            }
        }

        :deep(p br) {
            display: none;
        }

        :deep(.ql-align-center) {
            text-align: center !important;
        }

        :deep(.ql-align-right){
            text-align: right !important;
        }

    }

    .title-text {
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
        width: 100%;
        max-height: 360px!important;
        object-fit: cover;
    }

    .foot-data-text {
      color:  #000000!important;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 16px; 
    }

    @media only screen and (max-width: 767px) {

        .foot-data-text {
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: 16px;
        }
        .title-text {
            font-size: 20px;
            line-height: 24px;
            margin-top: 15px;
        }
        .description-text {        
            font-size: 14px;
            line-height: 24px; /* 171.429% */
        }

        .subtitle-text {
            font-size: 14px;
            line-height: 16px; /* 114.286% */
        }
    }
</style>