<script setup lang="ts">
import { Format } from '@ark-ui/vue';
import { LocaleProvider } from '@ark-ui/vue/locale';
</script>

<template>
  <LocaleProvider locale="de-DE">
    <p>Price: <Format.Number currency="EUR" :style="'currency'" :value="1234.5" /></p>
  </LocaleProvider>
</template>