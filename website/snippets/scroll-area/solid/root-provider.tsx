import { Button } from '@moduix/solid/button';
import {
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaRootProvider,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  useScrollArea,
} from '@moduix/solid/scroll-area';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/scroll-area/scroll-area-root-provider.module.css';

const items = Array.from({ length: 12 }, (_, index) => `Activity item ${index + 1}`);

export default function RootProviderScrollAreaDemo() {
  const scrollArea = useScrollArea();
  const [edge, setEdge] = createSignal('top');

  return (
    <div class={styles.root}>
      <ScrollAreaRootProvider value={scrollArea} class={styles.scrollArea}>
        <ScrollAreaViewport>
          <ScrollAreaContent>
            <div class={styles.content}>
              {items.map((item) => (
                <div class={styles.item}>{item}</div>
              ))}
            </div>
          </ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar>
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </ScrollAreaRootProvider>
      <output>Current edge: {edge()}</output>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => {
          scrollArea().scrollToEdge({ edge: 'top' });
          setEdge('top');
        }}
      >
        Top
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => {
          scrollArea().scrollToEdge({ edge: 'bottom' });
          setEdge('bottom');
        }}
      >
        Bottom
      </Button>
    </div>
  );
}