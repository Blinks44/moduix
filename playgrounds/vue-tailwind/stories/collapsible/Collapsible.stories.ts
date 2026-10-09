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
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';

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
    return { recoveryKeys };
  },
  template: `
    <ul class="m-0 flex flex-col gap-1 ps-0">
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
        return { ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Collapsible class="w-64">
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
    <Collapsible :default-open="true" class="w-64">
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
      <Collapsible v-model:open="open" class="w-64">
        <CollapsibleTrigger>
          Recovery keys
          <CollapsibleIndicator />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollapsibleBody><RecoveryKeys /></CollapsibleBody>
        </CollapsibleContent>
        <div class="mt-2 text-xs text-muted-foreground">Current state: {{ open ? 'open' : 'closed' }}</div>
      </Collapsible>
    `,
    () => ({ open: ref(false) }),
  ),
};

export const Disabled: Story = {
  render: renderStory(`
    <Collapsible disabled class="w-64">
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
    <Collapsible lazy-mount unmount-on-exit class="w-64">
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
    <Collapsible collapsed-height="3rem" class="w-64">
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
    <Collapsible collapsed-width="8rem" class="w-64" style="width: 18rem">
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
      <div class="flex flex-col gap-2">
        <output>Current state: {{ collapsible.open ? 'open' : 'closed' }}</output>
        <CollapsibleRootProvider :value="collapsible" class="w-64">
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
    <Collapsible class="w-64 text-foreground">
      <CollapsibleTrigger as-child>
        <button type="button" class="flex w-full items-center justify-between gap-2 rounded-md bg-muted px-3 py-2 text-foreground [@media(hover:hover)]:hover:bg-accent">
          <span class="min-w-0">Styled recovery keys</span>
          <CollapsibleIndicator class="text-primary"><ChevronDownIcon /></CollapsibleIndicator>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent class="text-muted-foreground">
        <CollapsibleBody class="mt-1 rounded-md bg-muted px-3 py-2"><RecoveryKeys /></CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  `),
};