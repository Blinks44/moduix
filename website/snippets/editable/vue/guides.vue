<script setup lang="ts">
import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/vue/editable';
</script>

<template>
  <Editable
    default-value="Route"
    activation-mode="click"
    auto-resize
    :max-length="24"
    :placeholder="{
      preview: 'Click to edit',
      edit: 'Type a short name',
    }"
    :translations="{
      input: 'Route name',
      edit: 'Edit route name',
      submit: 'Save route name',
      cancel: 'Cancel route name',
    }"
  >
    <EditableLabel>Auto-resizing name</EditableLabel>
    <EditableArea>
      <EditableInput />
      <EditablePreview />
    </EditableArea>
    <EditableControls />
  </Editable>
</template>