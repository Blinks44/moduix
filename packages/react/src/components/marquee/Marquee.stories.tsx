import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Button } from '../button';
import { Marquee, useMarquee } from './Marquee';
import styles from './Marquee.stories.module.css';

const meta = {
  title: 'Components/Marquee',
  component: Marquee.Root,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Marquee.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

const partners = [
  { name: 'Atlas', mark: 'AT' },
  { name: 'Beacon', mark: 'BC' },
  { name: 'Compass', mark: 'CP' },
  { name: 'Delta', mark: 'DL' },
  { name: 'Echo', mark: 'EC' },
  { name: 'Foundry', mark: 'FD' },
];

function MarqueeItems() {
  return (
    <>
      {partners.map((item) => (
        <Marquee.Item key={item.name} className={styles.item}>
          <span className={styles.mark}>{item.mark}</span>
          <span>{item.name}</span>
        </Marquee.Item>
      ))}
    </>
  );
}

function BasicMarquee(props: ComponentProps<typeof Marquee.Root>) {
  return (
    <Marquee aria-label="Partner logos" className={styles.root} {...props}>
      <Marquee.Viewport>
        <Marquee.Content>
          <MarqueeItems />
        </Marquee.Content>
      </Marquee.Viewport>
    </Marquee>
  );
}

function RootProviderStory() {
  const marquee = useMarquee({ translations: { root: 'Partner logos' } });

  return (
    <div className={styles.providerStack}>
      <div className={styles.actions}>
        <Button size="sm" variant="outline" onClick={() => marquee.pause()}>
          Pause
        </Button>
        <Button size="sm" variant="outline" onClick={() => marquee.resume()}>
          Resume
        </Button>
      </div>
      <Marquee.RootProvider value={marquee} className={styles.root}>
        <Marquee.Viewport>
          <Marquee.Content>
            <MarqueeItems />
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.RootProvider>
    </div>
  );
}

function FiniteLoopsStory() {
  const [loopCount, setLoopCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);

  return (
    <div className={styles.providerStack}>
      <BasicMarquee
        loopCount={3}
        onLoopComplete={() => setLoopCount((value) => value + 1)}
        onComplete={() => setCompleteCount((value) => value + 1)}
      />
      <div className={styles.status}>
        <span>Loops: {loopCount}</span>
        <span>Completed: {completeCount}</span>
      </div>
    </div>
  );
}

export const Basic: Story = {
  render: () => <BasicMarquee />,
};

export const AutoFill: Story = {
  name: 'Auto Fill',
  render: () => <BasicMarquee autoFill spacing="2rem" />,
};

export const PauseOnInteraction: Story = {
  name: 'Pause on Interaction',
  render: () => <BasicMarquee pauseOnInteraction />,
};

export const Reverse: Story = {
  render: () => <BasicMarquee reverse />,
};

export const Vertical: Story = {
  render: () => <BasicMarquee side="bottom" className={styles.verticalRoot} />,
};

export const Speed: Story = {
  render: () => (
    <div className={styles.providerStack}>
      <BasicMarquee speed={25} />
      <BasicMarquee speed={100} />
    </div>
  ),
};

export const FiniteLoops: Story = {
  name: 'Finite Loops',
  render: () => <FiniteLoopsStory />,
};

export const WithEdges: Story = {
  name: 'With Edges',
  render: () => (
    <Marquee aria-label="Partner logos" className={styles.root}>
      <Marquee.Edge side="start" />
      <Marquee.Viewport>
        <Marquee.Content>
          <MarqueeItems />
        </Marquee.Content>
      </Marquee.Viewport>
      <Marquee.Edge side="end" />
    </Marquee>
  ),
};

export const RootProvider: Story = {
  name: 'Root Provider',
  render: () => <RootProviderStory />,
};

export const CustomStyling: Story = {
  name: 'Custom Styling',
  render: () => (
    <Marquee aria-label="Partner logos" autoFill pauseOnInteraction className={styles.customRoot}>
      <Marquee.Edge side="start" />
      <Marquee.Viewport>
        <Marquee.Content>
          <MarqueeItems />
        </Marquee.Content>
      </Marquee.Viewport>
      <Marquee.Edge side="end" />
    </Marquee>
  ),
};