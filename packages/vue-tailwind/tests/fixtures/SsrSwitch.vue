<script setup lang="ts">
import { Switch, SwitchControl, SwitchLabel, SwitchHiddenInput } from '../../src';
</script>

<template>
  <Switch :default-checked="true">
    <SwitchControl />
    <SwitchLabel>Server rendered switch</SwitchLabel>
    <SwitchHiddenInput />
  </Switch>
</template>