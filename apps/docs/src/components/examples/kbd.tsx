import { Kbd, KbdGroup, type KbdProps } from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './kbd.module.css';

const variants = ['default', 'outline', 'ghost'] as const;

export const kbdOverrideCssProperties: CssPropertyInput[] = [
  ['--kbd-bg', 'var(--color-muted)', 'Controls key background color.'],
  ['--kbd-border-color', 'var(--color-border)', 'Controls key border color.'],
  ['--kbd-border-width', 'var(--border-width-sm)', 'Controls key border width.'],
  ['--kbd-color', 'var(--color-foreground)', 'Controls key text color.'],
  ['--kbd-font-family', 'var(--font-mono)', 'Controls key font family.'],
  ['--kbd-font-size', 'var(--kbd-font-size-md)', 'Controls key font size.'],
  ['--kbd-font-size-sm', '0.6875rem', 'Controls font size for `sm` keys.'],
  ['--kbd-font-size-md', 'var(--text-xs)', 'Controls font size for `md` keys.'],
  ['--kbd-font-size-lg', 'var(--text-sm)', 'Controls font size for `lg` keys.'],
  ['--kbd-font-weight', 'var(--weight-medium)', 'Controls key font weight.'],
  ['--kbd-group-gap', '0.25rem', 'Controls spacing between grouped keys.'],
  ['--kbd-group-gap-sm', '0.1875rem', 'Controls group spacing for `sm`.'],
  ['--kbd-group-gap-md', '0.25rem', 'Controls group spacing for `md`.'],
  ['--kbd-group-gap-lg', '0.3125rem', 'Controls group spacing for `lg`.'],
  [
    '--kbd-group-separator-color',
    'var(--color-muted-foreground)',
    'Controls text separator color inside KbdGroup.',
  ],
  ['--kbd-height', 'var(--kbd-height-md)', 'Controls key height.'],
  ['--kbd-height-sm', '1.25rem', 'Controls height for `sm` keys.'],
  ['--kbd-height-md', '1.5rem', 'Controls height for `md` keys.'],
  ['--kbd-height-lg', '1.75rem', 'Controls height for `lg` keys.'],
  ['--kbd-letter-spacing', '0', 'Controls key letter spacing.'],
  ['--kbd-line-height', 'var(--kbd-line-height-md)', 'Controls key line-height.'],
  ['--kbd-line-height-sm', '1rem', 'Controls line-height for `sm`.'],
  ['--kbd-line-height-md', 'var(--line-height-text-xs)', 'Controls line-height for `md`.'],
  ['--kbd-line-height-lg', 'var(--line-height-text-sm)', 'Controls line-height for `lg`.'],
  ['--kbd-min-width', 'var(--kbd-height)', 'Controls minimum key width.'],
  ['--kbd-padding-x', 'var(--kbd-padding-x-md)', 'Controls horizontal key padding.'],
  ['--kbd-padding-x-sm', '0.375rem', 'Controls horizontal padding for `sm`.'],
  ['--kbd-padding-x-md', '0.4375rem', 'Controls horizontal padding for `md`.'],
  ['--kbd-padding-x-lg', '0.5rem', 'Controls horizontal padding for `lg`.'],
  ['--kbd-padding-y', '0', 'Controls vertical key padding.'],
  ['--kbd-radius', 'var(--radius-sm)', 'Controls key border radius.'],
  [
    '--kbd-shadow',
    'inset 0 -1px 0 color-mix(in oklab, var(--color-foreground) 12%, transparent)',
    'Controls key inset shadow.',
  ],
];

export const kbdPlaygroundCssProperties: CssPropertyInput[] = [
  ['--kbd-bg', 'var(--color-muted)', 'Controls key background color.'],
  ['--kbd-border-color', 'var(--color-border)', 'Controls key border color.'],
  ['--kbd-border-width', 'var(--border-width-sm)', 'Controls key border width.'],
  ['--kbd-color', 'var(--color-foreground)', 'Controls key text color.'],
  ['--kbd-font-size', 'var(--kbd-font-size-md)', 'Controls key font size.'],
  ['--kbd-group-gap', '0.25rem', 'Controls spacing between grouped keys.'],
  ['--kbd-height', 'var(--kbd-height-md)', 'Controls key height.'],
  ['--kbd-min-width', 'var(--kbd-height)', 'Controls minimum key width.'],
  ['--kbd-padding-x', 'var(--kbd-padding-x-md)', 'Controls horizontal key padding.'],
  ['--kbd-radius', 'var(--radius-sm)', 'Controls key border radius.'],
];

export function KbdCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable properties={kbdOverrideCssProperties.map(normalizeCssProperty)} />
  );
}

export function KbdCssPlaygroundPanel({ values, onChange, onReset }: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={kbdPlaygroundCssProperties.map(normalizeCssProperty)}
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

export function KbdExample(props: KbdProps) {
  return <Kbd {...props}>Cmd K</Kbd>;
}

export function KbdVariantsExample() {
  return (
    <div className={styles.row}>
      {variants.map((variant) => (
        <Kbd key={variant} variant={variant}>
          {variant}
        </Kbd>
      ))}
    </div>
  );
}

export function KbdSizesExample() {
  return (
    <div className={styles.row}>
      <Kbd size="sm">Esc</Kbd>
      <Kbd size="md">Cmd K</Kbd>
      <Kbd size="lg">Enter</Kbd>
    </div>
  );
}

export function KbdGroupExample() {
  return (
    <div className={styles.column}>
      <div className={styles.shortcutRow}>
        <KbdGroup>
          <Kbd>Cmd</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        Open command menu
      </div>
      <div className={styles.shortcutRow}>
        <KbdGroup>
          <Kbd>Shift</Kbd>
          <Kbd>?</Kbd>
        </KbdGroup>
        Show shortcuts
      </div>
      <div className={styles.shortcutRow}>
        <Kbd>Esc</Kbd>
        Close overlay
      </div>
    </div>
  );
}

export function CustomCompositionKbdExample() {
  return (
    <KbdGroup className={styles.customGroup}>
      <Kbd className={styles.customKbd}>Cmd</Kbd>
      <Kbd className={styles.customKbd}>K</Kbd>
    </KbdGroup>
  );
}