<script setup>
import { useDate } from 'vuetify'

const props = defineProps({
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        user: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        }
    });

const date = useDate();

</script>

<template>
    <VCard
        flat
        class="text-justify card-header mb-6 pb-2"
        rounded="lg"
        >

        <VCardItem
            class="py-4"
        >
            <VImg
                class="rounded-lg"
                :src="props.image"
            >
            </VImg>
        </VCardItem>

        <VCardSubtitle 
            class="text-justify subtitle-text pt-2">
            <VIcon size="20px" icon="mdi-account-outline" class="subtitle-text"></VIcon> by {{ props.user }} 
            <VIcon size="20px" :end=true icon="mdi-clock-outline" class="subtitle-text"></VIcon> 
            {{ date.format(props.date, 'fullDateWithWeekday') }}
        </VCardSubtitle>

        <VCardTitle 
            :id="props.name"
            class="text-justify title-text pt-2">
            {{ props.title }}
        </VCardTitle>

        <VCardText
            class="text-justify description-text"
        >
            {{ props.description }}
        </VCardText>
        <VBtn
            variant="plain"
            append-icon="mdi-arrow-right"
            color="#0A1B33"
            text="Leer más"
            class="text-none text-justify description-text"
        >
        </VBtn>
    </VCard>
</template>

<style scoped>
    .title-text {
        font-size: 24px;
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
</style>