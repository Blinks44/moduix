<script setup lang="ts">
import { PinInput, PinInputControl, PinInputInputs, PinInputLabel } from '@moduix/vue/pin-input';
import { ref } from 'vue';
import styles from '@/components/examples/pin-input/pin-input-change-events.module.css';

const value = ref<string[]>([]);
</script>

<template>
  <div :class="styles.root">
    <PinInput
      :count="6"
      type="alphanumeric"
      :model-value="value"
      @value-change="value = $event.value"
    >
      <PinInputLabel>Invite code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
    <output>Current value: {{ value.join('') || 'empty' }}</output>
  </div>
</template>