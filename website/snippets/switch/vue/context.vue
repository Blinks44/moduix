<script setup lang="ts">
import {
  Switch,
  SwitchContext,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
} from '@moduix/vue/switch';
</script>

<template>
  <Switch :default-checked="true">
    <SwitchControl />
    <SwitchContext v-slot="context">
      <SwitchLabel>Feature is {{ context.checked ? 'enabled' : 'disabled' }}</SwitchLabel>
    </SwitchContext>
    <SwitchHiddenInput />
  </Switch>
</template>