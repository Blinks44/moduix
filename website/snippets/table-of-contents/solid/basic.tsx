import {
  Toc,
  TocContent,
  TocIndicator,
  TocItem,
  TocLink,
  TocList,
  TocNav,
  TocTitle,
} from '@moduix/solid/toc';
import { Dynamic } from 'solid-js/web';
import styles from '@/components/examples/table-of-contents/table-of-contents-basic.module.css';

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
  let scrollRef: HTMLDivElement | undefined;

  return (
    <Toc class={styles.root} items={items} scrollEl={() => scrollRef ?? null}>
      <TocContent>
        <div
          ref={(element) => (scrollRef = element)}
          aria-label="Scrollable document preview"
          class={styles.scrollArea}
          tabIndex={0}
        >
          {items.map((item) => (
            <section>
              <Dynamic component={item.depth === 2 ? 'h2' : 'h3'} id={item.value}>
                {item.label}
              </Dynamic>
              <p>{item.description}</p>
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
    </Toc>
  );
}
