import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { InfoIcon, MapIcon } from '@/primitives/Icons';
import {
  Menubar,
  MenubarArrow,
  MenubarCheckboxItem,
  MenubarCheckboxItemIndicator,
  MenubarContent,
  MenubarGroup,
  MenubarGroupLabel,
  MenubarItem,
  MenubarItemTextContent,
  MenubarItemTextIcon,
  MenubarItemTextLabel,
  MenubarItemShortcut,
  MenubarItemText,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarRadioItemIndicator,
  MenubarSeparator,
  MenubarSubmenu,
  MenubarSubmenuContent,
  MenubarSubmenuTrigger,
  MenubarSubmenuTriggerIcon,
  MenubarTrigger,
} from './Menubar';

const meta = {
  title: 'Components/Menubar',
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
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarArrow />
            <MenubarItem closeOnClick>New File</MenubarItem>
            <MenubarItem closeOnClick>Open…</MenubarItem>
            <MenubarItem closeOnClick>Save</MenubarItem>
            <MenubarSubmenu>
              <MenubarSubmenuTrigger>
                Export
                <MenubarSubmenuTriggerIcon />
              </MenubarSubmenuTrigger>
              <MenubarSubmenuContent>
                <MenubarItem closeOnClick>PDF</MenubarItem>
                <MenubarItem closeOnClick>PNG</MenubarItem>
                <MenubarItem closeOnClick>SVG</MenubarItem>
              </MenubarSubmenuContent>
            </MenubarSubmenu>
            <MenubarSeparator />
            <MenubarItem closeOnClick>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarArrow />
            <MenubarItem closeOnClick>
              Undo
              <MenubarItemShortcut>Ctrl+Z</MenubarItemShortcut>
            </MenubarItem>
            <MenubarItem closeOnClick>
              Redo
              <MenubarItemShortcut>Ctrl+Y</MenubarItemShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem closeOnClick>
              Cut
              <MenubarItemShortcut>Ctrl+X</MenubarItemShortcut>
            </MenubarItem>
            <MenubarItem closeOnClick>
              Copy
              <MenubarItemShortcut>Ctrl+C</MenubarItemShortcut>
            </MenubarItem>
            <MenubarItem closeOnClick>
              Paste
              <MenubarItemShortcut>Ctrl+V</MenubarItemShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarArrow />
            <MenubarItem closeOnClick>Zoom In</MenubarItem>
            <MenubarItem closeOnClick>Zoom Out</MenubarItem>
            <MenubarSeparator />
            <MenubarItem closeOnClick>Fullscreen</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu disabled>
          <MenubarTrigger>Help</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    );
  },
};

export const WithGroupsAndControls: Story = {
  render: () => {
    const [sortBy, setSortBy] = React.useState('name');
    const [showSidebar, setShowSidebar] = React.useState(true);
    const [showPanel, setShowPanel] = React.useState(false);

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarArrow />
            <MenubarGroup>
              <MenubarGroupLabel>Sort</MenubarGroupLabel>
              <MenubarRadioGroup value={sortBy} onValueChange={setSortBy}>
                <MenubarRadioItem value="name">
                  <MenubarRadioItemIndicator />
                  <MenubarItemText>Name</MenubarItemText>
                </MenubarRadioItem>
                <MenubarRadioItem value="date">
                  <MenubarRadioItemIndicator />
                  <MenubarItemText>Date Modified</MenubarItemText>
                </MenubarRadioItem>
                <MenubarRadioItem value="type">
                  <MenubarRadioItemIndicator />
                  <MenubarItemText>Type</MenubarItemText>
                </MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarGroup>

            <MenubarSeparator />

            <MenubarGroup>
              <MenubarGroupLabel>Panels</MenubarGroupLabel>
              <MenubarCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
                <MenubarCheckboxItemIndicator />
                <MenubarItemText>Sidebar</MenubarItemText>
              </MenubarCheckboxItem>
              <MenubarCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
                <MenubarCheckboxItemIndicator />
                <MenubarItemText>Preview</MenubarItemText>
              </MenubarCheckboxItem>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

export const IndicatorRightWithIcon: Story = {
  render: () => {
    const [showSidebar, setShowSidebar] = React.useState(true);
    const [showPanel, setShowPanel] = React.useState(false);

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarArrow />
            <MenubarCheckboxItem
              checked={showSidebar}
              onCheckedChange={setShowSidebar}
              indicator="end"
            >
              <MenubarItemText>
                <MenubarItemTextContent>
                  <MenubarItemTextIcon>
                    <InfoIcon />
                  </MenubarItemTextIcon>
                  <MenubarItemTextLabel>Sidebar</MenubarItemTextLabel>
                </MenubarItemTextContent>
              </MenubarItemText>
              <MenubarCheckboxItemIndicator />
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked={showPanel} onCheckedChange={setShowPanel} indicator="end">
              <MenubarItemText>
                <MenubarItemTextContent>
                  <MenubarItemTextIcon>
                    <MapIcon />
                  </MenubarItemTextIcon>
                  <MenubarItemTextLabel>Preview</MenubarItemTextLabel>
                </MenubarItemTextContent>
              </MenubarItemText>
              <MenubarCheckboxItemIndicator />
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    return (
      <Menubar orientation="vertical">
        <MenubarMenu>
          <MenubarTrigger>Project</MenubarTrigger>
          <MenubarContent>
            <MenubarArrow />
            <MenubarItem closeOnClick>Create branch</MenubarItem>
            <MenubarItem closeOnClick>Pull latest</MenubarItem>
            <MenubarItem closeOnClick>Open in IDE</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Deploy</MenubarTrigger>
          <MenubarContent>
            <MenubarArrow />
            <MenubarItem closeOnClick>Staging</MenubarItem>
            <MenubarItem closeOnClick>Production</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};