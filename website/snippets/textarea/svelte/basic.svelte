<script lang="ts">
  import { Field, FieldHelperText, FieldLabel } from '@moduix/svelte/field';
  import { Textarea } from '@moduix/svelte/textarea';
  import styles from '@/components/examples/textarea/textarea-basic.module.css';
</script>

<Field class={styles.root}>
  <FieldLabel>Comment</FieldLabel>
  <FieldHelperText>Included in the issue summary visible to the whole team.</FieldHelperText>
  <Textarea placeholder="Write a short comment" />
</Field>