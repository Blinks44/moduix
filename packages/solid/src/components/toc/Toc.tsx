import {
  Toc as TocPrimitive,
  type UseTocProps,
  useToc as useTocPrimitive,
  useTocContext as useTocContextPrimitive,
} from '@ark-ui/solid/toc';
import { clsx } from 'clsx';
import type { ComponentProps, JSX } from 'solid-js';
import { mergeProps, splitProps } from 'solid-js';
import styles from './Toc.module.css';

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
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="toc-root"
    />
  );
}

function TocRootProvider(props: ComponentProps<typeof TocPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TocPrimitive.RootProvider
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="toc-root-provider"
    />
  );
}

function TocContent(props: ComponentProps<typeof TocPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TocPrimitive.Content
      class={clsx(styles.content, local.class)}
      {...others}
      data-slot="toc-content"
    />
  );
}

function TocNav(props: ComponentProps<typeof TocPrimitive.Nav>) {
  const [local, others] = splitProps(props, ['class']);

  return <TocPrimitive.Nav class={clsx(styles.nav, local.class)} {...others} data-slot="toc-nav" />;
}

function TocTitle(props: ComponentProps<typeof TocPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TocPrimitive.Title class={clsx(styles.title, local.class)} {...others} data-slot="toc-title" />
  );
}

function TocList(props: ComponentProps<typeof TocPrimitive.List>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TocPrimitive.List class={clsx(styles.list, local.class)} {...others} data-slot="toc-list" />
  );
}

function TocItem(props: ComponentProps<typeof TocPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TocPrimitive.Item class={clsx(styles.item, local.class)} {...others} data-slot="toc-item" />
  );
}

function TocLink(props: ComponentProps<typeof TocPrimitive.Link>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TocPrimitive.Link class={clsx(styles.link, local.class)} {...others} data-slot="toc-link" />
  );
}

function TocIndicator(props: ComponentProps<typeof TocPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TocPrimitive.Indicator
      class={clsx(styles.indicator, local.class)}
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
      class={clsx(styles.rail, local.class)}
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
        />
      )}
      <line
        x1={x()}
        y1={hasTurn() ? railBridge * 2 : railBridge}
        x2={x()}
        y2="100%"
        {...nonScalingStrokeProps}
        stroke="currentColor"
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