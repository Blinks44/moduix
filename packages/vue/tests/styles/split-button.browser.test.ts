import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import {
  MenuItem,
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  SplitButtonPositioner,
  SplitButtonContent,
} from '@/index';

const components = {
  MenuItem,
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  SplitButtonPositioner,
  SplitButtonContent,
};

test('draws the separator on filled variants only and themes it with one variable', () => {
  render({
    components,
    template:
      '<div style="--moduix-split-button-separator-color: rgb(255, 0, 0)"><SplitButton aria-label="Filled actions"><SplitButtonAction>Save</SplitButtonAction><SplitButtonTrigger aria-label="Filled trigger" /></SplitButton><SplitButton aria-label="Outline actions" variant="outline"><SplitButtonAction>Save</SplitButtonAction><SplitButtonTrigger aria-label="Outline trigger" /></SplitButton></div>',
  });
  const separator = (name: string) =>
    getComputedStyle(screen.getByRole('button', { name }), '::before');
  expect(separator('Filled trigger').display).toBe('block');
  expect(separator('Filled trigger').backgroundColor).toBe('rgb(255, 0, 0)');
  expect(separator('Outline trigger').display).toBe('none');
});