<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    CommandPalette,
    CommandPaletteCombobox,
    CommandPaletteItem,
    CommandPaletteList,
    CommandPalettePanel,
    CommandPaletteSearch,
    CommandPaletteTrigger,
  } from '@/components/command-palette';
  import { InputGroup, InputGroupInput, InputGroupTextarea } from '@/components/input-group';
  import { MenuItem } from '@/components/menu';
  import {
    Sidebar,
    SidebarInput,
    SidebarInset,
    SidebarPanel,
    SidebarResizeTrigger,
  } from '@/components/sidebar';
  import {
    SplitButton,
    SplitButtonAction,
    SplitButtonContent,
    SplitButtonPositioner,
    SplitButtonTrigger,
  } from '@/components/split-button';
  import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group';

  const commands = createListCollection({
    items: [
      { label: 'Open settings', value: 'settings' },
      { label: 'Open files', value: 'files' },
    ],
  });

  let toggleValue = $state(['a']);
  let splitOpen = $state(false);
  let splitHighlight = $state<string | null>('save');
  let splitTrigger = $state<string | null>(null);
  let paletteOpen = $state(false);
  let paletteInput = $state('');
  let paletteValue = $state<string[]>([]);
  let paletteHighlight = $state<string | null>('settings');
  let sidebarSize = $state<(number | string)[]>([20, 80]);
  let groupInput = $state('initial');
  let groupTextarea = $state('initial');
  let sidebarInput = $state('initial');

  export const write = (key: string) => {
    if (key === 'toggleValue') toggleValue = ['b'];
    if (key === 'splitOpen') splitOpen = true;
    if (key === 'splitHighlight') splitHighlight = 'draft';
    if (key === 'paletteOpen') paletteOpen = true;
    if (key === 'paletteInput') paletteInput = 'ext';
    if (key === 'paletteValue') paletteValue = ['files'];
    if (key === 'paletteHighlight') paletteHighlight = 'files';
    if (key === 'sidebarSize') sidebarSize = [30, 70];
    if (key === 'groupInput') groupInput = 'ext';
    if (key === 'groupTextarea') groupTextarea = 'ext';
    if (key === 'sidebarInput') sidebarInput = 'ext';
  };
  export const read = () => ({
    toggleValue,
    splitOpen,
    splitHighlight,
    splitTrigger,
    paletteOpen,
    paletteInput,
    paletteValue,
    paletteHighlight,
    sidebarSize,
    groupInput,
    groupTextarea,
    sidebarInput,
  });
</script>

<ToggleGroup bind:value={toggleValue} aria-label="Bound toggle group">
  <ToggleGroupItem value="a">Toggle A</ToggleGroupItem>
  <ToggleGroupItem value="b">Toggle B</ToggleGroupItem>
</ToggleGroup>

<SplitButton
  bind:open={splitOpen}
  bind:highlightedValue={splitHighlight}
  bind:triggerValue={splitTrigger}
  portalled={false}
>
  <SplitButtonAction>Bound split</SplitButtonAction>
  <SplitButtonTrigger aria-label="Bound split menu" />
  <SplitButtonPositioner>
    <SplitButtonContent data-testid="split-content">
      <MenuItem value="save">Save</MenuItem>
      <MenuItem value="draft">Draft</MenuItem>
    </SplitButtonContent>
  </SplitButtonPositioner>
</SplitButton>

<CommandPalette bind:open={paletteOpen} aria-label="Bound palette" portalled={false}>
  <CommandPaletteTrigger>Bound palette trigger</CommandPaletteTrigger>
  <CommandPalettePanel>
    <CommandPaletteCombobox
      collection={commands}
      closeOnSelect={false}
      bind:inputValue={paletteInput}
      bind:value={paletteValue}
      bind:highlightedValue={paletteHighlight}
    >
      <CommandPaletteSearch />
      <CommandPaletteList>
        {#each commands.items as item (item.value)}
          <CommandPaletteItem {item}>{item.label}</CommandPaletteItem>
        {/each}
      </CommandPaletteList>
    </CommandPaletteCombobox>
  </CommandPalettePanel>
</CommandPalette>

<div style="width: 800px; height: 200px">
  <Sidebar bind:size={sidebarSize} style="height: 200px">
    <SidebarPanel>
      <SidebarInput bind:value={sidebarInput} aria-label="Bound sidebar input" />
    </SidebarPanel>
    <SidebarResizeTrigger aria-label="Resize bound sidebar" />
    <SidebarInset />
  </Sidebar>
</div>

<InputGroup>
  <InputGroupInput bind:value={groupInput} aria-label="Bound group input" />
</InputGroup>
<InputGroup>
  <InputGroupTextarea bind:value={groupTextarea} aria-label="Bound group textarea" />
</InputGroup>