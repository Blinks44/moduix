import { Kbd, KbdGroup } from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

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

export function KbdCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable properties={kbdOverrideCssProperties.map(normalizeCssProperty)} />
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
    <div className="kbd-demo-shortcut-list">
      <div className="kbd-demo-shortcut-row">
        <KbdGroup aria-label="Command K">
          <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
        </KbdGroup>
        Open command menu
      </div>
      <div className="kbd-demo-shortcut-row">
        <KbdGroup aria-label="Shift question mark">
          <Kbd>Shift</Kbd>+<Kbd>?</Kbd>
        </KbdGroup>
        Show shortcuts
      </div>
      <div className="kbd-demo-shortcut-row">
        <Kbd>Esc</Kbd>
        Close overlay
      </div>
    </div>
  );
}

export function KbdDenseExample() {
  return (
    <div className="kbd-demo-row">
      <Kbd className="kbd-demo-dense">Esc</Kbd>
      <Kbd className="kbd-demo-dense">Ctrl</Kbd>
      <Kbd className="kbd-demo-dense">/</Kbd>
    </div>
  );
}

export function CustomStylingKbdExample() {
  return (
    <KbdGroup aria-label="Command K" className="kbd-demo-custom-group">
      <Kbd className="kbd-demo-custom-key">Cmd</Kbd>+<Kbd className="kbd-demo-custom-key">K</Kbd>
    </KbdGroup>
  );
}