<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableRootProvider,
  useEditable,
} from '@moduix/vue/editable';
import styles from '@/components/examples/editable/editable-root-provider.module.css';

const editable = useEditable({
  activationMode: 'dblclick',
  defaultValue: 'Root provider value',
});
</script>

<template>
  <div :class="styles.root">
    <EditableRootProvider :value="editable">
      <EditableLabel>External state</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </EditableRootProvider>
    <div :class="styles.meta" data-preview-meta>
      <Button type="button" size="sm" @click="editable.edit()">Edit</Button>
    </div>
  </div>
</template>