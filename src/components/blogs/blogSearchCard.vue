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
    <VCard
        flat
        class="text-justify card-header pt-4 pb-4 ps-2 pe-2"
        rounded="lg"
        >

        <VCardTitle 
            class="text-justify title-text pt-2 mb-2">
            Buscar
        </VCardTitle>

        <VDivider
            class="mt-4 mb-4"
        >
        </VDivider>

        <VCardText
            class="d-flex justify-items-center"
        >
            <VTextField
                class="input-search ps-4"
                variant="plain"
                :hide-details=true
                :center-affix=true
                density="compact"
                rounded="s-lg"

            >
            </VTextField>
            <VBtn
                variant="flat"
                color="#0A1B33"
                text="Buscar"
                class="button-search"
                rounded="e-lg"
                min-height="100%"
            >
            </VBtn>
        </VCardText>

        <VDivider
            class="mt-4 mb-4"
        >
        </VDivider>

        <VCardTitle 
            class="text-justify title-text pt-2 mt-10 mb-2">
            Post Recientes
        </VCardTitle>

        <VDivider
            class="mt-4 mb-4"
        >
        </VDivider>

        <VList
            :items="blogs"
            item-value="id"
            base-color="#999999"
        >
        </VList>

        <VDivider
            class="mt-4 mb-4"
        >
        </VDivider>

        <VCardTitle 
            class="text-justify title-text pt-2 mt-10 mb-2">
            Categorías
        </VCardTitle>

        <VDivider
            class="mt-4 mb-4"
        >
        </VDivider>

        <VList
        >
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
                    >
                    </VIcon>
              </template>

                <template #append>
                    <VCardText
                        
                        class="d-flex justify-items-center subtitle-text py-0"
                    >
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


    .input-search{
        background: var(--Light-Cyan-1, #E2F8FC);
    }

    .button-search{
        background: var(--Maastricht-Blue, #0A1B33);
    }

    .icons{
      color:  #FF0090!important;
    }

</style>