import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Bleed } from '../src';

test('renders the default full-bleed root with stable hooks', () => {
  render(() => <Bleed data-testid="bleed" />);
  const bleed = screen.getByTestId('bleed');

  expect(bleed).toHaveAttribute('data-scope', 'bleed');
  expect(bleed).toHaveAttribute('data-part', 'root');
  expect(bleed).toHaveAttribute('data-slot', 'bleed-root');
  expect(bleed).toHaveAttribute('data-inline', 'full');
  expect(bleed).toHaveAttribute('data-block', 'none');
});

test('forwards an HTMLElement ref and props to the default root', () => {
  let ref!: HTMLDivElement;

  render(() => (
    <Bleed ref={(element) => (ref = element)} data-testid="bleed" inline="md" block="sm" />
  ));
  const bleed = screen.getByTestId('bleed');

  expect(ref).toBe(bleed);
  expect(bleed).toHaveAttribute('data-inline', 'md');
  expect(bleed).toHaveAttribute('data-block', 'sm');
});

test('composes an asChild element and forwards its props to the child', () => {
  let rootRef: HTMLElement | undefined;
  let childRef!: HTMLElement;

  render(() => (
    <Bleed
      asChild={(props) => (
        <figure
          {...props({
            class: 'figure',
            'aria-label': 'Full-width map',
          })}
          ref={(element) => (childRef = element)}
        />
      )}
      ref={(element) => (rootRef = element)}
      inline="md"
      block="sm"
    />
  ));
  const figure = screen.getByRole('figure', { name: 'Full-width map' });

  expect(rootRef).toBeUndefined();
  expect(childRef).toBe(figure);
  expect(figure).toHaveAttribute('data-inline', 'md');
  expect(figure).toHaveAttribute('data-block', 'sm');
  expect(figure).toHaveClass('figure');
});

test('keeps wrapper-owned hooks and merges class through consumer props', () => {
  render(() => (
    <Bleed
      data-testid="bleed"
      data-scope="custom"
      data-part="custom"
      data-slot="custom"
      inline="xs"
      block="lg"
      class="consumer-class"
    />
  ));
  const bleed = screen.getByTestId('bleed');

  expect(bleed).toHaveAttribute('data-scope', 'bleed');
  expect(bleed).toHaveAttribute('data-part', 'root');
  expect(bleed).toHaveAttribute('data-slot', 'bleed-root');
  expect(bleed).toHaveAttribute('data-inline', 'xs');
  expect(bleed).toHaveAttribute('data-block', 'lg');
  expect(bleed).toHaveClass('consumer-class');
  expect(bleed.className).not.toBe('consumer-class');
});