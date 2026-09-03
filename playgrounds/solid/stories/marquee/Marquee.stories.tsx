import { createSignal } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import { Marquee, useMarquee } from '@/components/marquee/Marquee';
import { LocaleProvider } from '@/locale';
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
        <Marquee.Item class={styles.item}>
          <span class={styles.mark}>{item.mark}</span>
          <span>{item.name}</span>
        </Marquee.Item>
      ))}
    </>
  );
}

function BasicMarquee(props: ComponentProps<typeof Marquee.Root>) {
  return (
    <Marquee aria-label="Partner logos" class={styles.root} {...props}>
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
    <div class={styles.providerStack}>
      <div class={styles.actions}>
        <Button size="sm" variant="outline" onClick={() => marquee().pause()}>
          Pause
        </Button>
        <Button size="sm" variant="outline" onClick={() => marquee().resume()}>
          Resume
        </Button>
      </div>
      <Marquee.RootProvider value={marquee} class={styles.root}>
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
  const [loopCount, setLoopCount] = createSignal(0);
  const [completeCount, setCompleteCount] = createSignal(0);

  return (
    <div class={styles.providerStack}>
      <BasicMarquee
        loopCount={3}
        onLoopComplete={() => setLoopCount((value) => value + 1)}
        onComplete={() => setCompleteCount((value) => value + 1)}
      />
      <div class={styles.status}>
        <span>Loops: {loopCount()}</span>
        <span>Completed: {completeCount()}</span>
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
      <Marquee aria-label="Partner logos" class={styles.root}>
        <Marquee.Edge side="start" />
        <Marquee.Viewport>
          <Marquee.Content>
            <MarqueeItems />
          </Marquee.Content>
        </Marquee.Viewport>
        <Marquee.Edge side="end" />
      </Marquee>
    </LocaleProvider>
  ),
};

export const Vertical: Story = {
  render: () => <BasicMarquee side="bottom" class={styles.verticalRoot} />,
};

export const Speed: Story = {
  render: () => (
    <div class={styles.providerStack}>
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
    <Marquee aria-label="Partner logos" class={styles.root}>
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
    <Marquee aria-label="Partner logos" autoFill pauseOnInteraction class={styles.customRoot}>
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