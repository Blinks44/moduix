<script lang="ts">
  import {
    Editable,
    EditableArea,
    EditableControls,
    EditableInput,
    EditableLabel,
    EditablePreview,
  } from '@/components/editable';
  import { Field, FieldErrorText } from '@/components/field';
</script>

<Field disabled id="layer-name" invalid readOnly required>
  <Editable defaultValue="Layer name">
    <EditableLabel>Layer name</EditableLabel>
    <EditableArea><EditableInput /><EditablePreview /></EditableArea>
    <EditableControls />
  </Editable>
  <FieldErrorText>Required</FieldErrorText>
</Field>