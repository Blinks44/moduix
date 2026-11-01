<script setup lang="ts">
import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchThumb,
} from '@moduix/vue/switch';
</script>

<template>
  <Switch :default-checked="true">
    <SwitchControl>
      <SwitchThumb />
    </SwitchControl>
    <SwitchLabel>Enable notifications</SwitchLabel>
    <SwitchHiddenInput />
  </Switch>
</template>