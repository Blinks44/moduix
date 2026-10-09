<script setup lang="ts">
import { Format } from '@ark-ui/vue';
</script>

<template>
  <p>
    Available balance:
    <strong>
      <Format.Number :value="12_345.67" />
    </strong>
  </p>
</template>