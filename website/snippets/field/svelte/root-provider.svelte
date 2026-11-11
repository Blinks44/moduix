<script lang="ts">
  import { FieldHelperText, FieldLabel, FieldRootProvider, useField } from '@moduix/svelte/field';
  import { Input } from '@moduix/svelte/input';
  import styles from '@/components/examples/field/field-root-provider.module.css';

  const id = $props.id();
  const field = useField({ id, required: true });
</script>

<FieldRootProvider class={styles.root} value={field}>
  <FieldLabel>Project key</FieldLabel>
  <Input placeholder="MAPS" />
  <FieldHelperText>The field state is created outside the rendered tree.</FieldHelperText>
</FieldRootProvider>