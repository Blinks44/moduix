<script lang="ts">
  import {
    Editable,
    EditableArea,
    EditableControls,
    EditableInput,
    EditableLabel,
    EditablePreview,
  } from '@/components/editable';

  const refs: Record<'root' | 'label' | 'area' | 'input' | 'preview' | 'controls', Element | null> =
    $state({ root: null, label: null, area: null, input: null, preview: null, controls: null });

  export const getRefs = () => refs;
</script>

<Editable bind:ref={refs.root} defaultValue="Layer name" data-probe="root">
  <EditableLabel bind:ref={refs.label}>Name</EditableLabel>
  <EditableArea bind:ref={refs.area}>
    <EditableInput bind:ref={refs.input} aria-label="editable input" />
    <EditablePreview bind:ref={refs.preview} />
  </EditableArea>
  <EditableControls bind:ref={refs.controls} />
</Editable>