<script lang="ts">
  import { Field, FieldHelperText, FieldLabel } from '@moduix/svelte/field';
  import { Input } from '@moduix/svelte/input';
  import styles from '@/components/examples/input/input-file-input.module.css';
</script>

<Field class={styles.root}>
  <FieldLabel>Attachment</FieldLabel>
  <Input accept=".pdf,.png" type="file" />
  <FieldHelperText>Choose a PDF or PNG file.</FieldHelperText>
</Field>