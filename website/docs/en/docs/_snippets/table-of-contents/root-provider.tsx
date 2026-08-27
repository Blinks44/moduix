import { Button } from '@moduix/react/button';
import { Toc, useToc } from '@moduix/react/toc';
import { useRef } from 'react';

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
    <div className="table-of-contents-provider-demo">
      <output>Active: {toc.activeIds.join(', ') || 'none'}</output>
      <div className="table-of-contents-provider-actions">
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

      <Toc.RootProvider className="table-of-contents-demo" value={toc}>
        <Toc.Content>
          <div
            ref={scrollRef}
            aria-label="Scrollable document preview"
            className="table-of-contents-demo-scroll-area"
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
        </Toc.Content>
        <Toc.Nav>
          <Toc.Title>On this page</Toc.Title>
          <Toc.List>
            <Toc.Indicator />
            {items.map((item) => (
              <Toc.Item key={item.value} item={item}>
                <Toc.Link href={`#${item.value}`}>{item.label}</Toc.Link>
              </Toc.Item>
            ))}
          </Toc.List>
        </Toc.Nav>
      </Toc.RootProvider>
    </div>
  );
}