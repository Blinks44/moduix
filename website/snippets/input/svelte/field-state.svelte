<script lang="ts">
  import { Field, FieldErrorText, FieldLabel } from '@moduix/svelte/field';
  import { Input } from '@moduix/svelte/input';
  import styles from '@/components/examples/input/input-field-state.module.css';
</script>

<Field class={styles.root} invalid>
  <FieldLabel>Email</FieldLabel>
  <Input type="email" placeholder="name@example.com" />
  <FieldErrorText>Enter a valid email address.</FieldErrorText>
</Field>