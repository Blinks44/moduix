<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchRootProvider,
  useSwitch,
} from '@moduix/vue/switch';
import styles from '@/components/examples/switch/switch-root-provider.module.css';

const switchApi = useSwitch({ defaultChecked: true });
</script>

<template>
  <div :class="styles.stack">
    <SwitchRootProvider :value="switchApi">
      <SwitchControl />
      <SwitchLabel>External state owner</SwitchLabel>
      <SwitchHiddenInput />
    </SwitchRootProvider>
    <div>
      <output>Current value: {{ String(switchApi.checked) }}</output>
      <Button variant="outline" @click="switchApi.toggleChecked">Toggle externally</Button>
    </div>
  </div>
</template>