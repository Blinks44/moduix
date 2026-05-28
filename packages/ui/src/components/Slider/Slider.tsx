import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import { Children, Fragment, isValidElement, type ReactElement, type ReactNode } from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Slider.module.css';

type SliderChildrenParts = {
  content: ReactNode[];
  thumbs: ReactNode[];
};

function Slider<Value extends number | readonly number[]>({
  children,
  ...props
}: SliderPrimitive.Root.Props<Value>) {
  const { content, thumbs } = splitSliderChildren(children);

  return (
    <SliderRoot {...props}>
      {content}
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          {thumbs}
        </SliderTrack>
      </SliderControl>
    </SliderRoot>
  );
}

function splitSliderChildren(children: ReactNode): SliderChildrenParts {
  const parts: SliderChildrenParts = { content: [], thumbs: [] };

  const collectChildren = (nodes: ReactNode) => {
    Children.forEach(nodes, (child) => {
      if (!isValidElement(child)) {
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

const isReactFragment = (child: ReactNode): child is ReactElement<{ children?: ReactNode }> =>
  isValidElement(child) && child.type === Fragment;

const isSliderThumb = (child: ReactNode): child is ReactElement<SliderPrimitive.Thumb.Props> =>
  isValidElement(child) && child.type === SliderThumb;

function SliderRoot<Value extends number | readonly number[]>({
  className,
  ...props
}: SliderPrimitive.Root.Props<Value>) {
  return (
    <SliderPrimitive.Root
      data-slot="slider-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
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

function SliderControl({ className, ...props }: SliderPrimitive.Control.Props) {
  return (
    <SliderPrimitive.Control
      data-slot="slider-control"
      className={mergeClassName(className, styles.control)}
      {...props}
    />
  );
}

function SliderTrack({ className, ...props }: SliderPrimitive.Track.Props) {
  return (
    <SliderPrimitive.Track
      data-slot="slider-track"
      className={mergeClassName(className, styles.track)}
      {...props}
    />
  );
}

function SliderIndicator({ className, ...props }: SliderPrimitive.Indicator.Props) {
  return (
    <SliderPrimitive.Indicator
      data-slot="slider-indicator"
      className={mergeClassName(className, styles.indicator)}
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

export {
  Slider,
  SliderRoot,
  SliderLabel,
  SliderValue,
  SliderControl,
  SliderTrack,
  SliderIndicator,
  SliderThumb,
};