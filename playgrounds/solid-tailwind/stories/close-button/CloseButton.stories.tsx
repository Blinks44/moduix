import type { JSX } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { CloseButton } from '@/components/close-button/CloseButton';

const decorativeSvgProps: Record<string, string> = {
  'aria-hidden': 'true',
  focusable: 'false',
};

const meta = {
  title: 'Components/CloseButton',
  component: CloseButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    'aria-label': 'Close',
  },
} satisfies Meta<typeof CloseButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomChildren: Story = {
  args: {
    class: 'size-10',
    'aria-label': 'Close panel',
    children: <CircleXIcon class="size-5" />,
  },
};

export const AsChild: Story = {
  render: (args) => (
    <CloseButton
      {...args}
      asChild={(props) => (
        <button {...props()} type="button">
          <CircleXIcon class="size-3" />
        </button>
      )}
    />
  ),
};

export const Styled: Story = {
  args: {
    class:
      'size-10 bg-primary text-primary-foreground [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-foreground [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-primary-foreground',
    'aria-label': 'Close message',
    children: <CircleXIcon class="size-4" />,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const AriaDisabled: Story = {
  args: {
    'aria-disabled': 'true',
  },
};

export const DisabledAsChild: Story = {
  render: (args) => (
    <CloseButton
      {...args}
      disabled
      asChild={(props) => (
        <button {...props()} type="button">
          <CircleXIcon class="size-3" />
        </button>
      )}
    />
  ),
};

function CircleXIcon(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="size-3"
      {...decorativeSvgProps}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}