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
    <VCard v-show="items.length" flat class="text-center card-header">
        <VCardTitle  :id="props.name" class=" name-text pt-8 pb-0">
            {{ props.name }}
        </VCardTitle>

        <VCardText>
            <VRow class="mt-0 mt-md-3">
              <VCol
                v-show="items.length"
                cols="12"
                sm="12"
                lg="12"
                class="position-relative mt-0 mt-md-1 p-0"
              >
                <VExpansionPanels
                    class="text-center item"
                    v-for="item in items"
                        :key="item.id"
                        :value="item.name"
                >
                    <VExpansionPanel                         
                        elevation="0"
                        rounded="rounded-0"
                        class="py-0"
                    >
                        <VExpansionPanelTitle
                            class="font-weight-medium title-text py-md-7 hover:tw-bg-yellow"
                        >
                            <span class="title-span">{{ item.title }}</span>
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

    .v-expansion-panel-title__icon {
        font-size: 20px !important;
    }
    
    .v-expansion-panel::v-deep(.v-expansion-panel-title) { 
        padding-left: 0 !important;
        padding-right: 0 !important;
        border-radius: 0 !important;
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

    @media only screen and (max-width: 767px) {

        .v-expansion-panel::v-deep(.title-span) { 
            width: 85% !important;
        }

        .title-text {
            font-size: 20px;
        }

        .description-text {
            font-size: 16px;
        }

        .name-text {
            font-size: 24px;
        }
    }
</style>