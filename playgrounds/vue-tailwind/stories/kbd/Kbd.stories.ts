import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
import { Kbd, KbdGroup } from '@/components/kbd';

const meta = {
  title: 'Components/Kbd',
  component: Kbd,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Kbd>;

export default meta;

type Story = StoryObj<typeof meta>;

const rowClass = 'flex flex-wrap items-center gap-2';
const columnClass = 'grid gap-3';
const customKbdClass =
  'min-h-8 min-w-8 rounded-md border-primary/30 bg-primary/10 px-3 text-primary shadow-[inset_0_-1px_0_color-mix(in_oklab,currentColor_22%,transparent)]';
const customGroupClass = 'gap-2';
const denseClass = 'min-h-5 min-w-5 px-1';

const storyComponents = { Kbd, KbdGroup };

function renderStory(template: string) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return {
          columnClass,
          customGroupClass,
          customKbdClass,
          denseClass,
          rowClass,
        };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <KbdGroup aria-label="Command K">
      <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
    </KbdGroup>
  `),
};

export const SingleKey: Story = {
  render: renderStory('<Kbd>Esc</Kbd>'),
};

export const RootPart: Story = {
  render: renderStory('<Kbd>Enter</Kbd>'),
};

export const AsChild: Story = {
  render: renderStory(`
    <Kbd as-child>
      <kbd title="Escape">Esc</kbd>
    </Kbd>
  `),
};

export const GroupAsChild: Story = {
  render: renderStory(`
    <KbdGroup as-child aria-label="Command K">
      <span>
        <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
      </span>
    </KbdGroup>
  `),
};

export const ShortcutList: Story = {
  render: renderStory(`
    <div :class="columnClass">
      <div class="grid grid-cols-[max-content_1fr] items-center gap-3 text-sm leading-5 text-muted-foreground">
        <KbdGroup aria-label="Command K">
          <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
        </KbdGroup>
        Open command menu
      </div>
      <div class="grid grid-cols-[max-content_1fr] items-center gap-3 text-sm leading-5 text-muted-foreground">
        <KbdGroup aria-label="Shift question mark">
          <Kbd>Shift</Kbd>+<Kbd>?</Kbd>
        </KbdGroup>
        Show shortcuts
      </div>
      <div class="grid grid-cols-[max-content_1fr] items-center gap-3 text-sm leading-5 text-muted-foreground">
        <Kbd>Esc</Kbd>
        Close overlay
      </div>
    </div>
  `),
};

export const Dense: Story = {
  render: renderStory(`
    <div :class="rowClass">
      <Kbd :class="denseClass">Esc</Kbd>
      <Kbd :class="denseClass">Ctrl</Kbd>
      <Kbd :class="denseClass">/</Kbd>
    </div>
  `),
};

export const CustomStyling: Story = {
  render: renderStory(`
    <KbdGroup aria-label="Command K" :class="customGroupClass">
      <Kbd :class="customKbdClass">Cmd</Kbd>+<Kbd :class="customKbdClass">K</Kbd>
    </KbdGroup>
  `),
};