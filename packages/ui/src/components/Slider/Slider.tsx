import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Slider.module.css';

type SliderValueType = number | readonly number[];
const SLIDER_THUMB_SLOT = 'moduix.slider.thumb';

type SliderClassNames = {
  control?: SliderPrimitive.Control.Props['className'];
  track?: SliderPrimitive.Track.Props['className'];
  indicator?: SliderPrimitive.Indicator.Props['className'];
};

type SliderThumbComponent = typeof SliderThumb & {
  __moduixSlot?: typeof SLIDER_THUMB_SLOT;
  displayName?: string;
};

function Slider<Value extends SliderValueType>({
  className,
  classNames,
  children,
  ...props
}: SliderProps<Value>) {
  const { content, thumbs } = splitSliderChildren(children);

  return (
    <SliderPrimitive.Root
      data-slot="slider-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    >
      {content}
      <SliderPrimitive.Control
        data-slot="slider-control"
        className={mergeClassName(classNames?.control, styles.control)}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={mergeClassName(classNames?.track, styles.track)}
        >
          <SliderPrimitive.Indicator
            data-slot="slider-indicator"
            className={mergeClassName(classNames?.indicator, styles.indicator)}
          />
          {thumbs}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

function splitSliderChildren(children: React.ReactNode) {
  const content: React.ReactNode[] = [];
  const thumbs: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      content.push(child);
      return;
    }

    if (child.type === React.Fragment) {
      const fragment = child as React.ReactElement<{ children?: React.ReactNode }>;
      const nested = splitSliderChildren(fragment.props.children);
      content.push(...nested.content);
      thumbs.push(...nested.thumbs);
      return;
    }

    if (isSliderThumbElement(child)) {
      thumbs.push(child);
      return;
    }

    content.push(child);
  });

  return { content, thumbs };
}

function isSliderThumbElement(child: React.ReactElement) {
  const type = child.type as SliderThumbComponent;

  return (
    type === SliderThumb ||
    type.__moduixSlot === SLIDER_THUMB_SLOT ||
    type.displayName === 'SliderThumb' ||
    type.name === 'SliderThumb'
  );
}

function SliderLabel({ className, ...props }: SliderPrimitive.Label.Props) {
  return (
    <SliderPrimitive.Label
      data-slot="slider-label"
      className={mergeClassName(className, styles.label)}
      {...props}
    />
  );
}

function SliderValue({ className, ...props }: SliderPrimitive.Value.Props) {
  return (
    <SliderPrimitive.Value
      data-slot="slider-value"
      className={mergeClassName(className, styles.value)}
      {...props}
    />
  );
}

function SliderThumb({ className, ...props }: SliderPrimitive.Thumb.Props) {
  return (
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      className={mergeClassName(className, styles.thumb)}
      {...props}
    />
  );
}

(SliderThumb as SliderThumbComponent).__moduixSlot = SLIDER_THUMB_SLOT;
SliderThumb.displayName = 'SliderThumb';

type SliderProps<Value extends SliderValueType = SliderValueType> =
  SliderPrimitive.Root.Props<Value> & {
    classNames?: SliderClassNames;
  };
type SliderLabelProps = SliderPrimitive.Label.Props;
type SliderValueProps = SliderPrimitive.Value.Props;
type SliderThumbProps = SliderPrimitive.Thumb.Props;

export { Slider, SliderLabel, SliderValue, SliderThumb };

export type { SliderProps, SliderClassNames, SliderLabelProps, SliderValueProps, SliderThumbProps };