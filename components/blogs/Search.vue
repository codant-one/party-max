<script setup>

import book from '@assets/icons/book.svg?inline';
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
    blogs: {
        type: Object,
        required: true
    },
    categories: {
        type: Object,
        required: true
    }
});

const route = useRoute()
const router = useRouter()
const textSearch = ref(null)

watch(() => 
    route.query,(newPath, oldPath) => {
        textSearch.value = route.query.search ?? null
    }
);

const search = () => {
  router.push({ 
    name: 'blogs',
    query: {
        category: route.query.category ?? null,
        search: textSearch.value
    }         
  })
}

</script>

<template>
    <VCard class="text-justify card-header px-0 card-information no-shadown">
        <VCardTitle class="text-justify title-text px-24 py-7">
            Buscar <VDivider class="mb-2 mt-4 color" />
        </VCardTitle>

        <VCardText class="d-flex justify-items-center px-24"> 
            <VTextField
                v-model="textSearch"
                class="input-search ps-4"
                variant="plain"
                :hide-details=true
                :center-affix=true
                density="compact"
                style="height:55px"
            />
            <VBtn
                variant="flat"
                color="#0A1B33"
                text="Buscar"
                class="button-search"
                min-height="55px"
                @click="search"
            />
        </VCardText>

        <VDivider class="mt-4 mb-4 color" />

        <VCardTitle class="text-justify title-text p-0 mt-10 px-24">
            Post Recientes
        </VCardTitle>

        <VList
            base-color="#999999"
            class="px-24 items"
        >
            <VListItem
                v-for="blog in blogs"
                base-color="#999999"
                class="hover:tw-bg-yellow px-1"
                rounded
                :link="true"
                :to="{
                    name: 'blogDetail',
                    params: {
                        slug: blog.slug                    
                    }
                }"
            >
                <VListItemTitle>
                    <span>{{ blog.title }}</span>
                    <VTooltip
                        location="top"
                        activator="parent"
                        transition="scroll-x-transition"
                        >
                        <span>{{ blog.title }}</span>
                    </VTooltip>
                </VListItemTitle>
            </VListItem>
        </VList>

        <VDivider class="mt-4 mb-4 color" />

        <VCardTitle class="text-justify title-text p-0 mt-10 px-24">
            Categorías <VDivider class="mb-2 mt-4 color" />
        </VCardTitle>
        
        <VList 
            base-color="#999999"
            class="px-24 items mb-5"
        >
            <VListItem
                v-for="category in categories"
                :key="category.id"
                base-color="#999999"
                class="hover:tw-bg-yellow px-1"
                :link="true"
                rounded
            >
                <NuxtLink
                    :to="{
                        name: 'blogs',
                        query: {
                            category: category.slug
                        }
                        }"
                    class="tw-no-underline tw-text-tertiary">
                    <div class="d-flex align-center align-items-stretch flex-shrink-0">
                        <book class="me-3"/>
                        <span class="subtitle-text me-auto">{{ category.name }}</span>
                        <span class="subtitle-text py-0 tw-text-left">
                            {{ category.blogs_count }}
                        </span>
                    </div>
                </NuxtLink>
            </VListItem>
        </VList>
    </VCard>
</template>

<style scoped>

    .color {
        color: #D9EEF2 !important;
        opacity: 1 !important;
    }

    .title-text {
        color: var(--Maastricht-Blue, #0A1B33);
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px; /* 100% */
    }

    .description-text {
        color: var(--Maastricht-Blue, #0A1B33);
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 28px;
    }

    .subtitle-text {
        color: var(--Grey-1, #999) !important;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 26px;
    }

    .input-search {
        background: #E2F8FC;
        border-radius: 8px 0px 0px 8px; 
    }

    .button-search{
        background: var(--Maastricht-Blue, #0A1B33);
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    .v-text-field::v-deep(input) { 
        padding-top: 15px !important;
    }

    .items .v-list-item--variant-text .v-list-item__overlay {
        background-color: #FFC549 !important;
    }

    .icons{
      color:  #FF0090!important;
    }

    .card-information {
        border-radius: 16px;
    }

    .p-41 {
        padding: 41px;
    }

    .px-24 {
        padding-left: 24px !important;
        padding-right: 24px !important;
    }

    @media only screen and (max-width: 767px) { 
        .subtitle-text {
            font-size: 14px;
            line-height: 24px;
        }

        .px-24 {
            padding-left: 20px !important;
            padding-right: 20px !important;
        }

        .title-text {
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: 20px;
        }
    }
</style>