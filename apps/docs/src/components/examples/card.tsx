import type { ComponentProps } from 'react';
import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardLink,
  CardTitle,
} from 'moduix';
import type { CSSPropertiesEditorContext, CssProperty } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './card.module.css';

export const cardOverrideCssProperties: CssProperty[] = [
  {
    name: '--card-action-gap',
    defaultValue: 'var(--spacing-2)',
    description: 'Controls `CardAction` spacing.',
  },
  {
    name: '--card-bg',
    defaultValue: 'var(--color-card)',
    description: 'Controls card background color.',
  },
  {
    name: '--card-border-color',
    defaultValue: 'var(--color-border)',
    description: 'Controls card border color.',
  },
  {
    name: '--card-border-width',
    defaultValue: 'var(--border-width-sm)',
    description: 'Controls card border width.',
  },
  {
    name: '--card-color',
    defaultValue: 'var(--color-card-foreground)',
    description: 'Controls card foreground color.',
  },
  {
    name: '--card-content-color',
    defaultValue: 'var(--color-muted-foreground)',
    description: 'Controls `CardContent` text color.',
  },
  {
    name: '--card-content-font-size',
    defaultValue: 'var(--text-sm)',
    description: 'Controls `CardContent` font size.',
  },
  {
    name: '--card-content-line-height',
    defaultValue: 'var(--line-height-text-sm)',
    description: 'Controls `CardContent` line height.',
  },
  {
    name: '--card-content-padding-top',
    defaultValue: 'var(--spacing-4)',
    description: 'Controls spacing between header and content.',
  },
  {
    name: '--card-description-color',
    defaultValue: 'var(--color-muted-foreground)',
    description: 'Controls `CardDescription` text color.',
  },
  {
    name: '--card-description-font-size',
    defaultValue: 'var(--text-sm)',
    description: 'Controls `CardDescription` font size.',
  },
  {
    name: '--card-description-line-height',
    defaultValue: 'var(--line-height-text-sm)',
    description: 'Controls `CardDescription` line height.',
  },
  {
    name: '--card-footer-gap',
    defaultValue: 'var(--spacing-2)',
    description: 'Controls `CardFooter` spacing.',
  },
  {
    name: '--card-focus-ring-color',
    defaultValue: 'var(--color-ring)',
    description: 'Controls `CardLink` focus ring color.',
  },
  {
    name: '--card-focus-ring-offset',
    defaultValue: 'var(--border-width-sm)',
    description: 'Controls `CardLink` focus ring offset.',
  },
  {
    name: '--card-focus-ring-width',
    defaultValue: 'var(--border-width-md)',
    description: 'Controls `CardLink` focus ring width.',
  },
  {
    name: '--card-header-gap',
    defaultValue: 'var(--spacing-1)',
    description: 'Controls spacing inside `CardHeader`.',
  },
  {
    name: '--card-padding',
    defaultValue: 'var(--spacing-6)',
    description: 'Controls default card padding.',
  },
  {
    name: '--card-padding-sm',
    defaultValue: 'var(--spacing-4)',
    description: 'Controls compact card padding.',
  },
  {
    name: '--card-radius',
    defaultValue: 'var(--radius-lg)',
    description: 'Controls card border radius.',
  },
  { name: '--card-shadow', defaultValue: 'none', description: 'Controls card shadow.' },
  {
    name: '--card-title-color',
    defaultValue: 'currentColor',
    description: 'Controls `CardTitle` color.',
  },
  {
    name: '--card-title-font-size',
    defaultValue: 'var(--text-lg)',
    description: 'Controls default `CardTitle` font size.',
  },
  {
    name: '--card-title-font-size-sm',
    defaultValue: 'var(--text-md)',
    description: 'Controls compact `CardTitle` font size.',
  },
  {
    name: '--card-title-font-weight',
    defaultValue: 'var(--weight-semibold)',
    description: 'Controls `CardTitle` weight.',
  },
  {
    name: '--card-title-line-height',
    defaultValue: 'var(--line-height-text-lg)',
    description: 'Controls default `CardTitle` line height.',
  },
  {
    name: '--card-title-line-height-sm',
    defaultValue: 'var(--line-height-text-md)',
    description: 'Controls compact `CardTitle` line height.',
  },
];

export function CardCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={cardOverrideCssProperties} />;
}

export function CardExample(props: ComponentProps<typeof Card>) {
  return (
    <Card className={styles.card} {...props}>
      <CardHeader>
        <CardTitle>Release health</CardTitle>
        <CardDescription>Summary for the current production rollout.</CardDescription>
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
}

export function CardCompactExample() {
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
}

export function CardWithActionExample() {
  return (
    <Card className={styles.card}>
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
}

export function CardWithImageExample() {
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
      <CardFooter className={styles.footerBetween}>
        <Badge variant="outline">Forecast</Badge>
        <Button variant="outline">Open report</Button>
      </CardFooter>
    </Card>
  );
}

export function CardAsLinkExample() {
  return (
    <Card className={styles.card} render={<a href="/docs/card" />}>
      <CardHeader>
        <CardTitle>Release health</CardTitle>
        <CardDescription>Summary for the current production rollout.</CardDescription>
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
    </Card>
  );
}

export function CardLinkWithActionsExample() {
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
}

export function CardCustomStylingExample() {
  return (
    <Card className={styles.customCard}>
      <CardHeader>
        <CardTitle>System load</CardTitle>
        <CardDescription>Aggregated worker utilization across the current batch.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={styles.capacity}>
          <span>64%</span>
          <div className={styles.capacityBar}>
            <div className={styles.capacityFill} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}