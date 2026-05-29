import { Toolbar as ToolbarPrimitive } from '@base-ui/react/toolbar';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Toolbar.module.css';

const Toolbar = React.forwardRef(function Toolbar(
  { className, ...props }: ToolbarPrimitive.Root.Props,
  ref: React.ForwardedRef<React.ComponentRef<typeof ToolbarPrimitive.Root>>,
) {
  return (
    <ToolbarPrimitive.Root
      ref={ref}
      data-slot="toolbar-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
});

const ToolbarGroup = React.forwardRef(function ToolbarGroup(
  { className, ...props }: ToolbarPrimitive.Group.Props,
  ref: React.ForwardedRef<React.ComponentRef<typeof ToolbarPrimitive.Group>>,
) {
  return (
    <ToolbarPrimitive.Group
      ref={ref}
      data-slot="toolbar-group"
      className={mergeClassName(className, styles.group)}
      {...props}
    />
  );
});

const ToolbarButton = React.forwardRef(function ToolbarButton(
  { className, ...props }: ToolbarPrimitive.Button.Props,
  ref: React.ForwardedRef<React.ComponentRef<typeof ToolbarPrimitive.Button>>,
) {
  return (
    <ToolbarPrimitive.Button
      ref={ref}
      data-slot="toolbar-button"
      className={mergeClassName(className, styles.button)}
      {...props}
    />
  );
});

const ToolbarLink = React.forwardRef(function ToolbarLink(
  { className, ...props }: ToolbarPrimitive.Link.Props,
  ref: React.ForwardedRef<React.ComponentRef<typeof ToolbarPrimitive.Link>>,
) {
  return (
    <ToolbarPrimitive.Link
      ref={ref}
      data-slot="toolbar-link"
      className={mergeClassName(className, styles.link)}
      {...props}
    />
  );
});

const ToolbarInput = React.forwardRef(function ToolbarInput(
  { className, ...props }: ToolbarPrimitive.Input.Props,
  ref: React.ForwardedRef<React.ComponentRef<typeof ToolbarPrimitive.Input>>,
) {
  return (
    <ToolbarPrimitive.Input
      ref={ref}
      data-slot="toolbar-input"
      className={mergeClassName(className, styles.input)}
      {...props}
    />
  );
});

const ToolbarSeparator = React.forwardRef(function ToolbarSeparator(
  { className, ...props }: ToolbarPrimitive.Separator.Props,
  ref: React.ForwardedRef<React.ComponentRef<typeof ToolbarPrimitive.Separator>>,
) {
  return (
    <ToolbarPrimitive.Separator
      ref={ref}
      data-slot="toolbar-separator"
      className={mergeClassName(className, styles.separator)}
      {...props}
    />
  );
});

export { Toolbar, ToolbarGroup, ToolbarButton, ToolbarLink, ToolbarInput, ToolbarSeparator };