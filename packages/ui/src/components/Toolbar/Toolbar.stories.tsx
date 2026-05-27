import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { BellIcon, StarIcon } from '@/icons/demo';
import { ChevronUpDownIcon } from '@/icons/ui';
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectTrigger,
  SelectValue,
} from '../Select';
import { Toggle } from '../Toggle';
import { ToggleGroup } from '../ToggleGroup';
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator,
} from './Toolbar';
import storyStyles from './Toolbar.stories.module.css';

const meta = {
  title: 'Components/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    'aria-label': 'Document actions',
    children: (
      <React.Fragment>
        <ToolbarButton>Undo</ToolbarButton>
        <ToolbarButton>Redo</ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton aria-label="Notifications">
          <BellIcon />
        </ToolbarButton>
      </React.Fragment>
    ),
  },
} satisfies Meta<typeof Toolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

const fonts = ['Inter', 'Arial', 'Helvetica', 'Georgia'];

export const Default: Story = {};

export const WithToggleGroup: Story = {
  render: () => {
    return (
      <Toolbar aria-label="Editor formatting">
        <ToggleGroup multiple defaultValue={['bold']} aria-label="Text formatting" variant="ghost">
          <ToolbarButton render={<Toggle />} value="bold" aria-label="Bold">
            <strong>B</strong>
          </ToolbarButton>
          <ToolbarButton render={<Toggle />} value="italic" aria-label="Italic">
            <em>I</em>
          </ToolbarButton>
          <ToolbarButton render={<Toggle />} value="underline" aria-label="Underline">
            <span className={storyStyles.underline}>U</span>
          </ToolbarButton>
        </ToggleGroup>

        <ToolbarSeparator />

        <ToolbarGroup aria-label="Insert">
          <ToolbarButton aria-label="Add favorite">
            <StarIcon />
          </ToolbarButton>
          <ToolbarButton aria-label="Notifications">
            <BellIcon />
          </ToolbarButton>
        </ToolbarGroup>
      </Toolbar>
    );
  },
};

export const WithSelectAndInput: Story = {
  render: () => {
    return (
      <Toolbar aria-label="Text properties">
        <Select defaultValue="Inter">
          <ToolbarButton render={<SelectTrigger />} aria-label="Font family">
            <SelectValue />
            <SelectIcon>
              <ChevronUpDownIcon />
            </SelectIcon>
          </ToolbarButton>
          <SelectContent>
            <SelectList>
              {fonts.map((font) => (
                <SelectItem key={font} value={font}>
                  <SelectItemIndicator />
                  <SelectItemText>{font}</SelectItemText>
                </SelectItem>
              ))}
            </SelectList>
          </SelectContent>
        </Select>

        <ToolbarSeparator />
        <ToolbarInput aria-label="Search actions" placeholder="Search actions" />
        <ToolbarLink href="#">History</ToolbarLink>
      </Toolbar>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    return (
      <Toolbar orientation="vertical" aria-label="Vertical tools">
        <ToolbarButton>Move</ToolbarButton>
        <ToolbarButton>Scale</ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton aria-label="Favorite">
          <StarIcon />
        </ToolbarButton>
      </Toolbar>
    );
  },
};

export const DisabledControls: Story = {
  render: () => {
    return (
      <Toolbar aria-label="Disabled document actions">
        <ToolbarButton>Undo</ToolbarButton>
        <ToolbarButton disabled>Redo</ToolbarButton>
        <ToolbarSeparator />
        <ToolbarInput aria-label="Search disabled actions" placeholder="Search actions" disabled />
        <ToolbarButton aria-label="Notifications" disabled>
          <BellIcon />
        </ToolbarButton>
      </Toolbar>
    );
  },
};