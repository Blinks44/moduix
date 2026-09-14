'use client';

import {
  Toc as TocPrimitive,
  type UseTocProps,
  useToc as useTocPrimitive,
  useTocContext as useTocContextPrimitive,
} from '@ark-ui/react/toc';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const railBaseOffset = 0;
const railStep = 12;
const railBridge = 6;
const maxRailLevel = 2;

const getRailOffset = (depth: number) =>
  railBaseOffset + Math.min(Math.max(depth - 2, 0), maxRailLevel) * railStep;

const useToc = ({ autoScroll = false, ...props }: UseTocProps) =>
  useTocPrimitive({ autoScroll, ...props });

const useTocContext = useTocContextPrimitive;

const TocRoot = forwardRef<
  ComponentRef<typeof TocPrimitive.Root>,
  ComponentProps<typeof TocPrimitive.Root>
>(function TocRoot({ autoScroll = false, className, ...props }, ref) {
  return (
    <TocPrimitive.Root
      ref={ref}
      autoScroll={autoScroll}
      data-slot="toc-root"
      className={cn(
        'group/toc box-border grid w-full min-w-0 grid-cols-[minmax(0,1fr)_minmax(12rem,16rem)] gap-6 text-foreground has-[[data-slot=toc-nav][data-placement=left]]:grid-cols-[minmax(12rem,16rem)_minmax(0,1fr)] max-md:grid-cols-[minmax(0,1fr)] max-md:has-[[data-slot=toc-nav][data-placement=left]]:grid-cols-[minmax(0,1fr)]',
        className,
      )}
      {...props}
    />
  );
});

const TocRootProvider = forwardRef<
  ComponentRef<typeof TocPrimitive.RootProvider>,
  ComponentProps<typeof TocPrimitive.RootProvider>
>(function TocRootProvider({ className, style, value, ...props }, ref) {
  return (
    <TocPrimitive.RootProvider
      ref={ref}
      value={value}
      data-slot="toc-root-provider"
      className={cn(
        'group/toc box-border grid w-full min-w-0 grid-cols-[minmax(0,1fr)_minmax(12rem,16rem)] gap-6 text-foreground has-[[data-slot=toc-nav][data-placement=left]]:grid-cols-[minmax(12rem,16rem)_minmax(0,1fr)] max-md:grid-cols-[minmax(0,1fr)] max-md:has-[[data-slot=toc-nav][data-placement=left]]:grid-cols-[minmax(0,1fr)]',
        className,
      )}
      style={{ ...value.getRootProps().style, ...style }}
      {...props}
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
      data-slot="toc-content"
      className={cn(
        'min-w-0 scroll-smooth group-has-[[data-slot=toc-nav][data-placement=left]]/toc:col-start-2 group-has-[[data-slot=toc-nav][data-placement=left]]/toc:row-start-1 motion-reduce:scroll-auto max-md:group-has-[[data-slot=toc-nav][data-placement=left]]/toc:col-auto max-md:group-has-[[data-slot=toc-nav][data-placement=left]]/toc:row-auto',
        className,
      )}
      {...props}
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
      data-slot="toc-nav"
      className={cn(
        'sticky top-4 max-h-[calc(100dvh-2rem)] min-w-0 self-start overflow-auto rounded-lg border border-border bg-card p-4 text-card-foreground data-[placement=left]:col-start-1 data-[placement=left]:row-start-1 max-md:data-[placement=left]:col-auto max-md:data-[placement=left]:row-auto',
        className,
      )}
      {...props}
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
      data-slot="toc-title"
      className={cn('m-0 mb-2 text-sm leading-5 font-semibold text-foreground', className)}
      {...props}
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
      data-slot="toc-list"
      className={cn(
        "relative m-0 grid list-none gap-0.5 py-0 ps-1 has-[[data-slot=toc-indicator]]:before:pointer-events-none has-[[data-slot=toc-indicator]]:before:absolute has-[[data-slot=toc-indicator]]:before:inset-y-0.5 has-[[data-slot=toc-indicator]]:before:start-0 has-[[data-slot=toc-indicator]]:before:w-0.5 has-[[data-slot=toc-indicator]]:before:rounded-full has-[[data-slot=toc-indicator]]:before:bg-border has-[[data-slot=toc-indicator]]:before:content-['']",
        className,
      )}
      {...props}
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
      data-slot="toc-item"
      className={cn('min-w-0', className)}
      {...props}
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
      data-slot="toc-link"
      className={cn(
        'group/toc-link relative block min-w-0 overflow-hidden rounded-sm py-1 ps-[calc(0.875rem+max(0px,((var(--depth)-2)*0.5rem)))] pe-1 text-sm leading-5 text-ellipsis whitespace-nowrap text-muted-foreground no-underline outline-0 transition-colors duration-200 ring-inset focus-visible:ring-1 focus-visible:ring-ring has-[[data-slot=toc-rail]]:overflow-visible data-active:font-medium data-active:text-foreground motion-reduce:transition-none [@media(hover:hover)]:hover:text-foreground',
        className,
      )}
      {...props}
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
      data-slot="toc-indicator"
      className={cn(
        'pointer-events-none start-0 top-[calc(var(--top)+0.125rem)] z-1 h-[calc(var(--height)-0.25rem)] w-0.5 rounded-full bg-muted-foreground opacity-70 transition-[top,height] duration-200 motion-reduce:transition-none',
        className,
      )}
      {...props}
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
      data-slot="toc-rail"
      className={cn(
        'pointer-events-none absolute start-0 -top-1.5 overflow-visible text-border group-data-active/toc-link:translate-y-0.5 group-data-active/toc-link:text-muted-foreground group-data-active/toc-link:opacity-70',
        className,
      )}
      style={{
        width,
        height: lineOffset === nextLineOffset ? 'calc(100% + 0.5rem)' : '100%',
        ...style,
      }}
      {...props}
    >
      {hasTurn && (
        <path
          d={`M ${previousLineOffset + 0.5} 0 C ${previousLineOffset + 0.5} 8 ${lineOffset + 0.5} 4 ${lineOffset + 0.5} ${railBridge * 2}`}
          fill="none"
          vectorEffect="non-scaling-stroke"
          stroke="currentColor"
          className="stroke-1"
        />
      )}
      <line
        x1={lineOffset + 0.5}
        y1={hasTurn ? railBridge * 2 : railBridge}
        x2={lineOffset + 0.5}
        y2="100%"
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        className="stroke-1"
      />
    </svg>
  );
});

const Toc = Object.assign(TocRoot, {
  Root: TocRoot,
  RootProvider: TocRootProvider,
  Context: TocPrimitive.Context,
  Content: TocContent,
  Nav: TocNav,
  Title: TocTitle,
  List: TocList,
  Item: TocItem,
  Link: TocLink,
  Indicator: TocIndicator,
  Rail: TocRail,
});

export { Toc, useToc, useTocContext };