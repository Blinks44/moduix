import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { InfoIcon, MapIcon } from '@/primitives/Icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../AlertDialog';
import { Button } from '../Button';
import {
  Menu,
  MenuCheckboxItem,
  MenuCheckboxItemIndicator,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuItemTextContent,
  MenuItemTextIcon,
  MenuItemTextLabel,
  MenuItemShortcut,
  MenuItemText,
  MenuLinkItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRadioItemIndicator,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuContent,
  MenuSubmenuTrigger,
  MenuSubmenuTriggerIcon,
  MenuTrigger,
  MenuTriggerIcon,
  createMenuHandle,
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

function MenuButtonTrigger(props: React.ComponentProps<typeof MenuTrigger>) {
  return <MenuTrigger render={<Button />} {...props} />;
}

export const Basic: Story = {
  render: () => {
    return (
      <Menu>
        <MenuButtonTrigger>
          Song
          <MenuTriggerIcon />
        </MenuButtonTrigger>
        <MenuContent withArrow>
          <MenuItem closeOnClick>Add to Library</MenuItem>
          <MenuItem closeOnClick>Add to Playlist</MenuItem>
          <MenuSeparator />
          <MenuItem closeOnClick>Play Next</MenuItem>
          <MenuItem closeOnClick>Play Last</MenuItem>
          <MenuSeparator />
          <MenuItem closeOnClick disabled>
            Share
          </MenuItem>
        </MenuContent>
      </Menu>
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
      <Menu>
        <MenuButtonTrigger>
          View
          <MenuTriggerIcon />
        </MenuButtonTrigger>
        <MenuContent withArrow>
          <MenuGroup>
            <MenuGroupLabel>Sort</MenuGroupLabel>
            <MenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              <MenuRadioItem value="date">
                <MenuRadioItemIndicator />
                <MenuItemText>Date</MenuItemText>
              </MenuRadioItem>
              <MenuRadioItem value="name">
                <MenuRadioItemIndicator />
                <MenuItemText>Name</MenuItemText>
              </MenuRadioItem>
              <MenuRadioItem value="type">
                <MenuRadioItemIndicator />
                <MenuItemText>Type</MenuItemText>
              </MenuRadioItem>
            </MenuRadioGroup>
          </MenuGroup>
          <MenuSeparator />
          <MenuGroup>
            <MenuGroupLabel>Workspace</MenuGroupLabel>
            <MenuCheckboxItem checked={showMinimap} onCheckedChange={setShowMinimap}>
              <MenuCheckboxItemIndicator />
              <MenuItemText>Minimap</MenuItemText>
            </MenuCheckboxItem>
            <MenuCheckboxItem checked={showSearch} onCheckedChange={setShowSearch}>
              <MenuCheckboxItemIndicator />
              <MenuItemText>Search</MenuItemText>
            </MenuCheckboxItem>
            <MenuCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
              <MenuCheckboxItemIndicator />
              <MenuItemText>Sidebar</MenuItemText>
            </MenuCheckboxItem>
          </MenuGroup>
        </MenuContent>
      </Menu>
    );
  },
};

export const WithShortcuts: Story = {
  render: () => {
    return (
      <Menu>
        <MenuButtonTrigger>
          Edit
          <MenuTriggerIcon />
        </MenuButtonTrigger>
        <MenuContent withArrow>
          <MenuItem closeOnClick>
            Copy
            <MenuItemShortcut>Ctrl+C</MenuItemShortcut>
          </MenuItem>
          <MenuItem closeOnClick>
            Paste
            <MenuItemShortcut>Ctrl+V</MenuItemShortcut>
          </MenuItem>
          <MenuSeparator />
          <MenuItem closeOnClick>
            Rename
            <MenuItemShortcut>F2</MenuItemShortcut>
          </MenuItem>
        </MenuContent>
      </Menu>
    );
  },
};

export const IndicatorRightWithIcon: Story = {
  render: () => {
    const [showMinimap, setShowMinimap] = React.useState(true);
    const [showSearch, setShowSearch] = React.useState(true);

    return (
      <Menu>
        <MenuButtonTrigger>
          View
          <MenuTriggerIcon />
        </MenuButtonTrigger>
        <MenuContent withArrow>
          <MenuCheckboxItem checked={showMinimap} onCheckedChange={setShowMinimap} indicator="end">
            <MenuItemText>
              <MenuItemTextContent>
                <MenuItemTextIcon>
                  <InfoIcon />
                </MenuItemTextIcon>
                <MenuItemTextLabel>Minimap</MenuItemTextLabel>
              </MenuItemTextContent>
            </MenuItemText>
            <MenuCheckboxItemIndicator />
          </MenuCheckboxItem>
          <MenuCheckboxItem checked={showSearch} onCheckedChange={setShowSearch} indicator="end">
            <MenuItemTextContent>
              <MenuItemTextIcon>
                <MapIcon />
              </MenuItemTextIcon>
              <MenuItemTextLabel>Search</MenuItemTextLabel>
            </MenuItemTextContent>
            <MenuCheckboxItemIndicator />
          </MenuCheckboxItem>
        </MenuContent>
      </Menu>
    );
  },
};

export const Nested: Story = {
  render: () => {
    return (
      <Menu>
        <MenuButtonTrigger>
          Song
          <MenuTriggerIcon />
        </MenuButtonTrigger>
        <MenuContent withArrow>
          <MenuItem closeOnClick>Add to Library</MenuItem>
          <MenuSubmenu>
            <MenuSubmenuTrigger>
              Add to Playlist
              <MenuSubmenuTriggerIcon />
            </MenuSubmenuTrigger>
            <MenuSubmenuContent>
              <MenuItem closeOnClick>Get Up!</MenuItem>
              <MenuItem closeOnClick>Inside Out</MenuItem>
              <MenuItem closeOnClick>Night Beats</MenuItem>
              <MenuSeparator />
              <MenuItem closeOnClick>New Playlist...</MenuItem>
            </MenuSubmenuContent>
          </MenuSubmenu>
          <MenuSeparator />
          <MenuItem closeOnClick>Favorite</MenuItem>
          <MenuItem closeOnClick>Share</MenuItem>
        </MenuContent>
      </Menu>
    );
  },
};

export const OpenOnHover: Story = {
  render: () => {
    return (
      <Menu>
        <MenuButtonTrigger openOnHover delay={120}>
          Add to playlist
          <MenuTriggerIcon />
        </MenuButtonTrigger>
        <MenuContent withArrow>
          <MenuItem closeOnClick>Get Up!</MenuItem>
          <MenuItem closeOnClick>Inside Out</MenuItem>
          <MenuItem closeOnClick>Night Beats</MenuItem>
          <MenuSeparator />
          <MenuItem closeOnClick>New Playlist...</MenuItem>
        </MenuContent>
      </Menu>
    );
  },
};

export const PositionedWithBackdrop: Story = {
  render: () => {
    return (
      <Menu>
        <MenuButtonTrigger>
          Export
          <MenuTriggerIcon />
        </MenuButtonTrigger>
        <MenuContent side="right" align="start" sideOffset={12} withBackdrop withArrow>
          <MenuItem closeOnClick>Export PNG</MenuItem>
          <MenuItem closeOnClick>Export PDF</MenuItem>
          <MenuSeparator />
          <MenuItem closeOnClick>Copy share link</MenuItem>
        </MenuContent>
      </Menu>
    );
  },
};

export const OpenAlertDialog: Story = {
  name: 'Open AlertDialog',
  render: () => {
    const [dialogOpen, setDialogOpen] = React.useState(false);

    return (
      <React.Fragment>
        <Menu>
          <MenuButtonTrigger>
            Project
            <MenuTriggerIcon />
          </MenuButtonTrigger>
          <MenuContent withArrow>
            <MenuItem closeOnClick>Rename</MenuItem>
            <MenuItem closeOnClick>Duplicate</MenuItem>
            <MenuSeparator />
            <MenuItem
              closeOnClick
              onClick={() => {
                setDialogOpen(true);
              }}
            >
              Delete...
            </MenuItem>
          </MenuContent>
        </Menu>

        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete project?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone and will permanently remove all environments.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </React.Fragment>
    );
  },
};

export const LinkItems: Story = {
  name: 'Link Items',
  render: () => {
    return (
      <Menu>
        <MenuButtonTrigger>
          Navigate
          <MenuTriggerIcon />
        </MenuButtonTrigger>
        <MenuContent withArrow>
          <MenuLinkItem href="#projects">Projects</MenuLinkItem>
          <MenuLinkItem href="#teams">Teams</MenuLinkItem>
          <MenuLinkItem href="#billing">Billing</MenuLinkItem>
          <MenuSeparator />
          <MenuItem closeOnClick>Copy Link</MenuItem>
        </MenuContent>
      </Menu>
    );
  },
};

export const DetachedTrigger: Story = {
  name: 'Detached Trigger',
  render: () => {
    const menuHandle = React.useMemo(() => createMenuHandle(), []);

    return (
      <React.Fragment>
        <div className={storyStyles.detachedTrigger}>
          <MenuButtonTrigger handle={menuHandle}>
            Actions
            <MenuTriggerIcon />
          </MenuButtonTrigger>
        </div>

        <Menu handle={menuHandle}>
          <MenuContent withArrow>
            <MenuItem closeOnClick>Edit</MenuItem>
            <MenuItem closeOnClick>Share</MenuItem>
            <MenuSeparator />
            <MenuItem closeOnClick>Archive</MenuItem>
          </MenuContent>
        </Menu>
      </React.Fragment>
    );
  },
};