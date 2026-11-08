<script lang="ts">
  import { Field, FieldHelperText, FieldLabel, FieldRequiredIndicator } from '@moduix/svelte/field';
  import { Input } from '@moduix/svelte/input';
  import styles from '@/components/examples/field/field-basic.module.css';
</script>

<Field class={styles.root} required>
  <FieldLabel>Name <FieldRequiredIndicator /></FieldLabel>
  <Input placeholder="Enter your name" />
  <FieldHelperText>Visible on your public profile.</FieldHelperText>
</Field>