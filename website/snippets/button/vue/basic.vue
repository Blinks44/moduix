<script setup lang="ts">
import { Button } from '@moduix/vue/button';

const labels = { save: 'Save Changes' };
</script>

<template>
  <Button>{{ labels.save }}</Button>
</template>