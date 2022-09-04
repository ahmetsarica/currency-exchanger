<template>
  <div class="exchanger">
    <div v-if="spinner" class="exchanger__glass">
      <a-spin size="large" />
    </div>
    <span class="exchanger__text">
      {{ formatFixedDecimal(amountFrom) }} {{ symbols[currencyFrom] }} to {{ symbols[currencyTo] }}
    </span>
    <div class="exchanger__widgets-container">
      <exchanger-widget
        @currencyChanged="currencyFromChanged"
        @inputChanged="inputFromChanged"
        :default-symbol="currencyFrom"
        :symbols="symbols"
      />
      <a-icon @click="swapCurrencies" class="exchanger__widgets-container__icon" type="swap" />
      <exchanger-widget
        @currencyChanged="currencyToChanged"
        @inputChanged="inputToChanged"
        :default-symbol="currencyTo"
        :amount="amountTo"
        :symbols="symbols"
      />
    </div>
    <div class="exchanger__ratio-text">
      1.00 {{ currencyFrom }} = {{ currentRates[currencyTo].toFixed(2) }} {{ currencyTo }}
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { formatFixedDecimal } from '@/filters/filters';
import ExchangerWidget from './ExchangerWidget.vue';

export default {
  name: 'CurrencyExchanger',
  components: {
    ExchangerWidget,
  },
  data() {
    return {
      formatFixedDecimal,
      currencyFrom: 'EUR',
      amountFrom: 1.0,
      currencyTo: 'EUR',
      amountTo: 1.0,
      exchangeRatio: 1,
      spinner: false,
    };
  },
  computed: {
    ...mapState('exchanger', ['symbols', 'currentRates']),
  },
  methods: {
    ...mapActions('exchanger', ['fetchSymbols', 'fetchCurrentRates']),
    async swapCurrencies() {
      const { currencyFrom } = this;
      this.currencyFrom = this.currencyTo;
      this.currencyTo = currencyFrom;
      this.toggleSpinner();
      await this.fetchCurrentRates(this.currencyFrom);
      this.toggleSpinner();
      this.convert();
    },
    async currencyFromChanged(value) {
      this.currencyFrom = value;
      this.toggleSpinner();
      await this.fetchCurrentRates(this.currencyFrom);
      this.toggleSpinner();
      this.convert();
    },
    currencyToChanged(value) {
      this.currencyTo = value;
      this.convert();
    },
    inputFromChanged(value) {
      this.amountFrom = value;
      this.convert();
    },
    inputToChanged(value) {
      this.amountTo = value;
      this.convert();
    },
    convert() {
      this.amountTo = formatFixedDecimal(this.amountFrom * this.currentRates[this.currencyTo]);
      this.exchangeRatio = formatFixedDecimal(this.currentRates[this.currencyTo]);
    },
    toggleSpinner() {
      // this can be called from a global file for every api request
      // but in this case spinner is local
      this.spinner = !this.spinner;
    },
  },
  mounted() {
    this.fetchSymbols();
    this.fetchCurrentRates(this.currencyFrom);
    setInterval(() => {
      // we call this api to keep datas updated.
      this.fetchCurrentRates(this.currencyFrom);
    }, 60000);
  },
};
</script>

<style lang="scss" scoped>
@use '@/scss/variables';

.exchanger {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  width: 800px;
  justify-self: center;
  height: 400px;
  border-radius: 8px;
  background-color: variables.$color-white;
  box-shadow: rgb(35 55 80 / 30%) 0px 6px 12px;
  padding: 60px;
  &__glass {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;
    border-radius: 8px;
    background-color: variables.$color-blurred;
  }
  &__text {
    font-size: 36px;
    margin-bottom: 36px;
    color: variables.$color-blue;
  }
  &__widgets-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__icon {
      cursor: pointer;
    }
  }
  &__ratio-text {
    text-align: left;
    font-size: 24px;
    margin-top: 24px;
    color: variables.$color-blue;
  }
}
@media screen and (max-width: 630px) {
  .exchanger {
    &__widgets-container {
      flex-direction: column;
      height: 350px;
      &__icon {
        font-size: 26px;
      }
    }
    &__ratio-text {
      text-align: center;
    }
  }
}
</style>
