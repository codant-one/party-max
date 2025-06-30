<script setup>

import { formatNumber } from '@formatters'
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import FlatPickr from 'vue-flatpickr-component';
import calendar_icon from '@assets/icons/calendar_edit.svg?inline';
import 'flatpickr/dist/flatpickr.css';

const props = defineProps({
    service: {
        type: Object,
        required: true
    },
    readonly: {
        type: Boolean,
        required: true
    },
    isLastItem: {
        type: Boolean,
        required: true
    },
    type: {
        type: Number,
        required: true
    }
})

const emit = defineEmits([
    'delete', 
    'addCart'
])

const image = ref(null)
const price = ref(null)
const name = ref(null)
const store = ref(null)
const rating = ref(null)
const single_description = ref(null)
const slug = ref(null)
const quantity = ref(null)
const service_id = ref(null)
const size = ref(null)
const is_full = ref(true)
const flavor = ref(null)
const flavor_id = ref(null)
const filling = ref(null)
const filling_id = ref(null)
const cake_size_id = ref(null)
const order_file_id = ref(null)

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')

// calendar
const addDays = (date, days) => {
  const result = new Date(date);
  return result.setDate(result.getDate() + days);
}
const date = ref(null)
const calendar = ref()
const config = ref({
  locale: Spanish,
  enableTime: true,
  noCalendar: false,
  dateFormat: "Y-m-d h:i K",
  time_24hr: false,
  minDate: addDays(new Date(), 3),
  disableMobile: true
})

watch(() => 
    date.value, (value) => {
      onChange()
    }
);

watchEffect(() => {

    if (!(Object.entries(props.service).length === 0) && props.service.constructor === Object) {
        let cupcake = props.type === 0 ? null : props.service.cupcakes.find(item => item.cake_size_id === props.service.cake_size_id)

        image.value = (props.service.images.length === 0) ? props.service.image : props.service.images[0]?.image
        price.value = props.service.cake_size_id === 0 ? props.service.price : cupcake.price
        name.value = props.service.name.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase())
        store.value = props.service.user.user_detail.store_name ?? (props.service.supplier?.company_name ?? (props.service.user.name + ' ' + (props.service.user.last_name ?? '')))
        rating.value = props.service.rating
        single_description.value = props.service.single_description
        slug.value = props.service.slug
        quantity.value = props.service.quantity ?? 1
        service_id.value = props.service.id
        date.value = props.service.date
        size.value = props.service.cake_size_id === 0 ? null : cupcake.cake_size.name
        flavor.value = props.service.cake_size_id === 0 ? null : props.service.flavor.name
        flavor_id.value = props.service.cake_size_id === 0 ? null : props.service.flavor.id
        filling.value = props.service.cake_size_id === 0 ? null : props.service.filling.name
        filling_id.value = props.service.cake_size_id === 0 ? null : props.service.filling.id
        cake_size_id.value = props.service.cake_size_id
        order_file_id.value = props.service.order_file_id
        is_full.value = props.service.is_full === 1 ? true : false
        config.value.minDate = addDays(new Date(), Number(props.service.estimated_delivery_time) || 0)
    }
})

const openCalendar = () => {
  if (calendar.value && calendar.value.$el) {
    calendar.value.$el.click();
  }
};

const onChange = () => {

    let data = {
        date: date.value,
        service_id: service_id.value,
        cake_size_id: cake_size_id.value,
        flavor_id: flavor_id.value,
        filling_id: filling_id.value,
        quantity: quantity.value,
        order_file_id: order_file_id.value
    }

    emit('addCart', data)
}

const increment = () => {
    quantity.value++
    onChange()
}

const decrement = () => {
    if (quantity.value > 1) {
        quantity.value--
        onChange()
    }
}

</script>

<template>
    <div class="tw-no-underline zoom-service w-100">
        <VCard 
            class="no-shadown px-0 w-100 py-5 py-md-7" 
            :class="props.isLastItem ? '' : 'card-information'">
            <VRow no-gutters>
                <VCol cols="6" md="3" class="d-flex flex-column my-auto">
                    <VCardText class="border-img ms-5 ms-md-10 p-0">
                        <img 
                            :width="100"
                            :src="baseURL + image" 
                            class="img-prod" 
                            alt="Imagen del servicio"  
                          />
                    </VCardText>
                </VCol>
                <VCol cols="12" md="5" class="d-flex flex-column py-3 py-md-5 ps-4 ps-md-0 my-auto">
                    <VCardText>
                        <span class="d-block text_2 py-1 tw-text-tertiary title-service">{{ name }}</span>
                        <span class="d-block py-0 tw-text-gray">Fecha: {{ date }}</span>
                        <span class="d-block py-0 tw-text-gray" v-if="size">Tamaño: {{ size }}</span>
                        <span class="d-block py-0 tw-text-gray" v-if="size && is_full">
                            Sabor: {{ flavor }} / Relleno: {{ filling }}
                        </span>
                    </VCardText>
                    <VCardText>
                        <span 
                            class="d-flex tw-text-xs py-1 tw-text-primary title-service me-3" 
                            @click="emit('delete', service_id)"
                        >
                            Eliminar
                        </span>
                    </VCardText>

                </VCol>
                <VCol cols="6" md="2" class="d-flex flex-column py-md-5 my-auto">
                    <VCardText class="d-flex text-center align-center ps-7 ps-md-2 tw-justify-start md:tw-justify-center" v-if="size"> 
                        <div class="number-input-wrapper">
                            <VBtn icon size="x-small" @click="decrement" variant="plain" color="#0A1B33">
                                <VIcon>mdi-minus</VIcon>
                            </VBtn>
                            <VTextField
                                v-model="quantity"
                                variant="solo"
                                type="text"
                                readonly
                                style="height: 30px;"
                            />
                            <VBtn icon size="x-small" @click="increment" variant="plain" color="#0A1B33">
                                <VIcon>mdi-plus</VIcon>
                            </VBtn>
                        </div>
                    </VCardText>
                    <VCardText class="d-flex text-center align-center mt-2 ps-4 ps-md-2 tw-justify-start md:tw-justify-center">
                        <VBtn 
                            class="mx-2 mx-md-5 btn-date" 
                            variant="text"
                            @click="openCalendar" >
                            <calendar_icon class="mr-1"/>
                            Fecha
                            <flat-pickr
                                v-model="date"
                                ref="calendar"
                                :config="config"
                                />
                        </VBtn>
                    </VCardText>
                  </VCol>
                <VCol cols="6" md="2" class="align-center text-center pb-0 py-md-5 mt-auto my-md-auto pe-4">
                    <VCardText class="mt-1">
                        <div class="d-flex text-center align-center tw-justify-end md:tw-justify-center">
                            <span class="text_1 tw-text-tertiary mb-1">${{ formatNumber(price) }}</span>
                        </div>
                    </VCardText>
                </VCol>
            </VRow>
        </VCard>
    </div>
</template>

<style scoped>

    .btn-date {
        padding: 0 2px;
        border-radius: 8px;
        height: 35px;
        color: #0A1B33;
        font-weight: bold;
    }

    .btn-date:hover::v-deep(path) {
        fill: #FF0090;
    }

    .btn-date:hover {
        color: #FF0090;
    }

    .flatpickr-input {
        width: 0px !important;
    }

    .warning {
        border: 2px solid #FFC549 !important;
    }

    .number-input-wrapper {
        display: flex;
        align-items: center;
        border-radius: 8px;
        border: 2px solid #E1E1E1;
        height: 40px;
    }

    .text-pink-accent-3 {
        color: #FF0090 !important;
    }

    .v-text-field::v-deep(.v-field) { 
        border: 0 !important;
        height: 30px;
        box-shadow: none;
    } 

    .v-text-field::v-deep(.v-field__input){
        min-height: 30px;
        padding: 0 !important;
        width: 20px;
        text-align: center;
    }
    
    .v-text-field::v-deep(.v-field__field) { 
        height: 30px;
    }

    .v-text-field::v-deep(::placeholder) { 
        color: #0A1B33 !important;
        opacity: inherit;
    }

    .v-text-field::v-deep(input) { 
        padding: 0 0 0 5px !important;
        color: #0A1B33 !important;
    }
    
    .v-text-field::v-deep(.v-input__details){
        padding: 0;
        min-height: 0;
    }

    .card-information {
        border-bottom: 1px solid var(--Grey-2, #D9EEF2);
        border-radius: 0;
    }

    .btn-register {
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 14px;
        border-radius: 32px;
    }

    .button-hover:hover {
        background-color: #FF27B3 !important;
        box-shadow: 0px 0px 8px 0px #FF27B3;
    }
    
    .v-card-text {
        padding: 0 10px;
    }

    .border-img {
        width: 130px;
        height: 130px;
        border-radius: 16px !important;
        border: 1px solid #E1E1E1;
        text-align: center;
        align-items: center;
        display: flex;
        overflow: hidden;
    }

    .zoom-service {
        display: inline-block;
        position: relative;
        overflow: visible;
    }

    .zoom-service:hover .img-prod {
        transform: scale(1.1);
    }

    .zoom-service:hover .title-service {
        color: #FF0090 !important;
    }

    .img-prod {
        display: block;
        width: 130px;
        height: 130px;
        object-fit: cover;
        border-radius: 16px;
        transition: transform 0.3s ease-in-out;
    }

    .title-service {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
    }

    .text_1 {
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
    }

    .text_2 {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
    }

    .store {
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 8px; /* 80% */ 
    }
    
</style>

<style lang="scss">
/* stylelint-disable no-descending-specificity */

.flat-picker-custom-style {
  position: absolute;
  color: inherit;
  inline-size: 100%;
  inset: 0;
  outline: none;
  padding-block: 0;
  padding-inline: var(--v-field-padding-start);
}

input[altinputclass="inlinePicker"] {
  display: none;
}

.flatpickr-calendar {
  background-color: rgb(var(--v-theme-surface));
  inline-size: 16.625rem;
  margin-block-start: 0.1875rem;

  .flatpickr-rContainer {
    .flatpickr-weekdays {
      padding-inline: 0.8rem;
    }

    .flatpickr-days {
      min-inline-size: 16.625rem;

      .dayContainer {
        justify-content: center !important;
        inline-size: 16.625rem;
        min-inline-size: 16.625rem;
        padding-block-end: 0.5rem;
        padding-block-start: 0;

        .flatpickr-day {
          block-size: 2.125rem;
          line-height: 2.125rem;
          margin-block-start: 0 !important;
          max-inline-size: 2.125rem;
        }
      }
    }
  }

  .flatpickr-day {
    color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));

    &.today {
      border-color: rgb(var(--v-theme-primary));

      &:hover {
        border-color: rgb(var(--v-theme-primary));
        background: transparent;
        color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
      }
    }

    &.selected,
    &.selected:hover {
      border-color: rgb(var(--v-theme-primary));
      background: rgb(var(--v-theme-primary));
      color: rgb(var(--v-theme-on-primary));
    }

    &.inRange,
    &.inRange:hover {
      border: none;
      background: rgba(var(--v-theme-primary), 0.1) !important;
      box-shadow: none !important;
      color: rgb(var(--v-theme-primary));
    }

    &.startRange {
      box-shadow: none;
    }

    &.endRange {
      box-shadow: none;
    }

    &.startRange,
    &.endRange,
    &.startRange:hover,
    &.endRange:hover {
      border-color: rgb(var(--v-theme-primary));
      background: rgb(var(--v-theme-primary));
      color: rgb(var(--v-theme-on-primary));
    }

    &.selected.startRange + .endRange:not(:nth-child(7n + 1)),
    &.startRange.startRange + .endRange:not(:nth-child(7n + 1)),
    &.endRange.startRange + .endRange:not(:nth-child(7n + 1)) {
      box-shadow: -10px 0 0 rgb(var(--v-theme-primary));
    }

    &.flatpickr-disabled,
    &.prevMonthDay:not(.startRange,.inRange),
    &.nextMonthDay:not(.endRange,.inRange) {
      opacity: var(--v-disabled-opacity);
    }

    &:hover {
      border-color: rgba(var(--v-theme-surface-variant), var(--v-hover-opacity));
      background: rgba(var(--v-theme-surface-variant), var(--v-hover-opacity));
    }
  }

  .flatpickr-weekday {
    color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
    font-size: 0.875rem;
    font-weight: 500;
  }

  .flatpickr-days {
    inline-size: 16.625rem;
  }

  &::after,
  &::before {
    display: none;
  }

  .flatpickr-months {
    border-block-end: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));

    .flatpickr-prev-month,
    .flatpickr-next-month {
      fill: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));

      &:hover i,
      &:hover svg {
        fill: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
      }
    }
  }

  .flatpickr-current-month span.cur-month {
    font-weight: 300;
  }

  &.open {
    z-index: 1051;
  }

  &.hasTime.open {
    .flatpickr-time {
      border-color: rgba(var(--v-border-color), var(--v-border-opacity));
      block-size: auto;
    }
  }
}

.flatpickr-time input:hover,
.flatpickr-time .flatpickr-am-pm:hover,
.flatpickr-time input:focus,
.flatpickr-time .flatpickr-am-pm:focus {
  background: transparent;
}

.flatpickr-time {
  .flatpickr-am-pm,
  .flatpickr-time-separator,
  input {
    color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
  }

  .numInputWrapper {
    span {
      &.arrowUp {
        &::after {
          border-block-end-color: rgb(var(--v-border-color));
        }
      }

      &.arrowDown {
        &::after {
          border-block-start-color: rgb(var(--v-border-color));
        }
      }
    }
  }
}

.flatpickr-input[readonly],
.flatpickr-input ~ .form-control[readonly],
.flatpickr-human-friendly[readonly] {
  background-color: inherit;
  opacity: 1 !important;
}

.flatpickr-weekdays {
  margin-block-start: 8px;
}

.flatpickr-current-month {
  .flatpickr-monthDropdown-months {
    appearance: none;
  }

  .flatpickr-monthDropdown-months,
  .numInputWrapper {
    padding: 2px;
    border-radius: 4px;
    color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.15s ease-out;
    text-transform: uppercase;

    span {
      display: none;
    }

    .flatpickr-monthDropdown-month {
      background-color: rgb(var(--v-theme-surface));
    }

    .numInput.cur-year {
      font-weight: 500;
    }
  }
}

.flatpickr-day.flatpickr-disabled,
.flatpickr-day.flatpickr-disabled:hover {
  color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
}

.v-theme--dark.flatpickr-calendar {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  box-shadow: none;
}

.flatpickr-months {
  padding-block: 0.75rem;
  padding-inline: 1rem;

  .flatpickr-prev-month,
  .flatpickr-next-month {
    background: rgba(var(--v-theme-surface-variant), var(--v-selected-opacity));
    block-size: 1.75rem;
    border-radius: 5rem;
    inline-size: 1.75rem;
    inset-block-start: 0.75rem !important;
    padding-block: 0.25rem;
    padding-inline: 0.4375rem;
  }

  .flatpickr-next-month {
    inset-inline-end: 1.05rem !important;
  }

  .flatpickr-prev-month {
    /* stylelint-disable-next-line liberty/use-logical-spec */
    right: 3.5rem;
    left: unset !important;
  }

  .flatpickr-month {
    block-size: 1.75rem;

    .flatpickr-current-month {
      block-size: 1.75rem;
      inset-inline-start: 0;
      padding-block-start: 0.2rem;
      text-align: start;
    }
  }
}
</style>
