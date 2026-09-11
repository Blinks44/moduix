import {
  Toc as TocPrimitive,
  type UseTocProps,
  useToc as useTocPrimitive,
  useTocContext as useTocContextPrimitive,
} from '@ark-ui/solid/toc';
import type { ComponentProps, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

const railBaseOffset = 0;
const railStep = 12;
const railBridge = 6;
const maxRailLevel = 2;

const getRailOffset = (depth: number) =>
  railBaseOffset + Math.min(Math.max(depth - 2, 0), maxRailLevel) * railStep;

const useToc = (props: UseTocProps) => useTocPrimitive({ autoScroll: false, ...props });

const useTocContext = useTocContextPrimitive;

function TocRoot(props: ComponentProps<typeof TocPrimitive.Root>) {
  const [local, others] = splitProps(props, ['autoScroll', 'class']);

  return (
    <TocPrimitive.Root
      autoScroll={local.autoScroll ?? false}
      data-slot="toc-root"
      class={cn(
        'group/toc box-border grid w-full min-w-0 grid-cols-[minmax(0,1fr)_minmax(12rem,16rem)] gap-6 text-foreground has-[[data-slot=toc-nav][data-placement=left]]:grid-cols-[minmax(12rem,16rem)_minmax(0,1fr)] max-md:grid-cols-[minmax(0,1fr)] max-md:has-[[data-slot=toc-nav][data-placement=left]]:grid-cols-[minmax(0,1fr)]',
        local.class,
      )}
      {...others}
    />
  );
}

function TocRootProvider(props: ComponentProps<typeof TocPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class', 'style', 'value']);

  const getRootStyle = () => mergeStyles(local.value().getRootProps().style, local.style);

  return (
    <TocPrimitive.RootProvider
      value={local.value}
      data-slot="toc-root-provider"
      class={cn(
        'group/toc box-border grid w-full min-w-0 grid-cols-[minmax(0,1fr)_minmax(12rem,16rem)] gap-6 text-foreground has-[[data-slot=toc-nav][data-placement=left]]:grid-cols-[minmax(12rem,16rem)_minmax(0,1fr)] max-md:grid-cols-[minmax(0,1fr)] max-md:has-[[data-slot=toc-nav][data-placement=left]]:grid-cols-[minmax(0,1fr)]',
        local.class,
      )}
      style={getRootStyle()}
      {...others}
    />
  );
}

function TocContent(props: ComponentProps<typeof TocPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TocPrimitive.Content
      data-slot="toc-content"
      class={cn(
        'min-w-0 scroll-smooth group-has-[[data-slot=toc-nav][data-placement=left]]/toc:col-start-2 group-has-[[data-slot=toc-nav][data-placement=left]]/toc:row-start-1 motion-reduce:scroll-auto max-md:group-has-[[data-slot=toc-nav][data-placement=left]]/toc:col-auto max-md:group-has-[[data-slot=toc-nav][data-placement=left]]/toc:row-auto',
        local.class,
      )}
      {...others}
    />
  );
}

function TocNav(props: ComponentProps<typeof TocPrimitive.Nav>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TocPrimitive.Nav
      data-slot="toc-nav"
      class={cn(
        'sticky top-4 max-h-[calc(100dvh-2rem)] min-w-0 self-start overflow-auto rounded-lg border border-border bg-card p-4 text-card-foreground data-[placement=left]:col-start-1 data-[placement=left]:row-start-1 max-md:data-[placement=left]:col-auto max-md:data-[placement=left]:row-auto',
        local.class,
      )}
      {...others}
    />
  );
}

function TocTitle(props: ComponentProps<typeof TocPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TocPrimitive.Title
      data-slot="toc-title"
      class={cn('m-0 mb-2 text-sm leading-5 font-semibold text-foreground', local.class)}
      {...others}
    />
  );
}

function TocList(props: ComponentProps<typeof TocPrimitive.List>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TocPrimitive.List
      data-slot="toc-list"
      class={cn(
        "relative m-0 grid list-none gap-0.5 py-0 ps-1 has-[[data-slot=toc-indicator]]:before:pointer-events-none has-[[data-slot=toc-indicator]]:before:absolute has-[[data-slot=toc-indicator]]:before:inset-y-0.5 has-[[data-slot=toc-indicator]]:before:start-0 has-[[data-slot=toc-indicator]]:before:w-0.5 has-[[data-slot=toc-indicator]]:before:rounded-full has-[[data-slot=toc-indicator]]:before:bg-border has-[[data-slot=toc-indicator]]:before:content-['']",
        local.class,
      )}
      {...others}
    />
  );
}

function TocItem(props: ComponentProps<typeof TocPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return <TocPrimitive.Item data-slot="toc-item" class={cn('min-w-0', local.class)} {...others} />;
}

function TocLink(props: ComponentProps<typeof TocPrimitive.Link>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TocPrimitive.Link
      data-slot="toc-link"
      class={cn(
        'group/toc-link relative block min-w-0 overflow-hidden rounded-sm py-1 ps-[calc(0.875rem+max(0px,((var(--depth)-2)*0.5rem)))] pe-1 text-sm leading-5 text-ellipsis whitespace-nowrap text-muted-foreground no-underline outline-0 transition-colors duration-200 ring-inset focus-visible:ring-1 focus-visible:ring-ring has-[[data-slot=toc-rail]]:overflow-visible data-active:font-medium data-active:text-foreground motion-reduce:transition-none [@media(hover:hover)]:hover:text-foreground',
        local.class,
      )}
      {...others}
    />
  );
}

function TocIndicator(props: ComponentProps<typeof TocPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TocPrimitive.Indicator
      data-slot="toc-indicator"
      class={cn(
        'pointer-events-none start-0 top-[calc(var(--top)+0.125rem)] z-1 h-[calc(var(--height)-0.25rem)] w-0.5 rounded-full bg-muted-foreground opacity-70 transition-[top,height] duration-200 motion-reduce:transition-none',
        local.class,
      )}
      {...others}
    />
  );
}

type TocRailProps = ComponentProps<'svg'> & {
  depth: number;
  previousDepth?: number;
  nextDepth?: number;
};

const nonScalingStrokeProps = {
  'vector-effect': 'non-scaling-stroke',
} as const;

const styleToString = (style: JSX.CSSProperties) =>
  Object.entries(style)
    .filter(([, value]) => value !== undefined)
    .map(([property, value]) => `${property}:${value}`)
    .join(';');

const getStyleObject = (style: unknown): JSX.CSSProperties =>
  typeof style === 'object' && style !== null ? (style as JSX.CSSProperties) : {};

const mergeStyles = (base: unknown, override: unknown): JSX.CSSProperties | string | undefined => {
  if (typeof override === 'string') {
    const baseStyle = typeof base === 'string' ? base : styleToString(getStyleObject(base));

    return baseStyle ? `${baseStyle};${override}` : override;
  }

  if (typeof base === 'string') {
    const overrideStyle = styleToString(getStyleObject(override));

    return overrideStyle ? `${base};${overrideStyle}` : base;
  }

  const baseStyle = getStyleObject(base);
  const overrideStyle = getStyleObject(override);

  return Object.keys(baseStyle).length || Object.keys(overrideStyle).length
    ? { ...baseStyle, ...overrideStyle }
    : undefined;
};

function TocRail(props: TocRailProps) {
  const [local, others] = splitProps(props, [
    'class',
    'depth',
    'nextDepth',
    'previousDepth',
    'style',
  ]);
  const lineOffset = () => getRailOffset(local.depth);
  const previousLineOffset = () => getRailOffset(local.previousDepth ?? local.depth);
  const nextLineOffset = () => getRailOffset(local.nextDepth ?? local.depth);
  const hasTurn = () => previousLineOffset() !== lineOffset();
  const width = () => Math.max(previousLineOffset(), lineOffset(), nextLineOffset()) + 2;
  const height = () => (lineOffset() === nextLineOffset() ? 'calc(100% + 0.5rem)' : '100%');
  const getRailStyle = () => mergeStyles({ width: width(), height: height() }, local.style);

  return (
    <svg
      aria-hidden="true"
      data-slot="toc-rail"
      class={cn(
        'pointer-events-none absolute start-0 -top-1.5 overflow-visible text-border group-data-active/toc-link:translate-y-0.5 group-data-active/toc-link:text-muted-foreground group-data-active/toc-link:opacity-70',
        local.class,
      )}
      style={getRailStyle()}
      {...others}
    >
      {hasTurn() && (
        <path
          d={`M ${previousLineOffset() + 0.5} 0 C ${previousLineOffset() + 0.5} 8 ${lineOffset() + 0.5} 4 ${lineOffset() + 0.5} ${railBridge * 2}`}
          fill="none"
          {...nonScalingStrokeProps}
          stroke="currentColor"
          class="stroke-1"
        />
      )}
      <line
        x1={lineOffset() + 0.5}
        y1={hasTurn() ? railBridge * 2 : railBridge}
        x2={lineOffset() + 0.5}
        y2="100%"
        {...nonScalingStrokeProps}
        stroke="currentColor"
        class="stroke-1"
      />
    </svg>
  );
}

type TocComponent = typeof TocRoot & {
  Root: typeof TocRoot;
  RootProvider: typeof TocRootProvider;
  Context: typeof TocPrimitive.Context;
  Content: typeof TocContent;
  Nav: typeof TocNav;
  Title: typeof TocTitle;
  List: typeof TocList;
  Item: typeof TocItem;
  Link: typeof TocLink;
  Indicator: typeof TocIndicator;
  Rail: typeof TocRail;
};

const Toc: TocComponent = Object.assign(TocRoot, {
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