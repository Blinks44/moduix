import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd, KbdGroup } from '@/components/kbd/Kbd';

const meta = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Esc',
  },
} satisfies Meta<typeof Kbd>;

export default meta;

type Story = StoryObj<typeof meta>;

const rowClass = 'flex flex-wrap items-center gap-2';
const columnClass = 'grid gap-3';
const shortcutRowClass =
  'grid grid-cols-[max-content_1fr] items-center gap-3 text-sm leading-5 text-muted-foreground';
const customKbdClass =
  'min-h-8 min-w-8 rounded-md border-primary/30 bg-primary/10 px-3 text-primary shadow-[inset_0_-1px_0_color-mix(in_oklab,currentColor_22%,transparent)]';
const customGroupClass = 'gap-2';
const denseClass = 'min-h-5 min-w-5 px-1';

export const Basic: Story = {
  render: () => (
    <KbdGroup aria-label="Command K">
      <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
    </KbdGroup>
  ),
};

export const SingleKey: Story = {};

export const RootPart: Story = {
  render: () => <Kbd>Enter</Kbd>,
};

export const AsChild: Story = {
  render: () => (
    <Kbd asChild>
      <kbd title="Escape">Esc</kbd>
    </Kbd>
  ),
};

export const GroupAsChild: Story = {
  render: () => (
    <KbdGroup asChild aria-label="Command K">
      <span>
        <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
      </span>
    </KbdGroup>
  ),
};

export const ShortcutList: Story = {
  render: () => (
    <div className={columnClass}>
      <div className={shortcutRowClass}>
        <KbdGroup aria-label="Command K">
          <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
        </KbdGroup>
        Open command menu
      </div>
      <div className={shortcutRowClass}>
        <KbdGroup aria-label="Shift question mark">
          <Kbd>Shift</Kbd>+<Kbd>?</Kbd>
        </KbdGroup>
        Show shortcuts
      </div>
      <div className={shortcutRowClass}>
        <Kbd>Esc</Kbd>
        Close overlay
      </div>
    </div>
  ),
};

export const Dense: Story = {
  render: () => (
    <div className={rowClass}>
      <Kbd className={denseClass}>Esc</Kbd>
      <Kbd className={denseClass}>Ctrl</Kbd>
      <Kbd className={denseClass}>/</Kbd>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <KbdGroup aria-label="Command K" className={customGroupClass}>
      <Kbd className={customKbdClass}>Cmd</Kbd>+<Kbd className={customKbdClass}>K</Kbd>
    </KbdGroup>
  ),
};