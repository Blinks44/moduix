<script setup lang="ts">
import { Format } from '@ark-ui/vue';
import { LocaleProvider } from '@ark-ui/vue/locale';
</script>

<template>
  <LocaleProvider locale="fr-FR">
    <Format.Byte :value="1_450.45" />
  </LocaleProvider>
</template>