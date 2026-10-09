<script setup lang="ts">
import { Star as StarIcon } from '@lucide/vue';
import { Toggle } from '@moduix/vue/toggle';
</script>

<template>
  <Toggle default-pressed>
    <StarIcon aria-hidden="true" focusable="false" />
    Favorite
  </Toggle>
</template>