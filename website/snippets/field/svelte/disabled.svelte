<script lang="ts">
  import { Field, FieldHelperText, FieldLabel } from '@moduix/svelte/field';
  import { Input } from '@moduix/svelte/input';
  import styles from '@/components/examples/field/field-disabled.module.css';
</script>

<Field class={styles.root} disabled>
  <FieldLabel>Organization</FieldLabel>
  <Input placeholder="Acme Inc." />
  <FieldHelperText>This field is currently managed by your workspace.</FieldHelperText>
</Field>