import { LocaleProvider } from '@ark-ui/react/locale';
import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { Marquee, useMarquee, useMarqueeContext } from '../src';

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

test('preserves Ark marquee anatomy, semantics, and Tailwind styling hooks', () => {
  render(
    <LocaleProvider locale="ar">
      <TestMarquee />
    </LocaleProvider>,
  );

  const root = screen.getByRole('region', { name: 'Partner logos' });
  const viewport = root.querySelector('[data-part="viewport"]');
  const content = root.querySelector('[data-part="content"]');
  const item = root.querySelector('[data-part="item"]');
  const edges = root.querySelectorAll('[data-part="edge"]');

  expect(root).toHaveAttribute('aria-roledescription', 'marquee');
  expect(root).toHaveAttribute('data-slot', 'marquee-root');
  expect(root).toHaveAttribute('dir', 'rtl');
  expect(root).toHaveClass('group', 'relative', 'w-full', 'overflow-hidden', 'text-foreground');
  expect(viewport).toHaveAttribute('data-slot', 'marquee-viewport');
  expect(viewport).toHaveClass('size-full');
  expect(content).toHaveAttribute('data-slot', 'marquee-content');
  expect(content).toHaveClass('animate-moduix-marquee-x');
  expect(item).toHaveAttribute('data-slot', 'marquee-item');
  expect(item).toHaveClass('shrink-0');
  expect(edges[0]).toHaveAttribute('data-slot', 'marquee-edge');
  expect(edges[0]).toHaveClass('w-1/5', 'bg-linear-to-r', 'from-background', 'to-transparent');
  expect(edges[1]).toHaveAttribute('data-slot', 'marquee-edge');
  expect(edges).toHaveLength(2);
  expect(edges[0]).toHaveAttribute('dir', 'rtl');
  expect(edges[1]).toHaveAttribute('dir', 'rtl');
});

test('lets consumer Tailwind utilities override conflicting defaults', () => {
  render(
    <Marquee aria-label="Partner logos" className="w-1/2 text-primary">
      <Marquee.Viewport>
        <Marquee.Content>
          <Marquee.Item>Atlas</Marquee.Item>
        </Marquee.Content>
      </Marquee.Viewport>
      <Marquee.Edge side="start" className="w-1/4" data-testid="edge" />
    </Marquee>,
  );

  const root = screen.getByRole('region', { name: 'Partner logos' });
  const edge = screen.getByTestId('edge');

  expect(root).toHaveClass('w-1/2', 'text-primary');
  expect(root).not.toHaveClass('w-full', 'text-foreground');
  expect(edge).toHaveClass('w-1/4');
  expect(edge).not.toHaveClass('w-1/5');
});

test('lets consumers override the vertical height', () => {
  render(
    <Marquee side="bottom" className="h-96">
      <Marquee.Viewport>
        <Marquee.Content>
          <Marquee.Item>Atlas</Marquee.Item>
        </Marquee.Content>
      </Marquee.Viewport>
    </Marquee>,
  );

  const root = screen.getByRole('region');

  expect(root).toHaveClass('h-96');
  expect(root).not.toHaveClass('h-60');
});

test('forwards part refs and keeps cloned content out of the accessibility tree', () => {
  const rootRef = createRef<HTMLDivElement>();
  const itemRef = createRef<HTMLDivElement>();

  render(
    <Marquee ref={rootRef} aria-label="Partner logos">
      <Marquee.Viewport>
        <Marquee.Content>
          <Marquee.Item ref={itemRef}>Atlas</Marquee.Item>
        </Marquee.Content>
      </Marquee.Viewport>
    </Marquee>,
  );

  const root = screen.getByRole('region', { name: 'Partner logos' });
  const [content, clone] = root.querySelectorAll('[data-part="content"]');

  expect(rootRef.current).toBe(root);
  expect(itemRef.current).toHaveTextContent('Atlas');
  expect(content).not.toHaveAttribute('aria-hidden');
  expect(clone).toHaveAttribute('data-clone');
  expect(clone).toHaveAttribute('aria-hidden', 'true');
  expect(clone).toHaveAttribute('role', 'presentation');
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

function ContextPauseControl() {
  const marquee = useMarqueeContext();

  return (
    <button type="button" onClick={() => marquee.pause()}>
      Pause marquee
    </button>
  );
}

test('preserves interaction pause behavior, callback details, and context controls', async () => {
  const onPauseChange = rs.fn();

  render(
    <Marquee aria-label="Partner logos" pauseOnInteraction onPauseChange={onPauseChange}>
      <Marquee.Viewport>
        <Marquee.Content>
          <Marquee.Item>Atlas</Marquee.Item>
        </Marquee.Content>
      </Marquee.Viewport>
      <ContextPauseControl />
    </Marquee>,
  );

  const root = screen.getByRole('region', { name: 'Partner logos' });

  fireEvent.mouseEnter(root);

  await waitFor(() => {
    expect(root).toHaveAttribute('data-paused');
    expect(onPauseChange).toHaveBeenLastCalledWith({ paused: true });
  });

  fireEvent.mouseLeave(root);

  await waitFor(() => {
    expect(root).not.toHaveAttribute('data-paused');
    expect(onPauseChange).toHaveBeenLastCalledWith({ paused: false });
  });

  fireEvent.click(screen.getByRole('button', { name: 'Pause marquee' }));

  await waitFor(() => {
    expect(root).toHaveAttribute('data-paused');
    expect(onPauseChange).toHaveBeenLastCalledWith({ paused: true });
  });
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