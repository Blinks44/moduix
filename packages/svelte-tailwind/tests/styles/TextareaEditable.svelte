<script lang="ts">
  import {
    Editable,
    EditableArea,
    EditableControls,
    EditableInput,
    EditableLabel,
    EditablePreview,
  } from '@/components/editable';

  let { commits }: { commits: string[] } = $props();
</script>

<Editable
  defaultEdit
  defaultValue="Draft description"
  onValueCommit={(details) => commits.push(details.value)}
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