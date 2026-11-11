<script lang="ts">
  import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@/components/field';
</script>

<Field class="w-80 max-w-sm gap-4 text-primary">
  <FieldLabel class="gap-4 text-primary">Name</FieldLabel>
  <FieldHelperText>Use your work email.</FieldHelperText>
  <FieldErrorText>Enter a valid email address.</FieldErrorText>
</Field>