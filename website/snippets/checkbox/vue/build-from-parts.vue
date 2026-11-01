<script setup lang="ts">
import { Check as CheckIcon, Minus as MinusIcon } from '@lucide/vue';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
} from '@moduix/vue/checkbox';
</script>

<template>
  <Checkbox>
    <CheckboxControl>
      <CheckboxIndicator>
        <CheckIcon :stroke-width="3" />
      </CheckboxIndicator>
      <CheckboxIndicator indeterminate>
        <MinusIcon :stroke-width="3" />
      </CheckboxIndicator>
    </CheckboxControl>
    <CheckboxLabel>Enable notifications</CheckboxLabel>
    <CheckboxHiddenInput />
  </Checkbox>
</template>