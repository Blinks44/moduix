import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Button } from '@/components/button';
import {
  Marquee,
  MarqueeContent,
  MarqueeEdge,
  MarqueeItem,
  MarqueeRootProvider,
  MarqueeViewport,
  useMarquee,
} from '@/components/marquee/Marquee';
import { LocaleProvider } from '@/locale';
import styles from './Marquee.stories.module.css';

const meta = {
  title: 'Components/Marquee',
  component: Marquee,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Marquee>;

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
        <MarqueeItem key={item.name} className={styles.item}>
          <span className={styles.mark}>{item.mark}</span>
          <span>{item.name}</span>
        </MarqueeItem>
      ))}
    </>
  );
}

function BasicMarquee(props: ComponentProps<typeof Marquee>) {
  return (
    <Marquee aria-label="Partner logos" className={styles.root} {...props}>
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItems />
        </MarqueeContent>
      </MarqueeViewport>
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
      <MarqueeRootProvider value={marquee} className={styles.root}>
        <MarqueeViewport>
          <MarqueeContent>
            <MarqueeItems />
          </MarqueeContent>
        </MarqueeViewport>
      </MarqueeRootProvider>
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

export const RTL: Story = {
  name: 'RTL',
  render: () => (
    <LocaleProvider locale="ar">
      <Marquee aria-label="Partner logos" className={styles.root}>
        <MarqueeEdge side="start" />
        <MarqueeViewport>
          <MarqueeContent>
            <MarqueeItems />
          </MarqueeContent>
        </MarqueeViewport>
        <MarqueeEdge side="end" />
      </Marquee>
    </LocaleProvider>
  ),
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
      <MarqueeEdge side="start" />
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItems />
        </MarqueeContent>
      </MarqueeViewport>
      <MarqueeEdge side="end" />
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
      <MarqueeEdge side="start" />
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItems />
        </MarqueeContent>
      </MarqueeViewport>
      <MarqueeEdge side="end" />
    </Marquee>
  ),
};