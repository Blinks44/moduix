'use client';

import { Menu as MenuPrimitive } from '@ark-ui/react/menu';
import { clsx } from 'clsx';
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentProps,
  type ComponentRef,
  type ReactNode,
} from 'react';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import { OverlayPortal } from '@/lib/moduix/overlayPortal';
import { Button } from '../button';
import { Menu } from '../menu';
import menuStyles from '../menu/Menu.module.css';
import styles from './SplitButton.module.css';

type ButtonProps = ComponentProps<typeof Button>;
type SplitButtonVariant = Exclude<NonNullable<ButtonProps['variant']>, 'link'>;
type SplitButtonSize = Exclude<NonNullable<ButtonProps['size']>, 'icon-sm' | 'icon-md' | 'icon-lg'>;

type SplitButtonContextValue = {
  size: SplitButtonSize;
  variant: SplitButtonVariant;
};

type SplitButtonRootProps = Omit<ComponentProps<typeof Menu.Root>, 'children'> & {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  children?: ReactNode;
  className?: string;
  size?: SplitButtonSize;
  variant?: SplitButtonVariant;
};

type SplitButtonActionProps = Omit<ButtonProps, 'size' | 'variant'> & {
  size?: SplitButtonSize;
  variant?: SplitButtonVariant;
};

type SplitButtonTriggerProps = Omit<ComponentProps<typeof MenuPrimitive.Trigger>, 'asChild'> & {
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

const SplitButtonRoot = forwardRef<HTMLDivElement, SplitButtonRootProps>(function SplitButtonRoot(
  {
    children,
    className,
    positioning,
    size = 'md',
    variant = 'default',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    ...props
  },
  ref,
) {
  return (
    <SplitButtonContext.Provider value={{ size, variant }}>
      <Menu.Root positioning={{ placement: 'bottom-end', gutter: 4, ...positioning }} {...props}>
        <div
          ref={ref}
          role="group"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          data-scope="split-button"
          data-part="root"
          data-slot="split-button-root"
          className={clsx(styles.root, className)}
        >
          {children}
        </div>
      </Menu.Root>
    </SplitButtonContext.Provider>
  );
});

const SplitButtonAction = forwardRef<ComponentRef<typeof Button>, SplitButtonActionProps>(
  function SplitButtonAction({ className, size, variant, ...props }, ref) {
    const context = useSplitButtonContext('SplitButton.Action');

    return (
      <Button
        ref={ref}
        size={size ?? context.size}
        variant={variant ?? context.variant}
        className={clsx(styles.action, className)}
        {...props}
        data-slot="split-button-action"
      />
    );
  },
);

const SplitButtonTrigger = forwardRef<
  ComponentRef<typeof MenuPrimitive.Trigger>,
  SplitButtonTriggerProps
>(function SplitButtonTrigger(
  { children, className, size, variant, 'aria-label': ariaLabel, ...props },
  ref,
) {
  const context = useSplitButtonContext('SplitButton.Trigger');
  const isIconOnly = children == null;

  return (
    <MenuPrimitive.Trigger
      ref={ref}
      asChild
      aria-label={isIconOnly ? (ariaLabel ?? 'More actions') : ariaLabel}
      className={clsx(styles.trigger, className)}
      {...props}
      data-slot="split-button-trigger"
    >
      <Button size={size ?? context.size} variant={variant ?? context.variant}>
        {children ?? <ChevronDownIcon />}
      </Button>
    </MenuPrimitive.Trigger>
  );
});

const SplitButtonPositioner = forwardRef<
  ComponentRef<typeof MenuPrimitive.Positioner>,
  SplitButtonPositionerProps
>(function SplitButtonPositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <MenuPrimitive.Positioner
        ref={ref}
        className={clsx(menuStyles.positioner, className)}
        {...props}
        data-slot="split-button-positioner"
      />
    </OverlayPortal>
  );
});

const SplitButtonContent = forwardRef<
  ComponentRef<typeof MenuPrimitive.Content>,
  SplitButtonContentProps
>(function SplitButtonContent({ asChild, children, className, ...props }, ref) {
  return (
    <MenuPrimitive.Content
      ref={ref}
      asChild={asChild}
      className={clsx(menuStyles.content, className)}
      {...props}
      data-slot="split-button-content"
    >
      {asChild ? children : <Menu.Viewport>{children}</Menu.Viewport>}
    </MenuPrimitive.Content>
  );
});

const SplitButton = Object.assign(SplitButtonRoot, {
  Root: SplitButtonRoot,
  Action: SplitButtonAction,
  Trigger: SplitButtonTrigger,
  Positioner: SplitButtonPositioner,
  Content: SplitButtonContent,
});

export { SplitButton };