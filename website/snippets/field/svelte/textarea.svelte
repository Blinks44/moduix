<script lang="ts">
  import { Field, FieldHelperText, FieldLabel } from '@moduix/svelte/field';
  import { Textarea } from '@moduix/svelte/textarea';
  import styles from '@/components/examples/field/field-textarea.module.css';
</script>

<Field class={styles.root}>
  <FieldLabel>Summary</FieldLabel>
  <Textarea autoresize placeholder="Describe the request" />
  <FieldHelperText>The textarea grows as the content expands.</FieldHelperText>
</Field>