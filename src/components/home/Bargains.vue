<template>
  <v-sheet
    class="mx-auto"
    max-width="90%"
  >
    <v-slide-group
      v-model="model"
      id="bargains"
      class="pa-4"
      selected-class="bg-primary"
      mandatory
      show-arrows
    >
      <v-slide-group-item
        v-for="n in 15"
        :key="n"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <v-card
          id="cardBargains"
          :class="['ma-4', selectedClass]"
          height="156"
          width="387"
          @click="toggle"
        >
          <div class="d-flex fill-height align-center justify-center">
            <v-scale-transition>
              <v-icon
                v-if="isSelected"
                color="white"
                size="48"
                icon="mdi-close-circle-outline"
              ></v-icon>
            </v-scale-transition>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>


<script lang="ts">
  export default {
    data: () => ({
      model: null,
    }),
  }
</script>

<style>

  #bargains .v-slide-group__next, #bargains .v-slide-group__prev{
    position: initial !important;
    height: 26px !important;
    margin-top: 10% !important;
  }

  #cardBargains.v-card{
    border: none !important;
  }

</style>