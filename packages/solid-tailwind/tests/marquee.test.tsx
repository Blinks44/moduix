import { LocaleProvider } from '@ark-ui/solid/locale';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  Marquee,
  MarqueeContent,
  MarqueeEdge,
  MarqueeItem,
  MarqueeRootProvider,
  MarqueeViewport,
  useMarquee,
  useMarqueeContext,
} from '../src';

function TestMarquee(props: { defaultPaused?: boolean; paused?: boolean }) {
  return (
    <Marquee aria-label="Partner logos" defaultPaused={props.defaultPaused} paused={props.paused}>
      <MarqueeEdge side="start" />
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItem>Atlas</MarqueeItem>
          <MarqueeItem>Beacon</MarqueeItem>
        </MarqueeContent>
      </MarqueeViewport>
      <MarqueeEdge side="end" />
    </Marquee>
  );
}

test('preserves Ark marquee anatomy, semantics, and Tailwind styling hooks', () => {
  render(() => (
    <LocaleProvider locale="ar">
      <TestMarquee />
    </LocaleProvider>
  ));

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
  render(() => (
    <Marquee aria-label="Partner logos" class="w-1/2 text-primary">
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItem>Atlas</MarqueeItem>
        </MarqueeContent>
      </MarqueeViewport>
      <MarqueeEdge side="start" class="w-1/4" data-testid="edge" />
    </Marquee>
  ));

  const root = screen.getByRole('region', { name: 'Partner logos' });
  const edge = screen.getByTestId('edge');

  expect(root).toHaveClass('w-1/2', 'text-primary');
  expect(root).not.toHaveClass('w-full', 'text-foreground');
  expect(edge).toHaveClass('w-1/4');
  expect(edge).not.toHaveClass('w-1/5');
});

test('lets consumers override the vertical height', () => {
  render(() => (
    <Marquee side="bottom" class="h-96">
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItem>Atlas</MarqueeItem>
        </MarqueeContent>
      </MarqueeViewport>
    </Marquee>
  ));

  const root = screen.getByRole('region');

  expect(root).toHaveClass('h-96');
  expect(root).not.toHaveClass('h-60');
});

test('forwards part refs and keeps cloned content out of the accessibility tree', () => {
  let rootRef!: HTMLDivElement;
  let itemRef!: HTMLDivElement;

  render(() => (
    <Marquee ref={(element) => (rootRef = element)} aria-label="Partner logos">
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItem ref={(element) => (itemRef = element)}>Atlas</MarqueeItem>
        </MarqueeContent>
      </MarqueeViewport>
    </Marquee>
  ));

  const root = screen.getByRole('region', { name: 'Partner logos' });
  const [content, clone] = root.querySelectorAll('[data-part="content"]');

  expect(rootRef).toBe(root);
  expect(itemRef).toHaveTextContent('Atlas');
  expect(content).not.toHaveAttribute('aria-hidden');
  expect(clone).toHaveAttribute('data-clone');
  expect(clone).toHaveAttribute('aria-hidden', 'true');
  expect(clone).toHaveAttribute('role', 'presentation');
});

test('preserves Ark controlled and uncontrolled pause state', async () => {
  let setPaused!: (paused: boolean | undefined) => void;

  render(() => {
    const [paused, updatePaused] = createSignal<boolean | undefined>();
    setPaused = updatePaused;

    return (
      <Marquee aria-label="Partner logos" defaultPaused paused={paused()}>
        <MarqueeViewport>
          <MarqueeContent>
            <MarqueeItem>Atlas</MarqueeItem>
          </MarqueeContent>
        </MarqueeViewport>
      </Marquee>
    );
  });

  const root = screen.getByRole('region', { name: 'Partner logos' });

  expect(root).toHaveAttribute('data-state', 'paused');
  expect(root).toHaveAttribute('data-paused');

  setPaused(false);
  await waitFor(() => {
    expect(root).toHaveAttribute('data-state', 'idle');
    expect(root).not.toHaveAttribute('data-paused');
  });
});

function ContextPauseControl() {
  const marquee = useMarqueeContext();

  return (
    <button type="button" onClick={() => marquee().pause()}>
      Pause marquee
    </button>
  );
}

test('preserves interaction pause behavior, callback details, and context controls', async () => {
  const pauseChanges: Array<{ paused: boolean }> = [];

  render(() => (
    <Marquee
      aria-label="Partner logos"
      pauseOnInteraction
      onPauseChange={(details) => pauseChanges.push(details)}
    >
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItem>Atlas</MarqueeItem>
        </MarqueeContent>
      </MarqueeViewport>
      <ContextPauseControl />
    </Marquee>
  ));

  const root = screen.getByRole('region', { name: 'Partner logos' });

  fireEvent.mouseEnter(root);

  await waitFor(() => {
    expect(root).toHaveAttribute('data-paused');
    expect(pauseChanges.at(-1)).toEqual({ paused: true });
  });

  fireEvent.mouseLeave(root);

  await waitFor(() => {
    expect(root).not.toHaveAttribute('data-paused');
    expect(pauseChanges.at(-1)).toEqual({ paused: false });
  });

  fireEvent.click(screen.getByRole('button', { name: 'Pause marquee' }));

  await waitFor(() => {
    expect(root).toHaveAttribute('data-paused');
    expect(pauseChanges.at(-1)).toEqual({ paused: true });
  });
});

test('preserves the root host element with asChild', () => {
  render(() => (
    <Marquee asChild={(props) => <a {...props()} href="/partners" aria-label="Partner logos" />} />
  ));

  const root = screen.getByRole('region', { name: 'Partner logos' });

  expect(root.tagName).toBe('A');
  expect(root).toHaveAttribute('href', '/partners');
  expect(root).toHaveAttribute('data-slot', 'marquee-root');
  expect(root).toHaveAttribute('data-scope', 'marquee');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let rootRef: HTMLDivElement | undefined;

  render(() => (
    <Marquee
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} />}
      aria-label="Partner logos"
    />
  ));

  expect(rootRef).toBeUndefined();
});

function ProviderMarquee() {
  const marquee = useMarquee({ translations: { root: 'Partner logos' } });

  return (
    <MarqueeRootProvider value={marquee}>
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItem>Atlas</MarqueeItem>
        </MarqueeContent>
      </MarqueeViewport>
    </MarqueeRootProvider>
  );
}

test('styles a RootProvider tree created by the public hook', () => {
  render(() => <ProviderMarquee />);

  expect(screen.getByRole('region', { name: 'Partner logos' })).toHaveAttribute(
    'data-slot',
    'marquee-root-provider',
  );
});