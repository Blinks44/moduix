import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge';
import { Button } from '../Button';
import {
  Card,
  CardAction,
  CardBody,
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
      <Card className={styles.card} variant="elevated">
        <CardHeader>
          <CardTitle>Release health</CardTitle>
          <CardDescription>Summary for the current production rollout.</CardDescription>
          <CardAction>
            <Badge variant="secondary">Canary</Badge>
          </CardAction>
        </CardHeader>
        <CardBody>
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
        </CardBody>
        <CardFooter withDivider>
          <Button variant="outline">View log</Button>
          <Button>Promote release</Button>
        </CardFooter>
      </Card>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    return (
      <Card className={styles.card}>
        <CardHeader>
          <CardTitle>Billing plan</CardTitle>
          <CardDescription>Team workspace, monthly billing.</CardDescription>
        </CardHeader>
        <CardBody>
          <div className={styles.metric}>
            <span className={styles.metricValue}>$48</span>
            <span className={styles.metricLabel}>per month</span>
          </div>
        </CardBody>
        <CardFooter withDivider>
          <Button variant="outline">Cancel</Button>
          <Button>Upgrade</Button>
        </CardFooter>
      </Card>
    );
  },
};

export const WithAction: Story = {
  render: () => {
    return (
      <Card className={styles.card} variant="elevated">
        <CardHeader>
          <CardTitle>Incident response</CardTitle>
          <CardDescription>Owner rotation and escalation readiness.</CardDescription>
          <CardAction>
            <Badge variant="secondary">Stable</Badge>
          </CardAction>
        </CardHeader>
        <CardBody>
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
        </CardBody>
      </Card>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const variants = ['default', 'elevated', 'outline', 'ghost'] as const;

    return (
      <div className={styles.grid}>
        {variants.map((variant) => (
          <Card key={variant} className={styles.variantCard} variant={variant}>
            <CardHeader>
              <CardTitle>{variant}</CardTitle>
              <CardDescription>Card variant</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className={styles.sizesGrid}>
        {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
          <Card key={size} className={styles.card} size={size}>
            <CardHeader>
              <CardTitle>{size.toUpperCase()} card</CardTitle>
              <CardDescription>Padding and title scale follow the size.</CardDescription>
            </CardHeader>
            <CardBody>
              <p>Use size to tune density for compact lists, dashboards, and page sections.</p>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    return (
      <Card as="article" className={styles.card} interactive tabIndex={0}>
        <CardHeader>
          <CardTitle>Data import completed</CardTitle>
          <CardDescription>42,816 rows processed without validation errors.</CardDescription>
          <CardAction>
            <Badge>New</Badge>
          </CardAction>
        </CardHeader>
      </Card>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    return (
      <Card className={styles.customCard}>
        <CardHeader withDivider>
          <CardTitle>Warehouse capacity</CardTitle>
          <CardDescription>North region allocation for the next planning cycle.</CardDescription>
        </CardHeader>
        <CardBody>
          <div className={styles.capacity}>
            <span>72%</span>
            <div className={styles.capacityBar}>
              <div />
            </div>
          </div>
        </CardBody>
        <CardFooter align="between" withDivider>
          <Badge variant="outline">Forecast</Badge>
          <Button variant="outline">Open report</Button>
        </CardFooter>
      </Card>
    );
  },
};