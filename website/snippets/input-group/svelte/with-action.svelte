<script lang="ts">
  import { Field, FieldLabel } from '@moduix/svelte/field';
  import { InputGroup, InputGroupButton, InputGroupInput } from '@moduix/svelte/input-group';
  import styles from '@/components/examples/input-group/input-group-with-action.module.css';

  let value = $state('');
</script>

<Field class={styles.root}>
  <FieldLabel>Invite by email</FieldLabel>
  <InputGroup>
    <InputGroupInput bind:value type="email" placeholder="name@example.com" />
    <InputGroupButton disabled={!value}>Send</InputGroupButton>
  </InputGroup>
</Field>