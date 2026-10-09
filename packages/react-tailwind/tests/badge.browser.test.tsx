import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Badge, BadgeDot, BadgeLabel } from '../src';

test('protects variants, accessibility, and stable data hooks', async () => {
  render(
    <Badge
      variant="secondary"
      data-testid="badge"
      data-scope="custom"
      data-part="custom"
      data-slot="custom"
      data-variant="outline"
    >
      <BadgeDot data-testid="dot" data-part="custom" aria-hidden={false} />
      Draft
    </Badge>,
  );

  await expect.element(page.getByTestId('badge')).toHaveCount(1);
  const badge = screen.getByTestId('badge');
  const dot = screen.getByTestId('dot');

  expect(badge.tagName).toBe('SPAN');
  expect(badge.getAttribute('data-scope')).toBe('badge');
  expect(badge.getAttribute('data-part')).toBe('root');
  expect(badge.getAttribute('data-slot')).toBe('badge-root');
  expect(badge.getAttribute('data-variant')).toBe('secondary');
  expect(dot.getAttribute('data-part')).toBe('dot');
  expect(dot.getAttribute('data-slot')).toBe('badge-dot');
  expect(dot.getAttribute('aria-hidden')).toBe('true');
});

test('preserves semantic children and refs with asChild', async () => {
  const ref = createRef<HTMLAnchorElement>();

  render(
    <Badge ref={ref} asChild variant="link">
      <a href="#styling">Badge styling guidance</a>
    </Badge>,
  );

  await expect.element(page.getByRole('link', { name: 'Badge styling guidance' })).toHaveCount(1);
  const link = screen.getByRole('link', { name: 'Badge styling guidance' });

  expect(ref.current).toBe(link);
  expect(link.getAttribute('href')).toBe('#styling');
  expect(link.dataset).toMatchObject({
    slot: 'badge-root',
    variant: 'link',
  });
});

test('renders direct text without inserting an implicit label part', () => {
  const { getByTestId } = render(
    <Badge className="constrained" data-testid="badge">
      Ready for stakeholder review after legal approval
    </Badge>,
  );
  const badge = getByTestId('badge');

  expect(badge.firstElementChild).toBeNull();
  expect(badge.textContent).toContain('Ready for stakeholder review after legal approval');
});

test('exposes a composable label with a forwarded ref', async () => {
  const ref = createRef<HTMLElement>();

  render(
    <Badge>
      <BadgeDot />
      <BadgeLabel ref={ref} asChild data-part="custom">
        <strong>Production ready</strong>
      </BadgeLabel>
    </Badge>,
  );

  await expect.element(page.getByText('Production ready')).toHaveCount(1);
  const label = screen.getByText('Production ready');

  expect(ref.current).toBe(label);
  expect(label.tagName).toBe('STRONG');
  expect(label.dataset).toMatchObject({
    scope: 'badge',
    part: 'label',
    slot: 'badge-label',
  });
});

test('preserves native disabled button semantics with asChild', async () => {
  render(
    <Badge asChild variant="secondary">
      <button disabled>Archived</button>
    </Badge>,
  );

  await expect.element(page.getByRole('button', { name: 'Archived' })).toBeDisabled();
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(
    <Badge className="bg-secondary px-0" data-testid="badge">
      Ready
    </Badge>,
  );

  await expect.element(page.getByTestId('badge')).toHaveCount(1);
  const badge = screen.getByTestId('badge');
  expect([...badge.classList]).toEqual(expect.arrayContaining(['bg-secondary', 'px-0']));
  for (const className of ['bg-primary', 'px-2.5']) {
    expect(badge.classList.contains(className)).toBe(false);
  }
  await expect.element(page.getByTestId('badge')).toHaveCSS('padding', '0px');
});