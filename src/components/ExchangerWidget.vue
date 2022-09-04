<template>
  <div class="widget">
    <a-input-group compact>
      <a-input
        v-decimal
        @change="inputChanged"
        v-model="result"
        size="large"
        class="widget__input"
      />
      <a-select
        size="large"
        class="widget__select"
        show-search
        v-model="symbol"
        :filter-option="filterOption"
        @change="handleChange"
      >
        <a-select-option v-for="(value, key) in symbols" :key="key">
          {{ key }}
        </a-select-option>
      </a-select>
    </a-input-group>
  </div>
</template>
<script>
import { Select } from 'ant-design-vue';
import { formatFixedDecimal } from '@/filters/filters';

export default {
  name: 'CurrencyExchanger',
  components: {
    'a-select': Select,
  },
  data() {
    return {
      result: 1,
      symbol: 'EUR',
    };
  },
  props: {
    symbols: {
      type: Object,
      default: () => {},
    },
    defaultSymbol: {
      type: String,
      default: 'EUR',
    },
    amount: {
      type: [Number, String],
      default: 0,
    },
  },
  watch: {
    amount(newValue, oldValue) {
      console.log(oldValue);
      this.result = newValue;
    },
    defaultSymbol(newValue) {
      this.symbol = newValue;
    },
  },
  methods: {
    handleChange(value) {
      this.$emit('currencyChanged', value);
    },
    inputChanged() {
      if (this.result === '') {
        this.result = 0;
      }
      this.$emit('inputChanged', formatFixedDecimal(this.result));
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
  },
};
</script>
<style scoped lang="scss">
@use '@/scss/variables';
.widget {
  display: flex;
  &__input {
    width: 70% !important;
  }
  &__select {
    width: 30% !important;
    ::v-deep .ant-select-selection--single {
      background-color: variables.$color-blue !important;
      color: variables.$color-white;
    }
    ::v-deep svg {
      color: variables.$color-white;
    }
  }
}
</style>
