import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, h, ref } from 'vue';
import {
  Alert,
  AlertActions,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
} from '@/components/alert';
import { Button } from '@/components/button';
import { CheckIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Alert.stories.module.css';

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

const alertComponents = {
  Alert,
  AlertActions,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
  Button,
  CheckIcon,
  InfoIcon,
};

function renderStory(template: string) {
  return () =>
    defineComponent({
      components: alertComponents,
      setup() {
        return { statuses, styles };
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
    <div :class="styles.stack">
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

export const AdvancedCustomization: Story = {
  render: () => {
    const visible = ref(true);
    const dismiss = () => (visible.value = false);

    return defineComponent({
      components: alertComponents,
      setup() {
        return { dismiss, styles, visible };
      },
      template: `
        <div :class="styles.stack">
          <Alert v-if="visible" status="warning" :class="styles.customAlert">
            <AlertIndicator><InfoIcon /></AlertIndicator>
            <AlertContent>
              <AlertTitle>Storage is almost full</AlertTitle>
              <AlertDescription>
                You are using 92% of the available storage. Archive old uploads or upgrade the plan.
              </AlertDescription>
              <AlertActions>
                <Button size="sm">Review uploads</Button>
                <Button size="sm" variant="outline" @click="dismiss">Dismiss</Button>
              </AlertActions>
            </AlertContent>
          </Alert>
        </div>
      `,
    });
  },
};