import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/solid/collapsible';
import { Toc } from '@moduix/solid/toc';
import styles from '@/components/examples/table-of-contents/table-of-contents-with-collapsible.module.css';

const items = [
  { value: 'toc-collapsible-overview', depth: 2, label: 'Overview' },
  { value: 'toc-collapsible-prerequisites', depth: 2, label: 'Prerequisites' },
  { value: 'toc-collapsible-quick-start', depth: 2, label: 'Quick start' },
  { value: 'toc-collapsible-commands', depth: 2, label: 'Core commands' },
  { value: 'toc-collapsible-troubleshooting', depth: 2, label: 'Troubleshooting' },
];

const paragraphs = [
  'A collapsible navigation keeps the current section visible while giving the reader more room for the article.',
  'The same items drive the headings and links, so the active state stays synchronized with the scrollable reading pane.',
  'Use this pattern when a compact navigation control is more useful than a permanently expanded table of contents.',
];

export default function TocWithCollapsibleDemo() {
  let scrollRef: HTMLDivElement | undefined;

  return (
    <Toc class={styles.root} items={items} scrollEl={() => scrollRef ?? null}>
      <Collapsible class={styles.collapsibleRoot} defaultOpen>
        <Toc.Context>
          {(context) => {
            const activeIndex = () =>
              items.findIndex((item) => item.value === context().activeItems[0]?.value);
            const activeLabel = () => items[activeIndex()]?.label ?? 'On this page';

            return (
              <CollapsibleTrigger>
                <span class={styles.triggerContent}>
                  <ProgressRing index={activeIndex()} total={items.length} />
                  <span class={styles.triggerLabel}>{activeLabel()}</span>
                </span>
                <CollapsibleIndicator />
              </CollapsibleTrigger>
            );
          }}
        </Toc.Context>

        <CollapsibleContent>
          <Toc.List>
            <Toc.Indicator />
            {items.map((item) => (
              <Toc.Item item={item}>
                <Toc.Link href={`#${item.value}`}>{item.label}</Toc.Link>
              </Toc.Item>
            ))}
          </Toc.List>
        </CollapsibleContent>
      </Collapsible>

      <Toc.Content>
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
      </Toc.Content>
    </Toc>
  );
}

function ProgressRing(props: { index: number; total: number }) {
  const progress = props.index >= 0 ? (props.index + 1) / props.total : 0;

  return (
    <svg width="28" height="28" viewBox="0 0 36 36" aria-hidden="true" class={styles.progressRing}>
      <circle
        cx="18"
        cy="18"
        r="14"
        fill="none"
        stroke="currentColor"
        stroke-opacity="0.2"
        stroke-width="2.5"
      />
      <circle
        data-progress
        cx="18"
        cy="18"
        r="14"
        fill="none"
        pathLength="100"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-dasharray={`${progress * 100} 100`}
        stroke-linecap="round"
        transform="rotate(-90 18 18)"
      />
      <text
        x="18"
        y="18"
        text-anchor="middle"
        dominant-baseline="central"
        font-size="10"
        font-weight="600"
        fill="currentColor"
      >
        {props.index >= 0 ? props.index + 1 : '-'}
      </text>
    </svg>
  );
}