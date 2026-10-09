<script setup lang="ts">
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/vue/switch';
import styles from '@/components/examples/switch/switch-disabled.module.css';
</script>

<template>
  <div :class="styles.stack">
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
  </div>
</template>