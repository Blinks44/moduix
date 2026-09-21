import { LocaleProvider } from '@ark-ui/react/locale';
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
import { cn } from '@/lib/moduix/cn';

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

const rootClass = 'w-[32rem] max-w-[calc(100vw-2rem)]';
const verticalRootClass = 'w-56 max-w-[calc(100vw-2rem)] h-72';
const customRootClass =
  'w-[34rem] max-w-[calc(100vw-2rem)] border border-border rounded-lg bg-card p-3';
const itemClass =
  'inline-flex min-w-max items-center gap-2 whitespace-nowrap rounded-md border border-border bg-muted px-3 py-2 text-sm leading-5 font-medium text-foreground select-none';
const markClass =
  'inline-grid size-7 place-items-center rounded-sm bg-primary text-xs leading-4 text-primary-foreground';
const providerStackClass = 'grid gap-3';
const actionsClass = 'flex justify-end gap-2';
const statusClass = 'flex gap-3 text-sm leading-5 text-muted-foreground';

function MarqueeItems({ custom = false }: { custom?: boolean }) {
  const partners = [
    { name: 'Atlas', mark: 'AT' },
    { name: 'Beacon', mark: 'BC' },
    { name: 'Compass', mark: 'CP' },
    { name: 'Delta', mark: 'DL' },
    { name: 'Echo', mark: 'EC' },
    { name: 'Foundry', mark: 'FD' },
  ];

  return (
    <>
      {partners.map((item) => (
        <MarqueeItem
          key={item.name}
          className={cn(itemClass, custom && 'border-primary/30 bg-primary/10')}
        >
          <span className={markClass}>{item.mark}</span>
          <span>{item.name}</span>
        </MarqueeItem>
      ))}
    </>
  );
}

function BasicMarquee({ className, ...props }: ComponentProps<typeof Marquee>) {
  return (
    <Marquee aria-label="Partner logos" className={cn(rootClass, className)} {...props}>
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
    <div className={providerStackClass}>
      <div className={actionsClass}>
        <Button size="sm" variant="outline" onClick={() => marquee.pause()}>
          Pause
        </Button>
        <Button size="sm" variant="outline" onClick={() => marquee.resume()}>
          Resume
        </Button>
      </div>
      <MarqueeRootProvider value={marquee} className={rootClass}>
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
    <div className={providerStackClass}>
      <BasicMarquee
        loopCount={3}
        onLoopComplete={() => setLoopCount((value) => value + 1)}
        onComplete={() => setCompleteCount((value) => value + 1)}
      />
      <div className={statusClass}>
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
      <Marquee aria-label="Partner logos" className={rootClass}>
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
  render: () => <BasicMarquee side="bottom" className={verticalRootClass} />,
};

export const Speed: Story = {
  render: () => (
    <div className={providerStackClass}>
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
    <Marquee aria-label="Partner logos" className={rootClass}>
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
    <Marquee aria-label="Partner logos" autoFill pauseOnInteraction className={customRootClass}>
      <MarqueeEdge side="start" />
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItems custom />
        </MarqueeContent>
      </MarqueeViewport>
      <MarqueeEdge side="end" />
    </Marquee>
  ),
};
