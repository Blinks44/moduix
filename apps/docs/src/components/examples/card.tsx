import type { ComponentProps } from 'react';
import { Badge, Button, Card, Input } from '@moduix/react';
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
    name: '--card-padding-lg',
    defaultValue: 'var(--spacing-8)',
    description: 'Controls large card padding.',
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
    name: '--card-title-font-size-lg',
    defaultValue: 'var(--text-xl)',
    description: 'Controls large `Card.Title` font size.',
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
    name: '--card-title-line-height-lg',
    defaultValue: 'var(--line-height-text-xl)',
    description: 'Controls large `Card.Title` line height.',
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

export function CardVariantsExample() {
  return (
    <div className={styles.cardGrid}>
      {(['elevated', 'outline', 'subtle'] as const).map((variant) => (
        <Card key={variant} className={styles.cardGridItem} variant={variant}>
          <Card.Header>
            <Card.Title>{variant}</Card.Title>
            <Card.Description>Card surface using the {variant} visual treatment.</Card.Description>
          </Card.Header>
          <Card.Body>Use variants to communicate surface hierarchy.</Card.Body>
        </Card>
      ))}
    </div>
  );
}

export function CardSizesExample() {
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
}

export function CardFormExample() {
  return (
    <Card className={styles.card} asChild>
      <form>
        <Card.Header>
          <Card.Title>Create account</Card.Title>
          <Card.Description>
            Enter the contact details for the new workspace member.
          </Card.Description>
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

export function CardHorizontalExample() {
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
  );
}

export function CardAvatarExample() {
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