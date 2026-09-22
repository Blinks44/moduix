import { Button } from '@moduix/react/button';
import {
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaRootProvider,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  useScrollArea,
} from '@moduix/react/scroll-area';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/scroll-area/scroll-area-root-provider.module.css';

const items = Array.from({ length: 12 }, (_, index) => `Activity item ${index + 1}`);

export default function RootProviderScrollAreaDemo() {
  const scrollArea = useScrollArea();
  const [edge, setEdge] = useState('top');

  return (
    <div className={styles.root}>
      <ScrollAreaRootProvider value={scrollArea} className={styles.scrollArea}>
        <ScrollAreaViewport>
          <ScrollAreaContent>
            <div className={styles.content}>
              {items.map((item) => (
                <div key={item} className={styles.item}>
                  {item}
                </div>
              ))}
            </div>
          </ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar>
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </ScrollAreaRootProvider>
      <PreviewMeta>
        <output>Current edge: {edge}</output>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            scrollArea.scrollToEdge({
              edge: 'top',
            });
            setEdge('top');
          }}
        >
          Top
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            scrollArea.scrollToEdge({
              edge: 'bottom',
            });
            setEdge('bottom');
          }}
        >
          Bottom
        </Button>
      </PreviewMeta>
    </div>
  );
}