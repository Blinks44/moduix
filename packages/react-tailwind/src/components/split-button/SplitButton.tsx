'use client';

import { cva } from 'class-variance-authority';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { createContext, forwardRef, useContext } from 'react';
import { cn } from '@/lib/moduix/cn';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import { Button } from '../button';
import { Menu } from '../menu';

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

type SplitButtonTriggerProps = Omit<ComponentProps<typeof Menu.Trigger>, 'asChild'> & {
  size?: SplitButtonSize;
  variant?: SplitButtonVariant;
};

type SplitButtonContentProps = ComponentProps<typeof Menu.Content>;
type SplitButtonPositionerProps = ComponentProps<typeof Menu.Positioner>;

const splitButtonTriggerVariants = cva(
  "relative min-w-0 -ms-px rounded-s-none before:pointer-events-none before:absolute before:inset-y-1.5 before:start-0 before:w-px before:bg-current before:opacity-[0.16] before:content-['']",
  {
    variants: {
      size: {
        xs: 'px-2',
        sm: 'px-2.5',
        md: 'px-4',
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
          className={cn('inline-flex items-stretch', className)}
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
        className={cn('rounded-e-none', className)}
        {...props}
        data-slot="split-button-action"
      />
    );
  },
);

const SplitButtonTrigger = forwardRef<ComponentRef<typeof Menu.Trigger>, SplitButtonTriggerProps>(
  function SplitButtonTrigger(
    { children, className, size, variant, 'aria-label': ariaLabel, ...props },
    ref,
  ) {
    const context = useSplitButtonContext('SplitButton.Trigger');
    const resolvedSize = size ?? context.size;
    const resolvedVariant = variant ?? context.variant;
    const isIconOnly = children == null;

    return (
      <Menu.Trigger
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
      </Menu.Trigger>
    );
  },
);

const SplitButtonPositioner = forwardRef<
  ComponentRef<typeof Menu.Positioner>,
  SplitButtonPositionerProps
>(function SplitButtonPositioner({ className, ...props }, ref) {
  return (
    <Menu.Positioner
      ref={ref}
      className={className}
      {...props}
      data-slot="split-button-positioner"
    />
  );
});

const SplitButtonContent = forwardRef<ComponentRef<typeof Menu.Content>, SplitButtonContentProps>(
  function SplitButtonContent({ asChild, children, className, ...props }, ref) {
    return (
      <Menu.Content
        ref={ref}
        asChild={asChild}
        className={className}
        {...props}
        data-slot="split-button-content"
      >
        {asChild ? children : <Menu.Viewport>{children}</Menu.Viewport>}
      </Menu.Content>
    );
  },
);

const SplitButton = Object.assign(SplitButtonRoot, {
  Root: SplitButtonRoot,
  Action: SplitButtonAction,
  Trigger: SplitButtonTrigger,
  Positioner: SplitButtonPositioner,
  Content: SplitButtonContent,
});

export { SplitButton };