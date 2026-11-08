<script lang="ts">
  import { Field, FieldLabel } from '@moduix/svelte/field';
  import { Textarea } from '@moduix/svelte/textarea';
  import styles from '@/components/examples/textarea/textarea-controlled.module.css';

  let value = $state('');
</script>

<Field class={styles.root}>
  <FieldLabel>Feedback</FieldLabel>
  <Textarea bind:value placeholder="Type to control value" />
</Field>