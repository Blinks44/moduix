import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Toc, useToc } from '@/components/toc/Toc';

const items = [
  { value: 'toc-story-introduction', depth: 2, label: 'Introduction' },
  { value: 'toc-story-installation', depth: 2, label: 'Installation' },
  { value: 'toc-story-configuration', depth: 3, label: 'Configuration' },
  { value: 'toc-story-usage', depth: 2, label: 'Usage' },
];

const contentClass =
  'grid h-[26rem] gap-3 overflow-y-auto overscroll-contain rounded-md border border-border p-3';
const sectionClass = 'rounded-md border border-border p-3';

const paragraphs = [
  'Track the reader inside this scrollable pane instead of the document viewport.',
  'Heading values, IDs, and anchor hashes remain identical for reliable navigation.',
  'Nested headings use the semantic depth supplied to the same item collection.',
];

function TocExample(props: { withRail?: boolean }) {
  let scrollRef: HTMLDivElement | null = null;

  return (
    <Toc items={items} scrollEl={() => scrollRef}>
      <Toc.Content>
        <div
          ref={(element) => (scrollRef = element)}
          aria-label="Scrollable document preview"
          class={contentClass}
          tabIndex={0}
        >
          {items.map((item) => (
            <section class={sectionClass}>
              <h2 id={item.value}>{item.label}</h2>
              {paragraphs.map((paragraph) => (
                <p>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </Toc.Content>

      <Toc.Nav>
        <Toc.Title>On this page</Toc.Title>
        <Toc.List>
          {!props.withRail && <Toc.Indicator />}
          {items.map((item, index) => (
            <Toc.Item item={item}>
              <Toc.Link href={`#${item.value}`}>
                {props.withRail && (
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
    let scrollRef: HTMLDivElement | null = null;

    return (
      <Toc items={items} scrollEl={() => scrollRef}>
        <Toc.Content>
          <div
            ref={(element) => (scrollRef = element)}
            aria-label="Scrollable document preview"
            class={contentClass}
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
        <Toc.Nav placement="left">
          <Toc.Title>On this page</Toc.Title>
          <Toc.List>
            <Toc.Indicator />
            {items.map((item) => (
              <Toc.Item item={item}>
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
    let scrollRef: HTMLDivElement | null = null;
    const toc = useToc({
      items,
      defaultActiveIds: ['toc-story-installation'],
      scrollEl: () => scrollRef,
    });

    return (
      <Toc.RootProvider value={toc}>
        <Toc.Content>
          <div
            ref={(element) => (scrollRef = element)}
            aria-label="Scrollable document preview"
            class={contentClass}
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
        <Toc.Nav>
          <Toc.Title>On this page</Toc.Title>
          <Toc.List>
            <Toc.Indicator />
            {items.map((item) => (
              <Toc.Item item={item}>
                <Toc.Link href={`#${item.value}`}>{item.label}</Toc.Link>
              </Toc.Item>
            ))}
          </Toc.List>
        </Toc.Nav>
      </Toc.RootProvider>
    );
  },
};