<script setup lang="ts">
import { Switch, SwitchControl, SwitchLabel, SwitchHiddenInput } from '@/index';
</script>

<template>
  <Switch :default-checked="true">
    <SwitchControl />
    <SwitchLabel>Server rendered switch</SwitchLabel>
    <SwitchHiddenInput />
  </Switch>
</template>