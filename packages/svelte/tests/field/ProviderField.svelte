<script lang="ts">
  import { FieldErrorText, FieldLabel, FieldRootProvider, useField } from '@/components/field';
  import { Input } from '@/components/input';

  const field = useField({ id: 'provider-email', invalid: true });
</script>

<FieldRootProvider value={field}>
  <FieldLabel>Email</FieldLabel>
  <Input />
  <FieldErrorText>Enter a valid email address.</FieldErrorText>
</FieldRootProvider>