<script setup>

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


</script>

<template>
    <VCard class="text-justify card-header px-0 card-information no-shadown">
        <VCardTitle class="text-justify title-text px-41 py-7">
            Buscar
            <VDivider class="mb-2 mt-4" />
        </VCardTitle>

        <VCardText class="d-flex justify-items-center px-41"> 
            
            <VTextField
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
            />
        </VCardText>

        <VDivider class="mt-4 mb-4" />

        <VCardTitle class="text-justify title-text pt-2 mt-10 mb-2 px-41">
            Post Recientes
        </VCardTitle>

        <VList
            base-color="#999999"
            class="px-41"
            style="padding:30px"
        >
            <VListItem
                v-for="blog in blogs"
                :key="blog.id"
                :title="blog.title"
                base-color="#999999"
                class="hover:tw-bg-yellow"
            />
        </VList>

        <VDivider class="mt-4 mb-4" />

        <VCardTitle class="text-justify title-text pt-2 mt-10 mb-2 px-41">
            Categorías
        </VCardTitle>
        
        <VList class="px-41 mb-2">
            <VListItem
                v-for="category in categories"
                :key="category.id"
                :title="category.name"
                base-color="#999999"
            >
                <template #prepend>
                    <VIcon
                        :icon="category.icon"
                        class="icons"
                    />
                </template>
                <template #append>
                    <VCardText class="d-flex justify-items-center subtitle-text py-0">
                        {{ category.blogs.length }}
                    </VCardText>
              </template>
          </VListItem>
        </VList>
    </VCard>
</template>

<style scoped>
    .title-text {
        color: var(--Maastricht-Blue, #0A1B33);
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px; /* 100% */
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


    .input-search {
        background: #E2F8FC;
        border-radius: 8px 0px 0px 8px; 
    }

    .button-search{
        background: var(--Maastricht-Blue, #0A1B33);
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

    .px-41 {
        padding-left: 41px;
        padding-right: 41px;
    }
</style>