import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './ScrollArea.module.css';

type FadeDirection = boolean | 'vertical' | 'horizontal' | 'both';
type Scrollbars = 'vertical' | 'horizontal' | 'both' | false;

const ScrollAreaRoot = React.forwardRef(function ScrollAreaRoot(
  { className, ...props }: ScrollAreaPrimitive.Root.Props,
  ref: React.ForwardedRef<React.ComponentRef<typeof ScrollAreaPrimitive.Root>>,
) {
  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      data-slot="scroll-area-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
});

const ScrollAreaViewport = React.forwardRef(function ScrollAreaViewport(
  { className, ...props }: ScrollAreaPrimitive.Viewport.Props,
  ref: React.ForwardedRef<React.ComponentRef<typeof ScrollAreaPrimitive.Viewport>>,
) {
  return (
    <ScrollAreaPrimitive.Viewport
      ref={ref}
      data-slot="scroll-area-viewport"
      className={mergeClassName(className, styles.viewport)}
      {...props}
    />
  );
});

const ScrollAreaContent = React.forwardRef(function ScrollAreaContent(
  { className, ...props }: ScrollAreaPrimitive.Content.Props,
  ref: React.ForwardedRef<React.ComponentRef<typeof ScrollAreaPrimitive.Content>>,
) {
  return (
    <ScrollAreaPrimitive.Content
      ref={ref}
      data-slot="scroll-area-content"
      className={mergeClassName(className, styles.content)}
      {...props}
    />
  );
});

const ScrollAreaScrollbar = React.forwardRef(function ScrollAreaScrollbar(
  { className, ...props }: ScrollAreaPrimitive.Scrollbar.Props,
  ref: React.ForwardedRef<React.ComponentRef<typeof ScrollAreaPrimitive.Scrollbar>>,
) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      ref={ref}
      data-slot="scroll-area-scrollbar"
      className={mergeClassName(className, styles.scrollbar)}
      {...props}
    />
  );
});

const ScrollAreaThumb = React.forwardRef(function ScrollAreaThumb(
  { className, ...props }: ScrollAreaPrimitive.Thumb.Props,
  ref: React.ForwardedRef<React.ComponentRef<typeof ScrollAreaPrimitive.Thumb>>,
) {
  return (
    <ScrollAreaPrimitive.Thumb
      ref={ref}
      data-slot="scroll-area-thumb"
      className={mergeClassName(className, styles.thumb)}
      {...props}
    />
  );
});

const ScrollAreaCorner = React.forwardRef(function ScrollAreaCorner(
  { className, ...props }: ScrollAreaPrimitive.Corner.Props,
  ref: React.ForwardedRef<React.ComponentRef<typeof ScrollAreaPrimitive.Corner>>,
) {
  return (
    <ScrollAreaPrimitive.Corner
      ref={ref}
      data-slot="scroll-area-corner"
      className={mergeClassName(className, styles.corner)}
      {...props}
    />
  );
});

function ScrollArea({
  className,
  children,
  fade = false,
  scrollbars = 'vertical',
  ...props
}: ScrollAreaPrimitive.Root.Props & {
  children?: React.ReactNode;
  fade?: FadeDirection;
  scrollbars?: Scrollbars;
}) {
  const fadeDirection = fade === true ? 'vertical' : fade || undefined;
  const hasVerticalScrollbar = scrollbars === 'vertical' || scrollbars === 'both';
  const hasHorizontalScrollbar = scrollbars === 'horizontal' || scrollbars === 'both';

  return (
    <ScrollAreaRoot className={className} data-fade={fadeDirection} {...props}>
      <ScrollAreaViewport>
        <ScrollAreaContent>{children}</ScrollAreaContent>
      </ScrollAreaViewport>
      {hasVerticalScrollbar ? (
        <ScrollAreaScrollbar>
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      ) : null}
      {hasHorizontalScrollbar ? (
        <ScrollAreaScrollbar orientation="horizontal">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      ) : null}
      {hasVerticalScrollbar && hasHorizontalScrollbar ? <ScrollAreaCorner /> : null}
    </ScrollAreaRoot>
  );
}

export {
  ScrollArea,
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
};