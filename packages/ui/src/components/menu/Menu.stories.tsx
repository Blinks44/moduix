import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps, ReactNode } from 'react';
import { Portal } from '@ark-ui/react/portal';
import { useState } from 'react';
import { InfoIcon, MapIcon } from '@/icons/demo';
import { Button } from '../button';
import {
  Menu,
  MenuArrow,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuItemIndicator,
  MenuItemShortcut,
  MenuItemText,
  MenuItemTextContent,
  MenuItemTextIcon,
  MenuItemTextLabel,
  MenuPositioner,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuSeparator,
  MenuTrigger,
  MenuTriggerIcon,
  MenuTriggerItem,
  MenuTriggerItemIcon,
  useMenu,
} from './Menu';
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

function MenuButtonTrigger(props: ComponentProps<typeof MenuTrigger>) {
  return (
    <MenuTrigger asChild {...props}>
      <Button>{props.children}</Button>
    </MenuTrigger>
  );
}

function DefaultPositionedContent({ children }: { children: ReactNode }) {
  return (
    <Portal>
      <MenuPositioner>
        <MenuContent>{children}</MenuContent>
      </MenuPositioner>
    </Portal>
  );
}

export const Basic: Story = {
  render: () => (
    <Menu>
      <MenuButtonTrigger>
        Song
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <DefaultPositionedContent>
        <MenuItem value="add-library">Add to Library</MenuItem>
        <MenuItem value="add-playlist">Add to Playlist</MenuItem>
        <MenuSeparator />
        <MenuItem value="play-next">Play Next</MenuItem>
        <MenuItem value="play-last">Play Last</MenuItem>
        <MenuSeparator />
        <MenuItem value="share" disabled>
          Share
        </MenuItem>
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
          <MenuTriggerIcon />
        </MenuButtonTrigger>
        <DefaultPositionedContent>
          <MenuItem value="edit">Edit</MenuItem>
          <MenuItem value="duplicate">Duplicate</MenuItem>
          <MenuItem value="archive">Archive</MenuItem>
          <MenuItem value="delete" tone="destructive">
            Delete
          </MenuItem>
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
          <MenuTriggerIcon />
        </MenuButtonTrigger>
        <DefaultPositionedContent>
          <MenuItem value="cut">Cut</MenuItem>
          <MenuItem value="copy">Copy</MenuItem>
          <MenuItem value="paste">Paste</MenuItem>
          <MenuItem value="delete" tone="destructive">
            Delete
          </MenuItem>
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
          <MenuTriggerIcon />
        </MenuButtonTrigger>
        <DefaultPositionedContent>
          <MenuItemGroup>
            <MenuItemGroupLabel>Sort</MenuItemGroupLabel>
            <MenuRadioItemGroup
              value={sortBy}
              onValueChange={(details) => setSortBy(details.value)}
            >
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
            <MenuCheckboxItem
              checked={showMinimap}
              value="minimap"
              onCheckedChange={setShowMinimap}
            >
              <MenuItemIndicator />
              <MenuItemText>Minimap</MenuItemText>
            </MenuCheckboxItem>
            <MenuCheckboxItem checked={showSearch} value="search" onCheckedChange={setShowSearch}>
              <MenuItemIndicator />
              <MenuItemText>Search</MenuItemText>
            </MenuCheckboxItem>
            <MenuCheckboxItem
              checked={showSidebar}
              value="sidebar"
              onCheckedChange={setShowSidebar}
            >
              <MenuItemIndicator />
              <MenuItemText>Sidebar</MenuItemText>
            </MenuCheckboxItem>
          </MenuItemGroup>
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
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <DefaultPositionedContent>
        <MenuItem value="copy">
          Copy
          <MenuItemShortcut>Ctrl+C</MenuItemShortcut>
        </MenuItem>
        <MenuItem value="paste">
          Paste
          <MenuItemShortcut>Ctrl+V</MenuItemShortcut>
        </MenuItem>
        <MenuSeparator />
        <MenuItem value="rename">
          Rename
          <MenuItemShortcut>F2</MenuItemShortcut>
        </MenuItem>
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
          <MenuTriggerIcon />
        </MenuButtonTrigger>
        <DefaultPositionedContent>
          <MenuCheckboxItem
            checked={showMinimap}
            value="minimap"
            onCheckedChange={setShowMinimap}
            indicator="end"
          >
            <MenuItemText>
              <MenuItemTextContent>
                <MenuItemTextIcon>
                  <InfoIcon />
                </MenuItemTextIcon>
                <MenuItemTextLabel>Minimap</MenuItemTextLabel>
              </MenuItemTextContent>
            </MenuItemText>
            <MenuItemIndicator />
          </MenuCheckboxItem>
          <MenuCheckboxItem
            checked={showSearch}
            value="search"
            onCheckedChange={setShowSearch}
            indicator="end"
          >
            <MenuItemText>
              <MenuItemTextContent>
                <MenuItemTextIcon>
                  <MapIcon />
                </MenuItemTextIcon>
                <MenuItemTextLabel>Search</MenuItemTextLabel>
              </MenuItemTextContent>
            </MenuItemText>
            <MenuItemIndicator />
          </MenuCheckboxItem>
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
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <DefaultPositionedContent>
        <MenuItem value="add-library">Add to Library</MenuItem>
        <Menu>
          <MenuTriggerItem>
            Add to Playlist
            <MenuTriggerItemIcon />
          </MenuTriggerItem>
          <Portal>
            <MenuPositioner>
              <MenuContent>
                <MenuItem value="get-up">Get Up!</MenuItem>
                <MenuItem value="inside-out">Inside Out</MenuItem>
                <MenuItem value="night-beats">Night Beats</MenuItem>
                <MenuSeparator />
                <MenuItem value="new-playlist">New Playlist...</MenuItem>
              </MenuContent>
            </MenuPositioner>
          </Portal>
        </Menu>
        <MenuSeparator />
        <MenuItem value="favorite">Favorite</MenuItem>
        <MenuItem value="share">Share</MenuItem>
      </DefaultPositionedContent>
    </Menu>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Menu positioning={{ placement: 'right-start', gutter: 12 }}>
      <MenuButtonTrigger>
        Export
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <Portal>
        <MenuPositioner>
          <MenuContent>
            <MenuArrow />
            <MenuItem value="png">Export PNG</MenuItem>
            <MenuItem value="pdf">Export PDF</MenuItem>
            <MenuSeparator />
            <MenuItem value="copy-link">Copy share link</MenuItem>
          </MenuContent>
        </MenuPositioner>
      </Portal>
    </Menu>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Menu positioning={{ placement: 'right-start', gutter: 12 }}>
      <MenuButtonTrigger className={storyStyles.backdropDemoTrigger}>
        Export
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <Portal>
        <MenuPositioner className={storyStyles.positioner}>
          <MenuContent className={storyStyles.customPopup}>
            <MenuArrow />
            <MenuItem value="png">Export PNG</MenuItem>
            <MenuItem value="pdf">Export PDF</MenuItem>
            <MenuSeparator />
            <MenuItem value="copy-link">Copy share link</MenuItem>
          </MenuContent>
        </MenuPositioner>
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
        <MenuTriggerIcon />
      </MenuButtonTrigger>
      <DefaultPositionedContent>
        <MenuItem value="projects" asChild>
          <a href="#projects">Projects</a>
        </MenuItem>
        <MenuItem value="teams" asChild>
          <a href="#teams">Teams</a>
        </MenuItem>
        <MenuItem value="billing" asChild>
          <a href="#billing">Billing</a>
        </MenuItem>
        <MenuSeparator />
        <MenuItem value="copy-link">Copy Link</MenuItem>
      </DefaultPositionedContent>
    </Menu>
  ),
};