<script lang="ts">
  import { useListCollection } from '@ark-ui/svelte/collection';
  import { useFilter } from '@ark-ui/svelte/locale';
  import { Button } from '@moduix/svelte/button';
  import {
    CommandPalette,
    CommandPaletteCombobox,
    CommandPaletteEmpty,
    CommandPaletteFooter,
    CommandPaletteItem,
    CommandPaletteItemDescription,
    CommandPaletteItemGroup,
    CommandPaletteItemGroupLabel,
    CommandPaletteItemIcon,
    CommandPaletteItemLabel,
    CommandPaletteItemMeta,
    CommandPaletteItemText,
    CommandPaletteKbd,
    CommandPaletteList,
    CommandPalettePanel,
    CommandPaletteSearch,
    CommandPaletteTrigger,
  } from '@moduix/svelte/command-palette';

  let lastAction = $state('No command executed yet.');
  const commandPaletteItems = [
    {
      id: 'new-project',
      section: 'Create',
      label: 'New project',
      description: 'Start a blank workspace',
      shortcut: 'N',
      icon: '＋',
    },
    {
      id: 'recent',
      section: 'Navigate',
      label: 'Open recent work',
      description: 'Jump back to a recently edited file',
      shortcut: 'R',
      icon: '↗',
    },
    {
      id: 'favorites',
      section: 'Navigate',
      label: 'View favorites',
      description: 'Show pinned dashboards and docs',
      shortcut: 'F',
      icon: '★',
    },
    {
      id: 'settings',
      section: 'System',
      label: 'Notification settings',
      description: 'Tune email and product alerts',
      icon: '•',
    },
  ];
  const actionItems = commandPaletteItems.map((item) => ({
    ...item,
    onSelect: () => (lastAction = `Executed: ${item.label}`),
  }));
  const filterOptions = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: actionItems,
    itemToString: (item) => `${item.label} ${item.description} ${item.section}`,
    itemToValue: (item) => item.id,
    filter: (itemText, filterText) => filterOptions().contains(itemText, filterText),
    groupBy: (item) => item.section,
  });
  const handleOpenChange = (details: { open: boolean }) => {
    if (!details.open) filter('');
  };
  const handleSelect = (details: { itemValue: string }) => {
    actionItems.find((item) => item.id === details.itemValue)?.onSelect();
  };
</script>

<CommandPalette aria-label="Command palette with actions" onOpenChange={handleOpenChange}>
  <CommandPaletteTrigger>
    {#snippet asChild(props)}
      <Button {...props()}>Open actions palette</Button>
    {/snippet}
  </CommandPaletteTrigger>
  <CommandPalettePanel>
    <CommandPaletteCombobox
      {collection}
      onInputValueChange={(details) => filter(details.inputValue)}
      onSelect={handleSelect}
    >
      <CommandPaletteSearch placeholder="Search and run commands..." />
      <CommandPaletteList>
        <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
        {#each collection().group() as [section, items] (section)}
          <CommandPaletteItemGroup>
            <CommandPaletteItemGroupLabel>{section}</CommandPaletteItemGroupLabel>
            {#each items as item (item.id)}
              <CommandPaletteItem {item}>
                <CommandPaletteItemIcon>{item.icon}</CommandPaletteItemIcon>
                <CommandPaletteItemText>
                  <CommandPaletteItemLabel>{item.label}</CommandPaletteItemLabel>
                  <CommandPaletteItemDescription>{item.description}</CommandPaletteItemDescription>
                </CommandPaletteItemText>
                {#if item.shortcut}
                  <CommandPaletteItemMeta>{item.shortcut}</CommandPaletteItemMeta>
                {/if}
              </CommandPaletteItem>
            {/each}
          </CommandPaletteItemGroup>
        {/each}
      </CommandPaletteList>
      <CommandPaletteFooter>
        <span><CommandPaletteKbd>Enter</CommandPaletteKbd> run</span>
      </CommandPaletteFooter>
    </CommandPaletteCombobox>
  </CommandPalettePanel>
</CommandPalette>
<div data-preview-meta>
  <output>Last action: {lastAction}</output>
</div>