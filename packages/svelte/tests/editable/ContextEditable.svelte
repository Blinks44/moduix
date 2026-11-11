<script lang="ts">
  import {
    Editable,
    EditableArea,
    EditableContext,
    EditableInput,
    EditableLabel,
    EditablePreview,
  } from '@/components/editable';
  import Status from './Status.svelte';

  let rootRef: Element | null = $state(null);
  let inputRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, inputRef });
</script>

<Editable bind:ref={rootRef} defaultValue="Context value">
  <EditableLabel>Name</EditableLabel>
  <EditableArea><EditableInput bind:ref={inputRef} /><EditablePreview /></EditableArea>
  <EditableContext>
    {#snippet render(editable)}
      <span>render:{editable().value}</span>
    {/snippet}
  </EditableContext>
  <Status />
</Editable>