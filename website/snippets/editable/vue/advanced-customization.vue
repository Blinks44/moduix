<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Editable,
  EditableArea,
  EditableCancelTrigger,
  EditableContext,
  EditableControl,
  EditableEditTrigger,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableSubmitTrigger,
} from '@moduix/vue/editable';
import styles from '@/components/examples/editable/editable-advanced-customization.module.css';
</script>

<template>
  <Editable
    :class="styles.root"
    default-value="Service area"
    :translations="{ edit: 'Rename', submit: 'Save', cancel: 'Cancel' }"
  >
    <EditableLabel>Name</EditableLabel>
    <EditableArea>
      <EditableInput />
      <EditablePreview />
    </EditableArea>
    <EditableControl>
      <EditableContext v-slot="editable">
        <template v-if="editable.editing">
          <EditableSubmitTrigger as-child><Button>Save</Button></EditableSubmitTrigger>
          <EditableCancelTrigger as-child
            ><Button variant="outline">Cancel</Button></EditableCancelTrigger
          >
        </template>
        <EditableEditTrigger v-else as-child
          ><Button variant="outline">Rename</Button></EditableEditTrigger
        >
      </EditableContext>
    </EditableControl>
  </Editable>
</template>