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
const tags = ref(null)

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')
const isMobile = /Mobi/i.test(navigator.userAgent);

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
            <router-link
                v-if="props.type == 1"
                :to="{
                    name: 'blogDetail',
                    params: {
                        slug: slug                    
                    },
                    replace:true
                }"
                class="tw-no-underline"
            >
                <img class="img-style" :src="baseURL + image" />
            </router-link>
            <img v-else class="img-style" :src="baseURL + image" />
        </VCardItem>

        <VCardSubtitle class="text-justify subtitle-text my-6 px-0 d-block d-md-flex">
            <div>
                <VIcon size="20px" icon="mdi-account-outline" class="subtitle-text" /> 
                by {{ user }} 
            </div>
            <div>  
                <VIcon size="20px" :end="!isMobile" icon="mdi-clock-outline" class="subtitle-text" />
                {{  format(dateBlog, 'MMMM d, yyyy', { locale: es }).replace(/(^|\s)\S/g, (char) => char.toUpperCase()) }}
            </div>
        </VCardSubtitle>

        <VCardTitle class="px-0 pt-0 title-text">
            <router-link 
                v-if="props.type == 1"
                :to="{
                    name: 'blogDetail',
                    params: {
                        slug: slug                    
                    },
                    replace:true
                }"
                class="text-justify tw-no-underline"
            >
                <span class="tw-text-primary hover:tw-text-secondary"> {{ title }} </span>
            </router-link>
            <span v-else class="text-justify tw-text-primary"> {{ title }} </span>
        </VCardTitle>

        <VCardText class="text-justify description-text px-0 content-blog">
            <div v-html="paragraphs"></div>
        </VCardText>

        <router-link 
            v-if="props.type == 1"
            :to="{
                name: 'blogDetail',
                params: {
                    slug: slug                    
                },
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
        </router-link>

        <VRow v-if="props.type === 2" class="mb-6">
            <hr class="col-12 v-divider v-theme--myCustomLightTheme mb-2 mt-4" />
            <VCol cols="12" md="6" class="d-flex flex-row align-center px-1 py-1">
                <VCol cols="3" class="px-1 py-1 foot-data-text">
                    Tags:
                </VCol>
                <VCol cols="9" class="d-flex flex-wrap justify-space-around px-1 py-2 ga-2">
                    <VCard v-for="tag in tags" class="px-1 py-1" variant="flat" >
                        <VCardText class="px-1 py-1" >
                            {{tag.tag.name}}
                        </VCardText>
                    </VCard>
                </VCol>
            </VCol>

            <VCol cols="12" md="6" class="d-flex flex-row align-center px-1 py-1">
                <VCol cols="3" class="px-1 py-1 foot-data-text">
                    Share:
                </VCol>
                <VCol cols="9" class="d-flex flex-wrap justify-space-around px-1 py-2 ga-2">
                    <VCard class="px-1 py-1" variant="flat">
                        <VCardText class="px-1 py-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
                                <path d="M8.03125 9H5.6875V16H2.5625V9H0V6.125H2.5625V3.90625C2.5625 1.40625 4.0625 0 6.34375 0C7.4375 0 8.59375 0.21875 8.59375 0.21875V2.6875H7.3125C6.0625 2.6875 5.6875 3.4375 5.6875 4.25V6.125H8.46875L8.03125 9Z" fill="#0A1B33"/>
                            </svg>
                        </VCardText>
                    </VCard>

                    <VCard class="px-1 py-1" variant="flat">
                        <VCardText class="px-1 py-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14" fill="none">
                              <path d="M14.9375 3.73438C14.9375 3.89062 14.9375 4.01562 14.9375 4.17188C14.9375 8.51562 11.6562 13.4844 5.625 13.4844C3.75 13.4844 2.03125 12.9531 0.59375 12.0156C0.84375 12.0469 1.09375 12.0781 1.375 12.0781C2.90625 12.0781 4.3125 11.5469 5.4375 10.6719C4 10.6406 2.78125 9.70312 2.375 8.39062C2.59375 8.42188 2.78125 8.45312 3 8.45312C3.28125 8.45312 3.59375 8.39062 3.84375 8.32812C2.34375 8.01562 1.21875 6.70312 1.21875 5.10938V5.07812C1.65625 5.32812 2.1875 5.45312 2.71875 5.48438C1.8125 4.89062 1.25 3.89062 1.25 2.76562C1.25 2.14062 1.40625 1.57812 1.6875 1.10938C3.3125 3.07812 5.75 4.39062 8.46875 4.54688C8.40625 4.29688 8.375 4.04688 8.375 3.79688C8.375 1.98438 9.84375 0.515625 11.6562 0.515625C12.5938 0.515625 13.4375 0.890625 14.0625 1.54688C14.7812 1.39062 15.5 1.10938 16.125 0.734375C15.875 1.51562 15.375 2.14062 14.6875 2.54688C15.3438 2.48438 16 2.29688 16.5625 2.04688C16.125 2.70312 15.5625 3.26562 14.9375 3.73438Z" fill="#0A1B33"/>
                            </svg>
                        </VCardText>
                    </VCard>

                    <VCard class="px-1 py-1" variant="flat">
                        <VCardText class="px-1 py-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                              <path d="M3.6875 13.9844H0.78125V4.64062H3.6875V13.9844ZM2.21875 3.39062C1.3125 3.39062 0.5625 2.60938 0.5625 1.67188C0.5625 0.765625 1.3125 0.015625 2.21875 0.015625C3.15625 0.015625 3.90625 0.765625 3.90625 1.67188C3.90625 2.60938 3.15625 3.39062 2.21875 3.39062ZM14.5312 13.9844H11.6562V9.45312C11.6562 8.35938 11.625 6.98438 10.125 6.98438C8.625 6.98438 8.40625 8.14062 8.40625 9.35938V13.9844H5.5V4.64062H8.28125V5.92188H8.3125C8.71875 5.20312 9.65625 4.42188 11.0625 4.42188C14 4.42188 14.5625 6.35938 14.5625 8.85938V13.9844H14.5312Z" fill="#0A1B33"/>
                            </svg>
                        </VCardText>
                    </VCard>

                    <VCard class="px-1 py-1" variant="flat">
                        <VCardText class="px-1 py-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                              <path d="M7.57812 3.39062C9.54688 3.39062 11.1719 5.01562 11.1719 6.98438C11.1719 8.98438 9.54688 10.5781 7.57812 10.5781C5.57812 10.5781 3.98438 8.98438 3.98438 6.98438C3.98438 5.01562 5.57812 3.39062 7.57812 3.39062ZM7.57812 9.32812C8.85938 9.32812 9.89062 8.29688 9.89062 6.98438C9.89062 5.70312 8.85938 4.67188 7.57812 4.67188C6.26562 4.67188 5.23438 5.70312 5.23438 6.98438C5.23438 8.29688 6.29688 9.32812 7.57812 9.32812ZM12.1406 3.26562C12.1406 3.73438 11.7656 4.10938 11.2969 4.10938C10.8281 4.10938 10.4531 3.73438 10.4531 3.26562C10.4531 2.79688 10.8281 2.42188 11.2969 2.42188C11.7656 2.42188 12.1406 2.79688 12.1406 3.26562ZM14.5156 4.10938C14.5781 5.26562 14.5781 8.73438 14.5156 9.89062C14.4531 11.0156 14.2031 11.9844 13.3906 12.8281C12.5781 13.6406 11.5781 13.8906 10.4531 13.9531C9.29688 14.0156 5.82812 14.0156 4.67188 13.9531C3.54688 13.8906 2.57812 13.6406 1.73438 12.8281C0.921875 11.9844 0.671875 11.0156 0.609375 9.89062C0.546875 8.73438 0.546875 5.26562 0.609375 4.10938C0.671875 2.98438 0.921875 1.98438 1.73438 1.17188C2.57812 0.359375 3.54688 0.109375 4.67188 0.046875C5.82812 -0.015625 9.29688 -0.015625 10.4531 0.046875C11.5781 0.109375 12.5781 0.359375 13.3906 1.17188C14.2031 1.98438 14.4531 2.98438 14.5156 4.10938ZM13.0156 11.1094C13.3906 10.2031 13.2969 8.01562 13.2969 6.98438C13.2969 5.98438 13.3906 3.79688 13.0156 2.85938C12.7656 2.26562 12.2969 1.76562 11.7031 1.54688C10.7656 1.17188 8.57812 1.26562 7.57812 1.26562C6.54688 1.26562 4.35938 1.17188 3.45312 1.54688C2.82812 1.79688 2.35938 2.26562 2.10938 2.85938C1.73438 3.79688 1.82812 5.98438 1.82812 6.98438C1.82812 8.01562 1.73438 10.2031 2.10938 11.1094C2.35938 11.7344 2.82812 12.2031 3.45312 12.4531C4.35938 12.8281 6.54688 12.7344 7.57812 12.7344C8.57812 12.7344 10.7656 12.8281 11.7031 12.4531C12.2969 12.2031 12.7969 11.7344 13.0156 11.1094Z" fill="#0A1B33"/>
                            </svg>
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
            cursor: pointer;
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