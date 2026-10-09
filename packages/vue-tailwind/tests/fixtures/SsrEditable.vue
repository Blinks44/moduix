<script setup lang="ts">
import {
  Editable,
  EditableLabel,
  EditableArea,
  EditableInput,
  EditablePreview,
  EditableControls,
} from '../../src/components/editable';
</script>

<template>
  <Editable default-value="Layer name"
    ><EditableLabel>Name</EditableLabel
    ><EditableArea><EditableInput /><EditablePreview /></EditableArea><EditableControls
  /></Editable>
</template>