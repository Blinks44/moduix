import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge';
import { Button } from '../Button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card';
import styles from './Card.stories.module.css';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    return (
      <Card className={styles.card}>
        <CardHeader>
          <CardTitle>Release health</CardTitle>
          <CardDescription>Summary for the current production rollout.</CardDescription>
          <CardAction>
            <Badge variant="secondary">Canary</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
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
        </CardContent>
        <CardFooter>
          <Button variant="outline">View log</Button>
          <Button>Promote release</Button>
        </CardFooter>
      </Card>
    );
  },
};

export const Compact: Story = {
  render: () => {
    return (
      <Card className={styles.card} size="sm">
        <CardHeader>
          <CardTitle>Billing plan</CardTitle>
          <CardDescription>Team workspace, monthly billing.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={styles.metric}>
            <span className={styles.metricValue}>$48</span>
            <span className={styles.metricLabel}>per month</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Upgrade</Button>
        </CardFooter>
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
        <CardHeader>
          <CardTitle>Warehouse capacity</CardTitle>
          <CardDescription>North region allocation for the next planning cycle.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={styles.capacity}>
            <span>72%</span>
            <div className={styles.capacityBar}>
              <div />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Badge variant="outline">Forecast</Badge>
          <Button variant="outline">Open report</Button>
        </CardFooter>
      </Card>
    );
  },
};

export const CustomComposition: Story = {
  render: () => {
    return (
      <Card className={styles.customCard}>
        <CardHeader>
          <CardTitle>Incident response</CardTitle>
          <CardDescription>Owner rotation and escalation readiness.</CardDescription>
          <CardAction>
            <Badge variant="secondary">Stable</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    );
  },
};