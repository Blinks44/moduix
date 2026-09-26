import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref, type Component } from 'vue';
import {
  Clipboard,
  ClipboardContext,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardRootProvider,
  ClipboardTrigger,
  ClipboardValueText,
  useClipboard,
} from '@/components/clipboard';

const meta = {
  title: 'Components/Clipboard',
  component: Clipboard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { defaultValue: 'https://moduix.dev/invite/maps' },
} satisfies Meta<typeof Clipboard>;

export default meta;

type Story = StoryObj<typeof meta>;

const demoClassName = 'w-80';
const stackClassName = 'grid gap-3';
const actionClassName =
  'inline-flex min-h-control-lg cursor-pointer items-center justify-center rounded-md border border-border bg-background px-4 text-sm leading-5 text-foreground focus-visible:-outline-offset-1 focus-visible:outline-2 focus-visible:outline-ring';
const statusClassName = 'm-0 text-sm leading-5 text-muted-foreground';
const valueTextClassName = 'flex-1';
const copiedInputClassName =
  'data-copied:border-primary/22 data-copied:focus-visible:outline-primary';
const copiedTriggerClassName =
  'data-copied:border-primary/22 data-copied:bg-primary/5 data-copied:text-primary data-copied:focus-visible:outline-primary';

const clipboardComponents = {
  Clipboard,
  ClipboardContext,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardRootProvider,
  ClipboardTrigger,
  ClipboardValueText,
} as Record<string, Component>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: clipboardComponents,
      setup() {
        return { ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Clipboard class="${demoClassName}" default-value="https://moduix.dev/invite/maps">
      <ClipboardLabel>Copy this link</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput readonly />
        <ClipboardTrigger>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <div class="${stackClassName}">
        <Clipboard v-model="value" class="${demoClassName}">
          <ClipboardLabel>Share URL</ClipboardLabel>
          <ClipboardControl>
            <ClipboardInput />
            <ClipboardTrigger>
              <ClipboardIndicator />
            </ClipboardTrigger>
          </ClipboardControl>
        </Clipboard>
        <button class="${actionClassName}" type="button" @click="value = 'https://chakra-ui.com'">
          Change URL
        </button>
      </div>
    `,
    () => ({ value: ref('https://ark-ui.com') }),
  ),
};

export const WithValueText: Story = {
  render: renderStory(`
    <Clipboard class="${demoClassName}" default-value="moduix/clipboard">
      <ClipboardControl>
        <ClipboardValueText class="${valueTextClassName}" />
        <ClipboardTrigger aria-label="Copy package name">
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  `),
};

export const StatusCallback: Story = {
  render: renderStory(
    `
      <Clipboard
        class="${demoClassName}"
        default-value="maps-platform-token"
        @status-change="handleStatusChange"
      >
        <ClipboardControl>
          <ClipboardTrigger>
            <ClipboardIndicator />
            <ClipboardValueText />
          </ClipboardTrigger>
        </ClipboardControl>
        <p class="${statusClassName}">Copied {{ copyCount }} times</p>
      </Clipboard>
    `,
    () => {
      const copyCount = ref(0);
      const handleStatusChange = (details: { copied: boolean }) => {
        if (details.copied) copyCount.value += 1;
      };
      return { copyCount, handleStatusChange };
    },
  ),
};

export const Timeout: Story = {
  render: renderStory(`
    <Clipboard class="${demoClassName}" default-value="workspace-secret" :timeout="5000">
      <ClipboardLabel>Five second copied state</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput readonly />
        <ClipboardTrigger>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  `),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <ClipboardRootProvider class="${demoClassName}" :value="clipboard">
        <ClipboardLabel>Provider-driven clipboard</ClipboardLabel>
        <ClipboardControl>
          <ClipboardInput readonly />
          <ClipboardTrigger>
            <ClipboardIndicator />
          </ClipboardTrigger>
        </ClipboardControl>
      </ClipboardRootProvider>
    `,
    () => ({ clipboard: useClipboard({ defaultValue: 'https://moduix.dev/docs/clipboard' }) }),
  ),
};

export const ContextState: Story = {
  render: renderStory(`
    <Clipboard class="${demoClassName}" default-value="https://moduix.dev/docs/clipboard">
      <ClipboardControl>
        <ClipboardValueText class="${valueTextClassName}" />
        <ClipboardTrigger>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
      <ClipboardContext v-slot="clipboard">
        <p class="${statusClassName}">Copied: {{ String(clipboard.copied) }}</p>
      </ClipboardContext>
    </Clipboard>
  `),
};

export const Disabled: Story = {
  render: renderStory(`
    <Clipboard class="${demoClassName}" default-value="workspace-secret">
      <ClipboardLabel>Disabled clipboard</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput disabled />
        <ClipboardTrigger disabled>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  `),
};

export const AsChildBridge: Story = {
  render: renderStory(`
    <Clipboard class="${demoClassName}" default-value="https://moduix.dev/docs/clipboard">
      <ClipboardLabel>Native elements through asChild</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput as-child>
          <input
            class="min-h-control-md min-w-0 flex-1 rounded-md border border-border bg-background px-3.5 py-1 text-md text-foreground"
            readonly
          />
        </ClipboardInput>
        <ClipboardTrigger as-child>
          <button class="${actionClassName}" type="button">
            <ClipboardIndicator />
          </button>
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  `),
};

export const CustomCopyText: Story = {
  render: renderStory(`
    <Clipboard class="${demoClassName}" default-value="workspace-secret">
      <ClipboardLabel>Override copy labels</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput readonly />
        <ClipboardTrigger>
          <ClipboardIndicator />
          <ClipboardIndicator>
            Copy secret
            <template #copied>Copied!</template>
          </ClipboardIndicator>
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  `),
};

export const CustomStyling: Story = {
  render: renderStory(`
    <Clipboard class="${demoClassName}" default-value="workspace-secret">
      <ClipboardLabel>Styled copied state</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput readonly class="${copiedInputClassName}" />
        <ClipboardTrigger class="${copiedTriggerClassName}" aria-label="Copy workspace secret">
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  `),
};