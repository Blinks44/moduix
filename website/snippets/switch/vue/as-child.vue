<script setup lang="ts">
import { Switch, SwitchControl, SwitchHiddenInput } from '@moduix/vue/switch';
import styles from '@/components/examples/switch/switch-as-child.module.css';
</script>

<template>
  <Switch as-child :default-checked="true">
    <label :class="styles.siblingRow">
      <SwitchControl />
      <span :class="styles.label">Enable reminders</span>
      <SwitchHiddenInput />
    </label>
  </Switch>
</template>