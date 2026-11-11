<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import SearchIcon from '@lucide/svelte/icons/search';
  import { Input } from '@moduix/svelte/input';
  import {
    Select,
    SelectContent,
    SelectField,
    SelectLabel,
    SelectOption,
    SelectPositioner,
  } from '@moduix/svelte/select';
  import { tick } from 'svelte';
  import styles from '@/components/examples/select/select-search-in-popup.module.css';

  const fruits = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
    { label: 'Grape', value: 'grape' },
    { label: 'Kiwi', value: 'kiwi' },
    { label: 'Mango', value: 'mango' },
    { label: 'Orange', value: 'orange' },
    { label: 'Pineapple', value: 'pineapple' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Watermelon', value: 'watermelon' },
  ];
  let open = $state(false);
  let query = $state('');
  let input = $state<HTMLInputElement | null>(null);
  let popup = $state<HTMLElement | null>(null);
  const collection = $derived(
    createListCollection({
      items: fruits.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
    }),
  );
  $effect(() => {
    if (open) tick().then(() => input?.focus());
    else query = '';
  });
  function keepPopupOpen(event: { detail: { target: EventTarget }; preventDefault: () => void }) {
    if (event.detail.target instanceof Node && popup?.contains(event.detail.target))
      event.preventDefault();
  }
</script>

<Select
  bind:open
  {collection}
  lazyMount
  unmountOnExit
  onFocusOutside={keepPopupOpen}
  onInteractOutside={keepPopupOpen}
>
  <SelectLabel>Choose fruit</SelectLabel>
  <SelectField placeholder="Search or select a fruit" clearLabel="Clear selection" />
  <SelectPositioner>
    <div bind:this={popup} class={styles.popup}>
      <div class={styles.popupHeader}>
        <SearchIcon aria-hidden="true" /><Input
          bind:ref={input}
          aria-label="Filter fruits"
          bind:value={query}
          placeholder="Filter fruits"
        />
      </div>
      <SelectContent class={styles.popupContent}>
        {#if collection.items.length}
          {#each collection.items as item (item.value)}
            <SelectOption {item}>{item.label}</SelectOption>
          {/each}
        {:else}
          <div class={styles.popupEmpty} role="presentation">No fruits found.</div>
        {/if}
      </SelectContent>
    </div>
  </SelectPositioner>
</Select>