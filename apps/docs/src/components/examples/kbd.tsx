import { Kbd } from '@moduix/react';
import { Fragment } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

const kbdBasicData = {
  label: 'Command K',
  keys: ['Cmd', 'K'],
};

const kbdSingleKeyData = 'Esc';
const kbdAsChildData = { label: 'Esc', title: 'Escape' };

const kbdShortcutListData = [
  { label: 'Command K', keys: ['Cmd', 'K'], description: 'Open command menu' },
  {
    label: 'Shift question mark',
    keys: ['Shift', '?'],
    description: 'Show shortcuts',
  },
  { label: 'Escape', keys: ['Esc'], description: 'Close overlay' },
];

const kbdDenseData = ['Esc', 'Ctrl', '/'];
const kbdCustomData = { label: 'Command K', keys: ['Cmd', 'K'] };

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
    'Controls text separator color inside Kbd.Group.',
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
    <Kbd.Group aria-label={kbdBasicData.label}>
      {kbdBasicData.keys.map((key, index) => (
        <Fragment key={key}>
          {index > 0 && '+'}
          <Kbd>{key}</Kbd>
        </Fragment>
      ))}
    </Kbd.Group>
  );
}

export function KbdSingleKeyExample() {
  return <Kbd>{kbdSingleKeyData}</Kbd>;
}

export function KbdShortcutListExample() {
  return (
    <div className="kbd-demo-shortcut-list">
      {kbdShortcutListData.map((shortcut) => (
        <div key={shortcut.label} className="kbd-demo-shortcut-row">
          <Kbd.Group aria-label={shortcut.label}>
            {shortcut.keys.map((key, index) => (
              <Fragment key={key}>
                {index > 0 && '+'}
                <Kbd>{key}</Kbd>
              </Fragment>
            ))}
          </Kbd.Group>
          {shortcut.description}
        </div>
      ))}
    </div>
  );
}

export function KbdDenseExample() {
  return (
    <div className="kbd-demo-row">
      {kbdDenseData.map((key) => (
        <Kbd key={key} className="kbd-demo-dense">
          {key}
        </Kbd>
      ))}
    </div>
  );
}

export function CustomStylingKbdExample() {
  return (
    <Kbd.Group aria-label={kbdCustomData.label} className="kbd-demo-custom-group">
      {kbdCustomData.keys.map((key, index) => (
        <Fragment key={key}>
          {index > 0 && '+'}
          <Kbd className="kbd-demo-custom-key">{key}</Kbd>
        </Fragment>
      ))}
    </Kbd.Group>
  );
}

export function KbdAsChildExample() {
  return (
    <Kbd asChild>
      <kbd title={kbdAsChildData.title}>{kbdAsChildData.label}</kbd>
    </Kbd>
  );
}