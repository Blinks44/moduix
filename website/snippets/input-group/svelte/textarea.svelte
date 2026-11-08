<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Field, FieldLabel } from '@moduix/svelte/field';
  import { InputGroup, InputGroupAddon, InputGroupTextarea } from '@moduix/svelte/input-group';
  import styles from '@/components/examples/input-group/input-group-textarea.module.css';

  const maxLength = 280;
  let value = $state('');
</script>

<Field class={styles.root}>
  <FieldLabel>Message</FieldLabel>
  <InputGroup>
    <InputGroupTextarea bind:value autoresize maxlength={maxLength} placeholder="Write a reply" />
    <InputGroupAddon align="block">
      {value.length}/{maxLength}
      <Button class={styles.send} size="sm" disabled={!value.trim()}>Send</Button>
    </InputGroupAddon>
  </InputGroup>
</Field>