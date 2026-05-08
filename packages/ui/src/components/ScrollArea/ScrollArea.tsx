import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './ScrollArea.module.css';

type ScrollAreaFade = boolean | 'vertical' | 'horizontal';
type ScrollAreaScrollbars = 'vertical' | 'horizontal' | 'both' | false;

type ScrollAreaClassNames = {
  viewport?: ScrollAreaPrimitive.Viewport.Props['className'];
  content?: ScrollAreaPrimitive.Content.Props['className'];
  scrollbar?: ScrollAreaPrimitive.Scrollbar.Props['className'];
  verticalScrollbar?: ScrollAreaPrimitive.Scrollbar.Props['className'];
  horizontalScrollbar?: ScrollAreaPrimitive.Scrollbar.Props['className'];
  thumb?: ScrollAreaPrimitive.Thumb.Props['className'];
  verticalThumb?: ScrollAreaPrimitive.Thumb.Props['className'];
  horizontalThumb?: ScrollAreaPrimitive.Thumb.Props['className'];
  corner?: ScrollAreaPrimitive.Corner.Props['className'];
};

type ScrollAreaSlotProps = {
  viewport?: Omit<ScrollAreaPrimitive.Viewport.Props, 'className' | 'children'>;
  content?: Omit<ScrollAreaPrimitive.Content.Props, 'className' | 'children'>;
  scrollbar?: Omit<
    ScrollAreaPrimitive.Scrollbar.Props,
    'className' | 'children' | 'orientation' | 'keepMounted'
  >;
  verticalScrollbar?: Omit<
    ScrollAreaPrimitive.Scrollbar.Props,
    'className' | 'children' | 'orientation' | 'keepMounted'
  >;
  horizontalScrollbar?: Omit<
    ScrollAreaPrimitive.Scrollbar.Props,
    'className' | 'children' | 'orientation' | 'keepMounted'
  >;
  thumb?: Omit<ScrollAreaPrimitive.Thumb.Props, 'className'>;
  verticalThumb?: Omit<ScrollAreaPrimitive.Thumb.Props, 'className'>;
  horizontalThumb?: Omit<ScrollAreaPrimitive.Thumb.Props, 'className'>;
  corner?: Omit<ScrollAreaPrimitive.Corner.Props, 'className'>;
};

type ScrollAreaProps = Omit<ScrollAreaPrimitive.Root.Props, 'children'> & {
  children?: React.ReactNode;
  fade?: ScrollAreaFade;
  scrollbars?: ScrollAreaScrollbars;
  scrollbarKeepMounted?: boolean;
  classNames?: ScrollAreaClassNames;
  slotProps?: ScrollAreaSlotProps;
};

function ScrollArea({
  className,
  classNames,
  children,
  fade = false,
  scrollbars = 'vertical',
  scrollbarKeepMounted = false,
  slotProps,
  ...props
}: ScrollAreaProps) {
  const fadeDirection = fade === true ? 'vertical' : fade || undefined;
  const hasVerticalScrollbar = scrollbars === 'vertical' || scrollbars === 'both';
  const hasHorizontalScrollbar = scrollbars === 'horizontal' || scrollbars === 'both';
  const scrollbarProps = slotProps?.scrollbar;

  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area-root"
      data-fade={fadeDirection}
      className={mergeClassName(className, styles.root)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        {...slotProps?.viewport}
        data-slot="scroll-area-viewport"
        className={mergeClassName(classNames?.viewport, styles.viewport)}
      >
        <ScrollAreaPrimitive.Content
          {...slotProps?.content}
          data-slot="scroll-area-content"
          className={mergeClassName(classNames?.content, styles.content)}
        >
          {children}
        </ScrollAreaPrimitive.Content>
      </ScrollAreaPrimitive.Viewport>
      {hasVerticalScrollbar ? (
        <ScrollAreaPrimitive.Scrollbar
          {...scrollbarProps}
          {...slotProps?.verticalScrollbar}
          data-slot="scroll-area-scrollbar"
          orientation="vertical"
          keepMounted={scrollbarKeepMounted}
          className={mergeClassName(
            classNames?.verticalScrollbar ?? classNames?.scrollbar,
            styles.scrollbar,
          )}
        >
          <ScrollAreaPrimitive.Thumb
            {...slotProps?.thumb}
            {...slotProps?.verticalThumb}
            data-slot="scroll-area-thumb"
            className={mergeClassName(classNames?.verticalThumb ?? classNames?.thumb, styles.thumb)}
          />
        </ScrollAreaPrimitive.Scrollbar>
      ) : null}
      {hasHorizontalScrollbar ? (
        <ScrollAreaPrimitive.Scrollbar
          {...scrollbarProps}
          {...slotProps?.horizontalScrollbar}
          data-slot="scroll-area-scrollbar"
          orientation="horizontal"
          keepMounted={scrollbarKeepMounted}
          className={mergeClassName(
            classNames?.horizontalScrollbar ?? classNames?.scrollbar,
            styles.scrollbar,
          )}
        >
          <ScrollAreaPrimitive.Thumb
            {...slotProps?.thumb}
            {...slotProps?.horizontalThumb}
            data-slot="scroll-area-thumb"
            className={mergeClassName(
              classNames?.horizontalThumb ?? classNames?.thumb,
              styles.thumb,
            )}
          />
        </ScrollAreaPrimitive.Scrollbar>
      ) : null}
      {scrollbars === 'both' ? (
        <ScrollAreaPrimitive.Corner
          {...slotProps?.corner}
          data-slot="scroll-area-corner"
          className={mergeClassName(classNames?.corner, styles.corner)}
        />
      ) : null}
    </ScrollAreaPrimitive.Root>
  );
}

export { ScrollArea };

export type {
  ScrollAreaProps,
  ScrollAreaClassNames,
  ScrollAreaSlotProps,
  ScrollAreaFade,
  ScrollAreaScrollbars,
};