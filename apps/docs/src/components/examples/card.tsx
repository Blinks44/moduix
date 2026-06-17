import type { ComponentProps } from 'react';
import { Badge, Button, Card } from 'moduix';
import type { CSSPropertiesEditorContext, CssProperty } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './card.module.css';

export const cardOverrideCssProperties: CssProperty[] = [
  {
    name: '--card-action-gap',
    defaultValue: 'var(--spacing-2)',
    description: 'Controls `Card.Action` spacing.',
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
    name: '--card-body-color',
    defaultValue: 'var(--color-muted-foreground)',
    description: 'Controls `Card.Body` text color.',
  },
  {
    name: '--card-body-font-size',
    defaultValue: 'var(--text-sm)',
    description: 'Controls `Card.Body` font size.',
  },
  {
    name: '--card-body-line-height',
    defaultValue: 'var(--line-height-text-sm)',
    description: 'Controls `Card.Body` line height.',
  },
  {
    name: '--card-body-padding-top',
    defaultValue: 'var(--spacing-4)',
    description: 'Controls spacing between header and body.',
  },
  {
    name: '--card-description-color',
    defaultValue: 'var(--color-muted-foreground)',
    description: 'Controls `Card.Description` text color.',
  },
  {
    name: '--card-description-font-size',
    defaultValue: 'var(--text-sm)',
    description: 'Controls `Card.Description` font size.',
  },
  {
    name: '--card-description-line-height',
    defaultValue: 'var(--line-height-text-sm)',
    description: 'Controls `Card.Description` line height.',
  },
  {
    name: '--card-footer-gap',
    defaultValue: 'var(--spacing-2)',
    description: 'Controls `Card.Footer` spacing.',
  },
  {
    name: '--card-focus-ring-color',
    defaultValue: 'var(--color-ring)',
    description: 'Controls `Card.Link` focus ring color.',
  },
  {
    name: '--card-focus-ring-offset',
    defaultValue: 'var(--border-width-sm)',
    description: 'Controls `Card.Link` focus ring offset.',
  },
  {
    name: '--card-focus-ring-width',
    defaultValue: 'var(--border-width-md)',
    description: 'Controls `Card.Link` focus ring width.',
  },
  {
    name: '--card-header-gap',
    defaultValue: 'var(--spacing-1)',
    description: 'Controls spacing inside `Card.Header`.',
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
    description: 'Controls `Card.Title` color.',
  },
  {
    name: '--card-title-font-size',
    defaultValue: 'var(--text-lg)',
    description: 'Controls default `Card.Title` font size.',
  },
  {
    name: '--card-title-font-size-sm',
    defaultValue: 'var(--text-md)',
    description: 'Controls compact `Card.Title` font size.',
  },
  {
    name: '--card-title-font-weight',
    defaultValue: 'var(--weight-semibold)',
    description: 'Controls `Card.Title` weight.',
  },
  {
    name: '--card-title-line-height',
    defaultValue: 'var(--line-height-text-lg)',
    description: 'Controls default `Card.Title` line height.',
  },
  {
    name: '--card-title-line-height-sm',
    defaultValue: 'var(--line-height-text-md)',
    description: 'Controls compact `Card.Title` line height.',
  },
];

export function CardCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={cardOverrideCssProperties} />;
}

export function CardExample(props: ComponentProps<typeof Card>) {
  return (
    <Card className={styles.card} {...props}>
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
}

export function CardCompactExample() {
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
}

export function CardWithActionExample() {
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
}

export function CardWithImageExample() {
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
}

export function CardAsLinkExample() {
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
}

export function CardLinkWithActionsExample() {
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
}

export function CardCustomStylingExample() {
  return (
    <Card className={styles.customCard}>
      <Card.Header>
        <Card.Title>System load</Card.Title>
        <Card.Description>Aggregated worker utilization across the current batch.</Card.Description>
      </Card.Header>
      <Card.Body>
        <div className={styles.capacity}>
          <span>64%</span>
          <div className={styles.capacityBar}>
            <div className={styles.capacityFill} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}