//#region demo
import { CloseButton } from '@moduix/react';

const _customStylingTokens = {
  '--close-button-size': '2.5rem',
  '--close-button-icon-size': '1rem',
  '--close-button-bg': 'var(--color-primary)',
  '--close-button-bg-hover': 'var(--color-foreground)',
  '--close-button-color': 'var(--color-primary-foreground)',
  '--close-button-color-hover': 'var(--color-primary-foreground)',
};

export function CloseButtonCustomStylingDemo() {
  return <CloseButton className="customButton" aria-label="Close message" />;
}
//#endregion