<script setup lang="ts">
import { Format } from '@ark-ui/vue';
</script>

<template>
  <p>
    Download size:
    <strong>
      <Format.Byte :value="1_450_450" />
    </strong>
  </p>
</template>