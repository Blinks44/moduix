import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
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
import { Input } from '@/components/input';
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
        <CardFooter>
          <Button variant="outline">View log</Button>
          <Button>Promote release</Button>
        </CardFooter>
      </Card>
    );
  },
};

export const WithAction: Story = {
  render: () => {
    return (
      <Card className={styles.card}>
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

export const Compact: Story = {
  render: () => {
    return (
      <Card className={styles.card} size="sm">
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
        <CardFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Upgrade</Button>
        </CardFooter>
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
            <CardHeader>
              <CardTitle>{variant}</CardTitle>
              <CardDescription>Card surface using the {variant} visual treatment.</CardDescription>
            </CardHeader>
            <CardBody>Use variants to communicate surface hierarchy.</CardBody>
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
            <CardHeader>
              <CardTitle>Card {size}</CardTitle>
              <CardDescription>Spacing and title scale for the {size} size.</CardDescription>
            </CardHeader>
            <CardBody>Shared content with size-specific density.</CardBody>
          </Card>
        ))}
      </div>
    );
  },
};

export const ContentStress: Story = {
  render: () => {
    return (
      <Card className={styles.card}>
        <CardHeader>
          <CardTitle>
            Production-readiness-review-for-the-international-warehouse-platform
          </CardTitle>
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
    );
  },
};

export const WithinForm: Story = {
  render: () => {
    return (
      <Card className={styles.card} asChild>
        <form>
          <CardHeader>
            <CardTitle>Create account</CardTitle>
            <CardDescription>Enter the contact details for the new member.</CardDescription>
          </CardHeader>
          <CardBody>
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
          </CardBody>
          <CardFooter>
            <Button variant="outline" type="reset">
              Cancel
            </Button>
            <Button type="submit">Create account</Button>
          </CardFooter>
        </form>
      </Card>
    );
  },
};

export const WithImage: Story = {
  render: () => {
    return (
      <Card className={styles.card}>
        <CardMedia>
          <img
            alt="A warehouse with neatly stacked delivery boxes."
            className={styles.image}
            src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=960&q=80"
          />
        </CardMedia>
        <CardHeader>
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
        <CardFooter className={styles.footerBetween}>
          <Badge variant="outline">Forecast</Badge>
          <Button variant="outline">Open report</Button>
        </CardFooter>
      </Card>
    );
  },
};

export const WithBackground: Story = {
  render: () => {
    return (
      <Card className={styles.backgroundCard} variant="elevated">
        <CardBackground>
          <img
            alt=""
            className={styles.backgroundImage}
            src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85"
          />
          <div aria-hidden="true" className={styles.backgroundOverlay} />
        </CardBackground>
        <CardHeader className={styles.backgroundHeader}>
          <CardTitle>Weekend guide</CardTitle>
          <CardDescription className={styles.backgroundDescription}>
            Three places to slow down, look around, and stay a little longer.
          </CardDescription>
        </CardHeader>
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
    );
  },
};

export const WithAvatar: Story = {
  render: () => {
    return (
      <Card className={styles.card}>
        <CardHeader>
          <div className={styles.profile}>
            <span aria-hidden="true" className={styles.avatar}>
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
    );
  },
};

export const AsLink: Story = {
  render: () => {
    return (
      <Card asChild className={styles.card}>
        <a href="/docs/card">
          <CardHeader>
            <CardTitle>Release health</CardTitle>
            <CardDescription>Summary for the current production rollout.</CardDescription>
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
        </a>
      </Card>
    );
  },
};

export const LinkWithActions: Story = {
  render: () => {
    return (
      <Card className={styles.card}>
        <CardHeader>
          <CardTitle>
            <CardLink href="/docs/card">Incident response</CardLink>
          </CardTitle>
          <CardDescription>Owner rotation and escalation readiness.</CardDescription>
          <CardAction>
            <Button variant="outline" size="sm">
              Acknowledge
            </Button>
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

export const CustomComposition: Story = {
  render: () => {
    return (
      <Card className={styles.customCard}>
        <CardHeader>
          <CardTitle asChild>
            <h2>System load</h2>
          </CardTitle>
          <CardDescription>Aggregated worker utilization across the current batch.</CardDescription>
        </CardHeader>
        <CardBody>
          <div className={styles.capacity}>
            <span>64%</span>
            <div className={styles.capacityBar}>
              <div />
            </div>
          </div>
        </CardBody>
      </Card>
    );
  },
};

export const CustomSpacing: Story = {
  render: () => {
    return (
      <Card className={styles.customSpacingCard}>
        <CardHeader>
          <CardTitle>Scheduled reports</CardTitle>
          <CardDescription>Weekly snapshots with denser card spacing.</CardDescription>
        </CardHeader>
        <CardBody>
          <div className={styles.metric}>
            <span className={styles.metricValue}>24</span>
            <span className={styles.metricLabel}>active report schedules</span>
          </div>
        </CardBody>
        <CardFooter>
          <Button variant="outline">See details</Button>
          <Button>Set up report</Button>
        </CardFooter>
      </Card>
    );
  },
};