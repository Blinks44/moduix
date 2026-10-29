import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import type { CSSProperties } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/index';

test('applies the public group variables to every variant and Toggle variables to items', () => {
  render(
    <div
      style={
        {
          '--moduix-toggle-group-bg': 'rgb(1, 2, 3)',
          '--moduix-toggle-group-border-color': 'rgb(4, 5, 6)',
        } as CSSProperties
      }
    >
      <ToggleGroup
        aria-label="Alignment"
        variant="ghost"
        style={{ '--moduix-toggle-color': 'rgb(7, 8, 9)' } as CSSProperties}
      >
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
      </ToggleGroup>
    </div>,
  );

  expect(getComputedStyle(screen.getByRole('radiogroup'))).toMatchObject({
    backgroundColor: 'rgb(1, 2, 3)',
    borderTopColor: 'rgb(4, 5, 6)',
    paddingTop: '0px',
  });
  expect(getComputedStyle(screen.getByRole('radio', { name: 'Left' })).color).toBe('rgb(7, 8, 9)');
});