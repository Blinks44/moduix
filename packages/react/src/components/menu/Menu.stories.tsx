import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps, ReactNode } from 'react';
import { Portal } from '@ark-ui/react/portal';
import { useState } from 'react';
import { InfoIcon, MapIcon } from '@/icons/demo';
import { Button } from '../button';
import { Menu, useMenu } from './Menu';
import storyStyles from './Menu.stories.module.css';

const meta = {
  title: 'Components/Menu',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function MenuButtonTrigger(props: ComponentProps<typeof Menu.Trigger>) {
  return (
    <Menu.Trigger asChild {...props}>
      <Button>{props.children}</Button>
    </Menu.Trigger>
  );
}

function DefaultPositionedContent({ children }: { children: ReactNode }) {
  return (
    <Portal>
      <Menu.Positioner>
        <Menu.Content>{children}</Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
}

export const Basic: Story = {
  render: () => (
    <Menu>
      <MenuButtonTrigger>
        Song
        <Menu.Indicator />
      </MenuButtonTrigger>
      <DefaultPositionedContent>
        <Menu.Item value="add-library">Add to Library</Menu.Item>
        <Menu.Item value="add-playlist">Add to Playlist</Menu.Item>
        <Menu.Separator />
        <Menu.Item value="play-next">Play Next</Menu.Item>
        <Menu.Item value="play-last">Play Last</Menu.Item>
        <Menu.Separator />
        <Menu.Item value="share" disabled>
          Share
        </Menu.Item>
      </DefaultPositionedContent>
    </Menu>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Menu open={open} onOpenChange={(details) => setOpen(details.open)}>
        <Button onClick={() => setOpen((value) => !value)}>Toggle</Button>
        <MenuButtonTrigger>
          Actions
          <Menu.Indicator />
        </MenuButtonTrigger>
        <DefaultPositionedContent>
          <Menu.Item value="edit">Edit</Menu.Item>
          <Menu.Item value="duplicate">Duplicate</Menu.Item>
          <Menu.Item value="archive">Archive</Menu.Item>
          <Menu.Item value="delete" tone="destructive">
            Delete
          </Menu.Item>
        </DefaultPositionedContent>
      </Menu>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const menu = useMenu();

    return (
      <Menu.RootProvider value={menu}>
        <Button onClick={() => menu.api.setHighlightedValue('copy')}>Highlight Copy</Button>
        <MenuButtonTrigger>
          Edit
          <Menu.Indicator />
        </MenuButtonTrigger>
        <DefaultPositionedContent>
          <Menu.Item value="cut">Cut</Menu.Item>
          <Menu.Item value="copy">Copy</Menu.Item>
          <Menu.Item value="paste">Paste</Menu.Item>
          <Menu.Item value="delete" tone="destructive">
            Delete
          </Menu.Item>
        </DefaultPositionedContent>
      </Menu.RootProvider>
    );
  },
};

export const WithGroupsAndControls: Story = {
  render: () => {
    const [sortBy, setSortBy] = useState('date');
    const [showMinimap, setShowMinimap] = useState(true);
    const [showSearch, setShowSearch] = useState(true);
    const [showSidebar, setShowSidebar] = useState(false);

    return (
      <Menu>
        <MenuButtonTrigger>
          View
          <Menu.Indicator />
        </MenuButtonTrigger>
        <DefaultPositionedContent>
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>Sort</Menu.ItemGroupLabel>
            <Menu.RadioItemGroup
              value={sortBy}
              onValueChange={(details) => setSortBy(details.value)}
            >
              <Menu.RadioItem value="date">
                <Menu.ItemIndicator />
                <Menu.ItemText>Date</Menu.ItemText>
              </Menu.RadioItem>
              <Menu.RadioItem value="name">
                <Menu.ItemIndicator />
                <Menu.ItemText>Name</Menu.ItemText>
              </Menu.RadioItem>
              <Menu.RadioItem value="type">
                <Menu.ItemIndicator />
                <Menu.ItemText>Type</Menu.ItemText>
              </Menu.RadioItem>
            </Menu.RadioItemGroup>
          </Menu.ItemGroup>
          <Menu.Separator />
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>Workspace</Menu.ItemGroupLabel>
            <Menu.CheckboxItem
              checked={showMinimap}
              value="minimap"
              onCheckedChange={setShowMinimap}
            >
              <Menu.ItemIndicator />
              <Menu.ItemText>Minimap</Menu.ItemText>
            </Menu.CheckboxItem>
            <Menu.CheckboxItem checked={showSearch} value="search" onCheckedChange={setShowSearch}>
              <Menu.ItemIndicator />
              <Menu.ItemText>Search</Menu.ItemText>
            </Menu.CheckboxItem>
            <Menu.CheckboxItem
              checked={showSidebar}
              value="sidebar"
              onCheckedChange={setShowSidebar}
            >
              <Menu.ItemIndicator />
              <Menu.ItemText>Sidebar</Menu.ItemText>
            </Menu.CheckboxItem>
          </Menu.ItemGroup>
        </DefaultPositionedContent>
      </Menu>
    );
  },
};

export const WithShortcuts: Story = {
  render: () => (
    <Menu>
      <MenuButtonTrigger>
        Edit
        <Menu.Indicator />
      </MenuButtonTrigger>
      <DefaultPositionedContent>
        <Menu.Item value="copy">
          Copy
          <Menu.ItemShortcut>Ctrl+C</Menu.ItemShortcut>
        </Menu.Item>
        <Menu.Item value="paste">
          Paste
          <Menu.ItemShortcut>Ctrl+V</Menu.ItemShortcut>
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item value="rename">
          Rename
          <Menu.ItemShortcut>F2</Menu.ItemShortcut>
        </Menu.Item>
      </DefaultPositionedContent>
    </Menu>
  ),
};

export const IndicatorRightWithIcon: Story = {
  render: () => {
    const [showMinimap, setShowMinimap] = useState(true);
    const [showSearch, setShowSearch] = useState(true);

    return (
      <Menu>
        <MenuButtonTrigger>
          View
          <Menu.Indicator />
        </MenuButtonTrigger>
        <DefaultPositionedContent>
          <Menu.CheckboxItem
            checked={showMinimap}
            value="minimap"
            onCheckedChange={setShowMinimap}
            indicator="end"
          >
            <Menu.ItemText>
              <Menu.ItemTextContent>
                <Menu.ItemTextIcon>
                  <InfoIcon />
                </Menu.ItemTextIcon>
                <Menu.ItemTextLabel>Minimap</Menu.ItemTextLabel>
              </Menu.ItemTextContent>
            </Menu.ItemText>
            <Menu.ItemIndicator />
          </Menu.CheckboxItem>
          <Menu.CheckboxItem
            checked={showSearch}
            value="search"
            onCheckedChange={setShowSearch}
            indicator="end"
          >
            <Menu.ItemText>
              <Menu.ItemTextContent>
                <Menu.ItemTextIcon>
                  <MapIcon />
                </Menu.ItemTextIcon>
                <Menu.ItemTextLabel>Search</Menu.ItemTextLabel>
              </Menu.ItemTextContent>
            </Menu.ItemText>
            <Menu.ItemIndicator />
          </Menu.CheckboxItem>
        </DefaultPositionedContent>
      </Menu>
    );
  },
};

export const Nested: Story = {
  render: () => (
    <Menu>
      <MenuButtonTrigger>
        Song
        <Menu.Indicator />
      </MenuButtonTrigger>
      <DefaultPositionedContent>
        <Menu.Item value="add-library">Add to Library</Menu.Item>
        <Menu>
          <Menu.TriggerItem>
            Add to Playlist
            <Menu.TriggerItemIcon />
          </Menu.TriggerItem>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="get-up">Get Up!</Menu.Item>
                <Menu.Item value="inside-out">Inside Out</Menu.Item>
                <Menu.Item value="night-beats">Night Beats</Menu.Item>
                <Menu.Separator />
                <Menu.Item value="new-playlist">New Playlist...</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu>
        <Menu.Separator />
        <Menu.Item value="favorite">Favorite</Menu.Item>
        <Menu.Item value="share">Share</Menu.Item>
      </DefaultPositionedContent>
    </Menu>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Menu positioning={{ placement: 'right-start', gutter: 12 }}>
      <MenuButtonTrigger>
        Export
        <Menu.Indicator />
      </MenuButtonTrigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Arrow />
            <Menu.Item value="png">Export PNG</Menu.Item>
            <Menu.Item value="pdf">Export PDF</Menu.Item>
            <Menu.Separator />
            <Menu.Item value="copy-link">Copy share link</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Menu positioning={{ placement: 'right-start', gutter: 12 }}>
      <MenuButtonTrigger>
        Export
        <Menu.Indicator />
      </MenuButtonTrigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content className={storyStyles.customPopup}>
            <Menu.Arrow />
            <Menu.Item value="png">Export PNG</Menu.Item>
            <Menu.Item value="pdf">Export PDF</Menu.Item>
            <Menu.Separator />
            <Menu.Item value="copy-link">Copy share link</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu>
  ),
};

export const LinkItems: Story = {
  name: 'Link Items',
  render: () => (
    <Menu>
      <MenuButtonTrigger>
        Navigate
        <Menu.Indicator />
      </MenuButtonTrigger>
      <DefaultPositionedContent>
        <Menu.Item value="projects" asChild>
          <a href="#projects">Projects</a>
        </Menu.Item>
        <Menu.Item value="teams" asChild>
          <a href="#teams">Teams</a>
        </Menu.Item>
        <Menu.Item value="billing" asChild>
          <a href="#billing">Billing</a>
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item value="copy-link">Copy Link</Menu.Item>
      </DefaultPositionedContent>
    </Menu>
  ),
};