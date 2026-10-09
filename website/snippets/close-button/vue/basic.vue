<script setup lang="ts">
import { CloseButton } from '@moduix/vue/close-button';
import { ref } from 'vue';
import styles from '@/components/examples/close-button/close-button-basic.module.css';

const isVisible = ref(true);

const handleDismiss = () => {
  isVisible.value = false;
};
</script>

<template>
  <div v-if="isVisible" :class="styles.root">
    <CloseButton
      aria-label="Dismiss notification"
      :class="styles.closeButton"
      @click="handleDismiss"
    />
    <p :class="styles.title">Draft saved</p>
    <p :class="styles.description">The notification can be dismissed.</p>
  </div>
  <output v-else>Notification dismissed</output>
</template>