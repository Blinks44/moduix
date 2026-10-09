import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Badge } from '@/components/badge/Badge';
import { Button } from '@/components/button/Button';
import {
  Card,
  CardAction,
  CardBackground,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardLink,
  CardMedia,
  CardTitle,
} from '@/components/card/Card';

const cardClass = 'w-[min(24rem,calc(100vw-var(--spacing-8)))]';
const gridClass = 'grid w-[min(28rem,calc(100vw-var(--spacing-8)))] gap-4';
const statValueClass = 'block text-xl font-semibold text-foreground';
const statLabelClass = 'text-sm text-muted-foreground';

function Summary() {
  return (
    <div class="grid grid-cols-2 gap-3">
      <div>
        <span class={statValueClass}>98.4%</span>
        <span class={statLabelClass}>successful sessions</span>
      </div>
      <div>
        <span class={statValueClass}>12</span>
        <span class={statLabelClass}>checks passed</span>
      </div>
    </div>
  );
}

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Card class={cardClass}>
      <CardHeader>
        <CardTitle>Release health</CardTitle>
        <CardDescription>Summary for the current production rollout.</CardDescription>
      </CardHeader>
      <CardBody>
        <Summary />
      </CardBody>
      <CardFooter>
        <Button variant="outline">View log</Button>
        <Button>Promote release</Button>
      </CardFooter>
    </Card>
  ),
};
export const WithAction: Story = {
  render: () => (
    <Card class={cardClass}>
      <CardHeader>
        <CardTitle>Incident response</CardTitle>
        <CardDescription>Owner rotation and escalation readiness.</CardDescription>
        <CardAction>
          <Badge variant="secondary">Stable</Badge>
        </CardAction>
      </CardHeader>
      <CardBody>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <span class={statValueClass}>18 min</span>
            <span class={statLabelClass}>median response</span>
          </div>
          <div>
            <span class={statValueClass}>99.97%</span>
            <span class={statLabelClass}>service uptime</span>
          </div>
        </div>
      </CardBody>
    </Card>
  ),
};
export const Compact: Story = {
  render: () => (
    <Card class={cardClass} size="sm">
      <CardHeader>
        <CardTitle>Billing plan</CardTitle>
        <CardDescription>Team workspace, monthly billing.</CardDescription>
      </CardHeader>
      <CardBody>
        <div class="grid gap-1">
          <span class="text-2xl font-semibold text-foreground">$48</span>
          <span class={statLabelClass}>per month</span>
        </div>
      </CardBody>
      <CardFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Upgrade</Button>
      </CardFooter>
    </Card>
  ),
};
export const Variants: Story = {
  render: () => (
    <div class={gridClass}>
      {(['elevated', 'outline', 'subtle'] as const).map((variant) => (
        <Card class="w-full" variant={variant}>
          <CardHeader>
            <CardTitle>{variant}</CardTitle>
            <CardDescription>Card surface using the {variant} visual treatment.</CardDescription>
          </CardHeader>
          <CardBody>Use variants to communicate surface hierarchy.</CardBody>
        </Card>
      ))}
    </div>
  ),
};
export const Sizes: Story = {
  render: () => (
    <div class={gridClass}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Card class="w-full" size={size}>
          <CardHeader>
            <CardTitle>Card {size}</CardTitle>
            <CardDescription>Spacing and title scale for the {size} size.</CardDescription>
          </CardHeader>
          <CardBody>Shared content with size-specific density.</CardBody>
        </Card>
      ))}
    </div>
  ),
};
export const ContentStress: Story = {
  render: () => (
    <Card class={cardClass}>
      <CardHeader>
        <CardTitle>Production-readiness-review-for-the-international-warehouse-platform</CardTitle>
        <CardDescription>
          A deliberately long description verifies wrapping at narrow widths and increased text
          scaling without forcing the trailing content outside the card.
        </CardDescription>
        <CardAction>
          <Badge variant="secondary">Needs review</Badge>
        </CardAction>
      </CardHeader>
      <CardBody>
        Owners in logistics, reliability engineering, and customer support are coordinating the
        final rollout window.
      </CardBody>
      <CardFooter>
        <Button variant="outline">Review dependencies</Button>
        <Button>Approve rollout</Button>
      </CardFooter>
    </Card>
  ),
};
export const WithinForm: Story = {
  render: () => (
    <Card asChild={(props) => <form {...props()} />} class={cardClass}>
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>Enter the contact details for the new member.</CardDescription>
      </CardHeader>
      <CardBody>
        <div class="grid gap-3">
          <label class="grid gap-1 font-medium text-foreground">
            First name
            <input
              class="min-w-0 rounded-md border border-input bg-transparent px-3 py-2"
              name="firstName"
            />
          </label>
          <label class="grid gap-1 font-medium text-foreground">
            Last name
            <input
              class="min-w-0 rounded-md border border-input bg-transparent px-3 py-2"
              name="lastName"
            />
          </label>
        </div>
      </CardBody>
      <CardFooter>
        <Button variant="outline" type="reset">
          Cancel
        </Button>
        <Button type="submit">Create account</Button>
      </CardFooter>
    </Card>
  ),
};
export const WithImage: Story = {
  render: () => (
    <Card class={cardClass}>
      <CardMedia>
        <img
          alt="A warehouse with neatly stacked delivery boxes."
          class="aspect-video w-full object-cover"
          src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=960&q=80"
        />
      </CardMedia>
      <CardHeader>
        <CardTitle>Warehouse capacity</CardTitle>
        <CardDescription>North region allocation for the next planning cycle.</CardDescription>
      </CardHeader>
      <CardBody>
        <div class="grid gap-2 text-2xl font-semibold text-foreground">
          <span>72%</span>
          <div class="h-2 overflow-hidden rounded-full bg-muted">
            <div class="h-full w-[72%] rounded-[inherit] bg-primary" />
          </div>
        </div>
      </CardBody>
      <CardFooter class="justify-between">
        <Badge variant="outline">Forecast</Badge>
        <Button variant="outline">Open report</Button>
      </CardFooter>
    </Card>
  ),
};
export const WithBackground: Story = {
  render: () => (
    <Card class="min-h-96 border-0 bg-muted text-white" variant="elevated">
      <CardBackground>
        <img
          alt=""
          class="scale-106"
          src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85"
        />
        <div
          aria-hidden="true"
          class="absolute inset-0 bg-linear-to-b from-black/4 from-24% to-black/78"
        />
      </CardBackground>
      <CardHeader class="mt-auto py-6 text-inherit [text-shadow:0_1px_16px_rgb(0_0_0/32%)]">
        <CardTitle>Weekend guide</CardTitle>
        <CardDescription class="text-white/80">
          Three places to slow down, look around, and stay a little longer.
        </CardDescription>
      </CardHeader>
    </Card>
  ),
};
export const Horizontal: Story = {
  render: () => (
    <Card class="grid w-[min(40rem,calc(100vw-var(--spacing-8)))] grid-cols-[minmax(10rem,.8fr)_minmax(0,1.2fr)] overflow-hidden max-[36rem]:grid-cols-1">
      <img
        alt="Caffè latte in a ceramic cup."
        class="h-full min-h-56 w-full object-cover max-[36rem]:aspect-video max-[36rem]:min-h-0"
        src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=720&q=80"
      />
      <div class="flex min-w-0 flex-col">
        <CardHeader>
          <CardTitle>The perfect latte</CardTitle>
          <CardDescription>Espresso balanced with steamed milk and a light foam.</CardDescription>
        </CardHeader>
        <CardBody>
          <Badge variant="secondary">Hot</Badge>
        </CardBody>
        <CardFooter>
          <Button>Buy latte</Button>
        </CardFooter>
      </div>
    </Card>
  ),
};
export const WithAvatar: Story = {
  render: () => (
    <Card class={cardClass}>
      <CardHeader>
        <div class="flex items-center gap-3">
          <span
            aria-hidden="true"
            class="inline-grid size-12 shrink-0 place-items-center rounded-full bg-primary font-semibold text-primary-foreground"
          >
            NF
          </span>
          <div>
            <CardTitle>Nate Foss</CardTitle>
            <CardDescription>@natefoss</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardBody>Nate has requested to join your team.</CardBody>
      <CardFooter>
        <Button variant="outline">Decline</Button>
        <Button>Approve</Button>
      </CardFooter>
    </Card>
  ),
};
export const AsLink: Story = {
  render: () => (
    <Card asChild={(props) => <a {...props()} href="/docs/card" />} class={cardClass}>
      <CardHeader>
        <CardTitle>Release health</CardTitle>
        <CardDescription>Summary for the current production rollout.</CardDescription>
      </CardHeader>
      <CardBody>
        <Summary />
      </CardBody>
    </Card>
  ),
};
export const LinkWithActions: Story = {
  render: () => (
    <Card class={cardClass}>
      <CardHeader>
        <CardTitle>
          <CardLink href="/docs/card">Incident response</CardLink>
        </CardTitle>
        <CardDescription>Owner rotation and escalation readiness.</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">
            Acknowledge
          </Button>
        </CardAction>
      </CardHeader>
      <CardBody>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <span class={statValueClass}>18 min</span>
            <span class={statLabelClass}>median response</span>
          </div>
          <div>
            <span class={statValueClass}>99.97%</span>
            <span class={statLabelClass}>service uptime</span>
          </div>
        </div>
      </CardBody>
    </Card>
  ),
};
export const CustomComposition: Story = {
  render: () => (
    <Card class="w-[min(24rem,calc(100vw-var(--spacing-8)))] rounded-md border-primary/35 bg-[color-mix(in_oklab,var(--color-card)_94%,var(--color-primary))] shadow-md">
      <CardHeader>
        <CardTitle asChild={(props) => <h2 {...props()}>System load</h2>} />
        <CardDescription>Aggregated worker utilization across the current batch.</CardDescription>
      </CardHeader>
      <CardBody>
        <div class="grid gap-2 text-2xl font-semibold text-foreground">
          <span>64%</span>
          <div class="h-2 overflow-hidden rounded-full bg-muted">
            <div class="h-full w-[72%] rounded-[inherit] bg-primary" />
          </div>
        </div>
      </CardBody>
    </Card>
  ),
};
export const CustomSpacing: Story = {
  render: () => (
    <Card class={cardClass}>
      <CardHeader class="px-4 pt-4">
        <CardTitle>Scheduled reports</CardTitle>
        <CardDescription>Weekly snapshots with denser card spacing.</CardDescription>
      </CardHeader>
      <CardBody class="px-4 pt-4 pb-4">
        <div class="grid gap-1">
          <span class="text-2xl font-semibold text-foreground">24</span>
          <span class={statLabelClass}>active report schedules</span>
        </div>
      </CardBody>
      <CardFooter class="px-4 pb-4">
        <Button variant="outline">See details</Button>
        <Button>Set up report</Button>
      </CardFooter>
    </Card>
  ),
};