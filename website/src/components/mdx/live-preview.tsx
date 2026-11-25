import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { useExampleSelection } from './example-panel';

type LiveFramework = 'solid' | 'vue' | 'svelte';
type LiveExamples = Record<LiveFramework, () => Promise<{ default: unknown }>>;
type LiveTailwindExamples = LiveExamples & {
  react: () => Promise<{ default: ComponentType }>;
};
type Unmount = () => void;

// Vue numbers `useId()` per app, so every preview app would generate the same ids and Ark parts
// would resolve elements from another example on the page. A per-app prefix keeps ids unique.
let vueAppCount = 0;

// Each framework renders its example into a plain element and returns the cleanup. The runtimes load
// lazily, so pages viewed with React never download Solid, Vue, or Svelte.
const mounters: Record<LiveFramework, (component: never, target: HTMLElement) => Promise<Unmount>> =
  {
    solid: async (component, target) => {
      const [{ createComponent }, { render }] = await Promise.all([
        import('solid-js'),
        import('solid-js/web'),
      ]);
      return render(() => createComponent(component, {}), target);
    },
    vue: async (component, target) => {
      const { createApp } = await import('vue');
      const app = createApp(component);
      app.config.idPrefix = `preview-${++vueAppCount}`;
      app.mount(target);
      return () => app.unmount();
    },
    svelte: async (component, target) => {
      const { mount, unmount } = await import('svelte');
      const instance = mount(component, { target });
      return () => void unmount(instance);
    },
  };

function PreviewStatus({ status }: { status: 'loading' | 'ready' | 'error' }) {
  if (status === 'loading') {
    return (
      <span
        role="status"
        aria-live="polite"
        style={{ color: 'var(--moduix-muted-foreground)', fontSize: 'var(--moduix-text-sm)' }}
      >
        Loading preview…
      </span>
    );
  }
  if (status === 'error') {
    return (
      <span
        role="alert"
        style={{ color: 'var(--moduix-destructive)', fontSize: 'var(--moduix-text-sm)' }}
      >
        Preview failed to load. Try reloading or open the example in StackBlitz.
      </span>
    );
  }
  return null;
}

function LiveReactPreview({ load }: { load: () => Promise<{ default: ComponentType }> }) {
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setComponent(null);

    load()
      .then((module) => {
        if (cancelled) return;
        setComponent(() => module.default);
        setStatus('ready');
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        console.error('Failed to render react tailwind live preview:', error);
        setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [load]);

  return (
    <>
      <PreviewStatus status={status} />
      {Component ? (
        <div
          data-live-preview="react-tailwind"
          style={{ display: 'contents' }}
          onSubmit={(event) => event.preventDefault()}
        >
          <Component />
        </div>
      ) : null}
    </>
  );
}

function LivePreview({
  framework,
  load,
}: {
  framework: LiveFramework;
  load: LiveExamples[LiveFramework];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    // Form blocks submit natively without a handler, which would leave the docs page.
    const preventSubmit = (event: SubmitEvent) => event.preventDefault();
    target.addEventListener('submit', preventSubmit);
    let cancelled = false;
    let unmount: Unmount | undefined;
    setStatus('loading');

    load()
      .then(async (module) => {
        if (cancelled) return;
        unmount = await mounters[framework](module.default as never, target);
        if (cancelled) {
          unmount();
          return;
        }
        setStatus('ready');
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        console.error(`Failed to render ${framework} live preview:`, error);
        setStatus('error');
      });

    return () => {
      cancelled = true;
      unmount?.();
      target.removeEventListener('submit', preventSubmit);
    };
  }, [framework, load]);

  return (
    <>
      <PreviewStatus status={status} />
      <div ref={ref} data-live-preview={framework} style={{ display: 'contents' }} />
    </>
  );
}

// Renders the React example, or the Solid, Vue, or Svelte one chosen in the example panels. `live`
// and `liveTailwind` must keep their identity across renders, so MDX pages declare them with
// module-level `export const`.
function FrameworkPreview({
  children,
  live,
  liveTailwind,
}: {
  children: ReactNode;
  live: LiveExamples;
  liveTailwind?: LiveTailwindExamples;
}) {
  const { framework, styling } = useExampleSelection();

  if (styling.value === 'tailwind' && liveTailwind) {
    return framework.value === 'react' ? (
      <LiveReactPreview key="react-tailwind" load={liveTailwind.react} />
    ) : (
      <LivePreview
        key={`${framework.value}-tailwind`}
        framework={framework.value}
        load={liveTailwind[framework.value]}
      />
    );
  }

  return framework.value === 'react' ? (
    children
  ) : (
    <LivePreview key={framework.value} framework={framework.value} load={live[framework.value]} />
  );
}

export { FrameworkPreview };