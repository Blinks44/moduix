<script setup lang="ts">
import { Format } from '@ark-ui/vue';
import { LocaleProvider } from '@ark-ui/vue/locale';

const lastUpdatedAt = new Date(Date.now() - 24 * 60 * 60 * 1000);
</script>

<template>
  <LocaleProvider locale="fr-FR">
    <p>
      Last updated:
      <time :date-time="lastUpdatedAt.toISOString()">
        <Format.RelativeTime numeric="auto" :value="lastUpdatedAt" />
      </time>
    </p>
  </LocaleProvider>
</template>