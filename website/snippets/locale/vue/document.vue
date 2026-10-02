<script setup lang="ts">
import { LocaleProvider } from '@ark-ui/vue/locale';
</script>
<template>
  <div lang="ar" dir="rtl">
    <LocaleProvider locale="ar-EG"><slot /></LocaleProvider>
  </div>
</template>