<script setup lang="ts">
import { Check as CheckIcon, Pencil as PencilIcon, X as XIcon } from '@lucide/vue';
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
import styles from '@/components/examples/editable/editable-basic.module.css';
</script>

<template>
  <Editable
    :class="styles.root"
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
    <EditableControl>
      <EditableContext v-slot="editable">
        <template v-if="editable.editing">
          <EditableSubmitTrigger><CheckIcon :stroke-width="3" /></EditableSubmitTrigger>
          <EditableCancelTrigger><XIcon :stroke-width="3" /></EditableCancelTrigger>
        </template>
        <EditableEditTrigger v-else><PencilIcon /></EditableEditTrigger>
      </EditableContext>
    </EditableControl>
  </Editable>
</template>