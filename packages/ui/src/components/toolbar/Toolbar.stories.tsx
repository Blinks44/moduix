import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment } from 'react';
import { BellIcon, StarIcon } from '@/icons/demo';
import { ChevronUpDownIcon } from '@/lib/moduix/icons/ui';
import { Select, Portal, createListCollection } from '../select';
import { Toggle } from '../toggle';
import { ToggleGroup } from '../toggle-group';
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
      <Fragment>
        <ToolbarGroup aria-label="History">
          <ToolbarButton>Undo</ToolbarButton>
          <ToolbarButton>Redo</ToolbarButton>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarButton aria-label="Notifications">
          <BellIcon />
        </ToolbarButton>
        <ToolbarLink href="#" className={storyStyles.toolbarLink}>
          Edited 51m ago
        </ToolbarLink>
      </Fragment>
    ),
  },
} satisfies Meta<typeof Toolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

const fonts = ['Inter', 'Arial', 'Helvetica', 'Georgia'];
const fontCollection = createListCollection({
  items: fonts.map((font) => ({ label: font, value: font })),
});

export const Default: Story = {};

export const WithToggleGroup: Story = {
  render: () => {
    return (
      <Toolbar aria-label="Editor formatting">
        <ToggleGroup multiple defaultValue={['bold']} aria-label="Text formatting" variant="ghost">
          <ToolbarButton render={<Toggle variant="ghost" />} value="bold" aria-label="Bold">
            <strong>B</strong>
          </ToolbarButton>
          <ToolbarButton render={<Toggle variant="ghost" />} value="italic" aria-label="Italic">
            <em>I</em>
          </ToolbarButton>
          <ToolbarButton
            render={<Toggle variant="ghost" />}
            value="underline"
            aria-label="Underline"
          >
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

export const WithInput: Story = {
  render: () => {
    return (
      <Toolbar aria-label="Search actions">
        <ToolbarGroup aria-label="History">
          <ToolbarButton>Undo</ToolbarButton>
          <ToolbarButton>Redo</ToolbarButton>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarInput aria-label="Search actions" placeholder="Search actions" />
      </Toolbar>
    );
  },
};

export const WithSelectTrigger: Story = {
  render: () => {
    return (
      <Toolbar aria-label="Text properties">
        <Select collection={fontCollection} defaultValue={['Inter']}>
          <Select.Trigger asChild>
            <ToolbarButton aria-label="Font family" className={storyStyles.toolbarSelect}>
              <Select.ValueText />
              <Select.Indicator>
                <ChevronUpDownIcon />
              </Select.Indicator>
            </ToolbarButton>
          </Select.Trigger>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {fontCollection.items.map((font) => (
                  <Select.Item key={font.value} item={font}>
                    <Select.ItemText>{font.label}</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
          <Select.HiddenSelect />
        </Select>

        <ToolbarSeparator />
        <ToolbarButton aria-label="Notifications">
          <BellIcon />
        </ToolbarButton>
        <ToolbarLink href="#" className={storyStyles.toolbarLink}>
          Edited 51m ago
        </ToolbarLink>
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