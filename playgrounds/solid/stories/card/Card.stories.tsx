import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Badge } from '@/components/badge/Badge';
import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { Input } from '@/components/input/Input';
import styles from './Card.stories.module.css';

const meta = {
  title: 'Components/Card',
  component: Card.Root,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Card.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Card class={styles.card}>
      <Card.Header>
        <Card.Title>Release health</Card.Title>
        <Card.Description>Summary for the current production rollout.</Card.Description>
      </Card.Header>
      <Card.Body>
        <div class={styles.releaseSummary}>
          <div>
            <span class={styles.statValue}>98.4%</span>
            <span class={styles.statLabel}>successful sessions</span>
          </div>
          <div>
            <span class={styles.statValue}>12</span>
            <span class={styles.statLabel}>checks passed</span>
          </div>
        </div>
      </Card.Body>
      <Card.Footer>
        <Button variant="outline">View log</Button>
        <Button>Promote release</Button>
      </Card.Footer>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card class={styles.card}>
      <Card.Header>
        <Card.Title>Incident response</Card.Title>
        <Card.Description>Owner rotation and escalation readiness.</Card.Description>
        <Card.Action>
          <Badge variant="secondary">Stable</Badge>
        </Card.Action>
      </Card.Header>
      <Card.Body>
        <div class={styles.statsGrid}>
          <div>
            <span class={styles.statValue}>18 min</span>
            <span class={styles.statLabel}>median response</span>
          </div>
          <div>
            <span class={styles.statValue}>99.97%</span>
            <span class={styles.statLabel}>service uptime</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  ),
};

export const Compact: Story = {
  render: () => (
    <Card class={styles.card} size="sm">
      <Card.Header>
        <Card.Title>Billing plan</Card.Title>
        <Card.Description>Team workspace, monthly billing.</Card.Description>
      </Card.Header>
      <Card.Body>
        <div class={styles.metric}>
          <span class={styles.metricValue}>$48</span>
          <span class={styles.metricLabel}>per month</span>
        </div>
      </Card.Body>
      <Card.Footer>
        <Button variant="outline">Cancel</Button>
        <Button>Upgrade</Button>
      </Card.Footer>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div class={styles.cardGrid}>
      {(['elevated', 'outline', 'subtle'] as const).map((variant) => (
        <Card class={styles.cardGridItem} variant={variant}>
          <Card.Header>
            <Card.Title>{variant}</Card.Title>
            <Card.Description>Card surface using the {variant} visual treatment.</Card.Description>
          </Card.Header>
          <Card.Body>Use variants to communicate surface hierarchy.</Card.Body>
        </Card>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div class={styles.cardGrid}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Card class={styles.cardGridItem} size={size}>
          <Card.Header>
            <Card.Title>Card {size}</Card.Title>
            <Card.Description>Spacing and title scale for the {size} size.</Card.Description>
          </Card.Header>
          <Card.Body>Shared content with size-specific density.</Card.Body>
        </Card>
      ))}
    </div>
  ),
};

export const ContentStress: Story = {
  render: () => (
    <Card class={styles.card}>
      <Card.Header>
        <Card.Title>
          Production-readiness-review-for-the-international-warehouse-platform
        </Card.Title>
        <Card.Description>
          A deliberately long description verifies wrapping at narrow widths and increased text
          scaling without forcing the trailing content outside the card.
        </Card.Description>
        <Card.Action>
          <Badge variant="secondary">Needs review</Badge>
        </Card.Action>
      </Card.Header>
      <Card.Body>
        Owners in logistics, reliability engineering, and customer support are coordinating the
        final rollout window.
      </Card.Body>
      <Card.Footer>
        <Button variant="outline">Review dependencies</Button>
        <Button>Approve rollout</Button>
      </Card.Footer>
    </Card>
  ),
};

export const WithinForm: Story = {
  render: () => (
    <Card class={styles.card} asChild={(props) => <form {...props()} />}>
      <Card.Header>
        <Card.Title>Create account</Card.Title>
        <Card.Description>Enter the contact details for the new member.</Card.Description>
      </Card.Header>
      <Card.Body>
        <div class={styles.formGrid}>
          <label>
            First name
            <Input name="firstName" />
          </label>
          <label>
            Last name
            <Input name="lastName" />
          </label>
        </div>
      </Card.Body>
      <Card.Footer>
        <Button variant="outline" type="reset">
          Cancel
        </Button>
        <Button type="submit">Create account</Button>
      </Card.Footer>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card class={styles.card}>
      <Card.Media>
        <img
          alt="A warehouse with neatly stacked delivery boxes."
          class={styles.image}
          src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=960&q=80"
        />
      </Card.Media>
      <Card.Header>
        <Card.Title>Warehouse capacity</Card.Title>
        <Card.Description>North region allocation for the next planning cycle.</Card.Description>
      </Card.Header>
      <Card.Body>
        <div class={styles.capacity}>
          <span>72%</span>
          <div class={styles.capacityBar}>
            <div />
          </div>
        </div>
      </Card.Body>
      <Card.Footer class={styles.footerBetween}>
        <Badge variant="outline">Forecast</Badge>
        <Button variant="outline">Open report</Button>
      </Card.Footer>
    </Card>
  ),
};

export const WithBackground: Story = {
  render: () => (
    <Card class={styles.backgroundCard} variant="elevated">
      <Card.Background>
        <img
          alt=""
          class={styles.backgroundImage}
          src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85"
        />
        <div aria-hidden="true" class={styles.backgroundOverlay} />
      </Card.Background>
      <Card.Header class={styles.backgroundHeader}>
        <Card.Title>Weekend guide</Card.Title>
        <Card.Description class={styles.backgroundDescription}>
          Three places to slow down, look around, and stay a little longer.
        </Card.Description>
      </Card.Header>
    </Card>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Card class={styles.horizontalCard}>
      <img
        alt="Caffè latte in a ceramic cup."
        class={styles.horizontalImage}
        src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=720&q=80"
      />
      <div class={styles.horizontalContent}>
        <Card.Header>
          <Card.Title>The perfect latte</Card.Title>
          <Card.Description>Espresso balanced with steamed milk and a light foam.</Card.Description>
        </Card.Header>
        <Card.Body>
          <Badge variant="secondary">Hot</Badge>
        </Card.Body>
        <Card.Footer>
          <Button>Buy latte</Button>
        </Card.Footer>
      </div>
    </Card>
  ),
};

export const WithAvatar: Story = {
  render: () => (
    <Card class={styles.card}>
      <Card.Header>
        <div class={styles.profile}>
          <span aria-hidden="true" class={styles.avatar}>
            NF
          </span>
          <div>
            <Card.Title>Nate Foss</Card.Title>
            <Card.Description>@natefoss</Card.Description>
          </div>
        </div>
      </Card.Header>
      <Card.Body>Nate has requested to join your team.</Card.Body>
      <Card.Footer>
        <Button variant="outline">Decline</Button>
        <Button>Approve</Button>
      </Card.Footer>
    </Card>
  ),
};

export const AsLink: Story = {
  render: () => (
    <Card class={styles.card} asChild={(props) => <a {...props()} href="/docs/card" />}>
      <Card.Header>
        <Card.Title>Release health</Card.Title>
        <Card.Description>Summary for the current production rollout.</Card.Description>
      </Card.Header>
      <Card.Body>
        <div class={styles.releaseSummary}>
          <div>
            <span class={styles.statValue}>98.4%</span>
            <span class={styles.statLabel}>successful sessions</span>
          </div>
          <div>
            <span class={styles.statValue}>12</span>
            <span class={styles.statLabel}>checks passed</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  ),
};

export const LinkWithActions: Story = {
  render: () => (
    <Card class={styles.card}>
      <Card.Header>
        <Card.Title>
          <Card.Link href="/docs/card">Incident response</Card.Link>
        </Card.Title>
        <Card.Description>Owner rotation and escalation readiness.</Card.Description>
        <Card.Action>
          <Button variant="outline" size="sm">
            Acknowledge
          </Button>
        </Card.Action>
      </Card.Header>
      <Card.Body>
        <div class={styles.statsGrid}>
          <div>
            <span class={styles.statValue}>18 min</span>
            <span class={styles.statLabel}>median response</span>
          </div>
          <div>
            <span class={styles.statValue}>99.97%</span>
            <span class={styles.statLabel}>service uptime</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  ),
};

export const CustomComposition: Story = {
  render: () => (
    <Card class={styles.customCard}>
      <Card.Header>
        <Card.Title asChild={(props) => <h2 {...props()}>System load</h2>} />
        <Card.Description>Aggregated worker utilization across the current batch.</Card.Description>
      </Card.Header>
      <Card.Body>
        <div class={styles.capacity}>
          <span>64%</span>
          <div class={styles.capacityBar}>
            <div />
          </div>
        </div>
      </Card.Body>
    </Card>
  ),
};

export const CustomSpacing: Story = {
  render: () => (
    <Card class={styles.customSpacingCard}>
      <Card.Header>
        <Card.Title>Scheduled reports</Card.Title>
        <Card.Description>Weekly snapshots with denser card spacing.</Card.Description>
      </Card.Header>
      <Card.Body>
        <div class={styles.metric}>
          <span class={styles.metricValue}>24</span>
          <span class={styles.metricLabel}>active report schedules</span>
        </div>
      </Card.Body>
      <Card.Footer>
        <Button variant="outline">See details</Button>
        <Button>Set up report</Button>
      </Card.Footer>
    </Card>
  ),
};