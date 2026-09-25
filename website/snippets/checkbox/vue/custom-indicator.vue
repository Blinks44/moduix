<script setup lang="ts">
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
} from '@moduix/vue/checkbox';

const defaultChecked = true;
</script>

<template>
  <Checkbox :default-checked="defaultChecked">
    <CheckboxControl>
      <CheckboxIndicator>
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M8 3.25v9.5M3.25 8h9.5"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
          />
        </svg>
      </CheckboxIndicator>
    </CheckboxControl>
    <CheckboxLabel>Use a custom indicator icon</CheckboxLabel>
    <CheckboxHiddenInput />
  </Checkbox>
</template>