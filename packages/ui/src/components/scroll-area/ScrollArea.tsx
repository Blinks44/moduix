import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import { forwardRef, type ComponentRef, type ForwardedRef, type ReactNode } from 'react';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './ScrollArea.module.css';

type FadeDirection = boolean | 'vertical' | 'horizontal' | 'both';
type Scrollbars = 'vertical' | 'horizontal' | 'both' | false;

const ScrollAreaRoot = forwardRef(function ScrollAreaRoot(
  { className, ...props }: ScrollAreaPrimitive.Root.Props,
  ref: ForwardedRef<ComponentRef<typeof ScrollAreaPrimitive.Root>>,
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

const ScrollAreaViewport = forwardRef(function ScrollAreaViewport(
  { className, ...props }: ScrollAreaPrimitive.Viewport.Props,
  ref: ForwardedRef<ComponentRef<typeof ScrollAreaPrimitive.Viewport>>,
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

const ScrollAreaContent = forwardRef(function ScrollAreaContent(
  { className, ...props }: ScrollAreaPrimitive.Content.Props,
  ref: ForwardedRef<ComponentRef<typeof ScrollAreaPrimitive.Content>>,
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

const ScrollAreaScrollbar = forwardRef(function ScrollAreaScrollbar(
  { className, ...props }: ScrollAreaPrimitive.Scrollbar.Props,
  ref: ForwardedRef<ComponentRef<typeof ScrollAreaPrimitive.Scrollbar>>,
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

const ScrollAreaThumb = forwardRef(function ScrollAreaThumb(
  { className, ...props }: ScrollAreaPrimitive.Thumb.Props,
  ref: ForwardedRef<ComponentRef<typeof ScrollAreaPrimitive.Thumb>>,
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

const ScrollAreaCorner = forwardRef(function ScrollAreaCorner(
  { className, ...props }: ScrollAreaPrimitive.Corner.Props,
  ref: ForwardedRef<ComponentRef<typeof ScrollAreaPrimitive.Corner>>,
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

const ScrollArea = forwardRef(function ScrollArea(
  {
    className,
    children,
    fade = false,
    scrollbars = 'vertical',
    ...props
  }: ScrollAreaPrimitive.Root.Props & {
    children?: ReactNode;
    fade?: FadeDirection;
    scrollbars?: Scrollbars;
  },
  ref: ForwardedRef<ComponentRef<typeof ScrollAreaPrimitive.Root>>,
) {
  const fadeDirection = fade === true ? 'vertical' : fade || undefined;
  const hasVerticalScrollbar = scrollbars === 'vertical' || scrollbars === 'both';
  const hasHorizontalScrollbar = scrollbars === 'horizontal' || scrollbars === 'both';

  return (
    <ScrollAreaRoot ref={ref} className={className} {...props} data-fade={fadeDirection}>
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
});

export {
  ScrollArea,
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
};