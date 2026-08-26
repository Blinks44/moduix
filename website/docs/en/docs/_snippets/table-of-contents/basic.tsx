import { Toc } from '@moduix/react/toc';
import { useRef } from 'react';

const items = [
  {
    value: 'toc-basic-overview',
    depth: 2,
    label: 'Overview',
    description: 'Introduce the document and its intended readers.',
  },
  {
    value: 'toc-basic-installation',
    depth: 2,
    label: 'Installation',
    description: 'Add the package and import the parts you need.',
  },
  {
    value: 'toc-basic-configuration',
    depth: 3,
    label: 'Configuration',
    description: 'Use nested headings to express the document structure.',
  },
  {
    value: 'toc-basic-usage',
    depth: 2,
    label: 'Usage',
    description: 'Keep the navigation and content in the same root.',
  },
];

const paragraphs = [
  'A table of contents helps readers orient themselves in a long document without interrupting their place in the text.',
  'This preview uses a dedicated reading pane. Its navigation observes only this pane, so scrolling the documentation page never changes the active heading.',
  'Keep values predictable and unique on the page. They become both the heading IDs and the same-page anchors used by the navigation.',
];

export default function TocDemo() {
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
            const Heading = item.depth === 2 ? 'h2' : 'h3';

            return (
              <section key={item.value}>
                <Heading id={item.value}>{item.label}</Heading>
                <p>{item.description}</p>
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
          <Toc.Indicator />
          {items.map((item) => (
            <Toc.Item key={item.value} item={item}>
              <Toc.Link href={`#${item.value}`}>{item.label}</Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc>
  );
}