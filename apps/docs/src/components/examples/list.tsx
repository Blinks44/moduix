import type { ComponentProps } from 'react';
import { List, ListItem } from 'moduix';
import { CSSPropertiesReferenceTable } from '../preview';

const basicItems = [
  'Use semantic list markup for grouped content.',
  'Keep spacing and typography on the library scale.',
  'Style markers with CSS variables or native ::marker selectors.',
];

const orderedItems = [
  'Prepare the release notes.',
  'Publish the package.',
  'Announce the release.',
];

const markerlessItems = [
  'Semantics stay intact without visible markers.',
  'Useful for grouped metadata or key-value blocks.',
  'Spacing and text tokens still come from the root.',
];

const nativeItems = [
  'Use native li elements when a wrapper component is unnecessary.',
  'The root still controls spacing, marker style, size, and tone.',
  'Reach for ListItem when you want the stable item slot.',
];

const customStyleItems = [
  'Native markers stay available for per-item styling.',
  'Root CSS variables still control spacing and indentation.',
  'No extra marker/content API is required.',
];

const toneItems = [
  { tone: 'default', label: 'Default list tone' },
  { tone: 'muted', label: 'Muted list tone' },
  { tone: 'subtle', label: 'Subtle list tone' },
  { tone: 'primary', label: 'Primary list tone' },
  { tone: 'destructive', label: 'Destructive list tone' },
] as const;

export const listOverrideCssProperties = [
  {
    name: '--list-color',
    defaultValue: 'var(--list-default-color, var(--color-foreground))',
    description: 'Controls list text color.',
  },
  {
    name: '--list-default-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls default tone color.',
  },
  {
    name: '--list-destructive-color',
    defaultValue: 'var(--color-destructive)',
    description: 'Controls destructive tone color.',
  },
  {
    name: '--list-font-family',
    defaultValue: 'var(--font-sans)',
    description: 'Controls list font family.',
  },
  {
    name: '--list-font-size',
    defaultValue: 'var(--list-font-size-md, var(--text-md))',
    description: 'Controls default list font size.',
  },
  {
    name: '--list-font-size-xs',
    defaultValue: 'var(--text-xs)',
    description: 'Controls extra-small list font size.',
  },
  {
    name: '--list-font-size-sm',
    defaultValue: 'var(--text-sm)',
    description: 'Controls small list font size.',
  },
  {
    name: '--list-font-size-md',
    defaultValue: 'var(--text-md)',
    description: 'Controls medium list font size.',
  },
  {
    name: '--list-font-size-lg',
    defaultValue: 'var(--text-lg)',
    description: 'Controls large list font size.',
  },
  {
    name: '--list-font-size-xl',
    defaultValue: 'var(--text-xl)',
    description: 'Controls extra-large list font size.',
  },
  {
    name: '--list-font-weight',
    defaultValue: 'var(--weight-regular)',
    description: 'Controls list font weight.',
  },
  {
    name: '--list-gap',
    defaultValue: 'var(--list-gap-sm, var(--spacing-2))',
    description: 'Controls default gap between items.',
  },
  {
    name: '--list-gap-xs',
    defaultValue: 'var(--spacing-1)',
    description: 'Controls extra-small list item gap.',
  },
  {
    name: '--list-gap-sm',
    defaultValue: 'var(--spacing-2)',
    description: 'Controls small list item gap.',
  },
  {
    name: '--list-gap-md',
    defaultValue: 'var(--spacing-3)',
    description: 'Controls medium list item gap.',
  },
  {
    name: '--list-gap-lg',
    defaultValue: 'var(--spacing-4)',
    description: 'Controls large list item gap.',
  },
  {
    name: '--list-gap-xl',
    defaultValue: 'var(--spacing-5)',
    description: 'Controls extra-large list item gap.',
  },
  {
    name: '--list-gap-2xl',
    defaultValue: 'var(--spacing-6)',
    description: 'Controls 2xl list item gap.',
  },
  {
    name: '--list-letter-spacing',
    defaultValue: '0',
    description: 'Controls list letter spacing.',
  },
  {
    name: '--list-line-height',
    defaultValue: 'var(--list-line-height-md, var(--line-height-text-md))',
    description: 'Controls default list line height.',
  },
  {
    name: '--list-line-height-xs',
    defaultValue: 'var(--line-height-text-xs)',
    description: 'Controls extra-small list line height.',
  },
  {
    name: '--list-line-height-sm',
    defaultValue: 'var(--line-height-text-sm)',
    description: 'Controls small list line height.',
  },
  {
    name: '--list-line-height-md',
    defaultValue: 'var(--line-height-text-md)',
    description: 'Controls medium list line height.',
  },
  {
    name: '--list-line-height-lg',
    defaultValue: 'var(--line-height-text-lg)',
    description: 'Controls large list line height.',
  },
  {
    name: '--list-line-height-xl',
    defaultValue: 'var(--line-height-text-xl)',
    description: 'Controls extra-large list line height.',
  },
  {
    name: '--list-marker-color',
    defaultValue: 'currentColor',
    description: 'Controls marker color.',
  },
  {
    name: '--list-marker-font-weight',
    defaultValue: 'inherit',
    description: 'Controls native marker font weight.',
  },
  {
    name: '--list-muted-color',
    defaultValue: 'var(--color-muted-foreground)',
    description: 'Controls muted tone color.',
  },
  {
    name: '--list-padding-x',
    defaultValue: 'var(--spacing-5)',
    description: 'Controls marker indentation.',
  },
  {
    name: '--list-primary-color',
    defaultValue: 'var(--color-primary)',
    description: 'Controls primary tone color.',
  },
  {
    name: '--list-subtle-color',
    defaultValue: 'var(--color-secondary-foreground)',
    description: 'Controls subtle tone color.',
  },
] satisfies Array<{
  name: `--${string}`;
  defaultValue: string;
  description: string;
}>;

export function ListCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={listOverrideCssProperties} />;
}

export function ListExample(props: ComponentProps<typeof List>) {
  return (
    <List {...props}>
      {basicItems.map((item) => (
        <ListItem key={item}>{item}</ListItem>
      ))}
    </List>
  );
}

export function OrderedListExample() {
  return (
    <List as="ol" start={3}>
      {orderedItems.map((item) => (
        <ListItem key={item}>{item}</ListItem>
      ))}
    </List>
  );
}

export function MarkerlessListExample() {
  return (
    <List marker="none">
      {markerlessItems.map((item) => (
        <ListItem key={item}>{item}</ListItem>
      ))}
    </List>
  );
}

export function NativeItemsListExample() {
  return (
    <List>
      {nativeItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </List>
  );
}

export function CustomStylesListExample() {
  return (
    <List className="list-demo-accent">
      {customStyleItems.map((item) => (
        <ListItem key={item} className="list-demo-accent-item">
          {item}
        </ListItem>
      ))}
    </List>
  );
}

export function ToneListExample() {
  return (
    <div className="list-demo-tones">
      {toneItems.map((item) => (
        <List key={item.tone} tone={item.tone}>
          <ListItem>{item.label}</ListItem>
        </List>
      ))}
    </div>
  );
}