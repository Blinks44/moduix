import { List, ListItem, type ListProps } from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
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

const nativeItems = [
  'Use native li elements when a wrapper component is unnecessary.',
  'The root still controls spacing, marker style, size, and tone.',
  'Reach for ListItem when you want the stable item slot.',
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

export const listOverrideCssProperties: CssPropertyInput[] = [
  [
    '--list-color',
    'var(--list-default-color, var(--color-foreground))',
    'Controls list text color.',
  ],
  ['--list-default-color', 'var(--color-foreground)', 'Controls default tone color.'],
  ['--list-destructive-color', 'var(--color-destructive)', 'Controls destructive tone color.'],
  ['--list-font-family', 'var(--font-sans)', 'Controls list font family.'],
  [
    '--list-font-size',
    'var(--list-font-size-md, var(--text-md))',
    'Controls default list font size.',
  ],
  ['--list-font-size-xs', 'var(--text-xs)', 'Controls extra-small list font size.'],
  ['--list-font-size-sm', 'var(--text-sm)', 'Controls small list font size.'],
  ['--list-font-size-md', 'var(--text-md)', 'Controls medium list font size.'],
  ['--list-font-size-lg', 'var(--text-lg)', 'Controls large list font size.'],
  ['--list-font-size-xl', 'var(--text-xl)', 'Controls extra-large list font size.'],
  ['--list-font-weight', 'var(--weight-regular)', 'Controls list font weight.'],
  ['--list-gap', 'var(--list-gap-sm, var(--spacing-2))', 'Controls default gap between items.'],
  ['--list-gap-2xl', 'var(--spacing-6)', 'Controls 2xl list item gap.'],
  ['--list-gap-xs', 'var(--spacing-1)', 'Controls extra-small list item gap.'],
  ['--list-gap-sm', 'var(--spacing-2)', 'Controls small list item gap.'],
  ['--list-gap-md', 'var(--spacing-3)', 'Controls medium list item gap.'],
  ['--list-gap-lg', 'var(--spacing-4)', 'Controls large list item gap.'],
  ['--list-gap-xl', 'var(--spacing-5)', 'Controls extra-large list item gap.'],
  ['--list-item-padding-x', '0', 'Controls list item inline start padding.'],
  ['--list-letter-spacing', '0', 'Controls list letter spacing.'],
  [
    '--list-line-height',
    'var(--list-line-height-md, var(--line-height-text-md))',
    'Controls default list line height.',
  ],
  ['--list-line-height-xs', 'var(--line-height-text-xs)', 'Controls extra-small list line height.'],
  ['--list-line-height-sm', 'var(--line-height-text-sm)', 'Controls small list line height.'],
  ['--list-line-height-md', 'var(--line-height-text-md)', 'Controls medium list line height.'],
  ['--list-line-height-lg', 'var(--line-height-text-lg)', 'Controls large list line height.'],
  ['--list-line-height-xl', 'var(--line-height-text-xl)', 'Controls extra-large list line height.'],
  ['--list-marker-color', 'currentColor', 'Controls marker color.'],
  ['--list-marker-font-weight', 'inherit', 'Controls native marker font weight.'],
  ['--list-marker-gap', 'var(--spacing-3)', 'Controls custom bullet marker gap.'],
  ['--list-marker-offset-y', '0.625em', 'Controls custom bullet vertical offset.'],
  ['--list-marker-radius', 'var(--radius-full)', 'Controls custom bullet marker radius.'],
  ['--list-marker-size', '0.375rem', 'Controls custom bullet marker size.'],
  ['--list-muted-color', 'var(--color-muted-foreground)', 'Controls muted tone color.'],
  ['--list-padding-x', 'var(--spacing-5)', 'Controls marker indentation.'],
  ['--list-primary-color', 'var(--color-primary)', 'Controls primary tone color.'],
  ['--list-subtle-color', 'var(--color-secondary-foreground)', 'Controls subtle tone color.'],
];
export const listPlaygroundCssProperties: CssPropertyInput[] = listOverrideCssProperties;

export function ListCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable properties={listOverrideCssProperties.map(normalizeCssProperty)} />
  );
}

export function ListCssPlaygroundPanel({ values, onChange, onReset }: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={listPlaygroundCssProperties.map(normalizeCssProperty)}
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

export function NativeItemsListExample() {
  return (
    <List marker="bullet" className={styles.customBullet}>
      {nativeItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </List>
  );
}

export function CustomStylesListExample() {
  return (
    <List marker="bullet" className={styles.customBullet}>
      {customStyleItems.map((item) => (
        <ListItem key={item} classNames={{ marker: styles.glowMarker }}>
          {item}
        </ListItem>
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