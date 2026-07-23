import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { Button } from '../src';

test('renders the public Button component', () => {
  render(<Button>Demo Button</Button>);

  expect(screen.getByRole('button', { name: 'Demo Button' })).toHaveAttribute(
    'data-slot',
    'button-root',
  );
});