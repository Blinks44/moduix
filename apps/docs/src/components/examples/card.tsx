import {
  Badge,
  Button,
  Card,
  CardAction,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardProps,
} from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './card.module.css';

export const cardOverrideCssProperties: CssPropertyInput[] = [
  ['--card-action-gap', 'var(--spacing-2)', 'Controls `CardAction` children gap.'],
  ['--card-bg', 'var(--color-card)', 'Controls card background color.'],
  ['--card-body-color', 'var(--card-muted-color)', 'Controls `CardBody` text color.'],
  [
    '--card-body-divided-padding-top',
    'var(--card-padding-default)',
    'Controls `CardBody` top padding after a divided header.',
  ],
  ['--card-body-font-size', 'var(--text-sm)', 'Controls `CardBody` font size.'],
  ['--card-body-line-height', 'var(--line-height-text-sm)', 'Controls `CardBody` line height.'],
  [
    '--card-body-padding-y',
    '0 var(--card-padding-default)',
    'Controls `CardBody` vertical padding.',
  ],
  ['--card-border-color', 'var(--color-border)', 'Controls card border color.'],
  ['--card-border-color-hover', 'var(--color-ring)', 'Controls interactive hover border color.'],
  ['--card-border-width', 'var(--border-width-sm)', 'Controls card border width.'],
  ['--card-color', 'var(--color-card-foreground)', 'Controls card foreground color.'],
  ['--card-description-color', 'var(--card-muted-color)', 'Controls `CardDescription` text color.'],
  ['--card-description-font-size', 'var(--text-sm)', 'Controls `CardDescription` font size.'],
  [
    '--card-description-line-height',
    'var(--line-height-text-sm)',
    'Controls `CardDescription` line height.',
  ],
  ['--card-divider-color', 'var(--color-border)', 'Controls header/footer divider color.'],
  ['--card-divider-width', 'var(--border-width-sm)', 'Controls header/footer divider width.'],
  [
    '--card-footer-divided-padding-top',
    'var(--card-padding-default)',
    'Controls `CardFooter` top padding when divided.',
  ],
  ['--card-footer-gap', 'var(--spacing-2)', 'Controls `CardFooter` children gap.'],
  [
    '--card-footer-padding-y',
    '0 var(--card-padding-default)',
    'Controls `CardFooter` vertical padding.',
  ],
  ['--card-header-column-gap', 'var(--spacing-3)', 'Controls `CardHeader` column gap.'],
  [
    '--card-header-padding-y',
    'var(--card-padding-default)',
    'Controls `CardHeader` vertical padding.',
  ],
  ['--card-header-row-gap', 'var(--spacing-1)', 'Controls `CardHeader` row gap.'],
  ['--card-muted-color', 'var(--color-muted-foreground)', 'Controls muted text fallback color.'],
  ['--card-padding-xs', 'var(--spacing-3)', 'Controls padding for `xs` cards.'],
  ['--card-padding-sm', 'var(--spacing-4)', 'Controls padding for `sm` cards.'],
  ['--card-padding-md', 'var(--spacing-5)', 'Controls padding for `md` cards.'],
  ['--card-padding-lg', 'var(--spacing-6)', 'Controls padding for `lg` cards.'],
  ['--card-padding-x', 'var(--card-padding-default)', 'Controls horizontal slot padding.'],
  ['--card-radius', 'var(--radius-lg)', 'Controls card border radius.'],
  ['--card-shadow', 'none', 'Controls card shadow.'],
  ['--card-shadow-hover', 'var(--shadow-md)', 'Controls interactive hover shadow.'],
  ['--card-title-color', 'var(--card-color)', 'Controls `CardTitle` color.'],
  ['--card-title-font-size', 'var(--card-title-font-size-md)', 'Controls `CardTitle` font size.'],
  ['--card-title-font-size-xs', 'var(--text-sm)', 'Controls title font size for `xs` cards.'],
  ['--card-title-font-size-sm', 'var(--text-md)', 'Controls title font size for `sm` cards.'],
  ['--card-title-font-size-md', 'var(--text-lg)', 'Controls title font size for `md` cards.'],
  ['--card-title-font-size-lg', 'var(--text-xl)', 'Controls title font size for `lg` cards.'],
  ['--card-title-font-weight', 'var(--weight-semibold)', 'Controls `CardTitle` weight.'],
  [
    '--card-title-line-height',
    'var(--card-title-line-height-md)',
    'Controls `CardTitle` line height.',
  ],
  [
    '--card-title-line-height-xs',
    'var(--line-height-text-sm)',
    'Controls title line height for `xs` cards.',
  ],
  [
    '--card-title-line-height-sm',
    'var(--line-height-text-md)',
    'Controls title line height for `sm` cards.',
  ],
  [
    '--card-title-line-height-md',
    'var(--line-height-text-lg)',
    'Controls title line height for `md` cards.',
  ],
  [
    '--card-title-line-height-lg',
    'var(--line-height-text-xl)',
    'Controls title line height for `lg` cards.',
  ],
  ['--card-transition', 'var(--transition-default)', 'Controls card transitions.'],
  ['--card-translate-y-hover', '-1px', 'Controls interactive hover movement.'],
];

export const cardPlaygroundCssProperties: CssPropertyInput[] = [
  ['--card-bg', 'var(--color-card)', 'Controls card background color.'],
  ['--card-border-color', 'var(--color-border)', 'Controls card border color.'],
  ['--card-border-width', 'var(--border-width-sm)', 'Controls card border width.'],
  ['--card-color', 'var(--color-card-foreground)', 'Controls card foreground color.'],
  ['--card-divider-color', 'var(--color-border)', 'Controls header/footer divider color.'],
  ['--card-padding-md', 'var(--spacing-5)', 'Controls default card padding.'],
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

export function CardExample(props: CardProps) {
  return (
    <Card className={styles.card} variant="elevated" {...props}>
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
}

export function CardWithFooterExample() {
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
}

export function CardWithActionExample() {
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
}

export function CardVariantsExample() {
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
}

export function CardSizesExample() {
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
}

export function InteractiveCardExample() {
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
}

export function CustomStylesCardExample() {
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
}