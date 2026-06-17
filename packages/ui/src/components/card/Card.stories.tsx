import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../badge';
import { Button } from '../button';
import { Card } from './Card';
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

export const WithImage: Story = {
  render: () => {
    return (
      <Card className={styles.card}>
        <img
          alt="A warehouse with neatly stacked delivery boxes."
          className={styles.image}
          src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=960&q=80"
        />
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