import { Splitter, useSplitter } from '@moduix/solid/splitter';
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import styles from '@/components/examples/splitter/splitter-dynamic-collapsible.module.css';

export default function DynamicCollapsibleSplitterDemo() {
  let rootRef: HTMLDivElement | undefined;
  const [rootSize, setRootSize] = createSignal<number | null>(null);
  const isCompact = () => rootSize() != null && rootSize()! < 520;
  const splitter = useSplitter(() => ({
    panels: [
      {
        id: 'sidebar',
        collapsible: isCompact(),
        collapsedSize: 5,
        minSize: 18,
        maxSize: 40,
      },
      {
        id: 'content',
        minSize: 40,
      },
    ],
    defaultSize: [30, 70],
  }));

  onMount(() => {
    const observer = new ResizeObserver(([entry]) => setRootSize(entry.contentRect.width));
    if (rootRef) observer.observe(rootRef);
    onCleanup(() => observer.disconnect());
  });

  createEffect(() => {
    if (isCompact()) splitter().collapsePanel('sidebar');
    else splitter().expandPanel('sidebar');
  });

  return (
    <Splitter.RootProvider
      ref={(element) => (rootRef = element)}
      value={splitter}
      class={styles.root}
    >
      <Splitter.Panel id="sidebar" class={styles.panel}>
        Sidebar
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="sidebar:content" aria-label="Resize panels" />
      <Splitter.Panel id="content" class={styles.panel}>
        Content
      </Splitter.Panel>
    </Splitter.RootProvider>
  );
}