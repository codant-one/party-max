import * as VueImageZoomer from 'vue-image-zoomer';
import 'vue-image-zoomer/dist/style.css';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VueImageZoomer', VueImageZoomer);
});