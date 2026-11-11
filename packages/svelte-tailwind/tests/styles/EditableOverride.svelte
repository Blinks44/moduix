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

<Editable class="max-w-md gap-0">
  <EditableLabel>Name</EditableLabel>
  <EditableArea class="border-primary px-6"><EditableInput /><EditablePreview /></EditableArea>
  <EditableControls />
</Editable>