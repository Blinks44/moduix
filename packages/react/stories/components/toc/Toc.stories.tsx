import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { Toc, useToc } from '@/components/toc/Toc';

const items = [
  { value: 'toc-story-introduction', depth: 2, label: 'Introduction' },
  { value: 'toc-story-installation', depth: 2, label: 'Installation' },
  { value: 'toc-story-configuration', depth: 3, label: 'Configuration' },
  { value: 'toc-story-usage', depth: 2, label: 'Usage' },
];

const contentStyle = {
  display: 'grid',
  height: '26rem',
  gap: 'var(--moduix-spacing-3)',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  padding: 'var(--moduix-spacing-3)',
  border: 'var(--moduix-border-width-sm) solid var(--moduix-color-border)',
  borderRadius: 'var(--moduix-radius-md)',
} as const;

const paragraphs = [
  'Track the reader inside this scrollable pane instead of the document viewport.',
  'Heading values, IDs, and anchor hashes remain identical for reliable navigation.',
  'Nested headings use the semantic depth supplied to the same item collection.',
];

function TocExample({ withRail = false }: { withRail?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Toc items={items} scrollEl={() => scrollRef.current}>
      <Toc.Content>
        <div
          ref={scrollRef}
          aria-label="Scrollable document preview"
          style={contentStyle}
          tabIndex={0}
        >
          {items.map((item) => (
            <section
              key={item.value}
              style={{
                padding: 'var(--moduix-spacing-3)',
                border: 'var(--moduix-border-width-sm) solid var(--moduix-color-border)',
                borderRadius: 'var(--moduix-radius-md)',
              }}
            >
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
          {!withRail && <Toc.Indicator />}
          {items.map((item, index) => (
            <Toc.Item key={item.value} item={item}>
              <Toc.Link href={`#${item.value}`}>
                {withRail && (
                  <Toc.Rail
                    depth={item.depth}
                    previousDepth={items[index - 1]?.depth}
                    nextDepth={items[index + 1]?.depth}
                  />
                )}
                {item.label}
              </Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc>
  );
}

const meta = {
  title: 'Components/Table of Contents',
  component: Toc,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    items: [],
  },
} satisfies Meta<typeof Toc>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TocExample />,
};

export const WithRail: Story = {
  render: () => <TocExample withRail />,
};

export const LeftPlacement: Story = {
  render: () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
      <Toc items={items} scrollEl={() => scrollRef.current}>
        <Toc.Content>
          <div
            ref={scrollRef}
            aria-label="Scrollable document preview"
            style={contentStyle}
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
        <Toc.Nav placement="left">
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
  },
};

export const RootProvider: Story = {
  render: function RootProviderStory() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const toc = useToc({
      items,
      defaultActiveIds: ['toc-story-installation'],
      scrollEl: () => scrollRef.current,
    });

    return (
      <Toc.RootProvider value={toc}>
        <Toc.Content>
          <div
            ref={scrollRef}
            aria-label="Scrollable document preview"
            style={contentStyle}
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
    );
  },
};