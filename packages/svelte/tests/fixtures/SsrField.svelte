<script lang="ts">
  import { Field, FieldHelperText, FieldLabel } from '@/components/field';
  import { Input } from '@/components/input';

  let name = $state('Initial name');
</script>

<Field required>
  <FieldLabel>Name</FieldLabel>
  <Input bind:value={name} name="name" />
  <FieldHelperText>Use your public name.</FieldHelperText>
</Field>