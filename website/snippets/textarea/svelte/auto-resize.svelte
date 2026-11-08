<script lang="ts">
  import { Field, FieldLabel } from '@moduix/svelte/field';
  import { Textarea } from '@moduix/svelte/textarea';
  import styles from '@/components/examples/textarea/textarea-auto-resize.module.css';
</script>

<Field class={styles.root}>
  <FieldLabel>Issue description</FieldLabel>
  <Textarea
    autoresize
    placeholder="Start typing a longer description. Height grows with content."
  />
</Field>