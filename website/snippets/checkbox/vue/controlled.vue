<script setup lang="ts">
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/vue/checkbox';
import { ref } from 'vue';
import styles from '@/components/examples/checkbox/checkbox-controlled.module.css';

const checked = ref(true);
</script>

<template>
  <div :class="styles.root">
    <Checkbox :checked="checked" @checked-change="checked = $event.checked === true">
      <CheckboxControl />
      <CheckboxLabel>{{ checked ? 'Enabled' : 'Disabled' }}</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
    <output>Notifications: {{ checked ? 'enabled' : 'disabled' }}</output>
  </div>
</template>