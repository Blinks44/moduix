import { Kbd, KbdGroup } from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './kbd.module.css';

export const kbdOverrideCssProperties: CssPropertyInput[] = [
  ['--kbd-bg', 'var(--color-muted)', 'Controls key background color.'],
  ['--kbd-border-color', 'var(--color-border)', 'Controls key border color.'],
  ['--kbd-border-width', 'var(--border-width-sm)', 'Controls key border width.'],
  ['--kbd-color', 'var(--color-foreground)', 'Controls key text color.'],
  ['--kbd-font-family', 'var(--font-mono)', 'Controls key font family.'],
  ['--kbd-font-size', 'var(--text-xs)', 'Controls key font size.'],
  ['--kbd-font-weight', 'var(--weight-medium)', 'Controls key font weight.'],
  ['--kbd-group-gap', '0.25rem', 'Controls spacing between grouped keys.'],
  [
    '--kbd-group-separator-color',
    'var(--color-muted-foreground)',
    'Controls text separator color inside KbdGroup.',
  ],
  ['--kbd-height', '1.5rem', 'Controls key height.'],
  ['--kbd-line-height', 'var(--line-height-text-xs)', 'Controls key line-height.'],
  ['--kbd-min-width', 'var(--kbd-height, 1.5rem)', 'Controls minimum key width.'],
  ['--kbd-padding-x', '0.4375rem', 'Controls horizontal key padding.'],
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
  ['--kbd-font-size', 'var(--text-xs)', 'Controls key font size.'],
  ['--kbd-group-gap', '0.25rem', 'Controls spacing between grouped keys.'],
  ['--kbd-height', '1.5rem', 'Controls key height.'],
  ['--kbd-min-width', 'var(--kbd-height, 1.5rem)', 'Controls minimum key width.'],
  ['--kbd-padding-x', '0.4375rem', 'Controls horizontal key padding.'],
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

export function KbdExample() {
  return (
    <KbdGroup aria-label="Command K">
      <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
    </KbdGroup>
  );
}

export function KbdSingleKeyExample() {
  return <Kbd>Esc</Kbd>;
}

export function KbdShortcutListExample() {
  return (
    <div className={styles.column}>
      <div className={styles.shortcutRow}>
        <KbdGroup aria-label="Command K">
          <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
        </KbdGroup>
        Open command menu
      </div>
      <div className={styles.shortcutRow}>
        <KbdGroup aria-label="Shift question mark">
          <Kbd>Shift</Kbd>+<Kbd>?</Kbd>
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

export function KbdDenseExample() {
  return (
    <div className={styles.row}>
      <Kbd className={styles.dense}>Esc</Kbd>
      <Kbd className={styles.dense}>Ctrl</Kbd>
      <Kbd className={styles.dense}>/</Kbd>
    </div>
  );
}

export function CustomCompositionKbdExample() {
  return (
    <KbdGroup aria-label="Command K" className={styles.customGroup}>
      <Kbd className={styles.customKbd}>Cmd</Kbd>+<Kbd className={styles.customKbd}>K</Kbd>
    </KbdGroup>
  );
}