import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleRootProvider,
  CollapsibleTrigger,
  useCollapsible,
} from '@/components/collapsible';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Collapsible.stories.module.css';

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Collapsible>;

export default meta;

type Story = StoryObj<typeof meta>;

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

const RecoveryKeys = defineComponent({
  setup() {
    return { recoveryKeys, styles };
  },
  template: `
    <ul :class="styles.keysList">
      <li v-for="key in recoveryKeys" :key="key">{{ key }}</li>
    </ul>
  `,
});

const storyComponents = {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleRootProvider,
  CollapsibleTrigger,
  ChevronDownIcon,
  RecoveryKeys,
};

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { styles, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Collapsible :class="styles.root">
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody><RecoveryKeys /></CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  `),
};

export const DefaultOpen: Story = {
  render: renderStory(`
    <Collapsible :default-open="true" :class="styles.root">
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody><RecoveryKeys /></CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <Collapsible v-model:open="open" :class="styles.root">
        <CollapsibleTrigger>
          Recovery keys
          <CollapsibleIndicator />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollapsibleBody><RecoveryKeys /></CollapsibleBody>
        </CollapsibleContent>
        <div :class="styles.status">Current state: {{ open ? 'open' : 'closed' }}</div>
      </Collapsible>
    `,
    () => ({ open: ref(false) }),
  ),
};

export const Disabled: Story = {
  render: renderStory(`
    <Collapsible disabled :class="styles.root">
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody><RecoveryKeys /></CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  `),
};

export const LazyMount: Story = {
  render: renderStory(`
    <Collapsible lazy-mount unmount-on-exit :class="styles.root">
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody><RecoveryKeys /></CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  `),
};

export const PartialCollapse: Story = {
  render: renderStory(`
    <Collapsible collapsed-height="3rem" :class="styles.root">
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody><RecoveryKeys /></CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  `),
};

export const PartialWidth: Story = {
  render: renderStory(`
    <Collapsible collapsed-width="8rem" :class="styles.root" style="width: 18rem">
      <CollapsibleTrigger>
        Read details
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody>Additional account-recovery details stay partly visible.</CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  `),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div :class="styles.providerLayout">
        <output>Current state: {{ collapsible.open ? 'open' : 'closed' }}</output>
        <CollapsibleRootProvider :value="collapsible" :class="styles.root">
          <CollapsibleTrigger>
            Recovery keys
            <CollapsibleIndicator />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CollapsibleBody><RecoveryKeys /></CollapsibleBody>
          </CollapsibleContent>
        </CollapsibleRootProvider>
      </div>
    `,
    () => ({ collapsible: useCollapsible() }),
  ),
};

export const CustomComposition: Story = {
  render: renderStory(`
    <Collapsible :class="styles.customRoot">
      <CollapsibleTrigger as-child>
        <button type="button" :class="styles.customTrigger">
          <span :class="styles.triggerLabel">Styled recovery keys</span>
          <CollapsibleIndicator :class="styles.customIndicator">
            <ChevronDownIcon />
          </CollapsibleIndicator>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent :class="styles.customContent">
        <CollapsibleBody :class="styles.customContentBody"><RecoveryKeys /></CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  `),
};