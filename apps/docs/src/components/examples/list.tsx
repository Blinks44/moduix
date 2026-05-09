import { List, ListItem, type ListProps } from 'moduix';
import type { CssPropertyInput } from '../preview';
import styles from './list.module.css';

const basicItems = [
  'Use native list semantics.',
  'Keep spacing and typography on the design system scale.',
  'Customize markers with CSS variables.',
];

const orderedItems = [
  'Install the package.',
  'Import the library stylesheet.',
  'Use components in your app.',
];

const markerlessItems = [
  'Markerless item',
  'Another markerless item',
  'Useful for compact metadata groups',
];

const customStyleItems = [
  'Bullet size is independent from text size.',
  'Bullet color and gap are controlled by CSS variables.',
  'Text color remains unchanged.',
];

const sizeItems = [
  { size: 'xl', label: 'Extra-large list item' },
  { size: 'md', label: 'Medium list item' },
  { size: 'xs', label: 'Extra-small list item' },
] as const;

const gapItems = [
  { gap: 'xs', items: ['Extra-small gap', 'Second item'] },
  { gap: 'lg', items: ['Large gap', 'Second item'] },
] as const;

const toneItems = [
  { tone: 'default', label: 'Default list tone' },
  { tone: 'muted', label: 'Muted list tone' },
  { tone: 'subtle', label: 'Subtle list tone' },
  { tone: 'primary', label: 'Primary list tone' },
  { tone: 'destructive', label: 'Destructive list tone' },
] as const;

export const listCssProperties: CssPropertyInput[] = [
  ['--list-default-color', 'var(--color-foreground)', 'Controls default tone color.'],
  ['--list-muted-color', 'var(--color-muted-foreground)', 'Controls muted tone color.'],
  ['--list-subtle-color', 'var(--color-secondary-foreground)', 'Controls subtle tone color.'],
  ['--list-primary-color', 'var(--color-primary)', 'Controls primary tone color.'],
  ['--list-destructive-color', 'var(--color-destructive)', 'Controls destructive tone color.'],
  ['--list-marker-color', 'currentColor', 'Controls marker color.'],
  ['--list-marker-font-weight', 'inherit', 'Controls native marker font weight.'],
  ['--list-marker-size', '0.375rem', 'Controls custom bullet marker size.'],
  ['--list-marker-gap', 'var(--spacing-3)', 'Controls custom bullet marker gap.'],
  ['--list-marker-offset-y', '0.625em', 'Controls custom bullet vertical offset.'],
  ['--list-marker-radius', 'var(--radius-full)', 'Controls custom bullet marker radius.'],
  ['--list-padding-x', 'var(--spacing-5)', 'Controls marker indentation.'],
  ['--list-gap-sm', 'var(--spacing-2)', 'Controls small list item gap.'],
  ['--list-gap-lg', 'var(--spacing-4)', 'Controls large list item gap.'],
  ['--list-font-size-md', 'var(--text-md)', 'Controls `md` list font size.'],
  ['--list-line-height-md', 'var(--line-height-text-md)', 'Controls `md` list line height.'],
];

export function ListExample(props: ListProps) {
  return (
    <List className={styles.list} {...props}>
      {basicItems.map((item) => (
        <ListItem key={item}>{item}</ListItem>
      ))}
    </List>
  );
}

export function OrderedListExample() {
  return (
    <List as="ol" className={styles.list}>
      {orderedItems.map((item) => (
        <ListItem key={item}>{item}</ListItem>
      ))}
    </List>
  );
}

export function MarkerlessListExample() {
  return (
    <List marker="none" className={styles.list}>
      {markerlessItems.map((item) => (
        <ListItem key={item}>{item}</ListItem>
      ))}
    </List>
  );
}

export function CustomStylesListExample() {
  return (
    <List marker="bullet" className={styles.customBullet}>
      {customStyleItems.map((item) => (
        <ListItem key={item}>{item}</ListItem>
      ))}
    </List>
  );
}

export function ListSizesExample() {
  return (
    <div className={styles.stack}>
      {sizeItems.map((item) => (
        <List key={item.size} size={item.size}>
          <ListItem>{item.label}</ListItem>
        </List>
      ))}
    </div>
  );
}

export function ListGapsExample() {
  return (
    <div className={styles.stack}>
      {gapItems.map((group) => (
        <List key={group.gap} gap={group.gap}>
          {group.items.map((item) => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        </List>
      ))}
    </div>
  );
}

export function ListTonesExample() {
  return (
    <div className={styles.toneGrid}>
      {toneItems.map((item) => (
        <List key={item.tone} tone={item.tone}>
          <ListItem>{item.label}</ListItem>
        </List>
      ))}
    </div>
  );
}