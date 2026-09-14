import { Button } from '@moduix/react/button';
import { ScrollArea } from '@moduix/react/scroll-area';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/scroll-area/scroll-area-root-provider.module.css';

const items = Array.from({ length: 12 }, (_, index) => `Activity item ${index + 1}`);

export default function RootProviderScrollAreaDemo() {
  const scrollArea = ScrollArea.useScrollArea();
  const [edge, setEdge] = useState('top');

  return (
    <div className={styles.root}>
      <ScrollArea.RootProvider value={scrollArea} className={styles.scrollArea}>
        <ScrollArea.Viewport>
          <ScrollArea.Content>
            <div className={styles.content}>
              {items.map((item) => (
                <div key={item} className={styles.item}>
                  {item}
                </div>
              ))}
            </div>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.RootProvider>
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