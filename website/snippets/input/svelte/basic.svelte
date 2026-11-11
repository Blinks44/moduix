<script lang="ts">
  import { Field, FieldHelperText, FieldLabel } from '@moduix/svelte/field';
  import { Input } from '@moduix/svelte/input';
  import styles from '@/components/examples/input/input-basic.module.css';
</script>

<Field class={styles.root}>
  <FieldLabel>Name</FieldLabel>
  <FieldHelperText>Used in your public workspace profile.</FieldHelperText>
  <Input name="name" placeholder="Enter your name" />
</Field>