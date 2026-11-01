<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Stack } from '@moduix/vue/stack';
import {
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchRootProvider,
  useSwitch,
} from '@moduix/vue/switch';

const switchApi = useSwitch({ defaultChecked: true });
</script>

<template>
  <Stack align="center" gap="3">
    <SwitchRootProvider :value="switchApi">
      <SwitchControl />
      <SwitchLabel>External state owner</SwitchLabel>
      <SwitchHiddenInput />
    </SwitchRootProvider>
    <div>
      <output>Current value: {{ String(switchApi.checked) }}</output>
      <Button variant="outline" @click="switchApi.toggleChecked">Toggle externally</Button>
    </div>
  </Stack>
</template>