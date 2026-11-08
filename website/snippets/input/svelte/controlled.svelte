<script lang="ts">
  import { Field, FieldLabel } from '@moduix/svelte/field';
  import { Input } from '@moduix/svelte/input';
  import styles from '@/components/examples/input/input-controlled.module.css';

  let value = $state('');
</script>

<Field class={styles.root}>
  <FieldLabel>Username</FieldLabel>
  <Input bind:value placeholder="Type to control value" />
</Field>