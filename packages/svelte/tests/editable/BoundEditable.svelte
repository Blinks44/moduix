<script lang="ts">
  import {
    Editable,
    EditableArea,
    EditableControls,
    EditableInput,
    EditablePreview,
  } from '@/components/editable';

  let value = $state('Layer name');

  export const getValue = () => value;
</script>

<Editable bind:value>
  <EditableArea><EditableInput /><EditablePreview /></EditableArea>
  <EditableControls />
</Editable>