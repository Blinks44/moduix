import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../../src/components/badge';
import { Button } from '../../../src/components/button';
import { Card } from '../../../src/components/card/Card';
import { Input } from '../../../src/components/input';
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
  render: () => {
    return (
      <Card className={styles.card}>
        <Card.Header>
          <Card.Title>Release health</Card.Title>
          <Card.Description>Summary for the current production rollout.</Card.Description>
        </Card.Header>
        <Card.Body>
          <div className={styles.releaseSummary}>
            <div>
              <span className={styles.statValue}>98.4%</span>
              <span className={styles.statLabel}>successful sessions</span>
            </div>
            <div>
              <span className={styles.statValue}>12</span>
              <span className={styles.statLabel}>checks passed</span>
            </div>
          </div>
        </Card.Body>
        <Card.Footer>
          <Button variant="outline">View log</Button>
          <Button>Promote release</Button>
        </Card.Footer>
      </Card>
    );
  },
};

export const WithAction: Story = {
  render: () => {
    return (
      <Card className={styles.card}>
        <Card.Header>
          <Card.Title>Incident response</Card.Title>
          <Card.Description>Owner rotation and escalation readiness.</Card.Description>
          <Card.Action>
            <Badge variant="secondary">Stable</Badge>
          </Card.Action>
        </Card.Header>
        <Card.Body>
          <div className={styles.statsGrid}>
            <div>
              <span className={styles.statValue}>18 min</span>
              <span className={styles.statLabel}>median response</span>
            </div>
            <div>
              <span className={styles.statValue}>99.97%</span>
              <span className={styles.statLabel}>service uptime</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  },
};

export const Compact: Story = {
  render: () => {
    return (
      <Card className={styles.card} size="sm">
        <Card.Header>
          <Card.Title>Billing plan</Card.Title>
          <Card.Description>Team workspace, monthly billing.</Card.Description>
        </Card.Header>
        <Card.Body>
          <div className={styles.metric}>
            <span className={styles.metricValue}>$48</span>
            <span className={styles.metricLabel}>per month</span>
          </div>
        </Card.Body>
        <Card.Footer>
          <Button variant="outline">Cancel</Button>
          <Button>Upgrade</Button>
        </Card.Footer>
      </Card>
    );
  },
};

export const Variants: Story = {
  render: () => {
    return (
      <div className={styles.cardGrid}>
        {(['elevated', 'outline', 'subtle'] as const).map((variant) => (
          <Card key={variant} className={styles.cardGridItem} variant={variant}>
            <Card.Header>
              <Card.Title>{variant}</Card.Title>
              <Card.Description>
                Card surface using the {variant} visual treatment.
              </Card.Description>
            </Card.Header>
            <Card.Body>Use variants to communicate surface hierarchy.</Card.Body>
          </Card>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className={styles.cardGrid}>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <Card key={size} className={styles.cardGridItem} size={size}>
            <Card.Header>
              <Card.Title>Card {size}</Card.Title>
              <Card.Description>Spacing and title scale for the {size} size.</Card.Description>
            </Card.Header>
            <Card.Body>Shared content with size-specific density.</Card.Body>
          </Card>
        ))}
      </div>
    );
  },
};

export const WithinForm: Story = {
  render: () => {
    return (
      <Card className={styles.card} asChild>
        <form>
          <Card.Header>
            <Card.Title>Create account</Card.Title>
            <Card.Description>Enter the contact details for the new member.</Card.Description>
          </Card.Header>
          <Card.Body>
            <div className={styles.formGrid}>
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
        </form>
      </Card>
    );
  },
};

export const WithImage: Story = {
  render: () => {
    return (
      <Card className={styles.card}>
        <Card.Media>
          <img
            alt="A warehouse with neatly stacked delivery boxes."
            className={styles.image}
            src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=960&q=80"
          />
        </Card.Media>
        <Card.Header>
          <Card.Title>Warehouse capacity</Card.Title>
          <Card.Description>North region allocation for the next planning cycle.</Card.Description>
        </Card.Header>
        <Card.Body>
          <div className={styles.capacity}>
            <span>72%</span>
            <div className={styles.capacityBar}>
              <div />
            </div>
          </div>
        </Card.Body>
        <Card.Footer className={styles.footerBetween}>
          <Badge variant="outline">Forecast</Badge>
          <Button variant="outline">Open report</Button>
        </Card.Footer>
      </Card>
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    return (
      <Card className={styles.horizontalCard}>
        <img
          alt="Caffè latte in a ceramic cup."
          className={styles.horizontalImage}
          src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=720&q=80"
        />
        <div className={styles.horizontalContent}>
          <Card.Header>
            <Card.Title>The perfect latte</Card.Title>
            <Card.Description>
              Espresso balanced with steamed milk and a light foam.
            </Card.Description>
          </Card.Header>
          <Card.Body>
            <Badge variant="secondary">Hot</Badge>
          </Card.Body>
          <Card.Footer>
            <Button>Buy latte</Button>
          </Card.Footer>
        </div>
      </Card>
    );
  },
};

export const WithAvatar: Story = {
  render: () => {
    return (
      <Card className={styles.card}>
        <Card.Header>
          <div className={styles.profile}>
            <span aria-hidden="true" className={styles.avatar}>
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
    );
  },
};

export const AsLink: Story = {
  render: () => {
    return (
      <Card asChild className={styles.card}>
        <a href="/docs/card">
          <Card.Header>
            <Card.Title>Release health</Card.Title>
            <Card.Description>Summary for the current production rollout.</Card.Description>
          </Card.Header>
          <Card.Body>
            <div className={styles.releaseSummary}>
              <div>
                <span className={styles.statValue}>98.4%</span>
                <span className={styles.statLabel}>successful sessions</span>
              </div>
              <div>
                <span className={styles.statValue}>12</span>
                <span className={styles.statLabel}>checks passed</span>
              </div>
            </div>
          </Card.Body>
        </a>
      </Card>
    );
  },
};

export const LinkWithActions: Story = {
  render: () => {
    return (
      <Card className={styles.card}>
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
          <div className={styles.statsGrid}>
            <div>
              <span className={styles.statValue}>18 min</span>
              <span className={styles.statLabel}>median response</span>
            </div>
            <div>
              <span className={styles.statValue}>99.97%</span>
              <span className={styles.statLabel}>service uptime</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  },
};

export const CustomComposition: Story = {
  render: () => {
    return (
      <Card className={styles.customCard}>
        <Card.Header>
          <Card.Title asChild>
            <h2>System load</h2>
          </Card.Title>
          <Card.Description>
            Aggregated worker utilization across the current batch.
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <div className={styles.capacity}>
            <span>64%</span>
            <div className={styles.capacityBar}>
              <div />
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  },
};

export const CustomSpacing: Story = {
  render: () => {
    return (
      <Card className={styles.customSpacingCard}>
        <Card.Header>
          <Card.Title>Scheduled reports</Card.Title>
          <Card.Description>Weekly snapshots with denser card spacing.</Card.Description>
        </Card.Header>
        <Card.Body>
          <div className={styles.metric}>
            <span className={styles.metricValue}>24</span>
            <span className={styles.metricLabel}>active report schedules</span>
          </div>
        </Card.Body>
        <Card.Footer>
          <Button variant="outline">See details</Button>
          <Button>Set up report</Button>
        </Card.Footer>
      </Card>
    );
  },
};