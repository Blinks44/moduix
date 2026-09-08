import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Kbd } from '@/components/kbd/Kbd';

const meta = {
  title: 'Components/Kbd',
  component: Kbd.Root,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Esc',
  },
} satisfies Meta<typeof Kbd.Root>;

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
    <Kbd.Group aria-label="Command K">
      <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
    </Kbd.Group>
  ),
};

export const SingleKey: Story = {};

export const RootPart: Story = {
  render: () => <Kbd.Root>Enter</Kbd.Root>,
};

export const AsChild: Story = {
  render: () => <Kbd asChild={(props) => <kbd {...props()} title="Escape" />}>Esc</Kbd>,
};

export const GroupAsChild: Story = {
  render: () => (
    <Kbd.Group asChild={(props) => <span {...props()} />} aria-label="Command K">
      <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
    </Kbd.Group>
  ),
};

export const ShortcutList: Story = {
  render: () => (
    <div class={columnClass}>
      <div class={shortcutRowClass}>
        <Kbd.Group aria-label="Command K">
          <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
        </Kbd.Group>
        Open command menu
      </div>
      <div class={shortcutRowClass}>
        <Kbd.Group aria-label="Shift question mark">
          <Kbd>Shift</Kbd>+<Kbd>?</Kbd>
        </Kbd.Group>
        Show shortcuts
      </div>
      <div class={shortcutRowClass}>
        <Kbd>Esc</Kbd>
        Close overlay
      </div>
    </div>
  ),
};

export const Dense: Story = {
  render: () => (
    <div class={rowClass}>
      <Kbd class={denseClass}>Esc</Kbd>
      <Kbd class={denseClass}>Ctrl</Kbd>
      <Kbd class={denseClass}>/</Kbd>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Kbd.Group aria-label="Command K" class={customGroupClass}>
      <Kbd class={customKbdClass}>Cmd</Kbd>+<Kbd class={customKbdClass}>K</Kbd>
    </Kbd.Group>
  ),
};