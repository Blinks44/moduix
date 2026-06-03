import { Toolbar as ToolbarPrimitive } from '@base-ui/react/toolbar';
import { forwardRef, type ComponentRef } from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Toolbar.module.css';

const Toolbar = forwardRef<ComponentRef<typeof ToolbarPrimitive.Root>, ToolbarPrimitive.Root.Props>(
  function Toolbar({ className, ...props }, ref) {
    return (
      <ToolbarPrimitive.Root
        ref={ref}
        data-slot="toolbar-root"
        className={mergeClassName(className, styles.root)}
        {...props}
      />
    );
  },
);

const ToolbarGroup = forwardRef<
  ComponentRef<typeof ToolbarPrimitive.Group>,
  ToolbarPrimitive.Group.Props
>(function ToolbarGroup({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.Group
      ref={ref}
      data-slot="toolbar-group"
      className={mergeClassName(className, styles.group)}
      {...props}
    />
  );
});

const ToolbarButton = forwardRef<
  ComponentRef<typeof ToolbarPrimitive.Button>,
  ToolbarPrimitive.Button.Props
>(function ToolbarButton({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.Button
      ref={ref}
      data-slot="toolbar-button"
      className={mergeClassName(className, styles.button)}
      {...props}
    />
  );
});

const ToolbarLink = forwardRef<
  ComponentRef<typeof ToolbarPrimitive.Link>,
  ToolbarPrimitive.Link.Props
>(function ToolbarLink({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.Link
      ref={ref}
      data-slot="toolbar-link"
      className={mergeClassName(className, styles.link)}
      {...props}
    />
  );
});

const ToolbarInput = forwardRef<
  ComponentRef<typeof ToolbarPrimitive.Input>,
  ToolbarPrimitive.Input.Props
>(function ToolbarInput({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.Input
      ref={ref}
      data-slot="toolbar-input"
      className={mergeClassName(className, styles.input)}
      {...props}
    />
  );
});

const ToolbarSeparator = forwardRef<
  ComponentRef<typeof ToolbarPrimitive.Separator>,
  ToolbarPrimitive.Separator.Props
>(function ToolbarSeparator({ className, ...props }, ref) {
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