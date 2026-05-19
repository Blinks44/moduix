import {
  BellIcon,
  ChevronUpDownIcon,
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectTrigger,
  SelectValue,
  StarIcon,
  Toggle,
  ToggleGroup,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator,
  type ToolbarProps,
} from 'moduix';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './toolbar.module.css';

const fonts = ['Inter', 'Arial', 'Helvetica', 'Georgia'];

export const toolbarOverrideCssProperties: CssPropertyInput[] = [
  ['--toolbar-bg', 'var(--color-muted)', 'Controls toolbar background color.'],
  ['--toolbar-border-color', 'var(--color-border)', 'Controls toolbar border color.'],
  ['--toolbar-border-width', 'var(--border-width-sm)', 'Controls toolbar border width.'],
  ['--toolbar-color', 'var(--color-foreground)', 'Controls toolbar text color.'],
  ['--toolbar-control-bg-active', 'var(--color-accent)', 'Controls button active background.'],
  ['--toolbar-control-bg-hover', 'var(--color-accent)', 'Controls button hover background.'],
  [
    '--toolbar-control-bg-pressed',
    'var(--color-background)',
    'Controls pressed and open button background.',
  ],
  ['--toolbar-control-border-color-active', 'transparent', 'Controls active control border color.'],
  [
    '--toolbar-control-border-width',
    'var(--border-width-sm)',
    'Controls toolbar button border width.',
  ],
  ['--toolbar-control-color', 'var(--color-foreground)', 'Controls button text color.'],
  [
    '--toolbar-control-color-pressed',
    'var(--color-foreground)',
    'Controls pressed and open button text color.',
  ],
  ['--toolbar-control-gap', 'var(--spacing-2)', 'Controls spacing inside toolbar buttons.'],
  ['--toolbar-control-height', 'var(--size-lg)', 'Controls base control height.'],
  ['--toolbar-control-height-sm', 'var(--size-sm)', 'Controls small control height.'],
  ['--toolbar-control-height-lg', 'var(--size-xl)', 'Controls large control height.'],
  ['--toolbar-control-padding-x-lg', '1rem', 'Controls large control horizontal padding.'],
  ['--toolbar-control-padding-x-sm', '0.625rem', 'Controls small control horizontal padding.'],
  ['--toolbar-control-padding-x', '0.75rem', 'Controls control horizontal padding.'],
  ['--toolbar-control-radius', 'var(--radius-md)', 'Controls control corner radius.'],
  ['--toolbar-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled control opacity.'],
  ['--toolbar-focus-ring-color', 'var(--color-ring)', 'Controls keyboard focus ring color.'],
  [
    '--toolbar-focus-ring-offset',
    'calc(var(--toolbar-control-border-width) * -1)',
    'Controls keyboard focus ring offset.',
  ],
  ['--toolbar-focus-ring-width', 'var(--border-width-md)', 'Controls keyboard focus ring width.'],
  ['--toolbar-font-size-sm', 'var(--text-xs)', 'Controls small control font size.'],
  ['--toolbar-font-size-lg', 'var(--text-md)', 'Controls large control font size.'],
  ['--toolbar-font-size', 'var(--text-sm)', 'Controls base control font size.'],
  ['--toolbar-font-weight', 'var(--weight-medium)', 'Controls control font weight.'],
  ['--toolbar-gap', 'var(--border-width-sm)', 'Controls spacing between toolbar items.'],
  ['--toolbar-group-gap', 'var(--spacing-1)', 'Controls spacing inside toolbar groups.'],
  ['--toolbar-icon-size-sm', '0.875rem', 'Controls small control icon size.'],
  ['--toolbar-icon-size', '1rem', 'Controls control icon size.'],
  ['--toolbar-input-bg', 'var(--color-background)', 'Controls input background.'],
  ['--toolbar-input-border-color', 'var(--color-border)', 'Controls input border color.'],
  ['--toolbar-input-border-width', 'var(--border-width-sm)', 'Controls input border width.'],
  ['--toolbar-input-color', 'var(--color-foreground)', 'Controls input text color.'],
  [
    '--toolbar-input-focus-ring-offset',
    'calc(var(--toolbar-input-border-width) * -1)',
    'Controls input focus ring offset.',
  ],
  [
    '--toolbar-input-focus-ring-width',
    'var(--border-width-sm)',
    'Controls input focus ring width.',
  ],
  ['--toolbar-input-padding-x', '0.75rem', 'Controls input horizontal padding.'],
  [
    '--toolbar-input-placeholder-color',
    'var(--color-muted-foreground)',
    'Controls input placeholder color.',
  ],
  ['--toolbar-input-width-sm', '8rem', 'Controls small toolbar input width.'],
  ['--toolbar-input-width-lg', '12rem', 'Controls large toolbar input width.'],
  ['--toolbar-input-width', '10rem', 'Controls input width.'],
  ['--toolbar-line-height-sm', 'var(--line-height-text-xs)', 'Controls small control line height.'],
  ['--toolbar-line-height-lg', 'var(--line-height-text-md)', 'Controls large control line height.'],
  ['--toolbar-line-height', 'var(--line-height-text-sm)', 'Controls base control line height.'],
  ['--toolbar-padding', '0.125rem', 'Controls toolbar inner padding.'],
  ['--toolbar-radius', 'var(--radius-lg)', 'Controls toolbar corner radius.'],
  ['--toolbar-separator-color', 'var(--color-border)', 'Controls separator color.'],
  ['--toolbar-separator-length-horizontal', '100%', 'Controls horizontal separator length.'],
  ['--toolbar-separator-length-vertical', '1rem', 'Controls vertical separator length.'],
  [
    '--toolbar-separator-margin-x-vertical',
    'var(--spacing-1)',
    'Controls vertical separator horizontal margin.',
  ],
  [
    '--toolbar-separator-margin-y-horizontal',
    'var(--spacing-1)',
    'Controls horizontal separator vertical margin.',
  ],
  ['--toolbar-separator-thickness', '1px', 'Controls separator thickness.'],
  [
    '--toolbar-separator-thickness-horizontal',
    'var(--toolbar-separator-thickness)',
    'Controls horizontal separator thickness.',
  ],
  [
    '--toolbar-separator-thickness-vertical',
    'var(--toolbar-separator-thickness)',
    'Controls vertical separator thickness.',
  ],
  ['--toolbar-transition', 'var(--transition-default)', 'Controls interactive transition timing.'],
];
export const toolbarPlaygroundCssProperties: CssPropertyInput[] = [
  ['--toolbar-bg', 'var(--color-muted)', 'Controls toolbar background color.'],
  ['--toolbar-border-color', 'var(--color-border)', 'Controls toolbar border color.'],
  ['--toolbar-color', 'var(--color-foreground)', 'Controls toolbar text color.'],
  ['--toolbar-control-bg-active', 'var(--color-accent)', 'Controls button active background.'],
  ['--toolbar-control-bg-hover', 'var(--color-accent)', 'Controls button hover background.'],
  ['--toolbar-control-color', 'var(--color-foreground)', 'Controls button text color.'],
  ['--toolbar-input-bg', 'var(--color-background)', 'Controls input background.'],
  ['--toolbar-input-border-color', 'var(--color-border)', 'Controls input border color.'],
  ['--toolbar-radius', 'var(--radius-lg)', 'Controls toolbar corner radius.'],
  ['--toolbar-separator-color', 'var(--color-border)', 'Controls separator color.'],
];

export function ToolbarCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={toolbarOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function ToolbarCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={toolbarPlaygroundCssProperties.map(normalizeCssProperty)}
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

function AlignLeftIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M2.5 3.5h11M2.5 8h8M2.5 12.5h11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AlignCenterIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M2.5 3.5h11M4 8h8M2.5 12.5h11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AlignRightIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M2.5 3.5h11M5.5 8h8M2.5 12.5h11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ToolbarExample(props: ToolbarProps) {
  return (
    <Toolbar aria-label="Document actions" {...props}>
      <ToolbarGroup aria-label="History">
        <ToolbarButton>Undo</ToolbarButton>
        <ToolbarButton>Redo</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarInput aria-label="Search actions" placeholder="Search actions" />
      <ToolbarButton aria-label="Notifications">
        <BellIcon />
      </ToolbarButton>
      <ToolbarLink href="#" className={styles.toolbarLink}>
        History
      </ToolbarLink>
    </Toolbar>
  );
}

export function ToolbarToggleGroupExample() {
  return (
    <Toolbar aria-label="Editor formatting">
      <ToggleGroup multiple defaultValue={['bold']} aria-label="Text formatting" variant="ghost">
        <ToolbarButton render={<Toggle />} value="bold" aria-label="Bold">
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton render={<Toggle />} value="italic" aria-label="Italic">
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton render={<Toggle />} value="underline" aria-label="Underline">
          <span className={styles.underline}>U</span>
        </ToolbarButton>
      </ToggleGroup>

      <ToolbarSeparator />

      <ToolbarGroup aria-label="Insert">
        <ToolbarButton aria-label="Add favorite">
          <StarIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Notifications">
          <BellIcon />
        </ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  );
}

export function ToolbarSelectInputExample() {
  return (
    <Toolbar aria-label="Text properties">
      <Select defaultValue="Inter">
        <ToolbarButton
          render={<SelectTrigger />}
          aria-label="Font family"
          className={styles.toolbarSelect}
        >
          <SelectValue />
          <SelectIcon>
            <ChevronUpDownIcon />
          </SelectIcon>
        </ToolbarButton>
        <SelectContent>
          <SelectList>
            {fonts.map((font) => (
              <SelectItem key={font} value={font}>
                <SelectItemIndicator />
                <SelectItemText>{font}</SelectItemText>
              </SelectItem>
            ))}
          </SelectList>
        </SelectContent>
      </Select>

      <ToolbarSeparator />
      <ToolbarInput aria-label="Search actions" placeholder="Search actions" />
      <ToolbarLink href="#" className={styles.toolbarLink}>
        History
      </ToolbarLink>
    </Toolbar>
  );
}

export function ToolbarVariantsExample() {
  return (
    <div className={styles.stack}>
      <Toolbar aria-label="Default toolbar">
        <ToolbarButton>Undo</ToolbarButton>
        <ToolbarButton>Redo</ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton aria-label="Notifications">
          <BellIcon />
        </ToolbarButton>
      </Toolbar>
      <Toolbar aria-label="Outline toolbar" variant="outline">
        <ToolbarButton>Undo</ToolbarButton>
        <ToolbarButton>Redo</ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton aria-label="Notifications">
          <BellIcon />
        </ToolbarButton>
      </Toolbar>
      <Toolbar aria-label="Ghost toolbar" variant="ghost">
        <ToolbarButton>Undo</ToolbarButton>
        <ToolbarButton>Redo</ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton aria-label="Notifications">
          <BellIcon />
        </ToolbarButton>
      </Toolbar>
    </div>
  );
}

export function ToolbarSizesExample() {
  return (
    <div className={styles.stack}>
      <Toolbar aria-label="Small toolbar" size="sm">
        <ToolbarButton>Undo</ToolbarButton>
        <ToolbarButton>Redo</ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton aria-label="Notifications">
          <BellIcon />
        </ToolbarButton>
      </Toolbar>
      <Toolbar aria-label="Medium toolbar" size="md">
        <ToolbarButton>Undo</ToolbarButton>
        <ToolbarButton>Redo</ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton aria-label="Notifications">
          <BellIcon />
        </ToolbarButton>
      </Toolbar>
      <Toolbar aria-label="Large toolbar" size="lg">
        <ToolbarButton>Undo</ToolbarButton>
        <ToolbarButton>Redo</ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton aria-label="Notifications">
          <BellIcon />
        </ToolbarButton>
      </Toolbar>
    </div>
  );
}

export function ToolbarVerticalExample() {
  return (
    <Toolbar orientation="vertical" aria-label="Vertical tools">
      <ToolbarButton>Move</ToolbarButton>
      <ToolbarButton>Scale</ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Favorite">
        <StarIcon />
      </ToolbarButton>
    </Toolbar>
  );
}

export function ToolbarDisabledControlsExample() {
  return (
    <Toolbar aria-label="Disabled document actions">
      <ToolbarButton>Undo</ToolbarButton>
      <ToolbarButton disabled>Redo</ToolbarButton>
      <ToolbarSeparator />
      <ToolbarInput aria-label="Search disabled actions" placeholder="Search actions" disabled />
      <ToolbarButton aria-label="Notifications" disabled>
        <BellIcon />
      </ToolbarButton>
    </Toolbar>
  );
}

export function ToolbarCustomIconsExample() {
  return (
    <Toolbar aria-label="Text alignment">
      <ToolbarButton aria-label="Align left">
        <AlignLeftIcon className={styles.customIcon} />
      </ToolbarButton>
      <ToolbarButton aria-label="Align center">
        <AlignCenterIcon className={styles.customIcon} />
      </ToolbarButton>
      <ToolbarButton aria-label="Align right">
        <AlignRightIcon className={styles.customIcon} />
      </ToolbarButton>
    </Toolbar>
  );
}

export function ToolbarClassNameExample() {
  return (
    <Toolbar aria-label="Schedule controls" className={styles.customToolbar}>
      <ToolbarButton className={styles.customButton}>Day</ToolbarButton>
      <ToolbarButton className={styles.customButton}>Week</ToolbarButton>
      <ToolbarSeparator />
      <ToolbarInput
        aria-label="Filter schedule"
        placeholder="Filter"
        className={styles.customInput}
      />
    </Toolbar>
  );
}