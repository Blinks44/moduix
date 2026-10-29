import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import type { CSSProperties } from 'react';
import { Toggle } from '@/index';

test('applies the public color variables to every variant and the pressed state', () => {
  render(
    <div
      style={
        {
          '--moduix-toggle-bg': 'rgb(1, 2, 3)',
          '--moduix-toggle-border-color': 'rgb(4, 5, 6)',
          '--moduix-toggle-bg-pressed': 'rgb(7, 8, 9)',
          '--moduix-toggle-color-pressed': 'rgb(10, 11, 12)',
        } as CSSProperties
      }
    >
      <Toggle variant="ghost">Off</Toggle>
      <Toggle variant="ghost" defaultPressed>
        On
      </Toggle>
    </div>,
  );

  expect(getComputedStyle(screen.getByRole('button', { name: 'Off' }))).toMatchObject({
    backgroundColor: 'rgb(1, 2, 3)',
    borderTopColor: 'rgb(4, 5, 6)',
  });
  expect(getComputedStyle(screen.getByRole('button', { name: 'On' }))).toMatchObject({
    backgroundColor: 'rgb(7, 8, 9)',
    borderTopColor: 'rgb(7, 8, 9)',
    color: 'rgb(10, 11, 12)',
  });
});