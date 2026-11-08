<script lang="ts">
  import { Button } from '@moduix/svelte/button';
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
  import styles from '@/components/examples/editable/editable-custom-triggers.module.css';
</script>

<Editable
  class={styles.root}
  defaultValue="Service area"
  translations={{ edit: 'Rename', submit: 'Save', cancel: 'Cancel' }}
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
          <EditableSubmitTrigger>
            {#snippet asChild(props)}
              <Button {...props()}>Save</Button>
            {/snippet}
          </EditableSubmitTrigger>
          <EditableCancelTrigger>
            {#snippet asChild(props)}
              <Button {...props()} variant="outline">Cancel</Button>
            {/snippet}
          </EditableCancelTrigger>
        {:else}
          <EditableEditTrigger>
            {#snippet asChild(props)}
              <Button {...props()} variant="outline">Rename</Button>
            {/snippet}
          </EditableEditTrigger>
        {/if}
      {/snippet}
    </EditableContext>
  </EditableControl>
</Editable>