<script lang="ts">
  import {
    Editable,
    EditableArea,
    EditableControls,
    EditableInput,
    EditableLabel,
    EditablePreview,
  } from '@/components/editable';
</script>

<Editable disabled defaultValue="Disabled value">
  <EditableLabel>Disabled name</EditableLabel>
  <EditableArea><EditableInput /><EditablePreview /></EditableArea>
  <EditableControls />
</Editable>
<Editable readOnly defaultValue="Read-only value">
  <EditableLabel>Read-only name</EditableLabel>
  <EditableArea><EditableInput /><EditablePreview /></EditableArea>
  <EditableControls />
</Editable>