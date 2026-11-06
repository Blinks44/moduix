<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '@/components/button';
  import {
    Menu,
    MenuArrow,
    MenuCheckboxItem,
    MenuContent,
    MenuIndicator,
    MenuItem,
    MenuItemGroup,
    MenuItemGroupLabel,
    MenuItemIndicator,
    MenuItemShortcut,
    MenuItemText,
    MenuPositioner,
    MenuRadioItem,
    MenuRadioItemGroup,
    MenuRootProvider,
    MenuSeparator,
    MenuTriggerItem,
    MenuTriggerItemIcon,
    MenuViewport,
    useMenu,
  } from '@/components/menu';
  import DefaultPositionedContent from './DefaultPositionedContent.svelte';
  import InfoIcon from './InfoIcon.svelte';
  import MapIcon from './MapIcon.svelte';
  import MenuButtonTrigger from './MenuButtonTrigger.svelte';

  const { Story } = defineMeta({
    title: 'Components/Menu',
    component: Menu,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const customPopupClass =
    "min-w-52 bg-background outline-primary [&_[data-highlighted]]:text-primary-foreground [&_[data-highlighted]]:before:bg-primary [&_[data-slot='menu-separator']]:bg-primary";
</script>

<script lang="ts">
  let open = $state(false);
  let sortBy = $state('date');
  let showMinimap = $state(true);
  let showSearch = $state(true);
  let showSidebar = $state(false);
  const menu = useMenu({ id: 'menu-root-provider' });

  const highlightCopy = () => menu().api.setHighlightedValue('copy');
</script>

<Story name="Basic" asChild>
  <Menu>
    <MenuButtonTrigger>
      Song
      <MenuIndicator />
    </MenuButtonTrigger>
    <DefaultPositionedContent>
      <MenuItem value="add-library">Add to Library</MenuItem>
      <MenuItem value="add-playlist">Add to Playlist</MenuItem>
      <MenuSeparator />
      <MenuItem value="play-next">Play Next</MenuItem>
      <MenuItem value="play-last">Play Last</MenuItem>
      <MenuSeparator />
      <MenuItem value="share" disabled>Share</MenuItem>
    </DefaultPositionedContent>
  </Menu>
</Story>

<Story name="Controlled" asChild>
  <Menu bind:open>
    <Button onclick={() => (open = !open)}>Toggle</Button>
    <MenuButtonTrigger>
      Actions
      <MenuIndicator />
    </MenuButtonTrigger>
    <DefaultPositionedContent>
      <MenuItem value="edit">Edit</MenuItem>
      <MenuItem value="duplicate">Duplicate</MenuItem>
      <MenuItem value="archive">Archive</MenuItem>
      <MenuItem value="delete" tone="destructive">Delete</MenuItem>
    </DefaultPositionedContent>
  </Menu>
</Story>

<Story name="Root Provider" asChild>
  <MenuRootProvider value={menu}>
    <Button onclick={highlightCopy}>Highlight Copy</Button>
    <MenuButtonTrigger>
      Edit
      <MenuIndicator />
    </MenuButtonTrigger>
    <DefaultPositionedContent>
      <MenuItem value="cut">Cut</MenuItem>
      <MenuItem value="copy">Copy</MenuItem>
      <MenuItem value="paste">Paste</MenuItem>
      <MenuItem value="delete" tone="destructive">Delete</MenuItem>
    </DefaultPositionedContent>
  </MenuRootProvider>
</Story>

<Story name="With Groups And Controls" asChild>
  <Menu>
    <MenuButtonTrigger>
      View
      <MenuIndicator />
    </MenuButtonTrigger>
    <DefaultPositionedContent>
      <MenuItemGroup>
        <MenuItemGroupLabel>Sort</MenuItemGroupLabel>
        <MenuRadioItemGroup bind:value={sortBy}>
          <MenuRadioItem value="date">
            <MenuItemIndicator />
            <MenuItemText>Date</MenuItemText>
          </MenuRadioItem>
          <MenuRadioItem value="name">
            <MenuItemIndicator />
            <MenuItemText>Name</MenuItemText>
          </MenuRadioItem>
          <MenuRadioItem value="type">
            <MenuItemIndicator />
            <MenuItemText>Type</MenuItemText>
          </MenuRadioItem>
        </MenuRadioItemGroup>
      </MenuItemGroup>
      <MenuSeparator />
      <MenuItemGroup>
        <MenuItemGroupLabel>Workspace</MenuItemGroupLabel>
        <MenuCheckboxItem bind:checked={showMinimap} value="minimap">
          <MenuItemIndicator />
          <MenuItemText>Minimap</MenuItemText>
        </MenuCheckboxItem>
        <MenuCheckboxItem bind:checked={showSearch} value="search">
          <MenuItemIndicator />
          <MenuItemText>Search</MenuItemText>
        </MenuCheckboxItem>
        <MenuCheckboxItem bind:checked={showSidebar} value="sidebar">
          <MenuItemIndicator />
          <MenuItemText>Sidebar</MenuItemText>
        </MenuCheckboxItem>
      </MenuItemGroup>
    </DefaultPositionedContent>
  </Menu>
</Story>

<Story name="With Shortcuts" asChild>
  <Menu>
    <MenuButtonTrigger>
      Edit
      <MenuIndicator />
    </MenuButtonTrigger>
    <DefaultPositionedContent>
      <MenuItem value="copy">Copy<MenuItemShortcut>Ctrl+C</MenuItemShortcut></MenuItem>
      <MenuItem value="paste">Paste<MenuItemShortcut>Ctrl+V</MenuItemShortcut></MenuItem>
      <MenuSeparator />
      <MenuItem value="rename">Rename<MenuItemShortcut>F2</MenuItemShortcut></MenuItem>
    </DefaultPositionedContent>
  </Menu>
</Story>

<Story name="Indicator Right With Icon" asChild>
  <Menu>
    <MenuButtonTrigger>
      View
      <MenuIndicator />
    </MenuButtonTrigger>
    <DefaultPositionedContent>
      <MenuCheckboxItem bind:checked={showMinimap} value="minimap" indicator="end">
        <MenuItemText><InfoIcon />Minimap</MenuItemText>
        <MenuItemIndicator />
      </MenuCheckboxItem>
      <MenuCheckboxItem bind:checked={showSearch} value="search" indicator="end">
        <MenuItemText><MapIcon />Search</MenuItemText>
        <MenuItemIndicator />
      </MenuCheckboxItem>
    </DefaultPositionedContent>
  </Menu>
</Story>

<Story name="Nested" asChild>
  <Menu>
    <MenuButtonTrigger>
      Song
      <MenuIndicator />
    </MenuButtonTrigger>
    <DefaultPositionedContent>
      <MenuItem value="add-library">Add to Library</MenuItem>
      <Menu>
        <MenuTriggerItem>
          Add to Playlist
          <MenuTriggerItemIcon />
        </MenuTriggerItem>
        <MenuPositioner>
          <MenuContent>
            <MenuViewport>
              <MenuItem value="get-up">Get Up!</MenuItem>
              <MenuItem value="inside-out">Inside Out</MenuItem>
              <MenuItem value="night-beats">Night Beats</MenuItem>
              <MenuSeparator />
              <MenuItem value="new-playlist">New Playlist...</MenuItem>
            </MenuViewport>
          </MenuContent>
        </MenuPositioner>
      </Menu>
      <MenuSeparator />
      <MenuItem value="favorite">Favorite</MenuItem>
      <MenuItem value="share">Share</MenuItem>
    </DefaultPositionedContent>
  </Menu>
</Story>

<Story name="With Arrow" asChild>
  <Menu positioning={{ placement: 'right-start', gutter: 12 }}>
    <MenuButtonTrigger>
      Export
      <MenuIndicator />
    </MenuButtonTrigger>
    <MenuPositioner>
      <MenuContent>
        <MenuArrow />
        <MenuViewport>
          <MenuItem value="png">Export PNG</MenuItem>
          <MenuItem value="pdf">Export PDF</MenuItem>
          <MenuSeparator />
          <MenuItem value="copy-link">Copy share link</MenuItem>
        </MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
</Story>

<Story name="Custom Styling" asChild>
  <Menu positioning={{ placement: 'right-start', gutter: 12 }}>
    <MenuButtonTrigger>
      Export
      <MenuIndicator />
    </MenuButtonTrigger>
    <MenuPositioner>
      <MenuContent class={customPopupClass}>
        <MenuViewport>
          <MenuItem value="png">Export PNG</MenuItem>
          <MenuItem value="pdf">Export PDF</MenuItem>
          <MenuSeparator />
          <MenuItem value="copy-link">Copy share link</MenuItem>
        </MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
</Story>

<Story name="Link Items" asChild>
  <Menu>
    <MenuButtonTrigger>
      Navigate
      <MenuIndicator />
    </MenuButtonTrigger>
    <DefaultPositionedContent>
      <MenuItem value="projects">
        {#snippet asChild(props)}<a {...props()} href="#projects">Projects</a>{/snippet}
      </MenuItem>
      <MenuItem value="teams">
        {#snippet asChild(props)}<a {...props()} href="#teams">Teams</a>{/snippet}
      </MenuItem>
      <MenuItem value="billing">
        {#snippet asChild(props)}<a {...props()} href="#billing">Billing</a>{/snippet}
      </MenuItem>
      <MenuSeparator />
      <MenuItem value="copy-link">Copy Link</MenuItem>
    </DefaultPositionedContent>
  </Menu>
</Story>