import { Menu as MenuPrimitive } from '@ark-ui/solid/menu';
import { clsx } from 'clsx';
import type { Accessor, ComponentProps, JSX } from 'solid-js';
import { children, createContext, splitProps, useContext } from 'solid-js';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui/Icons';
import { OverlayPortal } from '@/lib/moduix/overlayPortal';
import { Button } from '../button';
import { Menu, MenuViewport } from '../menu';
import menuStyles from '../menu/Menu.module.css';
import styles from './SplitButton.module.css';

type ButtonProps = ComponentProps<typeof Button>;
type SplitButtonVariant = Exclude<NonNullable<ButtonProps['variant']>, 'link'>;
type SplitButtonSize = Exclude<NonNullable<ButtonProps['size']>, 'icon-sm' | 'icon-md' | 'icon-lg'>;

type SplitButtonContextValue = {
  size: Accessor<SplitButtonSize>;
  variant: Accessor<SplitButtonVariant>;
};

type SplitButtonRootProps = Omit<ComponentProps<typeof Menu>, 'children'> & {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  children?: JSX.Element;
  class?: string;
  ref?: HTMLDivElement | ((element: HTMLDivElement) => void);
  size?: SplitButtonSize;
  variant?: SplitButtonVariant;
};

type SplitButtonActionProps = Omit<ButtonProps, 'size' | 'variant'> & {
  size?: SplitButtonSize;
  variant?: SplitButtonVariant;
};

type SplitButtonTriggerProps = Omit<
  ComponentProps<typeof MenuPrimitive.Trigger>,
  'asChild' | 'children' | 'class'
> & {
  children?: JSX.Element;
  class?: string;
  size?: SplitButtonSize;
  variant?: SplitButtonVariant;
};

type SplitButtonContentProps = ComponentProps<typeof MenuPrimitive.Content>;
type SplitButtonPositionerProps = ComponentProps<typeof MenuPrimitive.Positioner>;

const SplitButtonContext = createContext<SplitButtonContextValue | null>(null);

function useSplitButtonContext(componentName: string) {
  const context = useContext(SplitButtonContext);

  if (!context) {
    throw new Error(`${componentName} must be used within SplitButton.Root.`);
  }

  return context;
}

function SplitButtonRoot(props: SplitButtonRootProps) {
  const [local, others] = splitProps(props, [
    'aria-label',
    'aria-labelledby',
    'children',
    'class',
    'onSelect',
    'positioning',
    'ref',
    'size',
    'variant',
  ]);

  return (
    <SplitButtonContext.Provider
      value={{
        size: () => local.size ?? 'md',
        variant: () => local.variant ?? 'default',
      }}
    >
      <Menu
        onSelect={local.onSelect}
        positioning={{ placement: 'bottom-end', gutter: 4, ...local.positioning }}
        {...others}
      >
        <div
          role="group"
          aria-label={local['aria-label']}
          aria-labelledby={local['aria-labelledby']}
          data-scope="split-button"
          data-part="root"
          data-slot="split-button-root"
          class={clsx(styles.root, local.class)}
          ref={local.ref}
        >
          {local.children}
        </div>
      </Menu>
    </SplitButtonContext.Provider>
  );
}

function SplitButtonAction(props: SplitButtonActionProps) {
  const [local, others] = splitProps(props, ['class', 'size', 'variant']);
  const context = useSplitButtonContext('SplitButton.Action');

  return (
    <Button
      {...others}
      data-slot="split-button-action"
      size={local.size ?? context.size()}
      variant={local.variant ?? context.variant()}
      class={clsx(styles.action, local.class)}
    />
  );
}

function SplitButtonTrigger(props: SplitButtonTriggerProps) {
  const [local, others] = splitProps(props, [
    'aria-label',
    'children',
    'class',
    'ref',
    'size',
    'variant',
  ]);
  const context = useSplitButtonContext('SplitButton.Trigger');
  const resolvedChildren = children(() => local.children);
  const isIconOnly = () => resolvedChildren() == null;
  const ariaLabel = () =>
    isIconOnly() ? (local['aria-label'] ?? 'More actions') : local['aria-label'];

  return (
    <MenuPrimitive.Trigger
      {...others}
      asChild={(triggerProps) => (
        <Button
          {...triggerProps()}
          ref={local.ref}
          data-slot="split-button-trigger"
          size={local.size ?? context.size()}
          variant={local.variant ?? context.variant()}
          class={clsx(styles.trigger, local.class)}
          aria-label={ariaLabel()}
        >
          {resolvedChildren() ?? <ChevronDownIcon />}
        </Button>
      )}
      data-slot="split-button-trigger"
      aria-label={ariaLabel()}
      class={clsx(styles.trigger, local.class)}
    />
  );
}

function SplitButtonPositioner(props: SplitButtonPositionerProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <MenuPrimitive.Positioner
        {...others}
        data-slot="split-button-positioner"
        class={clsx(menuStyles.positioner, local.class)}
      />
    </OverlayPortal>
  );
}

function SplitButtonContent(props: SplitButtonContentProps) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <MenuPrimitive.Content
      {...others}
      asChild={local.asChild}
      data-slot="split-button-content"
      class={clsx(menuStyles.content, local.class)}
    >
      {local.asChild ? local.children : <MenuViewport>{local.children}</MenuViewport>}
    </MenuPrimitive.Content>
  );
}

type SplitButtonComponent = typeof SplitButtonRoot & {
  Root: typeof SplitButtonRoot;
  Action: typeof SplitButtonAction;
  Trigger: typeof SplitButtonTrigger;
  Positioner: typeof SplitButtonPositioner;
  Content: typeof SplitButtonContent;
};

const SplitButton: SplitButtonComponent = Object.assign(SplitButtonRoot, {
  Root: SplitButtonRoot,
  Action: SplitButtonAction,
  Trigger: SplitButtonTrigger,
  Positioner: SplitButtonPositioner,
  Content: SplitButtonContent,
});

export { SplitButton };
