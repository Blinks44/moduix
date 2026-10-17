import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
import { Kbd, KbdGroup } from '@/components/kbd';
import styles from './Kbd.stories.module.css';

const meta = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Kbd>;

export default meta;

type Story = StoryObj<typeof meta>;

const storyComponents = { Kbd, KbdGroup };

function renderStory(template: string) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { styles };
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
    <div :class="styles.column">
      <div :class="styles.shortcutRow">
        <KbdGroup aria-label="Command K">
          <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
        </KbdGroup>
        Open command menu
      </div>
      <div :class="styles.shortcutRow">
        <KbdGroup aria-label="Shift question mark">
          <Kbd>Shift</Kbd>+<Kbd>?</Kbd>
        </KbdGroup>
        Show shortcuts
      </div>
      <div :class="styles.shortcutRow">
        <Kbd>Esc</Kbd>
        Close overlay
      </div>
    </div>
  `),
};

export const Dense: Story = {
  render: renderStory(`
    <div :class="styles.row">
      <Kbd :class="styles.dense">Esc</Kbd>
      <Kbd :class="styles.dense">Ctrl</Kbd>
      <Kbd :class="styles.dense">/</Kbd>
    </div>
  `),
};

export const CustomStyling: Story = {
  render: renderStory(`
    <KbdGroup aria-label="Command K" :class="styles.customGroup">
      <Kbd :class="styles.customKbd">Cmd</Kbd>+<Kbd :class="styles.customKbd">K</Kbd>
    </KbdGroup>
  `),
};
export const WithIcon: Story = {
  render: renderStory(`
    <KbdGroup aria-label="Shift Enter">
      <Kbd>Shift</Kbd>+<Kbd>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M9 10 4 15l5 5" />
          <path d="M20 4v7a4 4 0 0 1-4 4H4" />
        </svg>
        Enter
      </Kbd>
    </KbdGroup>
  `),
};