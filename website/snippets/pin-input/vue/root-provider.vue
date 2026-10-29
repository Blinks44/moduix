<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  PinInputControl,
  PinInputInput,
  PinInputLabel,
  PinInputRootProvider,
  usePinInput,
} from '@moduix/vue/pin-input';
import { Stack } from '@moduix/vue/stack';

const pinInput = usePinInput({ count: 6 });
const indexes = [0, 1, 2, 3, 4, 5];
</script>

<template>
  <Stack align="center" gap="4">
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
  </Stack>
</template>