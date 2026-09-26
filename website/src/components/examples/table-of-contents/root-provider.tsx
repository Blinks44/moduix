import { Button } from '@moduix/react/button';
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
} from '@moduix/react/toc';
import { useRef } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const toc = useToc({
    items,
    defaultActiveIds: ['toc-provider-overview'],
    scrollEl: () => scrollRef.current,
  });

  return (
    <div className={styles.root}>
      <PreviewMeta>
        <output className={styles.status}>Active: {toc.activeIds.join(', ') || 'none'}</output>
      </PreviewMeta>
      <div className={styles.actions}>
        {items.map((item) => (
          <Button
            key={item.value}
            size="sm"
            variant="outline"
            onClick={() => toc.scrollTo(item.value)}
          >
            Scroll to {item.label}
          </Button>
        ))}
      </div>

      <TocRootProvider className={styles.toc} value={toc}>
        <TocContent>
          <div
            ref={scrollRef}
            aria-label="Scrollable document preview"
            className={styles.scrollArea}
            tabIndex={0}
          >
            {items.map((item) => (
              <section key={item.value}>
                <h2 id={item.value}>{item.label}</h2>
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
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
              <TocItem key={item.value} item={item}>
                <TocLink href={`#${item.value}`}>{item.label}</TocLink>
              </TocItem>
            ))}
          </TocList>
        </TocNav>
      </TocRootProvider>
    </div>
  );
}