import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/react/collapsible';
import { Toc } from '@moduix/react/toc';
import { useRef } from 'react';
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
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Toc className={styles.root} items={items} scrollEl={() => scrollRef.current}>
      <Collapsible className={styles.collapsibleRoot} defaultOpen>
        <Toc.Context>
          {({ activeItems }) => {
            const activeIndex = items.findIndex((item) => item.value === activeItems[0]?.value);
            const activeLabel = items[activeIndex]?.label ?? 'On this page';

            return (
              <CollapsibleTrigger>
                <span className={styles.triggerContent}>
                  <ProgressRing index={activeIndex} total={items.length} />
                  <span className={styles.triggerLabel}>{activeLabel}</span>
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
              <Toc.Item key={item.value} item={item}>
                <Toc.Link href={`#${item.value}`}>{item.label}</Toc.Link>
              </Toc.Item>
            ))}
          </Toc.List>
        </CollapsibleContent>
      </Collapsible>

      <Toc.Content>
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
      </Toc.Content>
    </Toc>
  );
}

function ProgressRing({ index, total }: { index: number; total: number }) {
  const progress = index >= 0 ? (index + 1) / total : 0;

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 36 36"
      aria-hidden="true"
      className={styles.progressRing}
    >
      <circle
        cx="18"
        cy="18"
        r="14"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="2.5"
      />
      <circle
        data-progress
        cx="18"
        cy="18"
        r="14"
        fill="none"
        pathLength="100"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray={`${progress * 100} 100`}
        strokeLinecap="round"
        transform="rotate(-90 18 18)"
      />
      <text
        x="18"
        y="18"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="10"
        fontWeight="600"
        fill="currentColor"
      >
        {index >= 0 ? index + 1 : '-'}
      </text>
    </svg>
  );
}