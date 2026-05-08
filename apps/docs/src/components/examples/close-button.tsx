import { CloseButton, CloseLineIcon, type CloseButtonProps } from 'moduix';
import type { CssPropertyInput } from '../preview';
import styles from './close-button.module.css';

export const closeButtonCssProperties: CssPropertyInput[] = [
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