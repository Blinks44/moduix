<script setup lang="ts">
import { ref } from 'vue';
import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '../src/components/editable';

const value = ref('Layer name');
</script>

<template>
  <Editable v-model="value" data-probe="editable">
    <EditableLabel>Name</EditableLabel>
    <EditableArea>
      <EditableInput />
      <EditablePreview />
    </EditableArea>
    <EditableControls />
  </Editable>
</template>