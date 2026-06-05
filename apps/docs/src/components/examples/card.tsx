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
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './card.module.css';

export const cardOverrideCssProperties: CssPropertyInput[] = [
  ['--card-action-gap', 'var(--spacing-2)', 'Controls `CardAction` spacing.'],
  ['--card-bg', 'var(--color-card)', 'Controls card background color.'],
  ['--card-border-color', 'var(--color-border)', 'Controls card border color.'],
  ['--card-border-width', 'var(--border-width-sm)', 'Controls card border width.'],
  ['--card-color', 'var(--color-card-foreground)', 'Controls card foreground color.'],
  ['--card-content-color', 'var(--color-muted-foreground)', 'Controls `CardContent` text color.'],
  ['--card-content-font-size', 'var(--text-sm)', 'Controls `CardContent` font size.'],
  [
    '--card-content-line-height',
    'var(--line-height-text-sm)',
    'Controls `CardContent` line height.',
  ],
  [
    '--card-content-padding-top',
    'var(--spacing-4)',
    'Controls spacing between header and content.',
  ],
  [
    '--card-description-color',
    'var(--color-muted-foreground)',
    'Controls `CardDescription` text color.',
  ],
  ['--card-description-font-size', 'var(--text-sm)', 'Controls `CardDescription` font size.'],
  [
    '--card-description-line-height',
    'var(--line-height-text-sm)',
    'Controls `CardDescription` line height.',
  ],
  ['--card-footer-gap', 'var(--spacing-2)', 'Controls `CardFooter` spacing.'],
  ['--card-focus-ring-color', 'var(--color-ring)', 'Controls `CardLink` focus ring color.'],
  ['--card-focus-ring-offset', 'var(--border-width-sm)', 'Controls `CardLink` focus ring offset.'],
  ['--card-focus-ring-width', 'var(--border-width-md)', 'Controls `CardLink` focus ring width.'],
  ['--card-header-gap', 'var(--spacing-1)', 'Controls spacing inside `CardHeader`.'],
  ['--card-padding', 'var(--spacing-6)', 'Controls default card padding.'],
  ['--card-padding-sm', 'var(--spacing-4)', 'Controls compact card padding.'],
  ['--card-radius', 'var(--radius-lg)', 'Controls card border radius.'],
  ['--card-shadow', 'none', 'Controls card shadow.'],
  ['--card-title-color', 'currentColor', 'Controls `CardTitle` color.'],
  ['--card-title-font-size', 'var(--text-lg)', 'Controls default `CardTitle` font size.'],
  ['--card-title-font-size-sm', 'var(--text-md)', 'Controls compact `CardTitle` font size.'],
  ['--card-title-font-weight', 'var(--weight-semibold)', 'Controls `CardTitle` weight.'],
  [
    '--card-title-line-height',
    'var(--line-height-text-lg)',
    'Controls default `CardTitle` line height.',
  ],
  [
    '--card-title-line-height-sm',
    'var(--line-height-text-md)',
    'Controls compact `CardTitle` line height.',
  ],
];

export const cardPlaygroundCssProperties: CssPropertyInput[] = [
  ['--card-bg', 'var(--color-card)', 'Controls card background color.'],
  ['--card-border-color', 'var(--color-border)', 'Controls card border color.'],
  ['--card-border-width', 'var(--border-width-sm)', 'Controls card border width.'],
  ['--card-color', 'var(--color-card-foreground)', 'Controls card foreground color.'],
  ['--card-padding', 'var(--spacing-6)', 'Controls default card padding.'],
  ['--card-radius', 'var(--radius-lg)', 'Controls card border radius.'],
  ['--card-shadow', 'none', 'Controls card shadow.'],
];

export function CardCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable properties={cardOverrideCssProperties.map(normalizeCssProperty)} />
  );
}

export function CardCssPlaygroundPanel({ values, onChange, onReset }: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={cardPlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
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

export function CustomCompositionCardExample() {
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