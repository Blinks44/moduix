import { ScrollArea } from '@moduix/solid/scroll-area';
import styles from '@/components/examples/scroll-area/scroll-area-basic.module.css';

const sections = [
  {
    title: 'Release notes',
    body: 'Keep long updates readable without making the surrounding page harder to scan.',
  },
  {
    title: 'Keyboard scrolling',
    body: 'The viewport is a native scroll container, so wheel, trackpad, touch, and keyboard scrolling keep working.',
  },
  {
    title: 'Scrollbar feedback',
    body: 'Hovering the edge reveals the custom thumb while the content remains in its normal document flow.',
  },
  {
    title: 'More content',
    body: 'A bounded root creates a focused scroll region instead of extending the whole page.',
  },
  {
    title: 'Bottom edge',
    body: 'Ark tracks the visible edges and measures the thumb for the styled scrollbar.',
  },
];

export default function ScrollAreaDemo() {
  return (
    <ScrollArea class={styles.root}>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <div class={styles.content}>
            {sections.map((item) => (
              <section>
                <h3>{item.title}</h3>
                <p class={styles.description}>{item.body}</p>
              </section>
            ))}
          </div>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  );
}