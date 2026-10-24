import {
  Toc as TocPrimitive,
  type UseTocProps,
  useToc as useTocPrimitive,
  useTocContext as useTocContextPrimitive,
} from '@ark-ui/solid/toc';
import { cva } from 'class-variance-authority';
import type { ComponentProps, JSX } from 'solid-js';
import { mergeProps, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

const tocRootVariants = cva(
  'grid w-full min-w-0 grid-cols-[minmax(0,1fr)_minmax(12rem,16rem)] gap-6 text-foreground [--_toc-indicator-height:var(--height)] [--_toc-indicator-top:var(--top)] has-[[data-slot=toc-nav][data-placement=left]]:grid-cols-[minmax(12rem,16rem)_minmax(0,1fr)] max-md:grid-cols-[minmax(0,1fr)] max-md:has-[[data-slot=toc-nav][data-placement=left]]:grid-cols-[minmax(0,1fr)]',
);

const railStep = 12;
const railBridge = 6;

// Depths 2 to 4 get their own rail column; deeper headings stay on the last one.
const getRailX = (depth: number) => Math.min(Math.max(depth - 2, 0), 2) * railStep + 0.5;

const useToc = (props: UseTocProps) => useTocPrimitive(mergeProps({ autoScroll: false }, props));

const useTocContext = useTocContextPrimitive;

function Toc(props: ComponentProps<typeof TocPrimitive.Root>) {
  const [local, others] = splitProps(props, ['autoScroll', 'class']);

  return (
    <TocPrimitive.Root
      autoScroll={local.autoScroll ?? false}
      class={cn(tocRootVariants(), local.class)}
      {...others}
      data-slot="toc-root"
    />
  );
}

function TocRootProvider(props: ComponentProps<typeof TocPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TocPrimitive.RootProvider
      class={cn(tocRootVariants(), local.class)}
      {...others}
      data-slot="toc-root-provider"
    />
  );
}

function TocContent(props: ComponentProps<typeof TocPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TocPrimitive.Content class={cn('min-w-0', local.class)} {...others} data-slot="toc-content" />
  );
}

function TocNav(props: ComponentProps<typeof TocPrimitive.Nav>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TocPrimitive.Nav
      class={cn(
        'sticky top-4 max-h-[calc(100dvh-2rem)] self-start overflow-auto rounded-lg border border-border bg-card p-4 text-card-foreground data-[placement=left]:col-start-1 data-[placement=left]:row-start-1 max-md:data-[placement=left]:col-auto max-md:data-[placement=left]:row-auto',
        local.class,
      )}
      {...others}
      data-slot="toc-nav"
    />
  );
}

function TocTitle(props: ComponentProps<typeof TocPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TocPrimitive.Title
      class={cn('m-0 mb-2 text-sm leading-5 font-semibold text-foreground', local.class)}
      {...others}
      data-slot="toc-title"
    />
  );
}

function TocList(props: ComponentProps<typeof TocPrimitive.List>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TocPrimitive.List
      class={cn(
        "relative m-0 grid list-none gap-0.5 ps-1 has-[[data-slot=toc-indicator]]:before:pointer-events-none has-[[data-slot=toc-indicator]]:before:absolute has-[[data-slot=toc-indicator]]:before:inset-y-0.5 has-[[data-slot=toc-indicator]]:before:start-0 has-[[data-slot=toc-indicator]]:before:w-0.5 has-[[data-slot=toc-indicator]]:before:rounded-full has-[[data-slot=toc-indicator]]:before:bg-border has-[[data-slot=toc-indicator]]:before:content-['']",
        local.class,
      )}
      {...others}
      data-slot="toc-list"
    />
  );
}

function TocItem(props: ComponentProps<typeof TocPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return <TocPrimitive.Item class={cn('min-w-0', local.class)} {...others} data-slot="toc-item" />;
}

function TocLink(props: ComponentProps<typeof TocPrimitive.Link>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TocPrimitive.Link
      class={cn(
        'group/toc-link relative block overflow-x-clip rounded-sm py-1 ps-[calc(var(--moduix-spacing-1)+var(--moduix-spacing-0-5)+var(--moduix-spacing-2)+max(0px,(var(--depth)-2)*var(--moduix-spacing-2)))] pe-1 text-sm leading-5 text-ellipsis whitespace-nowrap text-muted-foreground no-underline outline-0 transition-colors duration-normal focus-visible:ring-1 focus-visible:ring-ring data-active:font-medium data-active:text-foreground [@media(hover:hover)]:hover:text-foreground',
        local.class,
      )}
      {...others}
      data-slot="toc-link"
    />
  );
}

function TocIndicator(props: ComponentProps<typeof TocPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TocPrimitive.Indicator
      class={cn(
        'pointer-events-none start-0 top-[calc(var(--_toc-indicator-top)+var(--moduix-spacing-0-5))] z-1 h-[calc(var(--_toc-indicator-height)-var(--moduix-spacing-1))] w-0.5 rounded-full bg-muted-foreground opacity-70 transition-[top,height] duration-normal',
        local.class,
      )}
      {...others}
      data-slot="toc-indicator"
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

function TocRail(props: TocRailProps) {
  const [local, others] = splitProps(props, [
    'class',
    'depth',
    'nextDepth',
    'previousDepth',
    'style',
  ]);
  const x = () => getRailX(local.depth);
  const previousX = () => getRailX(local.previousDepth ?? local.depth);
  const nextX = () => getRailX(local.nextDepth ?? local.depth);
  const hasTurn = () => previousX() !== x();
  const style = (): JSX.CSSProperties | string => {
    const width = `${Math.max(previousX(), x(), nextX()) + 1.5}px`;
    // Cross the list gap to the next rail, and its bridge too when the line continues.
    const height = `calc(100% + ${nextX() === x() ? railBridge : 0}px + var(--moduix-spacing-0-5))`;

    if (typeof local.style === 'string') {
      return `width:${width};height:${height};${local.style}`;
    }

    return { width, height, ...local.style };
  };

  return (
    <svg
      aria-hidden="true"
      class={cn(
        'pointer-events-none absolute start-0 -top-1.5 overflow-visible text-border group-data-active/toc-link:translate-y-0.5 group-data-active/toc-link:text-muted-foreground group-data-active/toc-link:opacity-70',
        local.class,
      )}
      style={style()}
      {...others}
      data-slot="toc-rail"
    >
      {hasTurn() && (
        <path
          d={`M ${previousX()} 0 C ${previousX()} 8 ${x()} 4 ${x()} ${railBridge * 2}`}
          fill="none"
          {...nonScalingStrokeProps}
          stroke="currentColor"
          class="stroke-1"
        />
      )}
      <line
        x1={x()}
        y1={hasTurn() ? railBridge * 2 : railBridge}
        x2={x()}
        y2="100%"
        {...nonScalingStrokeProps}
        stroke="currentColor"
        class="stroke-1"
      />
    </svg>
  );
}

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
} from '@ark-ui/solid/toc';
export type { TocRailProps };