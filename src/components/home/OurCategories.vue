<script setup>
  
  const model = ref('item')

</script>

<template>
  <div class="pt-6 title">
    <h2>
      Our Categories
    </h2>
  </div>

  <v-sheet class="mx-auto mt-5">
    <v-slide-group
      v-model="model"
      class="pa-3"
      selected-class="selected"
      center-active
      show-arrows
    >
      <v-slide-group-item
        v-for="n in 24"
        :key="n"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <v-card
          id="cardCategories"
          :class="['my-4 cardMrgn', selectedClass]"
          height="114"
          width="130"
          @click="toggle"
        >
          <div class="d-flex fill-height align-center justify-center">
            <v-scale-transition>

              <div v-if="isSelected">
                <div id="categoryLogo" class="invert">
                  <img src="@/assets/icons/electronic.svg" width="21">
                </div> 
                <div class="pt-2 white">
                  <p id="whiteName">Electronics</p>
                  <p class="pt-1" id="whiteDescription">219 Chollos</p>
                </div>
              </div>

              <div>
                <div id="categoryLogo">
                  <img src="@/assets/icons/electronic.svg" width="21">
                </div> 
                <div class="pt-2">
                  <p id="categoryName">Electronics</p>
                  <p class="pt-1" id="categoryDescription">219 Chollos</p>
                </div>
              </div>

            </v-scale-transition>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<style>

  .title{
    display: inline-block;
    position: absolute;
  }

  h2{
    text-align: left;
    color: #193242;
    padding-left: 4.5rem;
  }

  div.v-slide-group__content{
    justify-content: center;
  }

  #cardCategories, div.v-card{
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: none;
  }

  .selected{
    background-color: #FF5400 !important;
    background-image: url("../assets/images/maskGroup.png") !important;
  }

  .invert{
    filter: invert(1);
  }

  .white{
    color: white !important;
  }

  .cardMrgn{
    margin-inline: 16px;
  }

  .v-slide-group__container{
    margin: 0 8%;
    margin-top: 35px;
  }

  .v-slide-group__next, .v-slide-group__prev{
    min-width: 29px !important;
    color: rgba(0, 0, 0, 0.2);
    position: absolute;
    right: 6rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    padding: 1px;
  }
  
  .v-slide-group__prev{
    margin-right: 2.4rem;
  }

  #whiteName{
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
  }

  #whiteDescription{
    font-size: 12px;
  }

  #categoryLogo{
    display: flex;
    justify-content: center;
  }

  #categoryName{
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    color: #193242;
  }

  #categoryDescription{
    font-size: 12px;
    color: #5A5D62;
  }

  @media screen and (max-width: 600px) {
    h2{
      padding-left: 30px;
    }

    .v-slide-group__next, .v-slide-group__prev{
      display: none !important;
    }

    .v-card, .v-card--link{
      margin: 16px 9px !important;
    }
  }

</style>