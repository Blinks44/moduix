import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Badge } from '../src';

test('protects variants, accessibility, and stable data hooks', () => {
  render(() => (
    <Badge
      variant="secondary"
      data-testid="badge"
      data-scope="custom"
      data-part="custom"
      data-slot="custom"
      data-variant="outline"
    >
      <Badge.Dot data-testid="dot" data-part="custom" aria-hidden={false} />
      Draft
    </Badge>
  ));

  const badge = screen.getByTestId('badge');
  const dot = screen.getByTestId('dot');

  expect(badge.tagName).toBe('SPAN');
  expect(badge).toHaveAttribute('data-scope', 'badge');
  expect(badge).toHaveAttribute('data-part', 'root');
  expect(badge).toHaveAttribute('data-slot', 'badge-root');
  expect(badge).toHaveAttribute('data-variant', 'secondary');
  expect(dot).toHaveAttribute('data-part', 'dot');
  expect(dot).toHaveAttribute('data-slot', 'badge-dot');
  expect(dot).toHaveAttribute('aria-hidden', 'true');
});

test('forwards refs through the ordinary root path', () => {
  let ref!: HTMLSpanElement;

  render(() => (
    <Badge ref={(element) => (ref = element)} variant="link" data-testid="badge">
      Badge styling guidance
    </Badge>
  ));

  const badge = screen.getByTestId('badge');

  expect(ref).toBe(badge);
  expect(badge).toHaveAttribute('data-variant', 'link');
});

test('preserves semantic children with native Ark Solid asChild composition', () => {
  render(() => (
    <Badge
      variant="link"
      asChild={(props) => (
        <a {...props()} href="#styling">
          Badge styling guidance
        </a>
      )}
    />
  ));

  const link = screen.getByRole('link', { name: 'Badge styling guidance' });

  expect(link).toHaveAttribute('href', '#styling');
  expect(link).toHaveAttribute('data-slot', 'badge-root');
  expect(link).toHaveAttribute('data-variant', 'link');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let ref: HTMLSpanElement | undefined;

  render(() => (
    <Badge
      ref={(element) => (ref = element)}
      asChild={(props) => (
        <a {...props()} href="#styling">
          Badge styling guidance
        </a>
      )}
    />
  ));

  expect(ref).toBeUndefined();
});

test('renders direct text without inserting an implicit label part', () => {
  render(() => (
    <Badge class="constrained" data-testid="badge">
      Ready for stakeholder review after legal approval
    </Badge>
  ));
  const badge = screen.getByTestId('badge');

  expect(badge.firstElementChild).toBeNull();
  expect(badge).toHaveTextContent('Ready for stakeholder review after legal approval');
});

test('exposes composable and ref-forwarding label paths', () => {
  let ref!: HTMLSpanElement;

  render(() => (
    <Badge>
      <Badge.Dot />
      <Badge.Label ref={(element) => (ref = element)}>Production ready</Badge.Label>
    </Badge>
  ));

  const label = screen.getByText('Production ready');

  expect(ref).toBe(label);
  expect(label.tagName).toBe('SPAN');
  expect(label).toHaveAttribute('data-scope', 'badge');
  expect(label).toHaveAttribute('data-part', 'label');
  expect(label).toHaveAttribute('data-slot', 'badge-label');
});

test('preserves custom label hosts with native Ark Solid asChild composition', () => {
  render(() => (
    <Badge>
      <Badge.Dot />
      <Badge.Label asChild={(props) => <strong {...props()}>Production ready</strong>} />
    </Badge>
  ));

  const label = screen.getByText('Production ready');

  expect(label.tagName).toBe('STRONG');
  expect(label).toHaveAttribute('data-scope', 'badge');
  expect(label).toHaveAttribute('data-part', 'label');
  expect(label).toHaveAttribute('data-slot', 'badge-label');
});

test('preserves native disabled button semantics with asChild', () => {
  render(() => (
    <Badge
      variant="secondary"
      asChild={(props) => (
        <button {...props()} disabled>
          Archived
        </button>
      )}
    />
  ));

  expect(screen.getByRole('button', { name: 'Archived' })).toBeDisabled();
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(() => (
    <Badge class="bg-secondary px-0" data-testid="badge">
      Ready
    </Badge>
  ));

  const badge = screen.getByTestId('badge');
  expect(badge).toHaveClass('bg-secondary', 'px-0');
  expect(badge).not.toHaveClass('bg-primary', 'px-2.5');
});