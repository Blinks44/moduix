<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/vue/switch';
</script>

<template>
  <Stack align="center" gap="3">
    <Switch disabled>
      <SwitchControl />
      <SwitchLabel>Enable dark mode</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
    <Switch disabled :default-checked="true">
      <SwitchControl />
      <SwitchLabel>Keep me signed in</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  </Stack>
</template>