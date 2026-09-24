<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import styles from '@/components/examples/button/button-disabled.module.css';

const labels = {
  button: 'Disabled',
  link: 'Disabled Link',
};
</script>

<template>
  <div :class="styles.root">
    <Button disabled>{{ labels.button }}</Button>
    <Button as-child disabled variant="outline">
      <a href="#button">{{ labels.link }}</a>
    </Button>
  </div>
</template>