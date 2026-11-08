<script lang="ts">
  import {
    Editable,
    EditableArea,
    EditableControls,
    EditableInput,
    EditableLabel,
    EditablePreview,
  } from '@moduix/svelte/editable';
  import styles from '@/components/examples/editable/editable-textarea.module.css';
</script>

<Editable
  class={styles.root}
  defaultValue="Ark UI keeps the editable state, keyboard handling, and focus lifecycle."
  placeholder="Enter a description"
>
  <EditableLabel>Description</EditableLabel>
  <EditableArea>
    <EditableInput>
      {#snippet asChild(props)}
        <textarea {...props()}></textarea>
      {/snippet}
    </EditableInput>
    <EditablePreview />
  </EditableArea>
  <EditableControls />
</Editable>