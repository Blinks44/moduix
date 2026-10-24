'use client';

import {
  Toc as TocPrimitive,
  type UseTocProps,
  useToc as useTocPrimitive,
  useTocContext as useTocContextPrimitive,
} from '@ark-ui/react/toc';
import { cva } from 'class-variance-authority';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const tocRootVariants = cva(
  'grid w-full min-w-0 grid-cols-[minmax(0,1fr)_minmax(12rem,16rem)] gap-6 text-foreground [--_toc-indicator-height:var(--height)] [--_toc-indicator-top:var(--top)] has-[[data-slot=toc-nav][data-placement=left]]:grid-cols-[minmax(12rem,16rem)_minmax(0,1fr)] max-md:grid-cols-[minmax(0,1fr)] max-md:has-[[data-slot=toc-nav][data-placement=left]]:grid-cols-[minmax(0,1fr)]',
);

const railStep = 12;
const railBridge = 6;

// Depths 2 to 4 get their own rail column; deeper headings stay on the last one.
const getRailX = (depth: number) => Math.min(Math.max(depth - 2, 0), 2) * railStep + 0.5;

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
      className={cn(tocRootVariants(), className)}
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
      className={cn(tocRootVariants(), className)}
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
      className={cn('min-w-0', className)}
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
      className={cn(
        'sticky top-4 max-h-[calc(100dvh-2rem)] self-start overflow-auto rounded-lg border border-border bg-card p-4 text-card-foreground data-[placement=left]:col-start-1 data-[placement=left]:row-start-1 max-md:data-[placement=left]:col-auto max-md:data-[placement=left]:row-auto',
        className,
      )}
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
      className={cn('m-0 mb-2 text-sm leading-5 font-semibold text-foreground', className)}
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
      className={cn(
        "relative m-0 grid list-none gap-0.5 ps-1 has-[[data-slot=toc-indicator]]:before:pointer-events-none has-[[data-slot=toc-indicator]]:before:absolute has-[[data-slot=toc-indicator]]:before:inset-y-0.5 has-[[data-slot=toc-indicator]]:before:start-0 has-[[data-slot=toc-indicator]]:before:w-0.5 has-[[data-slot=toc-indicator]]:before:rounded-full has-[[data-slot=toc-indicator]]:before:bg-border has-[[data-slot=toc-indicator]]:before:content-['']",
        className,
      )}
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
      className={cn('min-w-0', className)}
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
      className={cn(
        'group/toc-link relative block overflow-x-clip rounded-sm py-1 ps-[calc(var(--moduix-spacing-1)+var(--moduix-spacing-0-5)+var(--moduix-spacing-2)+max(0px,(var(--depth)-2)*var(--moduix-spacing-2)))] pe-1 text-sm leading-5 text-ellipsis whitespace-nowrap text-muted-foreground no-underline outline-0 transition-colors duration-normal focus-visible:ring-1 focus-visible:ring-ring data-active:font-medium data-active:text-foreground [@media(hover:hover)]:hover:text-foreground',
        className,
      )}
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
      className={cn(
        'pointer-events-none start-0 top-[calc(var(--_toc-indicator-top)+var(--moduix-spacing-0-5))] z-1 h-[calc(var(--_toc-indicator-height)-var(--moduix-spacing-1))] w-0.5 rounded-full bg-muted-foreground opacity-70 transition-[top,height] duration-normal',
        className,
      )}
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
  const x = getRailX(depth);
  const previousX = getRailX(previousDepth);
  const nextX = getRailX(nextDepth);
  const hasTurn = previousX !== x;

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute start-0 -top-1.5 overflow-visible text-border group-data-active/toc-link:translate-y-0.5 group-data-active/toc-link:text-muted-foreground group-data-active/toc-link:opacity-70',
        className,
      )}
      style={{
        width: Math.max(previousX, x, nextX) + 1.5,
        // Cross the list gap to the next rail, and its bridge too when the line continues.
        height: `calc(100% + ${nextX === x ? railBridge : 0}px + var(--moduix-spacing-0-5))`,
        ...style,
      }}
      {...props}
      data-slot="toc-rail"
    >
      {hasTurn && (
        <path
          d={`M ${previousX} 0 C ${previousX} 8 ${x} 4 ${x} ${railBridge * 2}`}
          fill="none"
          vectorEffect="non-scaling-stroke"
          stroke="currentColor"
          className="stroke-1"
        />
      )}
      <line
        x1={x}
        y1={hasTurn ? railBridge * 2 : railBridge}
        x2={x}
        y2="100%"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        className="stroke-1"
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

export type {
  TocActiveChangeDetails,
  TocContentProps,
  TocContextProps,
  TocIndicatorProps,
  TocItemData,
  TocItemProps,
  TocLinkProps,
  TocListProps,
  TocNavProps,
  TocRootProps,
  TocRootProviderProps,
  TocTitleProps,
  UseTocContext,
  UseTocProps,
  UseTocReturn,
} from '@ark-ui/react/toc';
export type { TocRailProps };