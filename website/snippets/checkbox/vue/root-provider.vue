<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
  CheckboxRootProvider,
  useCheckbox,
} from '@moduix/vue/checkbox';
import { Stack } from '@moduix/vue/stack';

const checkbox = useCheckbox({ defaultChecked: true });
</script>

<template>
  <Stack align="center" gap="4">
    <CheckboxRootProvider :value="checkbox">
      <CheckboxControl />
      <CheckboxLabel>Managed outside the tree</CheckboxLabel>
      <CheckboxHiddenInput />
    </CheckboxRootProvider>
    <div data-preview-meta>
      <output>{{ checkbox.checked ? 'Checked' : 'Unchecked' }}</output>
      <Button
        type="button"
        size="sm"
        variant="outline"
        @click="checkbox.setChecked(!checkbox.checked)"
      >
        {{ checkbox.checked ? 'Uncheck' : 'Check' }}
      </Button>
    </div>
  </Stack>
</template>