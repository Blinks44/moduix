<script setup lang="ts">
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/vue/switch';
import styles from '@/components/examples/switch/switch-read-only.module.css';
</script>

<template>
  <div :class="styles.column">
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
  </div>
</template>