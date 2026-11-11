<script lang="ts">
  import {
    Editable,
    EditableArea,
    EditableControls,
    EditableInput,
    EditableLabel,
    EditablePreview,
    type EditableRootProps,
  } from '@/components/editable';

  let { defaultValue = 'Layer name', ...props }: EditableRootProps = $props();
</script>

<Editable {defaultValue} {...props}>
  <EditableLabel>Name</EditableLabel>
  <EditableArea>
    <EditableInput />
    <EditablePreview />
  </EditableArea>
  <EditableControls />
</Editable>