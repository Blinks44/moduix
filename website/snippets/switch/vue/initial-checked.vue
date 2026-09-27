<script setup lang="ts">
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/vue/switch';
</script>

<template>
  <Switch :default-checked="true">
    <SwitchControl />
    <SwitchLabel>Start enabled</SwitchLabel>
    <SwitchHiddenInput />
  </Switch>
</template>