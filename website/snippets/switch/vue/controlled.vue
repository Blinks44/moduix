<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/vue/switch';
import { ref } from 'vue';

const checked = ref(true);
</script>

<template>
  <Stack align="center" gap="3">
    <Switch v-model:checked="checked">
      <SwitchControl />
      <SwitchLabel>{{ checked ? 'On' : 'Off' }}</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
    <div data-preview-meta>
      <output>Current value: {{ String(checked) }}</output>
    </div>
  </Stack>
</template>