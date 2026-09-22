'use client';

import {
  Toc as TocPrimitive,
  type UseTocProps,
  useToc as useTocPrimitive,
  useTocContext as useTocContextPrimitive,
} from '@ark-ui/react/toc';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import styles from './Toc.module.css';

const railBaseOffset = 0;
const railStep = 12;
const railBridge = 6;
const maxRailLevel = 2;

const getRailOffset = (depth: number) =>
  railBaseOffset + Math.min(Math.max(depth - 2, 0), maxRailLevel) * railStep;

const useToc = ({ autoScroll = false, ...props }: UseTocProps) =>
  useTocPrimitive({ autoScroll, ...props });

const useTocContext = useTocContextPrimitive;

const Toc = forwardRef<
  ComponentRef<typeof TocPrimitive.Root>,
  ComponentProps<typeof TocPrimitive.Root>
>(function Toc({ autoScroll = false, className, ...props }, ref) {
  return (
    <TocPrimitive.Root
      ref={ref}
      autoScroll={autoScroll}
      className={clsx(styles.root, className)}
      {...props}
      data-slot="toc-root"
    />
  );
});

const TocRootProvider = forwardRef<
  ComponentRef<typeof TocPrimitive.RootProvider>,
  ComponentProps<typeof TocPrimitive.RootProvider>
>(function TocRootProvider({ className, style, value, ...props }, ref) {
  const rootProps = value.getRootProps();

  return (
    <TocPrimitive.RootProvider
      ref={ref}
      value={value}
      {...rootProps}
      className={clsx(styles.root, className)}
      style={{ ...rootProps.style, ...style }}
      {...props}
      data-slot="toc-root-provider"
    />
  );
});

const TocContent = forwardRef<
  ComponentRef<typeof TocPrimitive.Content>,
  ComponentProps<typeof TocPrimitive.Content>
>(function TocContent({ className, ...props }, ref) {
  return (
    <TocPrimitive.Content
      ref={ref}
      className={clsx(styles.content, className)}
      {...props}
      data-slot="toc-content"
    />
  );
});

const TocNav = forwardRef<
  ComponentRef<typeof TocPrimitive.Nav>,
  ComponentProps<typeof TocPrimitive.Nav>
>(function TocNav({ className, ...props }, ref) {
  return (
    <TocPrimitive.Nav
      ref={ref}
      className={clsx(styles.nav, className)}
      {...props}
      data-slot="toc-nav"
    />
  );
});

const TocTitle = forwardRef<
  ComponentRef<typeof TocPrimitive.Title>,
  ComponentProps<typeof TocPrimitive.Title>
>(function TocTitle({ className, ...props }, ref) {
  return (
    <TocPrimitive.Title
      ref={ref}
      className={clsx(styles.title, className)}
      {...props}
      data-slot="toc-title"
    />
  );
});

const TocList = forwardRef<
  ComponentRef<typeof TocPrimitive.List>,
  ComponentProps<typeof TocPrimitive.List>
>(function TocList({ className, ...props }, ref) {
  return (
    <TocPrimitive.List
      ref={ref}
      className={clsx(styles.list, className)}
      {...props}
      data-slot="toc-list"
    />
  );
});

const TocItem = forwardRef<
  ComponentRef<typeof TocPrimitive.Item>,
  ComponentProps<typeof TocPrimitive.Item>
>(function TocItem({ className, ...props }, ref) {
  return (
    <TocPrimitive.Item
      ref={ref}
      className={clsx(styles.item, className)}
      {...props}
      data-slot="toc-item"
    />
  );
});

const TocLink = forwardRef<
  ComponentRef<typeof TocPrimitive.Link>,
  ComponentProps<typeof TocPrimitive.Link>
>(function TocLink({ className, ...props }, ref) {
  return (
    <TocPrimitive.Link
      ref={ref}
      className={clsx(styles.link, className)}
      {...props}
      data-slot="toc-link"
    />
  );
});

const TocIndicator = forwardRef<
  ComponentRef<typeof TocPrimitive.Indicator>,
  ComponentProps<typeof TocPrimitive.Indicator>
>(function TocIndicator({ className, ...props }, ref) {
  return (
    <TocPrimitive.Indicator
      ref={ref}
      className={clsx(styles.indicator, className)}
      {...props}
      data-slot="toc-indicator"
    />
  );
});

type TocRailProps = ComponentProps<'svg'> & {
  depth: number;
  previousDepth?: number;
  nextDepth?: number;
};

const TocRail = forwardRef<SVGSVGElement, TocRailProps>(function TocRail(
  { className, depth, nextDepth = depth, previousDepth = depth, style, ...props },
  ref,
) {
  const lineOffset = getRailOffset(depth);
  const previousLineOffset = getRailOffset(previousDepth);
  const nextLineOffset = getRailOffset(nextDepth);
  const hasTurn = previousLineOffset !== lineOffset;
  const width = Math.max(previousLineOffset, lineOffset, nextLineOffset) + 2;

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      className={clsx(styles.rail, className)}
      style={{
        width,
        height:
          lineOffset === nextLineOffset
            ? `calc(100% + ${railBridge}px + var(--moduix-table-of-contents-list-gap, var(--moduix-spacing-0-5)))`
            : '100%',
        ...style,
      }}
      {...props}
      data-slot="toc-rail"
    >
      {hasTurn && (
        <path
          d={`M ${previousLineOffset + 0.5} 0 C ${previousLineOffset + 0.5} 8 ${lineOffset + 0.5} 4 ${lineOffset + 0.5} ${railBridge * 2}`}
          fill="none"
          vectorEffect="non-scaling-stroke"
          stroke="currentColor"
        />
      )}
      <line
        x1={lineOffset + 0.5}
        y1={hasTurn ? railBridge * 2 : railBridge}
        x2={lineOffset + 0.5}
        y2="100%"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
      />
    </svg>
  );
});

const TocContext = TocPrimitive.Context;

export {
  Toc,
  TocContext,
  TocContent,
  TocIndicator,
  TocItem,
  TocLink,
  TocList,
  TocNav,
  TocRail,
  TocRootProvider,
  TocTitle,
  useToc,
  useTocContext,
};
