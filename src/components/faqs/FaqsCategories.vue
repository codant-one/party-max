<script setup>
const props = defineProps({
        name: {
            type: String,
            required: true
        },
        items: {
            type: Array,
            required: true
        }
    }) 
</script>

<template>
    <VCard
        v-show="items.length"
        flat
        class="text-center card-header"
        >

        <VCardTitle 
            :id="props.name"
            class=" name-text pt-3 pt-md-8">
            {{ props.name }}
        </VCardTitle>

        <VCardText>
            <VRow class="mt-0 mt-md-3">
              <VCol
                v-show="items.length"
                cols="12"
                sm="12"
                lg="12"
                class="position-relative mt-0 mt-md-1"
              >
                <VExpansionPanels
                    variant="inset"
                    class="text-center item"
                    v-for="item in items"
                        :key="item.id"
                        :value="item.name"
                >
                    <VExpansionPanel                         
                        elevation="0"
                        rounded="rounded-0"
                        class="pt-4 pb-4"
                    >
                        <VExpansionPanelTitle
                            class="font-weight-medium title-text pt-4 pb-4 hover:tw-bg-yellow"
                        >
                            {{ item.title }}
                            <template v-slot:actions="{ expanded }">
                                <VIcon
                                    size="20" 
                                    :icon="expanded ? 'mdi-minus' : 'mdi-plus'"
                                />
                            </template>
                        </VExpansionPanelTitle>

                        <VExpansionPanelText
                            class="text-justify description-text"
                        >
                            {{ item.description }}
                        </VExpansionPanelText>
                    </VExpansionPanel>
                </VExpansionPanels>
              </VCol>
            </VRow>
        </VCardText>

    </VCard>
    
</template>


<style scoped>

    .v-expansion-panel::v-deep(.v-expansion-panel-title__overlay) { 
        background-color: #FFC549 !important;
    }
    .name-text {
        color:  #FF0090!important;
        text-align: center;
        font-size: 30px;
        font-style: normal;
        font-weight: 500;
        line-height: 39px; /* 130% */
        letter-spacing: -1px;
    }

    .title-text {
        font-size: 24px;
    }

    .description-text {
        font-size: 20px;
    }

    .item {
        border-bottom: 1px solid var(--Maastricht-Blue, #0A1B33);
    }

    .v-expansion-panel-title__icon{
        font-size: 20px !important;
    }

    @media only screen and (max-width: 767px)
    {
        .title-text {
        font-size: 20px;
    }
    .description-text {
        font-size: 16px;
    }

    .name-text 
    {
        font-size: 24px;
    }
    }
</style>