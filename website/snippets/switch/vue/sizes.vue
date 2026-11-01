<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/vue/switch';

const switchSizeOptions = [
  { label: 'Extra-small', value: 'xs' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra-large', value: 'xl' },
] as const;
</script>

<template>
  <Stack align="flex-start" gap="3">
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
  </Stack>
</template>