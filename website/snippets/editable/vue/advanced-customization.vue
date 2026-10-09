<script setup lang="ts">
import {
  Editable,
  EditableArea,
  EditableContext,
  EditableControl,
  EditableEditTrigger,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/vue/editable';
</script>

<template>
  <Editable default-value="Service area">
    <EditableLabel>Name</EditableLabel>
    <EditableArea>
      <EditableInput />
      <EditablePreview />
    </EditableArea>
    <EditableContext v-slot="editable">
      <span v-if="editable.editing">Enter to save, Esc to cancel.</span>
      <EditableControl v-else>
        <EditableEditTrigger />
      </EditableControl>
    </EditableContext>
  </Editable>
</template>