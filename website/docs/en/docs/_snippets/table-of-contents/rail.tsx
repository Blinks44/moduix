import { Toc } from '@moduix/react/toc';
import { useRef } from 'react';

const items = [
  { value: 'toc-rail-overview', depth: 2, label: 'Overview' },
  { value: 'toc-rail-installation', depth: 2, label: 'Installation' },
  { value: 'toc-rail-package-manager', depth: 3, label: 'Package manager' },
  { value: 'toc-rail-dependencies', depth: 3, label: 'Peer dependencies' },
  { value: 'toc-rail-usage', depth: 2, label: 'Usage' },
  { value: 'toc-rail-server-components', depth: 3, label: 'Server components' },
  { value: 'toc-rail-theming', depth: 4, label: 'Theming' },
  { value: 'toc-rail-api', depth: 2, label: 'API reference' },
];

const paragraphs = [
  'The rail is opt-in: it adds a visual hierarchy without changing Ark tracking, links, or heading semantics.',
  'Each curve connects the previous item depth to the current one, so readers can follow a branch through nested sections.',
  'Use it when hierarchy is useful context; the standard list stays the clearer choice for a flat document.',
];

export default function TocRailDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Toc className="table-of-contents-demo" items={items} scrollEl={() => scrollRef.current}>
      <Toc.Content>
        <div
          ref={scrollRef}
          aria-label="Scrollable document preview"
          className="table-of-contents-demo-scroll-area"
          tabIndex={0}
        >
          {items.map((item) => {
            const Heading = item.depth === 2 ? 'h2' : item.depth === 3 ? 'h3' : 'h4';

            return (
              <section key={item.value}>
                <Heading id={item.value}>{item.label}</Heading>
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            );
          })}
        </div>
      </Toc.Content>

      <Toc.Nav>
        <Toc.Title>On this page</Toc.Title>
        <Toc.List>
          {items.map((item, index) => (
            <Toc.Item key={item.value} item={item}>
              <Toc.Link href={`#${item.value}`}>
                <Toc.Rail
                  depth={item.depth}
                  previousDepth={items[index - 1]?.depth}
                  nextDepth={items[index + 1]?.depth}
                />
                {item.label}
              </Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc>
  );
}