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
    submit-mode="none"
    placeholder="Enter a description"
  >
    <EditableLabel>Description</EditableLabel>
    <EditableArea :class="styles.area">
      <EditableInput as-child :class="styles.textarea"><textarea /></EditableInput>
      <EditablePreview :class="styles.textarea" />
    </EditableArea>
    <EditableControls />
  </Editable>
</template>