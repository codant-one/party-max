<script setup>
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
    }) 
</script>

<template>
    <VCard
        flat
        class="text-center card-header"
        >

        <VCardItem>
            <VImg
                :src="props.image">
            </VImg>
        </VCardItem>

        <VCardSubtitle 
            class="text-justify subtitle-text pt-8">
            {{ props.user }} {{ props.date }}
        </VCardSubtitle>

        <VCardTitle 
            :id="props.name"
            class="text-justify description-text title-text pt-8">
            {{ props.title }}
        </VCardTitle>

        <VCardText
            class="text-justify description-text"
        >
            {{ props.description }}
        </VCardText>
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