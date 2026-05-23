import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Slider.module.css';

type SliderValueType = number | readonly number[];
type SliderChildrenParts = {
  content: React.ReactNode[];
  thumbs: React.ReactNode[];
};

type SliderClassNames = {
  control?: SliderPrimitive.Control.Props['className'];
  track?: SliderPrimitive.Track.Props['className'];
  indicator?: SliderPrimitive.Indicator.Props['className'];
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

function splitSliderChildren(children: React.ReactNode): SliderChildrenParts {
  const parts: SliderChildrenParts = { content: [], thumbs: [] };

  const collectChildren = (nodes: React.ReactNode) => {
    React.Children.forEach(nodes, (child) => {
      if (!React.isValidElement(child)) {
        parts.content.push(child);
        return;
      }

      if (isReactFragment(child)) {
        collectChildren(child.props.children);
        return;
      }

      if (isSliderThumb(child)) {
        parts.thumbs.push(child);
        return;
      }

      parts.content.push(child);
    });
  };

  collectChildren(children);

  return parts;
}

const isReactFragment = (
  child: React.ReactNode,
): child is React.ReactElement<{ children?: React.ReactNode }> =>
  React.isValidElement(child) && child.type === React.Fragment;

const isSliderThumb = (child: React.ReactNode): child is React.ReactElement<SliderThumbProps> =>
  React.isValidElement(child) && child.type === SliderThumb;

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

type SliderProps<Value extends SliderValueType = SliderValueType> =
  SliderPrimitive.Root.Props<Value> & {
    classNames?: SliderClassNames;
  };
type SliderLabelProps = SliderPrimitive.Label.Props;
type SliderValueProps = SliderPrimitive.Value.Props;
type SliderThumbProps = SliderPrimitive.Thumb.Props;

export { Slider, SliderLabel, SliderValue, SliderThumb };

export type { SliderProps, SliderClassNames, SliderLabelProps, SliderValueProps, SliderThumbProps };