<script lang="ts">
  import { Field, FieldLabel } from '@moduix/svelte/field';
  import { InputGroup, InputGroupClearTrigger, InputGroupInput } from '@moduix/svelte/input-group';
  import styles from '@/components/examples/input-group/input-group-clear-trigger.module.css';

  let query = $state('moduix');
  let input: Element | null = $state(null);
  const handleClear = () => {
    query = '';
    if (input instanceof HTMLInputElement) input.focus();
  };
</script>

<Field class={styles.root}>
  <FieldLabel>Search</FieldLabel>
  <InputGroup>
    <InputGroupInput bind:ref={input} bind:value={query} placeholder="Search…" />
    {#if query}
      <InputGroupClearTrigger aria-label="Clear search" onclick={handleClear} />
    {/if}
  </InputGroup>
</Field>