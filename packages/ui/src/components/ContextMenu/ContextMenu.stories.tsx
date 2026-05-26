import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { InfoIcon, ShareIcon } from '@/icons/demo';
import {
  ContextMenu,
  ContextMenuArrow,
  ContextMenuBackdrop,
  ContextMenuCheckboxItem,
  ContextMenuCheckboxItemIndicator,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuLinkItem,
  ContextMenuPopup,
  ContextMenuItemTextContent,
  ContextMenuItemTextIcon,
  ContextMenuItemTextLabel,
  ContextMenuItemShortcut,
  ContextMenuItemText,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuRadioItemIndicator,
  ContextMenuSeparator,
  ContextMenuSubmenu,
  ContextMenuSubmenuContent,
  ContextMenuSubmenuTrigger,
  ContextMenuSubmenuTriggerIcon,
  ContextMenuTrigger,
} from './ContextMenu';
import storyStyles from './ContextMenu.stories.module.css';

const meta = {
  title: 'Components/ContextMenu',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    return (
      <ContextMenu>
        <ContextMenuTrigger>Right click here</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem closeOnClick>Add to Library</ContextMenuItem>
          <ContextMenuItem closeOnClick>Add to Playlist</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem closeOnClick>Play Next</ContextMenuItem>
          <ContextMenuItem closeOnClick>Play Last</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem closeOnClick disabled>
            Share
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

export const Nested: Story = {
  render: () => {
    return (
      <ContextMenu>
        <ContextMenuTrigger>Right click here</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem closeOnClick>Add to Library</ContextMenuItem>
          <ContextMenuSubmenu>
            <ContextMenuSubmenuTrigger>
              Add to Playlist
              <ContextMenuSubmenuTriggerIcon />
            </ContextMenuSubmenuTrigger>
            <ContextMenuSubmenuContent>
              <ContextMenuItem closeOnClick>Get Up!</ContextMenuItem>
              <ContextMenuItem closeOnClick>Inside Out</ContextMenuItem>
              <ContextMenuItem closeOnClick>Night Beats</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem closeOnClick>New Playlist...</ContextMenuItem>
            </ContextMenuSubmenuContent>
          </ContextMenuSubmenu>
          <ContextMenuSeparator />
          <ContextMenuItem closeOnClick>Favorite</ContextMenuItem>
          <ContextMenuItem closeOnClick>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

export const WithShortcuts: Story = {
  render: () => {
    return (
      <ContextMenu>
        <ContextMenuTrigger>Right click here</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem closeOnClick>
            Copy
            <ContextMenuItemShortcut>Ctrl+C</ContextMenuItemShortcut>
          </ContextMenuItem>
          <ContextMenuItem closeOnClick>
            Paste
            <ContextMenuItemShortcut>Ctrl+V</ContextMenuItemShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem closeOnClick>
            Rename
            <ContextMenuItemShortcut>F2</ContextMenuItemShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

export const WithGroupsAndControls: Story = {
  render: () => {
    const [sortBy, setSortBy] = React.useState('date');
    const [showMinimap, setShowMinimap] = React.useState(true);
    const [showSearch, setShowSearch] = React.useState(true);
    const [showSidebar, setShowSidebar] = React.useState(false);

    return (
      <ContextMenu>
        <ContextMenuTrigger>Right click here</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuGroupLabel>Sort</ContextMenuGroupLabel>
            <ContextMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              <ContextMenuRadioItem value="date">
                <ContextMenuRadioItemIndicator />
                <ContextMenuItemText>Date</ContextMenuItemText>
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="name">
                <ContextMenuRadioItemIndicator />
                <ContextMenuItemText>Name</ContextMenuItemText>
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="type">
                <ContextMenuRadioItemIndicator />
                <ContextMenuItemText>Type</ContextMenuItemText>
              </ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuGroupLabel>Workspace</ContextMenuGroupLabel>
            <ContextMenuCheckboxItem checked={showMinimap} onCheckedChange={setShowMinimap}>
              <ContextMenuCheckboxItemIndicator />
              <ContextMenuItemText>Minimap</ContextMenuItemText>
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem checked={showSearch} onCheckedChange={setShowSearch}>
              <ContextMenuCheckboxItemIndicator />
              <ContextMenuItemText>Search</ContextMenuItemText>
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
              <ContextMenuCheckboxItemIndicator />
              <ContextMenuItemText>Sidebar</ContextMenuItemText>
            </ContextMenuCheckboxItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

export const IndicatorRightWithIcon: Story = {
  render: () => {
    const [showMinimap, setShowMinimap] = React.useState(true);
    const [showSearch, setShowSearch] = React.useState(true);

    return (
      <ContextMenu>
        <ContextMenuTrigger>Right click here</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuCheckboxItem
            checked={showMinimap}
            onCheckedChange={setShowMinimap}
            indicator="end"
          >
            <ContextMenuItemText>
              <ContextMenuItemTextContent>
                <ContextMenuItemTextIcon>
                  <InfoIcon />
                </ContextMenuItemTextIcon>
                <ContextMenuItemTextLabel>Minimap</ContextMenuItemTextLabel>
              </ContextMenuItemTextContent>
            </ContextMenuItemText>
            <ContextMenuCheckboxItemIndicator />
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={showSearch}
            onCheckedChange={setShowSearch}
            indicator="end"
          >
            <ContextMenuItemText>
              <ContextMenuItemTextContent>
                <ContextMenuItemTextIcon>
                  <ShareIcon />
                </ContextMenuItemTextIcon>
                <ContextMenuItemTextLabel>Search</ContextMenuItemTextLabel>
              </ContextMenuItemTextContent>
            </ContextMenuItemText>
            <ContextMenuCheckboxItemIndicator />
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

export const LinkItems: Story = {
  name: 'Link Items',
  render: () => {
    return (
      <ContextMenu>
        <ContextMenuTrigger>Right click here</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLinkItem href="#projects">Projects</ContextMenuLinkItem>
          <ContextMenuLinkItem href="#teams">Teams</ContextMenuLinkItem>
          <ContextMenuLinkItem href="#billing">Billing</ContextMenuLinkItem>
          <ContextMenuSeparator />
          <ContextMenuItem closeOnClick>Copy Link</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

export const CustomComposition: Story = {
  render: () => {
    return (
      <ContextMenu>
        <ContextMenuTrigger className={storyStyles.trigger}>Right click here</ContextMenuTrigger>
        <ContextMenuPortal>
          <ContextMenuBackdrop className={storyStyles.backdrop} />
          <ContextMenuPositioner className={storyStyles.positioner} sideOffset={12}>
            <ContextMenuPopup className={storyStyles.customPopup}>
              <ContextMenuArrow />
              <ContextMenuItem closeOnClick>Open details</ContextMenuItem>
              <ContextMenuItem closeOnClick>Copy link</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem closeOnClick disabled>
                Delete
              </ContextMenuItem>
            </ContextMenuPopup>
          </ContextMenuPositioner>
        </ContextMenuPortal>
      </ContextMenu>
    );
  },
};