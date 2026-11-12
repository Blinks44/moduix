<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import { Button } from '@moduix/svelte/button';
  import {
    SelectContent,
    SelectField,
    SelectLabel,
    SelectOption,
    SelectPositioner,
    SelectRootProvider,
    useSelect,
  } from '@moduix/svelte/select';
  import styles from '@/components/examples/select/select-root-provider.module.css';

  const fruits = createListCollection({
    items: [
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
    ],
  });
  const id = $props.id();
  const select = useSelect({ id, collection: fruits, defaultValue: ['banana'] });
  const chooseBanana = () => select().setValue(['banana']);
</script>

<div class={styles.root}>
  <SelectRootProvider value={select}>
    <SelectLabel>Choose fruit</SelectLabel>
    <SelectField placeholder="Select an option" clearLabel="Clear selection" />
    <SelectPositioner>
      <SelectContent>
        {#each fruits.items as item (item.value)}
          <SelectOption {item}>{item.label}</SelectOption>
        {/each}
      </SelectContent>
    </SelectPositioner>
  </SelectRootProvider>
  <div data-preview-meta>
    <output>Selected: {select().valueAsString || 'none'}</output>
    <Button type="button" size="sm" onclick={chooseBanana}>Select banana</Button>
  </div>
</div>