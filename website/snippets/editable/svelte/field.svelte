<script lang="ts">
  import {
    Editable,
    EditableArea,
    EditableControls,
    EditableInput,
    EditableLabel,
    EditablePreview,
  } from '@moduix/svelte/editable';
  import { Field, FieldErrorText } from '@moduix/svelte/field';
  import styles from '@/components/examples/editable/editable-field.module.css';
</script>

<Field class={styles.root} invalid>
  <Editable defaultValue="" placeholder="Click to edit your bio" required>
    <EditableLabel>Bio</EditableLabel>
    <EditableArea>
      <EditableInput />
      <EditablePreview />
    </EditableArea>
    <EditableControls />
  </Editable>
  <FieldErrorText>Bio is required.</FieldErrorText>
</Field>