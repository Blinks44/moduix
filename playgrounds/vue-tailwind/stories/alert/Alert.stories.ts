import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, h } from 'vue';
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
} from '@/components/alert';
import { CheckIcon } from '@/lib/moduix/icons/ui';

const InfoIcon = defineComponent({
  name: 'InfoIcon',
  inheritAttrs: false,
  setup(_, { attrs }) {
    return () =>
      h(
        'svg',
        { viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true', focusable: 'false', ...attrs },
        [
          h('path', {
            d: 'm11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z',
            stroke: 'currentColor',
            'stroke-width': '1.5',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
          }),
        ],
      );
  },
});

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

const statuses = ['info', 'success', 'warning', 'error'] as const;
const stackClassName = 'grid w-[min(38rem,calc(100vw-2rem))] gap-3';

const alertComponents = {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
  CheckIcon,
  InfoIcon,
};

function renderStory(template: string) {
  return () =>
    defineComponent({
      components: alertComponents,
      setup() {
        return { statuses, stackClassName };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Alert>
      <AlertContent>
        <AlertTitle>Update available</AlertTitle>
        <AlertDescription>
          Install the latest version when your workflow allows it.
        </AlertDescription>
      </AlertContent>
    </Alert>
  `),
};

export const CustomHeading: Story = {
  render: renderStory(`
    <Alert status="info">
      <AlertContent>
        <AlertTitle as-child>
          <h2>Billing issue</h2>
        </AlertTitle>
        <AlertDescription>
          Use asChild when the surrounding page needs a different heading level.
        </AlertDescription>
      </AlertContent>
    </Alert>
  `),
};

export const Error: Story = {
  render: renderStory(`
    <Alert status="error">
      <AlertIndicator>
        <InfoIcon />
      </AlertIndicator>
      <AlertContent>
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>
          Your payment could not be processed. Check the payment method and try again.
        </AlertDescription>
      </AlertContent>
    </Alert>
  `),
};

export const Statuses: Story = {
  render: renderStory(`
    <div :class="stackClassName">
      <Alert v-for="status in statuses" :key="status" :status="status">
        <AlertIndicator>
          <CheckIcon v-if="status === 'success'" />
          <InfoIcon v-else />
        </AlertIndicator>
        <AlertContent>
          <AlertTitle>{{ status }}</AlertTitle>
          <AlertDescription>Use this alert for {{ status }} feedback.</AlertDescription>
        </AlertContent>
      </Alert>
    </div>
  `),
};

export const WithIcon: Story = {
  render: renderStory(`
    <Alert status="info">
      <AlertIndicator>
        <InfoIcon />
      </AlertIndicator>
      <AlertContent>
        <AlertTitle>Workspace sync is active</AlertTitle>
        <AlertDescription>Changes are being synced across all connected devices.</AlertDescription>
      </AlertContent>
    </Alert>
  `),
};

// AdvancedCustomization is deferred until the moduix Button family is ported to Vue.