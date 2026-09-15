import type { SplitterPanelData } from '@ark-ui/solid/splitter';
import {
  createSplitterRegistry,
  Splitter as SplitterPrimitive,
  useSplitter,
  useSplitterContext,
} from '@ark-ui/solid/splitter';
import { clsx } from 'clsx';
import type { ComponentProps, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './Splitter.module.css';

const rootStyle = {
  width: 'var(--moduix-splitter-width, 100%)',
  height: 'var(--moduix-splitter-height, 28rem)',
} satisfies JSX.CSSProperties;

type SplitterRootStyle = ComponentProps<typeof SplitterPrimitive.Root>['style'];

function getRootStyle(style: SplitterRootStyle): JSX.CSSProperties | string {
  if (typeof style === 'string') {
    return `width:${rootStyle.width};height:${rootStyle.height};${style}`;
  }

  return { ...rootStyle, ...style };
}

function SplitterRoot(props: ComponentProps<typeof SplitterPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'class', 'style']);

  return (
    <SplitterPrimitive.Root
      asChild={local.asChild}
      class={clsx(styles.root, local.class)}
      style={getRootStyle(local.style)}
      {...others}
      data-slot="splitter-root"
    />
  );
}

function SplitterRootProvider(props: ComponentProps<typeof SplitterPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['asChild', 'class', 'style']);

  return (
    <SplitterPrimitive.RootProvider
      asChild={local.asChild}
      class={clsx(styles.root, local.class)}
      style={getRootStyle(local.style)}
      {...others}
      data-slot="splitter-root-provider"
    />
  );
}

function SplitterPanel(props: ComponentProps<typeof SplitterPrimitive.Panel>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SplitterPrimitive.Panel
      class={clsx(styles.panel, local.class)}
      {...others}
      data-slot="splitter-panel"
    />
  );
}

function SplitterResizeTriggerIndicator(
  props: ComponentProps<typeof SplitterPrimitive.ResizeTriggerIndicator>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SplitterPrimitive.ResizeTriggerIndicator
      class={clsx(styles.resizeTriggerIndicator, local.class)}
      {...others}
      data-slot="splitter-resize-trigger-indicator"
    />
  );
}

function SplitterResizeTrigger(props: ComponentProps<typeof SplitterPrimitive.ResizeTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <SplitterPrimitive.ResizeTrigger
      asChild={local.asChild}
      class={clsx(styles.resizeTrigger, local.class)}
      {...others}
      data-slot="splitter-resize-trigger"
    >
      {local.children === undefined && !local.asChild ? (
        <SplitterResizeTriggerIndicator />
      ) : (
        local.children
      )}
    </SplitterPrimitive.ResizeTrigger>
  );
}

type SplitterComponent = typeof SplitterRoot & {
  Root: typeof SplitterRoot;
  RootProvider: typeof SplitterRootProvider;
  Context: typeof SplitterPrimitive.Context;
  Panel: typeof SplitterPanel;
  ResizeTrigger: typeof SplitterResizeTrigger;
  ResizeTriggerIndicator: typeof SplitterResizeTriggerIndicator;
};

const Splitter: SplitterComponent = Object.assign(SplitterRoot, {
  Root: SplitterRoot,
  RootProvider: SplitterRootProvider,
  Context: SplitterPrimitive.Context,
  Panel: SplitterPanel,
  ResizeTrigger: SplitterResizeTrigger,
  ResizeTriggerIndicator: SplitterResizeTriggerIndicator,
});

export {
  createSplitterRegistry,
  Splitter,
  type SplitterPanelData,
  useSplitter,
  useSplitterContext,
};