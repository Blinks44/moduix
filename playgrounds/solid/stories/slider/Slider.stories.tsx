import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import { Slider, useSlider, useSliderContext } from '@/components/slider/Slider';
import styles from './Slider.stories.module.css';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Slider defaultValue={[40]}>
      <div class={styles.header}>
        <Slider.Label>Volume</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal([24]);

    return (
      <Slider value={value()} onValueChange={(details) => setValue(details.value)}>
        <div class={styles.header}>
          <Slider.Label>Brightness</Slider.Label>
          <Slider.ValueText />
        </div>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} aria-label="Brightness" />
        </Slider.Control>
      </Slider>
    );
  },
};

export const Range: Story = {
  render: () => {
    const [value, setValue] = createSignal([20, 70]);

    return (
      <Slider
        value={value()}
        min={0}
        max={100}
        onValueChange={(details) => setValue(details.value)}
      >
        <Slider.Label>Price range</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} aria-label="Minimum price" />
          <Slider.Thumb index={1} aria-label="Maximum price" />
        </Slider.Control>
        <Slider.ValueText />
      </Slider>
    );
  },
};

export const StepsAndConstraints: Story = {
  render: () => (
    <Slider
      defaultValue={[250, 750]}
      min={0}
      max={1000}
      step={50}
      minStepsBetweenThumbs={2}
      thumbCollisionBehavior="push"
      getAriaValueText={(details) => `$${details.value}`}
    >
      <div class={styles.header}>
        <Slider.Label>Budget</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Minimum budget" />
        <Slider.Thumb index={1} aria-label="Maximum budget" />
      </Slider.Control>
    </Slider>
  ),
};

export const Marks: Story = {
  render: () => (
    <Slider defaultValue={[50]}>
      <div class={styles.header}>
        <Slider.Label>Progress</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Progress" />
      </Slider.Control>
      <Slider.MarkerGroup>
        {[0, 25, 50, 75, 100].map((value) => (
          <Slider.Marker value={value}>{value}</Slider.Marker>
        ))}
      </Slider.MarkerGroup>
    </Slider>
  ),
};

export const DraggingIndicator: Story = {
  render: () => (
    <Slider defaultValue={[40]}>
      <Slider.Label>Gain</Slider.Label>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Gain">
          <Slider.DraggingIndicator />
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div class={styles.verticalContainer}>
      <Slider orientation="vertical" defaultValue={[60]} class={styles.verticalSlider}>
        <Slider.Label>Output</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} aria-label="Output" />
        </Slider.Control>
      </Slider>
    </div>
  ),
};

export const VerticalWithMarks: Story = {
  render: () => (
    <Slider orientation="vertical" defaultValue={[50]} class={styles.verticalSlider}>
      <Slider.Label>Output</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
      <Slider.MarkerGroup>
        {[0, 25, 50, 75, 100].map((value) => (
          <Slider.Marker value={value}>{value}</Slider.Marker>
        ))}
      </Slider.MarkerGroup>
    </Slider>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Slider defaultValue={[32]} disabled>
      <div class={styles.header}>
        <Slider.Label>Notifications</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Notifications" />
      </Slider.Control>
    </Slider>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Slider defaultValue={[32]} invalid>
      <div class={styles.header}>
        <Slider.Label>Invalid volume</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
      <Slider.MarkerGroup>
        {[0, 50, 100].map((value) => (
          <Slider.Marker value={value}>{value}</Slider.Marker>
        ))}
      </Slider.MarkerGroup>
    </Slider>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <Slider defaultValue={[32]} readOnly>
      <div class={styles.header}>
        <Slider.Label>Read-only volume</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider>
  ),
};

export const Context: Story = {
  render: () => (
    <Slider defaultValue={[40]}>
      <SliderContextStatus />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Context value" />
      </Slider.Control>
    </Slider>
  ),
};

function SliderContextStatus() {
  const slider = useSliderContext();

  return (
    <div class={styles.header}>
      <Slider.Label>Dragging: {String(slider().dragging)}</Slider.Label>
      <span class={styles.value}>{slider().value.join(', ')}</span>
    </div>
  );
}

export const RootProvider: Story = {
  render: () => {
    const slider = useSlider({ defaultValue: [40] });

    return (
      <div class={styles.stack}>
        <Button onClick={() => slider().focus()}>Focus</Button>
        <Slider.RootProvider value={slider}>
          <Slider.Label>Volume</Slider.Label>
          <Slider.ValueText />
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb index={0} aria-label="Volume" />
          </Slider.Control>
        </Slider.RootProvider>
      </div>
    );
  },
};

export const AsChild: Story = {
  render: () => (
    <Slider asChild={(props) => <section {...props()} />} defaultValue={[40]}>
      <div>
        <div class={styles.header}>
          <Slider.Label>Volume</Slider.Label>
          <Slider.ValueText />
        </div>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb asChild={(props) => <span {...props()} />} index={0} aria-label="Volume" />
        </Slider.Control>
      </div>
    </Slider>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Slider defaultValue={[56]} class={styles.customSlider}>
      <Slider.Label>Temperature</Slider.Label>
      <Slider.ValueText />
      <Slider.Control class={styles.customControl}>
        <Slider.Track class={styles.customTrack}>
          <Slider.Range class={styles.customRange} />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Temperature" />
      </Slider.Control>
    </Slider>
  ),
};