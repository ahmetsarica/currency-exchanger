<template>
  <div class="home">
    <currency-exchanger />
  </div>
</template>

<script>
// @ is an alias to /src
import CurrencyExchanger from '@/components/CurrencyExchanger.vue';

export default {
  name: 'HomeView',
  components: {
    CurrencyExchanger,
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #518ac2;
}
</style>
