<script setup lang="ts">
import { Format } from '@ark-ui/vue';
</script>

<template>
  <dl>
    <div>
      <dt>Revenue</dt>
      <dd>
        <Format.Number currency="USD" :style="'currency'" :value="12_450.75" />
      </dd>
    </div>
    <div>
      <dt>Conversion</dt>
      <dd>
        <Format.Number :maximum-fraction-digits="1" :style="'percent'" :value="0.0642" />
      </dd>
    </div>
    <div>
      <dt>Impressions</dt>
      <dd>
        <Format.Number notation="compact" :value="125_000" />
      </dd>
    </div>
    <div>
      <dt>Distance</dt>
      <dd>
        <Format.Number :style="'unit'" unit="kilometer" unit-display="long" :value="12.5" />
      </dd>
    </div>
  </dl>
</template>