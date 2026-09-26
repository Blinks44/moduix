import { Button } from '@moduix/solid/button';
import {
  TocContent,
  TocIndicator,
  TocItem,
  TocLink,
  TocList,
  TocNav,
  TocRootProvider,
  TocTitle,
  useToc,
} from '@moduix/solid/toc';
import styles from '@/components/examples/table-of-contents/table-of-contents-root-provider.module.css';

const items = [
  { value: 'toc-provider-overview', depth: 2, label: 'Overview' },
  { value: 'toc-provider-installation', depth: 2, label: 'Installation' },
  { value: 'toc-provider-usage', depth: 2, label: 'Usage' },
];

const paragraphs = [
  'The store can power controls outside the navigation while the same visible-heading state still drives the links.',
  'In an embedded reader, point scrollEl to the pane that owns the overflow. This prevents document scroll from influencing the active section.',
  'Use the public scrollTo method when a separate control should move the reader to a known section.',
];

export default function TocRootProviderDemo() {
  let scrollRef: HTMLDivElement | undefined;
  const toc = useToc({
    items,
    defaultActiveIds: ['toc-provider-overview'],
    scrollEl: () => scrollRef ?? null,
  });

  return (
    <div class={styles.root}>
      <output class={styles.status}>Active: {toc().activeIds.join(', ') || 'none'}</output>
      <div class={styles.actions}>
        {items.map((item) => (
          <Button size="sm" variant="outline" onClick={() => toc().scrollTo(item.value)}>
            Scroll to {item.label}
          </Button>
        ))}
      </div>

      <TocRootProvider class={styles.toc} value={toc}>
        <TocContent>
          <div
            ref={(element) => (scrollRef = element)}
            aria-label="Scrollable document preview"
            class={styles.scrollArea}
            tabIndex={0}
          >
            {items.map((item) => (
              <section>
                <h2 id={item.value}>{item.label}</h2>
                {paragraphs.map((paragraph) => (
                  <p>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </TocContent>
        <TocNav>
          <TocTitle>On this page</TocTitle>
          <TocList>
            <TocIndicator />
            {items.map((item) => (
              <TocItem item={item}>
                <TocLink href={`#${item.value}`}>{item.label}</TocLink>
              </TocItem>
            ))}
          </TocList>
        </TocNav>
      </TocRootProvider>
    </div>
  );
}