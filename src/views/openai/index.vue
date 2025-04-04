<script setup>
    import { requiredValidator} from '@validators'
    import { useOpenaiStores } from '@/stores/openai'
    const event_type = ref(null)
    const refVForm = ref()
    const theme = ref(null)
    const guests = ref(null)
    const responseData = ref(null);
    const isLoading = ref(false)
    const listPartyTypes = ref(['Cumpleaños','Halloween','Despedida de soltera','Aniversario','Graduación','dia del niño','Baby shower', 'Jubilación', 'Compromiso'])
    const listthematic = ref([
        'Vallenata', 'Mexicana', 'Niños', 'Niñas', 'Bebes', 'Graduación', 'Deportes', 'Vaquera', 'Hora loca', 'Sorpresas', 'Disco' 
    ])

    const formatText = (text) => {
    if (Array.isArray(text)) {
        text = text.join('\n') // Convertimos el array a texto plano
    } else {
        text = String(text ?? '')
    }

    return text
        .replace(/\n### (.*)/g, '<h3>$1</h3>') // Títulos H3
        .replace(/\n- \*\*ID: (\d+)\*\* - \*\*(.*?)\*\*, Precio: ([\d.]+)/g, '<li><strong>ID:</strong> $1 - <strong>$2</strong>, Precio: $3</li>')
        .replace(/\n- (.*?)\n/g, '<li>$1</li>') // Otros ítems
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Negritas
        .replace(/\n/g, '<br />') // Saltos de línea
    }



    const onSubmit = () => {
    refVForm.value?.validate().then(({ valid: isValid }) => {
        if (isValid) {
            const formData = { 
                event_type: event_type.value,
                theme: theme.value,
                guests: parseInt(guests.value)
            };
            const openaiStore = useOpenaiStores();
            isLoading.value = true
            openaiStore.show(formData)
                .then((response) => {
                    responseData.value = response;
                    isLoading.value = false
                })
                .catch((error) => {
                    console.error('Error al enviar datos:', error);
                    alert('Error al enviar los datos');
                    isLoading.value = false
                }); 
        }
    })

}

</script>

<template>
    <VContainer class="mt-2 mt-md-10">
      <div class="card-container-generator">
            <h1 class="title-generator text-center">Genera las mejores ideas</h1>
            <span class="desc_generator text-center">Olvidate del estres que causa la planificación de tu celebración y deja que  <br>el poder de nuestra IA planifique tu evento de manera divertida.</span>

            <!-----Formulario ------>
            <VForm
                ref="refVForm"
                @submit.prevent="onSubmit"
            > 
            <VRow class="mt-10">
                <VCol cols="12" md="4" class="textinput mb-0 mb-md-2">
                    <VAutocomplete
                        variant="outlined"
                        v-model="event_type"
                        label="Tipo de celebración"
                        :rules="[requiredValidator]"
                        :items="listPartyTypes"
                        class="me-0 me-md-2"
                    /> 
                </VCol>
                <VCol cols="12" md="5" class="textinput mb-0 mb-md-2">
                    <VAutocomplete
                        variant="outlined"
                        v-model="theme"
                        label="Temática"
                        :rules="[requiredValidator]"
                        :items="listthematic"
                        item-title="name"
                        item-value="name"
                        class="me-0 me-md-2"
                    /> 
                </VCol>

                <VCol cols="12" md="3" class="textinput mb-0 mb-md-2">
                    <VTextField
                        variant="outlined"
                        v-model="guests"
                        label="Número de invitados"
                        type="number"
                        :rules="[requiredValidator]"
                        min="1"
                        class="me-0 me-md-2"
                    />
                </VCol>

                <VBtn
                    variant="flat"
                    type="submit"
                    width="50%"
                    style="border-radius:32px;margin: auto; font-weight: 700;"
                    class="btn-register tw-text-white tw-bg-primary button-hover mt-2"
                   >
                    Generar Ideas
                 </VBtn>
            </VRow>
        </VForm>

        <VRow v-if="responseData" class="mt-10">
            <VCol cols="12">
                <VCard>
                    <VCardTitle>Resultado</VCardTitle>
                    <VCardText>
                        <VRow v-if="typeof responseData === 'object'">
                            <VCol
                                v-for="(value, key) in responseData"
                                :key="key"
                                cols="12"
                                md="12"
                                >
                                <strong>{{ key }}:</strong>
                                <div v-html="formatText(value)" class="prose prose-sm max-w-none"/>
                            </VCol>
                        </VRow>
                        <!-- Si es un valor simple -->
                        <div v-else>
                            {{ responseData }}
                        </div>
                    </VCardText>
                </VCard>
            </VCol>
        </VRow>
      </div>
    </VContainer>
</template>

<style scoped>
.card-container-generator
{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    background-color: #FFFFFF;
    padding: 48px;
    border-radius: 16px;
    border: none;
}

.title-generator
{
    font-size: 40px;
    font-weight: 900;
    line-height: 36px;
}

.desc_generator
{
    font-size: 16px;
    line-height: 20px;
}

.textinput .v-text-field::v-deep(.v-field) { 
        border-radius: 24px;
        height: 35px;
        font-size: 14px;
    }

    .v-text-field::v-deep(.v-field__outline) {
        border-radius: 24px;
    }

    .v-text-field::v-deep(.v-field__outline__start) {
        flex: 0 0 17px !important;
        border-start-start-radius: 24px;
    }

    .v-text-field::v-deep(::placeholder) { 
        color: #999999 !important;
        font-size: 15px;
        opacity: inherit;
    }

    .v-text-field::v-deep(input) { 
        padding-top: 0 !important;
        padding-left: 20px !important;
    }

    .textinput .v-text-field::v-deep(.v-input__details) {
        min-height: 15px !important;
    }


    .textinput .v-text-field::v-deep(.v-field-label) {
        top: 33% !important;
        font-size: 14px !important;
    }

    .v-textarea::v-deep(.v-field-label) {
        top: 10% !important;
        font-size: 14px !important;
    }

    .v-text-field::v-deep(.v-field__append-inner) { 
        padding-top: 8px !important;
        align-items: start !important;
    }

    .v-autocomplete::v-deep(.v-field__overlay) {
        background: white !important;
    }

    .v-autocomplete::v-deep(.v-field__input) { 
        padding-top: 0 !important;
    }

    .v-autocomplete::v-deep(.v-input__prepend) {
        margin-inline-end: 0 !important;
    }

    .v-textarea::v-deep(.v-field) { 
        border-radius: 24px !important;
    }

    .v-checkbox::v-deep(.v-selection-control) {
        min-height: 15px;
    }
    
    .v-checkbox::v-deep(.v-label) {
        color:#0A1B33;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px; /* 138.462% */
        margin-left: 10px;
    }

    .v-checkbox::v-deep(.v-input__details) { 
        min-height: 0 !important;
        padding: 0 !important;
        height: 0 !important;
    }
</style>