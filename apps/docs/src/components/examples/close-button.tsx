import { CloseButton, CloseLineIcon, type CloseButtonProps } from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './close-button.module.css';

export const closeButtonOverrideCssProperties: CssPropertyInput[] = [
  ['--close-button-size', '28px', 'Controls close button width and height.'],
  ['--close-button-icon-size', '12px', 'Controls nested SVG icon size.'],
  ['--close-button-radius', 'var(--radius-sm)', 'Controls close button corner radius.'],
  ['--close-button-bg', 'transparent', 'Controls close button background.'],
  ['--close-button-bg-hover', 'var(--color-muted)', 'Controls hover background color.'],
  ['--close-button-color', 'var(--color-muted-foreground)', 'Controls icon color.'],
  ['--close-button-color-hover', 'var(--color-foreground)', 'Controls hover icon color.'],
  ['--close-button-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--close-button-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--close-button-transition', 'var(--transition-default)', 'Controls transition timing.'],
];

export const closeButtonPlaygroundCssProperties: CssPropertyInput[] = [
  ['--close-button-size', '28px', 'Controls close button width and height.'],
  ['--close-button-icon-size', '12px', 'Controls nested SVG icon size.'],
  ['--close-button-radius', 'var(--radius-sm)', 'Controls close button corner radius.'],
  ['--close-button-bg', 'transparent', 'Controls close button background.'],
  ['--close-button-bg-hover', 'var(--color-muted)', 'Controls hover background color.'],
  ['--close-button-color', 'var(--color-muted-foreground)', 'Controls icon color.'],
  ['--close-button-color-hover', 'var(--color-foreground)', 'Controls hover icon color.'],
  ['--close-button-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
];

export function CloseButtonCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-fd-muted-foreground">
        Full list of CloseButton variables available for project-level overrides.
      </p>
      <CSSPropertiesReferenceTable
        properties={closeButtonOverrideCssProperties.map(normalizeCssProperty)}
      />
    </div>
  );
}

export function CloseButtonCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-fd-muted-foreground">
        Interactive variables scoped for docs preview.
      </p>
      <CSSPropertiesEditor
        properties={closeButtonPlaygroundCssProperties.map(normalizeCssProperty)}
        values={values}
        onChange={onChange}
        onReset={onReset}
      />
    </div>
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

export function CloseButtonExample(props: CloseButtonProps) {
  return (
    <div className={styles.surface}>
      <div className={styles.content}>
        <p className={styles.title}>Draft saved</p>
        <p className={styles.description}>The notification can be dismissed.</p>
      </div>
      <CloseButton aria-label="Dismiss notification" {...props} />
    </div>
  );
}

export function CloseButtonCustomIconExample() {
  return (
    <CloseButton aria-label="Close panel">
      <CloseLineIcon />
    </CloseButton>
  );
}

export function CloseButtonDisabledExample() {
  return (
    <div className={styles.row}>
      <CloseButton aria-label="Close panel" disabled />
      <CloseButton aria-label="Close panel" disabled focusableWhenDisabled />
    </div>
  );
}

export function CloseButtonCustomStylesExample() {
  return <CloseButton className={styles.customButton} aria-label="Close message" />;
}