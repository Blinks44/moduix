import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { LocaleProvider, Marquee, useMarquee } from '../src';

function TestMarquee({ defaultPaused, paused }: { defaultPaused?: boolean; paused?: boolean }) {
  return (
    <Marquee aria-label="Partner logos" defaultPaused={defaultPaused} paused={paused}>
      <Marquee.Edge side="start" />
      <Marquee.Viewport>
        <Marquee.Content>
          <Marquee.Item>Atlas</Marquee.Item>
          <Marquee.Item>Beacon</Marquee.Item>
        </Marquee.Content>
      </Marquee.Viewport>
      <Marquee.Edge side="end" />
    </Marquee>
  );
}

test('preserves Ark marquee anatomy, semantics, and moduix styling hooks', () => {
  render(
    <LocaleProvider locale="ar">
      <TestMarquee />
    </LocaleProvider>,
  );

  const root = screen.getByRole('region', { name: 'Partner logos' });
  const viewport = root.querySelector('[data-part="viewport"]');
  const content = root.querySelector('[data-part="content"]');

  expect(root).toHaveAttribute('aria-roledescription', 'marquee');
  expect(root).toHaveAttribute('data-slot', 'marquee-root');
  expect(root).toHaveAttribute('dir', 'rtl');
  expect(viewport).toHaveAttribute('data-slot', 'marquee-viewport');
  expect(content).toHaveAttribute('data-slot', 'marquee-content');
  expect(root.querySelector('[data-side="start"]')).toHaveAttribute('data-slot', 'marquee-edge');
  expect(root.querySelector('[data-side="end"]')).toHaveAttribute('data-slot', 'marquee-edge');
  expect(root.querySelectorAll('[data-part="edge"]')).toHaveLength(2);
  expect(root.querySelectorAll('[data-part="edge"]')[0]).toHaveAttribute('dir', 'rtl');
  expect(root.querySelectorAll('[data-part="edge"]')[1]).toHaveAttribute('dir', 'rtl');
});

test('preserves Ark controlled and uncontrolled pause state', () => {
  const { rerender } = render(<TestMarquee defaultPaused />);

  const root = screen.getByRole('region', { name: 'Partner logos' });

  expect(root).toHaveAttribute('data-state', 'paused');
  expect(root).toHaveAttribute('data-paused');

  rerender(<TestMarquee paused={false} />);

  expect(root).toHaveAttribute('data-state', 'idle');
  expect(root).not.toHaveAttribute('data-paused');
});

test('preserves the root host element with asChild', () => {
  render(
    <Marquee asChild>
      <a href="/partners" aria-label="Partner logos" />
    </Marquee>,
  );

  const root = screen.getByRole('region', { name: 'Partner logos' });

  expect(root.tagName).toBe('A');
  expect(root).toHaveAttribute('href', '/partners');
  expect(root).toHaveAttribute('data-slot', 'marquee-root');
  expect(root).toHaveAttribute('data-scope', 'marquee');
});

function ProviderMarquee() {
  const marquee = useMarquee({ translations: { root: 'Partner logos' } });

  return (
    <Marquee.RootProvider value={marquee}>
      <Marquee.Viewport>
        <Marquee.Content>
          <Marquee.Item>Atlas</Marquee.Item>
        </Marquee.Content>
      </Marquee.Viewport>
    </Marquee.RootProvider>
  );
}

test('styles a RootProvider tree created by the public hook', () => {
  render(<ProviderMarquee />);

  expect(screen.getByRole('region', { name: 'Partner logos' })).toHaveAttribute(
    'data-slot',
    'marquee-root-provider',
  );
});