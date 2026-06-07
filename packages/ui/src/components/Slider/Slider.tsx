import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import {
  Children,
  Fragment,
  forwardRef,
  isValidElement,
  type ComponentRef,
  type ForwardedRef,
  type ReactElement,
  type ReactNode,
  type RefAttributes,
} from 'react';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './Slider.module.css';

type SliderValue = number | readonly number[];
type SliderChildrenParts = {
  content: ReactNode[];
  thumbs: ReactNode[];
};

type SliderRootComponent = <Value extends SliderValue = SliderValue>(
  props: SliderPrimitive.Root.Props<Value> &
    RefAttributes<ComponentRef<typeof SliderPrimitive.Root>>,
) => ReactElement;

const Slider = forwardRef(function Slider<Value extends SliderValue>(
  { children, ...props }: SliderPrimitive.Root.Props<Value>,
  ref: ForwardedRef<ComponentRef<typeof SliderPrimitive.Root>>,
) {
  const { content, thumbs } = splitSliderChildren(children);

  return (
    <SliderRoot ref={ref} {...props}>
      {content}
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          {thumbs}
        </SliderTrack>
      </SliderControl>
    </SliderRoot>
  );
}) as SliderRootComponent;

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

const SliderRoot = forwardRef(function SliderRoot<Value extends SliderValue>(
  { className, ...props }: SliderPrimitive.Root.Props<Value>,
  ref: ForwardedRef<ComponentRef<typeof SliderPrimitive.Root>>,
) {
  return (
    <SliderPrimitive.Root
      ref={ref}
      data-slot="slider-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
}) as SliderRootComponent;

const SliderLabel = forwardRef<
  ComponentRef<typeof SliderPrimitive.Label>,
  SliderPrimitive.Label.Props
>(function SliderLabel({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Label
      ref={ref}
      data-slot="slider-label"
      className={mergeClassName(className, styles.label)}
      {...props}
    />
  );
});

const SliderValue = forwardRef<
  ComponentRef<typeof SliderPrimitive.Value>,
  SliderPrimitive.Value.Props
>(function SliderValue({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Value
      ref={ref}
      data-slot="slider-value"
      className={mergeClassName(className, styles.value)}
      {...props}
    />
  );
});

const SliderControl = forwardRef<
  ComponentRef<typeof SliderPrimitive.Control>,
  SliderPrimitive.Control.Props
>(function SliderControl({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Control
      ref={ref}
      data-slot="slider-control"
      className={mergeClassName(className, styles.control)}
      {...props}
    />
  );
});

const SliderTrack = forwardRef<
  ComponentRef<typeof SliderPrimitive.Track>,
  SliderPrimitive.Track.Props
>(function SliderTrack({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Track
      ref={ref}
      data-slot="slider-track"
      className={mergeClassName(className, styles.track)}
      {...props}
    />
  );
});

const SliderIndicator = forwardRef<
  ComponentRef<typeof SliderPrimitive.Indicator>,
  SliderPrimitive.Indicator.Props
>(function SliderIndicator({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Indicator
      ref={ref}
      data-slot="slider-indicator"
      className={mergeClassName(className, styles.indicator)}
      {...props}
    />
  );
});

const SliderThumb = forwardRef<
  ComponentRef<typeof SliderPrimitive.Thumb>,
  SliderPrimitive.Thumb.Props
>(function SliderThumb({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Thumb
      ref={ref}
      data-slot="slider-thumb"
      className={mergeClassName(className, styles.thumb)}
      {...props}
    />
  );
});

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