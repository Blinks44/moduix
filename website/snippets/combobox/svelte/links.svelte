<script lang="ts">
  import { useListCollection } from '@ark-ui/svelte/collection';
  import { useFilter } from '@ark-ui/svelte/locale';
  import {
    Combobox,
    ComboboxContent,
    ComboboxControl,
    ComboboxInput,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxItemText,
    ComboboxLabel,
    ComboboxList,
    ComboboxPositioner,
    ComboboxTrigger,
  } from '@moduix/svelte/combobox';

  const developerResources = [
    { label: 'GitHub', href: 'https://github.com', value: 'github' },
    { label: 'Stack Overflow', href: 'https://stackoverflow.com', value: 'stack-overflow' },
    { label: 'MDN Web Docs', href: 'https://developer.mozilla.org', value: 'mdn' },
    { label: 'npm', href: 'https://www.npmjs.com', value: 'npm' },
    { label: 'TypeScript', href: 'https://www.typescriptlang.org', value: 'typescript' },
  ];
  const filterOptions = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: developerResources,
    filter: (itemText, filterText) => filterOptions().contains(itemText, filterText),
  });
</script>

<Combobox
  collection={collection()}
  selectionBehavior="preserve"
  onInputValueChange={(details) => filter(details.inputValue)}
>
  <ComboboxLabel>Developer resources</ComboboxLabel>
  <ComboboxControl>
    <ComboboxInput placeholder="e.g. GitHub" />
    <ComboboxTrigger aria-label="Open options" />
  </ComboboxControl>
  <ComboboxPositioner>
    <ComboboxContent>
      <ComboboxList>
        {#each collection().items as item (item.value)}
          <ComboboxItem {item}>
            {#snippet asChild(props)}
              <a {...props()} href={item.href} target="_blank" rel="noreferrer">
                <ComboboxItemText>{item.label}</ComboboxItemText>
                <ComboboxItemIndicator />
              </a>
            {/snippet}
          </ComboboxItem>
        {/each}
      </ComboboxList>
    </ComboboxContent>
  </ComboboxPositioner>
</Combobox>