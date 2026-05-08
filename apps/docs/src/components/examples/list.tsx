import { List, ListItem, type ListProps } from 'moduix';
import type { CssPropertyInput } from '../preview';
import styles from './list.module.css';

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
      <ListItem>Use native list semantics.</ListItem>
      <ListItem>Keep spacing and typography on the design system scale.</ListItem>
      <ListItem>Customize markers with CSS variables.</ListItem>
    </List>
  );
}

export function OrderedListExample() {
  return (
    <List as="ol" className={styles.list}>
      <ListItem>Install the package.</ListItem>
      <ListItem>Import the library stylesheet.</ListItem>
      <ListItem>Use components in your app.</ListItem>
    </List>
  );
}

export function MarkerlessListExample() {
  return (
    <List marker="none" className={styles.list}>
      <ListItem>Markerless item</ListItem>
      <ListItem>Another markerless item</ListItem>
      <ListItem>Useful for compact metadata groups</ListItem>
    </List>
  );
}

export function CustomBulletListExample() {
  return (
    <List marker="bullet" className={styles.customBullet}>
      <ListItem>Bullet size is independent from text size.</ListItem>
      <ListItem>Bullet color and gap are controlled by CSS variables.</ListItem>
      <ListItem>Text color remains unchanged.</ListItem>
    </List>
  );
}

export function ListSizesExample() {
  return (
    <div className={styles.stack}>
      <List size="xl">
        <ListItem>Extra-large list item</ListItem>
      </List>
      <List size="md">
        <ListItem>Medium list item</ListItem>
      </List>
      <List size="xs">
        <ListItem>Extra-small list item</ListItem>
      </List>
    </div>
  );
}

export function ListGapsExample() {
  return (
    <div className={styles.stack}>
      <List gap="xs">
        <ListItem>Extra-small gap</ListItem>
        <ListItem>Second item</ListItem>
      </List>
      <List gap="lg">
        <ListItem>Large gap</ListItem>
        <ListItem>Second item</ListItem>
      </List>
    </div>
  );
}

export function ListTonesExample() {
  return (
    <div className={styles.toneGrid}>
      <List tone="default">
        <ListItem>Default list tone</ListItem>
      </List>
      <List tone="muted">
        <ListItem>Muted list tone</ListItem>
      </List>
      <List tone="subtle">
        <ListItem>Subtle list tone</ListItem>
      </List>
      <List tone="primary">
        <ListItem>Primary list tone</ListItem>
      </List>
      <List tone="destructive">
        <ListItem>Destructive list tone</ListItem>
      </List>
    </div>
  );
}

export function ListClassNameExample() {
  return (
    <List className={styles.customList}>
      <ListItem>Customized marker and spacing.</ListItem>
      <ListItem>Local CSS variables keep the component API small.</ListItem>
    </List>
  );
}