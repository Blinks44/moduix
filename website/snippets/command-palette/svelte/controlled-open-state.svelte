<script lang="ts">
  import { useListCollection } from '@ark-ui/svelte/collection';
  import { useFilter } from '@ark-ui/svelte/locale';
  import { Button } from '@moduix/svelte/button';
  import {
    CommandPalette,
    CommandPaletteCombobox,
    CommandPaletteEmpty,
    CommandPaletteItem,
    CommandPaletteItemDescription,
    CommandPaletteItemGroup,
    CommandPaletteItemGroupLabel,
    CommandPaletteItemIcon,
    CommandPaletteItemLabel,
    CommandPaletteItemMeta,
    CommandPaletteItemText,
    CommandPaletteList,
    CommandPalettePanel,
    CommandPaletteSearch,
    CommandPaletteTrigger,
  } from '@moduix/svelte/command-palette';
  import styles from '@/components/examples/command-palette/command-palette-controlled-open-state.module.css';

  const commandItems = [
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
  let open = $state(false);
  const filterOptions = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: commandItems,
    itemToString: (item) => `${item.label} ${item.description} ${item.section}`,
    itemToValue: (item) => item.id,
    filter: (itemText, filterText) => filterOptions().contains(itemText, filterText),
    groupBy: (item) => item.section,
  });

  const handleOpenChange = (details: { open: boolean }) => {
    if (!details.open) filter('');
  };
</script>

<CommandPalette bind:open aria-label="Controlled command palette" onOpenChange={handleOpenChange}>
  <CommandPaletteTrigger>
    {#snippet asChild(props)}
      <Button {...props()}>Search actions</Button>
    {/snippet}
  </CommandPaletteTrigger>
  <CommandPalettePanel class={styles.compactPalette}>
    <CommandPaletteCombobox
      {collection}
      onInputValueChange={(details) => filter(details.inputValue)}
    >
      <CommandPaletteSearch placeholder="Search controlled commands..." />
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
    </CommandPaletteCombobox>
  </CommandPalettePanel>
</CommandPalette>