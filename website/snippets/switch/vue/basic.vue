<script setup lang="ts">
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/vue/switch';
</script>

<template>
  <Switch :default-checked="true">
    <SwitchControl />
    <SwitchLabel>Enable notifications</SwitchLabel>
    <SwitchHiddenInput />
  </Switch>
</template>