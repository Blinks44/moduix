<script lang="ts">
  import { Field, FieldErrorText } from '@/components/field';
  import { Input } from '@/components/input';

  let { invalid = false }: { invalid?: boolean } = $props();
</script>

<Field {invalid}>
  <Input aria-label="Email" />
  <FieldErrorText>Enter a valid email address.</FieldErrorText>
</Field>