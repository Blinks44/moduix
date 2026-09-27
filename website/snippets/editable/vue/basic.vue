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
    default-value="Layer name"
    :translations="{
      input: 'Layer name',
      edit: 'Edit layer name',
      submit: 'Save layer name',
      cancel: 'Cancel layer name',
    }"
  >
    <EditableLabel>Name</EditableLabel>
    <EditableArea>
      <EditableInput />
      <EditablePreview />
    </EditableArea>
    <EditableControls />
  </Editable>
</template>