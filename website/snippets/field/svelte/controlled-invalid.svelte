<script lang="ts">
  import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@moduix/svelte/field';
  import { Input } from '@moduix/svelte/input';
  import styles from '@/components/examples/field/field-controlled-invalid.module.css';

  let value = $state('');
  const invalid = $derived(value.length > 0 && value.length < 3);
</script>

<Field class={styles.root} {invalid}>
  <FieldLabel>Username</FieldLabel>
  <Input bind:value placeholder="e.g. vinny" />
  <FieldHelperText>Use at least 3 characters.</FieldHelperText>
  <FieldErrorText>Username must be at least 3 characters.</FieldErrorText>
</Field>