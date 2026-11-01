<script setup lang="ts">
import { PinInput, PinInputControl, PinInputInputs, PinInputLabel } from '@moduix/vue/pin-input';
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';

const value = ref<string[]>([]);
</script>

<template>
  <Stack align="center" gap="4">
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
  </Stack>
</template>