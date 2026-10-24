<script setup lang="ts">
import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/vue/editable';
import { ref } from 'vue';

const value = ref('Downtown route');
import styles from '@/components/examples/editable/editable-controlled.module.css';
</script>

<template>
  <Editable :class="styles.root" v-model="value">
    <EditableLabel>Controlled value</EditableLabel>
    <EditableArea>
      <EditableInput />
      <EditablePreview />
    </EditableArea>
    <EditableControls />
  </Editable>
</template>