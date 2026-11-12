import { useEffect, useRef, type ReactNode } from 'react';
import { useExampleSelection } from './example-panel';

type LiveFramework = 'solid' | 'vue' | 'svelte';
type LiveExamples = Record<LiveFramework, () => Promise<{ default: unknown }>>;
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

function LivePreview({
  framework,
  load,
}: {
  framework: LiveFramework;
  load: LiveExamples[LiveFramework];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    // Form blocks submit natively without a handler, which would leave the docs page.
    const preventSubmit = (event: SubmitEvent) => event.preventDefault();
    target.addEventListener('submit', preventSubmit);
    let cancelled = false;
    let unmount: Unmount | undefined;
    void load().then(async (module) => {
      if (cancelled) return;
      unmount = await mounters[framework](module.default as never, target);
      if (cancelled) unmount();
    });

    return () => {
      cancelled = true;
      unmount?.();
      target.removeEventListener('submit', preventSubmit);
    };
  }, [framework, load]);

  return <div ref={ref} data-live-preview={framework} style={{ display: 'contents' }} />;
}

// Renders the React example, or the Solid, Vue, or Svelte one chosen in the example panels. `live`
// must keep its identity across renders, so MDX pages declare it with a module-level `export const`.
function FrameworkPreview({ children, live }: { children: ReactNode; live: LiveExamples }) {
  const { framework } = useExampleSelection();

  return framework.value === 'react' ? (
    children
  ) : (
    <LivePreview key={framework.value} framework={framework.value} load={live[framework.value]} />
  );
}

export { FrameworkPreview };