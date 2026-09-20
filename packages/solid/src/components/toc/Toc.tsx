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

const railBaseOffset = 0;
const railStep = 12;
const railBridge = 6;
const maxRailLevel = 2;

const getRailOffset = (depth: number) =>
  railBaseOffset + Math.min(Math.max(depth - 2, 0), maxRailLevel) * railStep;

const useToc = (props: UseTocProps) => useTocPrimitive(mergeProps({ autoScroll: false }, props));

const useTocContext = useTocContextPrimitive;

function TocRoot(props: ComponentProps<typeof TocPrimitive.Root>) {
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
  const [local, others] = splitProps(props, ['class', 'style', 'value']);

  const getRootStyle = () => mergeStyles(local.value().getRootProps().style, local.style);

  return (
    <TocPrimitive.RootProvider
      value={local.value}
      class={clsx(styles.root, local.class)}
      style={getRootStyle()}
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
  const height = () =>
    lineOffset() === nextLineOffset()
      ? `calc(100% + ${railBridge}px + var(--moduix-table-of-contents-list-gap, var(--moduix-spacing-0-5)))`
      : '100%';
  const getRailStyle = () => mergeStyles({ width: width(), height: height() }, local.style);

  return (
    <svg
      aria-hidden="true"
      class={clsx(styles.rail, local.class)}
      style={getRailStyle()}
      {...others}
      data-slot="toc-rail"
    >
      {hasTurn() && (
        <path
          d={`M ${previousLineOffset() + 0.5} 0 C ${previousLineOffset() + 0.5} 8 ${lineOffset() + 0.5} 4 ${lineOffset() + 0.5} ${railBridge * 2}`}
          fill="none"
          {...nonScalingStrokeProps}
          stroke="currentColor"
        />
      )}
      <line
        x1={lineOffset() + 0.5}
        y1={hasTurn() ? railBridge * 2 : railBridge}
        x2={lineOffset() + 0.5}
        y2="100%"
        {...nonScalingStrokeProps}
        stroke="currentColor"
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