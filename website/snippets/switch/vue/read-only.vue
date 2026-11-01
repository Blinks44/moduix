<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/vue/switch';
</script>

<template>
  <Stack align="flex-start" gap="3">
    <Switch read-only>
      <SwitchControl />
      <SwitchLabel>Managed by policy</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
    <Switch read-only :default-checked="true">
      <SwitchControl />
      <SwitchLabel>Always on</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  </Stack>
</template>