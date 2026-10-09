<script setup lang="ts">
import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/vue/editable';
import { Field, FieldErrorText } from '@moduix/vue/field';
import styles from '@/components/examples/editable/editable-field.module.css';
</script>

<template>
  <Field :class="styles.root" invalid>
    <Editable default-value="" placeholder="Click to edit your bio" required>
      <EditableLabel>Bio</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>
    <FieldErrorText>Bio is required.</FieldErrorText>
  </Field>
</template>