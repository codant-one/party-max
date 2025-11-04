<script setup>
import { ref, computed } from 'vue';

// Definición de Props: Recibe los dos componentes SVG
const props = defineProps({
  // El icono por defecto (alt)
  iconAlt: {
    type: Object, // El tipo de un componente importado con ?inline es Object
    required: true,
  },
  // El icono que aparece al hacer hover (solid)
  iconSolid: {
    type: Object,
    required: true,
  },
  // Opcional: Clases adicionales que se pasan al icono
  iconClass: {
    type: String,
    default: 'pm-dm-icon',
  },
});

// Estado reactivo para el hover
const isHovering = ref(false);

// Propiedad computada para seleccionar el icono actual
const currentIcon = computed(() => {
  // Si el ratón está encima, muestra el icono sólido, si no, el alternativo.
  return isHovering.value ? props.iconSolid : props.iconAlt;
});
</script>

<template>
  <span 
    class="pm-icon-container"
    @mouseenter="isHovering = true" 
    @mouseleave="isHovering = false"
  >
    <component 
      :is="currentIcon" 
      :class="props.iconClass" 
      aria-hidden="true" 
    />
  </span>
</template>

<style scoped>
	.pm-icon-container {
		display: inline-flex;
		cursor: pointer;
	}
	.pm-dm-icon {
    width: 32px !important;
    height: auto !important;
    color: #FF0090;
  }
</style>