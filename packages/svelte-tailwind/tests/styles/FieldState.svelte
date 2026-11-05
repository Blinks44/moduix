<script lang="ts">
  import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@/components/field';
  import { Input } from '@/components/input';
</script>

<Field disabled id="email" invalid readOnly required data-probe="root">
  <FieldLabel>Email</FieldLabel>
  <Input />
  <FieldHelperText>Use your work email.</FieldHelperText>
  <FieldErrorText>Enter a valid email address.</FieldErrorText>
</Field>