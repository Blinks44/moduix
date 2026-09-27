<script setup lang="ts">
import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/vue/editable';
import styles from '@/components/examples/editable/editable-disabled-and-read-only.module.css';
</script>

<template>
  <div :class="styles.root">
    <Editable disabled default-value="Managed by your workspace">
      <EditableLabel>Disabled name</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>

    <Editable read-only default-value="Assigned workspace">
      <EditableLabel>Read-only name</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>
  </div>
</template>