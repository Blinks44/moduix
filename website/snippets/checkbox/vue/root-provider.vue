<script setup lang="ts">
import {
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
  CheckboxRootProvider,
  useCheckbox,
} from '@moduix/vue/checkbox';
import styles from '@/components/examples/checkbox/checkbox-root-provider.module.css';

const checkbox = useCheckbox({ defaultChecked: true });
</script>

<template>
  <div :class="styles.root">
    <CheckboxRootProvider :value="checkbox">
      <CheckboxControl />
      <CheckboxLabel>Managed outside the tree</CheckboxLabel>
      <CheckboxHiddenInput />
    </CheckboxRootProvider>
    <div>
      <output>{{ checkbox.checked ? 'Checked' : 'Unchecked' }}</output>
      <button type="button" @click="checkbox.setChecked(!checkbox.checked)">
        {{ checkbox.checked ? 'Uncheck' : 'Check' }}
      </button>
    </div>
  </div>
</template>