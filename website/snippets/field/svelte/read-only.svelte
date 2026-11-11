<script lang="ts">
  import { Field, FieldHelperText, FieldLabel } from '@moduix/svelte/field';
  import { Input } from '@moduix/svelte/input';
  import styles from '@/components/examples/field/field-read-only.module.css';
</script>

<Field class={styles.root} readOnly>
  <FieldLabel>Workspace key</FieldLabel>
  <Input value="MAPS" />
  <FieldHelperText>Read-only state is propagated to the input.</FieldHelperText>
</Field>