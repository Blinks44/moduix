<script lang="ts">
  import { Check as CheckIcon, Pencil as PencilIcon, X as XIcon } from '@lucide/svelte';
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
  } from '@moduix/svelte/editable';
  import styles from '@/components/examples/editable/editable-basic.module.css';
</script>

<Editable
  class={styles.root}
  defaultValue="Layer name"
  translations={{
    input: 'Layer name',
    edit: 'Edit layer name',
    submit: 'Save layer name',
    cancel: 'Cancel layer name',
  }}
>
  <EditableLabel>Name</EditableLabel>
  <EditableArea>
    <EditableInput />
    <EditablePreview />
  </EditableArea>
  <EditableControl>
    <EditableContext>
      {#snippet render(editable)}
        {#if editable().editing}
          <EditableSubmitTrigger><CheckIcon strokeWidth={3} /></EditableSubmitTrigger>
          <EditableCancelTrigger><XIcon strokeWidth={3} /></EditableCancelTrigger>
        {:else}
          <EditableEditTrigger><PencilIcon /></EditableEditTrigger>
        {/if}
      {/snippet}
    </EditableContext>
  </EditableControl>
</Editable>