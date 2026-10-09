<script setup lang="ts">
import { Format } from '@ark-ui/vue';
import { LocaleProvider } from '@ark-ui/vue/locale';

const updatedAt = new Date('2026-01-15T17:15:00Z');
</script>

<template>
  <LocaleProvider locale="fr-FR">
    <dl>
      <div>
        <dt>Schedule</dt>
        <dd>
          <Format.Time value="17:15" />
        </dd>
      </div>
      <div>
        <dt>Updated</dt>
        <dd>
          <Format.Time :value="updatedAt" />
        </dd>
      </div>
    </dl>
  </LocaleProvider>
</template>