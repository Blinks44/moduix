<script setup lang="ts">
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/vue/switch';
import styles from '@/components/examples/switch/switch-sizes.module.css';

const switchSizeOptions = [
  { label: 'Extra-small', value: 'xs' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra-large', value: 'xl' },
] as const;
</script>

<template>
  <div :class="styles.column">
    <Switch
      v-for="item in switchSizeOptions"
      :key="item.value"
      :size="item.value"
      :default-checked="true"
    >
      <SwitchControl />
      <SwitchLabel>{{ item.label }}</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  </div>
</template>