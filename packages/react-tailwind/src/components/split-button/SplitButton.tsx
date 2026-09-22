'use client';

import { Menu as MenuPrimitive } from '@ark-ui/react/menu';
import { cva } from 'class-variance-authority';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { createContext, forwardRef, useContext } from 'react';
import { cn } from '@/lib/moduix/cn';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import { OverlayPortal } from '@/lib/moduix/overlayPortal';
import { Button } from '../button';
import { Menu, MenuViewport } from '../menu';
import { menuContentVariants, menuPositionerVariants } from '../menu/Menu';

type ButtonProps = ComponentProps<typeof Button>;
type SplitButtonVariant = Exclude<NonNullable<ButtonProps['variant']>, 'link'>;
type SplitButtonSize = Exclude<NonNullable<ButtonProps['size']>, 'icon-sm' | 'icon-md' | 'icon-lg'>;

type SplitButtonContextValue = {
  size: SplitButtonSize;
  variant: SplitButtonVariant;
};

type SplitButtonProps = Omit<ComponentProps<typeof Menu>, 'children'> & {
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

const splitButtonTriggerVariants = cva(
  "relative min-w-0 -ms-[calc(var(--moduix-button-border-width,var(--moduix-border-width-sm))*-1)] rounded-s-none before:pointer-events-none before:absolute before:inset-y-1.5 before:start-0 before:w-px before:bg-current before:opacity-[0.16] before:content-['']",
  {
    variants: {
      size: {
        xs: 'px-2',
        sm: 'px-2.5',
        md: 'px-3',
        lg: 'px-3.5',
        xl: 'px-4',
      },
      variant: {
        default: '',
        outline: 'before:opacity-0',
        secondary: '',
        destructive: '',
        'destructive-outline': 'before:opacity-0',
        ghost: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
);

const SplitButtonContext = createContext<SplitButtonContextValue | null>(null);

function useSplitButtonContext(componentName: string) {
  const context = useContext(SplitButtonContext);

  if (!context) {
    throw new Error(`${componentName} must be used within SplitButton.`);
  }

  return context;
}

const SplitButton = forwardRef<HTMLDivElement, SplitButtonProps>(function SplitButton(
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
      <Menu positioning={{ placement: 'bottom-end', gutter: 4, ...positioning }} {...props}>
        <div
          ref={ref}
          role="group"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          data-scope="split-button"
          data-part="root"
          data-slot="split-button-root"
          className={cn('inline-flex items-stretch', className)}
        >
          {children}
        </div>
      </Menu>
    </SplitButtonContext.Provider>
  );
});

const SplitButtonAction = forwardRef<ComponentRef<typeof Button>, SplitButtonActionProps>(
  function SplitButtonAction({ className, size, variant, ...props }, ref) {
    const context = useSplitButtonContext('SplitButtonAction');

    return (
      <Button
        ref={ref}
        size={size ?? context.size}
        variant={variant ?? context.variant}
        className={cn('rounded-e-none', className)}
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
  const context = useSplitButtonContext('SplitButtonTrigger');
  const resolvedSize = size ?? context.size;
  const resolvedVariant = variant ?? context.variant;
  const isIconOnly = children == null;

  return (
    <MenuPrimitive.Trigger
      ref={ref}
      asChild
      aria-label={isIconOnly ? (ariaLabel ?? 'More actions') : ariaLabel}
      className={cn(
        splitButtonTriggerVariants({ size: resolvedSize, variant: resolvedVariant }),
        className,
      )}
      {...props}
      data-slot="split-button-trigger"
    >
      <Button size={resolvedSize} variant={resolvedVariant}>
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
        className={cn(menuPositionerVariants(), className)}
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
      className={cn(menuContentVariants(), className)}
      {...props}
      data-slot="split-button-content"
    >
      {asChild ? children : <MenuViewport>{children}</MenuViewport>}
    </MenuPrimitive.Content>
  );
});

export {
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonPositioner,
  SplitButtonTrigger,
};