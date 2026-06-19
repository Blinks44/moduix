import type { Meta, StoryObj } from '@storybook/react-vite';
import { insideScrollSections } from '@/data/insideScrollSections';
import { Button } from '../button';
import { ScrollArea, useScrollArea } from './ScrollArea';
import styles from './ScrollArea.stories.module.css';

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj<typeof meta>;

function VerticalScrollArea() {
  return (
    <ScrollArea className={styles.root}>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <div className={styles.textContent}>
            {insideScrollSections.map((item) => (
              <section key={item.title}>
                <h3>{item.title}</h3>
                <p className={styles.paragraph}>{item.body}</p>
              </section>
            ))}
          </div>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  );
}

function RootProviderStory() {
  const scrollArea = useScrollArea();

  return (
    <div className={styles.providerStack}>
      <div className={styles.actions}>
        <Button
          size="sm"
          variant="outline"
          onClick={() => scrollArea.scrollToEdge({ edge: 'top' })}
        >
          Top
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => scrollArea.scrollToEdge({ edge: 'bottom' })}
        >
          Bottom
        </Button>
      </div>
      <ScrollArea.RootProvider value={scrollArea} className={styles.root}>
        <ScrollArea.Viewport>
          <ScrollArea.Content>
            <div className={styles.textContent}>
              {insideScrollSections.map((item) => (
                <section key={item.title}>
                  <h3>{item.title}</h3>
                  <p className={styles.paragraph}>{item.body}</p>
                </section>
              ))}
            </div>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.RootProvider>
    </div>
  );
}

export const Basic: Story = {
  render: () => <VerticalScrollArea />,
};

export const Fade: Story = {
  render: () => (
    <ScrollArea className={styles.root} fade>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <div className={styles.textContent}>
            {insideScrollSections.map((item) => (
              <section key={item.title}>
                <h3>{item.title}</h3>
                <p className={styles.paragraph}>{item.body}</p>
              </section>
            ))}
          </div>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => {
    return (
      <ScrollArea className={styles.horizontalRoot}>
        <ScrollArea.Viewport>
          <ScrollArea.Content>
            <p className={styles.wideParagraph}>{insideScrollSections[0]?.body}</p>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="horizontal">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea>
    );
  },
};

export const BothDirections: Story = {
  name: 'Both Directions',
  render: () => {
    return (
      <ScrollArea className={styles.root}>
        <ScrollArea.Viewport>
          <ScrollArea.Content>
            <div className={styles.gridContent}>
              {Array.from({ length: 96 }, (_, index) => (
                <div key={index} className={styles.cell}>
                  {index + 1}
                </div>
              ))}
            </div>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar orientation="horizontal">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea>
    );
  },
};

export const Nested: Story = {
  render: () => {
    return (
      <ScrollArea className={styles.root}>
        <ScrollArea.Viewport>
          <ScrollArea.Content>
            <div className={styles.textContent}>
              <section>
                <h3>Outer release notes</h3>
                <p className={styles.paragraph}>{insideScrollSections[0]?.body}</p>
              </section>
              <VerticalScrollArea />
              <section>
                <h3>Follow-up items</h3>
                <p className={styles.paragraph}>{insideScrollSections[1]?.body}</p>
              </section>
            </div>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea>
    );
  },
};

export const RootProvider: Story = {
  name: 'Root Provider',
  render: () => <RootProviderStory />,
};