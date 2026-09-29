<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  PinInputControl,
  PinInputInput,
  PinInputLabel,
  PinInputRootProvider,
  usePinInput,
} from '@moduix/vue/pin-input';
import styles from '@/components/examples/pin-input/pin-input-root-provider.module.css';

const pinInput = usePinInput({ count: 6 });
const indexes = [0, 1, 2, 3, 4, 5];
</script>

<template>
  <div :class="styles.root">
    <PinInputRootProvider :value="pinInput">
      <PinInputLabel>Verification code</PinInputLabel>
      <PinInputControl>
        <PinInputInput v-for="index in indexes" :key="index" :index="index" />
      </PinInputControl>
    </PinInputRootProvider>

    <div>
      <Button type="button" size="sm" variant="outline" @click="pinInput.focus()">Focus</Button>
      <Button type="button" size="sm" variant="outline" @click="pinInput.clearValue()">
        Clear
      </Button>
    </div>
  </div>
</template>