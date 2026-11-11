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
      id: 'invite-team',
      section: 'Create',
      label: 'Invite teammates',
      description: 'Send access to the current organization',
      shortcut: 'I',
      icon: '＋',
    },
    {
      id: 'recent',
      section: 'Navigate',
      label: 'Open recent work',
      description: 'Jump back to a recently edited file',
      shortcut: '↗',
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
      id: 'notifications',
      section: 'System',
      label: 'Notification settings',
      description: 'Tune email and product alerts',
      icon: '•',
    },
    {
      id: 'release-notes',
      section: 'System',
      label: 'Release notes',
      description: 'Read the latest product changes',
      icon: '↗',
    },
  ];
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

<CommandPalette aria-label="Command palette" onOpenChange={handleOpenChange}>
  <CommandPaletteTrigger>
    {#snippet asChild(props)}
      <Button {...props()}>Open palette</Button>
    {/snippet}
  </CommandPaletteTrigger>
  <CommandPalettePanel>
    <CommandPaletteCombobox
      {collection}
      onInputValueChange={(details) => filter(details.inputValue)}
    >
      <CommandPaletteSearch placeholder="Search commands, pages, and settings..." />
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
        <span><CommandPaletteKbd>Esc</CommandPaletteKbd> close</span>
      </CommandPaletteFooter>
    </CommandPaletteCombobox>
  </CommandPalettePanel>
</CommandPalette>