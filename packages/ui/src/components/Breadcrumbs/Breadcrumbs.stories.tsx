import type { Meta, StoryObj } from '@storybook/react-vite';
import { SeparatorMarkIcon } from '@/primitives';
import { Breadcrumbs } from './Breadcrumbs';

const defaultItems = [
  { label: 'Home', href: '#' },
  { label: 'Vacancies', href: '#' },
  { label: 'Go Developer' },
];

const nestedItems = [
  { label: 'Home', href: '#' },
  { label: 'Engineering', href: '#' },
  { label: 'Backend', href: '#' },
  { label: 'Golang', href: '#' },
  { label: 'Vacancies', href: '#' },
  { label: 'Go Developer' },
];

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    items: defaultItems,
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Collapsed: Story = {
  args: {
    items: nestedItems,
    maxItems: 1,
  },
};

export const CustomSeparator: Story = {
  args: {
    separator: <SeparatorMarkIcon style={{ width: '0.75rem', height: '0.25rem' }} />,
  },
};

export const LongCurrentLabel: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Vacancies', href: '#' },
      {
        label:
          'Go lang developer to production team with cross-functional ownership and platform support',
      },
    ],
  },
};

export const ActionItems: Story = {
  args: {
    maxItems: 1,
    items: [
      { label: 'Home', href: '#' },
      { label: 'Projects', onClick: () => undefined },
      { label: 'Backend', onClick: () => undefined },
      { label: 'Go Developer' },
    ],
  },
};