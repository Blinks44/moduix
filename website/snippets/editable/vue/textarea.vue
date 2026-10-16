<script setup lang="ts">
import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/vue/editable';
import styles from '@/components/examples/editable/editable-textarea.module.css';
</script>

<template>
  <Editable
    :class="styles.root"
    default-value="Ark UI keeps the editable state, keyboard handling, and focus lifecycle."
    placeholder="Enter a description"
  >
    <EditableLabel>Description</EditableLabel>
    <EditableArea>
      <EditableInput as-child><textarea /></EditableInput>
      <EditablePreview />
    </EditableArea>
    <EditableControls />
  </Editable>
</template>