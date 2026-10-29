import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { type CSSProperties } from 'react';
import { SplitButton, SplitButtonAction, SplitButtonTrigger } from '@/index';

test('draws the separator on filled variants only and themes it with one variable', () => {
  render(
    <div style={{ '--moduix-split-button-separator-color': 'rgb(255, 0, 0)' } as CSSProperties}>
      <SplitButton aria-label="Filled actions">
        <SplitButtonAction>Save</SplitButtonAction>
        <SplitButtonTrigger aria-label="Filled trigger" />
      </SplitButton>
      <SplitButton aria-label="Outline actions" variant="outline">
        <SplitButtonAction>Save</SplitButtonAction>
        <SplitButtonTrigger aria-label="Outline trigger" />
      </SplitButton>
    </div>,
  );

  const separator = (name: string) =>
    getComputedStyle(screen.getByRole('button', { name }), '::before');
  expect(separator('Filled trigger').display).toBe('block');
  expect(separator('Filled trigger').backgroundColor).toBe('rgb(255, 0, 0)');
  expect(separator('Outline trigger').display).toBe('none');
});