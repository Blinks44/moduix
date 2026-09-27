<script setup lang="ts">
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/vue/switch';
import { ref } from 'vue';
import styles from '@/components/examples/switch/switch-controlled.module.css';

const checked = ref(true);
</script>

<template>
  <div :class="styles.stack">
    <Switch v-model:checked="checked">
      <SwitchControl />
      <SwitchLabel>{{ checked ? 'On' : 'Off' }}</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
    <output>Current value: {{ String(checked) }}</output>
  </div>
</template>