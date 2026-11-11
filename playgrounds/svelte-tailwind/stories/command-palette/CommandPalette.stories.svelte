<script module lang="ts">
  import { useListCollection } from '@ark-ui/svelte/collection';
  import { useFilter } from '@ark-ui/svelte/locale';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    CommandPaletteEmpty,
    CommandPaletteFooter,
    CommandPaletteItem,
    CommandPaletteItemDescription,
    CommandPaletteItemLabel,
    CommandPaletteItemMeta,
    CommandPaletteItemText,
    CommandPaletteKbd,
    CommandPaletteList,
  } from '@/components/command-palette';
  import { type ActionCommandItem, commandItems } from './commandItems';
  import CommandPaletteItems from './CommandPaletteItems.svelte';
  import CommandPaletteShell from './CommandPaletteShell.svelte';

  const { Story } = defineMeta({
    title: 'Components/CommandPalette',
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  const filterOptions = useFilter({ sensitivity: 'base' });

  const useCommandCollection = <T extends (typeof commandItems)[number]>(items: T[]) =>
    useListCollection({
      initialItems: items,
      itemToString: (item) => `${item.label} ${item.description} ${item.section}`,
      itemToValue: (item) => item.id,
      filter: (itemText, filterText) => filterOptions().contains(itemText, filterText),
      groupBy: (item) => item.section,
    });

  const basic = useCommandCollection(commandItems);
  const custom = useCommandCollection(commandItems);

  let lastCommand = $state('No command executed yet.');
  const actionItems = commandItems.map<ActionCommandItem>((item) => ({
    ...item,
    onSelect: () => (lastCommand = `Executed: ${item.label}`),
  }));
  const actions = useCommandCollection(actionItems);
  const onSelect = (details: { itemValue: string }) => {
    actions
      .collection()
      .items.find((item) => item.id === details.itemValue)
      ?.onSelect();
  };
</script>

<Story name="Basic" asChild>
  <CommandPaletteShell
    collection={basic.collection()}
    filter={basic.filter}
    label="Command palette"
    placeholder="Search commands, pages, and settings..."
    shortcut="alt+k"
  >
    {#snippet trigger()}Open palette <span class="opacity-70">Alt+K</span>{/snippet}
    <CommandPaletteItems groups={basic.collection().group()} />
    <CommandPaletteFooter>
      <span class="inline-flex min-w-0 items-center gap-1"
        ><CommandPaletteKbd>Enter</CommandPaletteKbd> run</span
      >
      <span class="inline-flex min-w-0 items-center gap-1"
        ><CommandPaletteKbd>Esc</CommandPaletteKbd> close</span
      >
    </CommandPaletteFooter>
  </CommandPaletteShell>
</Story>

<Story name="Actions" asChild>
  <CommandPaletteShell
    collection={actions.collection()}
    filter={actions.filter}
    {onSelect}
    label="Command palette with actions"
    placeholder="Search and run..."
  >
    {#snippet trigger()}Open actions{/snippet}
    <CommandPaletteItems groups={actions.collection().group()} />
    <CommandPaletteFooter>
      <span class="inline-flex min-w-0 items-center gap-1"
        ><CommandPaletteKbd>Enter</CommandPaletteKbd> run</span
      ><span>{lastCommand}</span>
    </CommandPaletteFooter>
  </CommandPaletteShell>
</Story>

<Story name="Custom Composition" exportName="CustomComposition" asChild>
  <CommandPaletteShell
    collection={custom.collection()}
    filter={custom.filter}
    label="Custom command palette"
    placeholder="Jump to places, pages, and settings..."
  >
    {#snippet trigger()}Open custom palette{/snippet}
    <CommandPaletteList>
      <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
      {#each custom.collection().items as item (item.id)}
        <CommandPaletteItem {item}>
          <CommandPaletteItemText>
            <CommandPaletteItemLabel>{item.label}</CommandPaletteItemLabel>
            <CommandPaletteItemDescription>{item.description}</CommandPaletteItemDescription>
          </CommandPaletteItemText>
          {#if item.shortcut}<CommandPaletteItemMeta>{item.shortcut}</CommandPaletteItemMeta>{/if}
        </CommandPaletteItem>
      {/each}
    </CommandPaletteList>
    <CommandPaletteFooter>
      <span class="inline-flex min-w-0 items-center gap-1"
        ><CommandPaletteKbd>Alt</CommandPaletteKbd> + <CommandPaletteKbd>K</CommandPaletteKbd></span
      >
    </CommandPaletteFooter>
  </CommandPaletteShell>
</Story>