<script lang="ts">
  import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@moduix/svelte/field';
  import { Input } from '@moduix/svelte/input';
  import styles from '@/components/examples/field/field-invalid.module.css';
</script>

<Field class={styles.root} invalid required>
  <FieldLabel>Email</FieldLabel>
  <Input type="email" placeholder="name@example.com" />
  <FieldHelperText>Use your work email.</FieldHelperText>
  <FieldErrorText>Enter a valid email address.</FieldErrorText>
</Field>