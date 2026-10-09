<script setup lang="ts">
import { Format } from '@ark-ui/vue';
import { LocaleProvider } from '@ark-ui/vue/locale';
</script>
<template>
  <LocaleProvider locale="fr-FR">
    <section>
      <h2>Billing summary</h2>
      <p>Formatting follows one locale context.</p>
      <p>
        Plan price:
        <strong><Format.Number currency="EUR" :style="'currency'" :value="1234.5" /></strong>
      </p>
    </section>
  </LocaleProvider>
</template>