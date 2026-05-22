import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import { clsx, type ClassValue } from 'clsx';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './ScrollArea.module.css';

type ScrollAreaFade = boolean | 'vertical' | 'horizontal' | 'both';
type ScrollAreaScrollbars = 'vertical' | 'horizontal' | 'both' | false;
type ScrollAreaContentMinWidth = 'full' | 'fit-content';
type ScrollAreaSlotClassName = ClassValue | ((state: any) => ClassValue);

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
  contentMinWidth?: ScrollAreaContentMinWidth;
  scrollbarKeepMounted?: boolean;
  classNames?: ScrollAreaClassNames;
  slotProps?: ScrollAreaSlotProps;
};

function mergeSlotClassName(
  baseClassName: ClassValue,
  ...classNames: Array<ScrollAreaSlotClassName | undefined>
) {
  if (classNames.some((className) => typeof className === 'function')) {
    return (state: any) =>
      clsx(
        baseClassName,
        classNames.map((className) =>
          typeof className === 'function' ? className(state) : className,
        ),
      );
  }

  return clsx(baseClassName, classNames);
}

function ScrollArea({
  className,
  classNames,
  children,
  fade = false,
  scrollbars = 'vertical',
  contentMinWidth = 'full',
  scrollbarKeepMounted = false,
  slotProps,
  ...props
}: ScrollAreaProps) {
  const slotClassNames = classNames ?? {};
  const slotPropsByName = slotProps ?? {};
  const fadeDirection = fade === true ? 'vertical' : fade || undefined;
  const hasVerticalScrollbar = scrollbars === 'vertical' || scrollbars === 'both';
  const hasHorizontalScrollbar = scrollbars === 'horizontal' || scrollbars === 'both';
  const scrollbarProps = slotPropsByName.scrollbar;
  const thumbProps = slotPropsByName.thumb;
  const contentStyle = {
    ...slotPropsByName.content?.style,
    minWidth: contentMinWidth === 'fit-content' ? 'fit-content' : '100%',
  };

  const renderScrollbar = (orientation: 'vertical' | 'horizontal') => {
    const isVertical = orientation === 'vertical';
    const axisScrollbarProps = isVertical
      ? slotPropsByName.verticalScrollbar
      : slotPropsByName.horizontalScrollbar;
    const axisThumbProps = isVertical
      ? slotPropsByName.verticalThumb
      : slotPropsByName.horizontalThumb;
    const axisScrollbarClassName = isVertical
      ? slotClassNames.verticalScrollbar
      : slotClassNames.horizontalScrollbar;
    const axisThumbClassName = isVertical
      ? slotClassNames.verticalThumb
      : slotClassNames.horizontalThumb;

    return (
      <ScrollAreaPrimitive.Scrollbar
        {...scrollbarProps}
        {...axisScrollbarProps}
        data-slot="scroll-area-scrollbar"
        orientation={orientation}
        keepMounted={scrollbarKeepMounted}
        className={mergeSlotClassName(
          styles.scrollbar,
          slotClassNames.scrollbar,
          axisScrollbarClassName,
        )}
      >
        <ScrollAreaPrimitive.Thumb
          {...thumbProps}
          {...axisThumbProps}
          data-slot="scroll-area-thumb"
          className={mergeSlotClassName(styles.thumb, slotClassNames.thumb, axisThumbClassName)}
        />
      </ScrollAreaPrimitive.Scrollbar>
    );
  };

  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area-root"
      data-fade={fadeDirection}
      className={mergeClassName(className, styles.root)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        {...slotPropsByName.viewport}
        data-slot="scroll-area-viewport"
        className={mergeClassName(slotClassNames.viewport, styles.viewport)}
      >
        <ScrollAreaPrimitive.Content
          {...slotPropsByName.content}
          style={contentStyle}
          data-slot="scroll-area-content"
          className={mergeClassName(slotClassNames.content, styles.content)}
        >
          {children}
        </ScrollAreaPrimitive.Content>
      </ScrollAreaPrimitive.Viewport>
      {hasVerticalScrollbar ? renderScrollbar('vertical') : null}
      {hasHorizontalScrollbar ? renderScrollbar('horizontal') : null}
      {scrollbars === 'both' ? (
        <ScrollAreaPrimitive.Corner
          {...slotPropsByName.corner}
          data-slot="scroll-area-corner"
          className={mergeClassName(slotClassNames.corner, styles.corner)}
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
  ScrollAreaContentMinWidth,
};