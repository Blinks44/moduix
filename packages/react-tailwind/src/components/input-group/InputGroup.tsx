'use client';

import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentProps,
  type ComponentRef,
} from 'react';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import { Button } from '../button';
import { CloseButton } from '../close-button';
import { Input, type InputSize } from '../input';

type InputGroupSize = InputSize;

const inputGroupPaddingVariants = {
  xs: 'px-2.5',
  sm: 'px-3',
  md: 'px-3.5',
  lg: 'px-4',
  xl: 'px-4.5',
};

const inputGroupRootVariants = cva(
  'flex w-full items-stretch overflow-hidden rounded-md border border-border bg-background text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out focus-within:outline-ring has-[[data-slot=input-root]:is([data-invalid],[aria-invalid=true])]:border-destructive has-[[data-slot=input-root]:is([data-invalid],[aria-invalid=true])]:focus-within:outline-destructive has-[[data-slot=input-root]:is([data-disabled],:disabled)]:opacity-50 [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100 motion-reduce:transition-none',
  {
    variants: {
      size: {
        xs: 'min-h-control-xs text-xs leading-4',
        sm: 'min-h-control-sm text-sm leading-5',
        md: 'min-h-control-md text-md leading-6',
        lg: 'min-h-control-lg text-lg leading-7',
        xl: 'min-h-control-xl text-lg leading-7',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const inputGroupInputVariants = cva('min-h-0 grow rounded-none border-0 bg-transparent outline-0', {
  variants: {
    size: inputGroupPaddingVariants,
  },
  defaultVariants: {
    size: 'md',
  },
});

const inputGroupAddonVariants = cva(
  'inline-flex min-w-0 items-center justify-center gap-2 truncate border-s border-e border-border bg-muted text-muted-foreground first:border-s-0 last:border-e-0 [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      size: inputGroupPaddingVariants,
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const inputGroupTextVariants = cva(
  'inline-flex min-w-0 items-center justify-center gap-2 truncate text-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      size: inputGroupPaddingVariants,
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const inputGroupButtonClass = 'h-auto min-h-0 self-stretch rounded-none border-0 py-0';

const inputGroupClearTriggerClass =
  'me-2 size-control-xs self-center focus-visible:outline-1 focus-visible:outline-offset-1 motion-reduce:transition-none data-[size=xs]:size-5';

const InputGroupSizeContext = createContext<InputGroupSize>('md');

const InputGroup = forwardRef<
  HTMLDivElement,
  HTMLArkProps<'div'> & {
    size?: InputGroupSize;
  }
>(function InputGroup({ children, className, size = 'md', ...props }, ref) {
  return (
    <InputGroupSizeContext.Provider value={size}>
      <ark.div
        ref={ref}
        {...props}
        data-scope="input-group"
        data-part="root"
        data-slot="input-group-root"
        data-size={size}
        className={cn(inputGroupRootVariants({ size }), className)}
      >
        {children}
      </ark.div>
    </InputGroupSizeContext.Provider>
  );
});

const InputGroupInput = forwardRef<ComponentRef<typeof Input>, ComponentProps<typeof Input>>(
  function InputGroupInput({ className, size, ...props }, ref) {
    const groupSize = useContext(InputGroupSizeContext);
    const inputSize = size ?? groupSize;

    return (
      <Input
        ref={ref}
        className={cn(inputGroupInputVariants({ size: inputSize }), className)}
        size={inputSize}
        {...props}
      />
    );
  },
);

const InputGroupAddon = forwardRef<HTMLSpanElement, HTMLArkProps<'span'>>(function InputGroupAddon(
  { className, ...props },
  ref,
) {
  const groupSize = useContext(InputGroupSizeContext);

  return (
    <ark.span
      ref={ref}
      {...props}
      data-scope="input-group"
      data-part="addon"
      data-slot="input-group-addon"
      className={cn(inputGroupAddonVariants({ size: groupSize }), className)}
    />
  );
});

const InputGroupText = forwardRef<HTMLSpanElement, HTMLArkProps<'span'>>(function InputGroupText(
  { className, ...props },
  ref,
) {
  const groupSize = useContext(InputGroupSizeContext);

  return (
    <ark.span
      ref={ref}
      {...props}
      data-scope="input-group"
      data-part="text"
      data-slot="input-group-text"
      className={cn(inputGroupTextVariants({ size: groupSize }), className)}
    />
  );
});

const InputGroupButton = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
  function InputGroupButton(
    { className, variant = 'ghost', size, type = 'button', ...props },
    ref,
  ) {
    const groupSize = useContext(InputGroupSizeContext);

    return (
      <Button
        ref={ref}
        {...props}
        data-slot="input-group-button"
        className={cn(inputGroupButtonClass, className)}
        variant={variant}
        size={size ?? groupSize}
        type={type}
      />
    );
  },
);

const InputGroupClearTrigger = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof CloseButton> & { size?: InputGroupSize }
>(function InputGroupClearTrigger(
  {
    className,
    children,
    size,
    type = 'button',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  },
  ref,
) {
  const groupSize = useContext(InputGroupSizeContext);

  return (
    <CloseButton
      ref={ref}
      {...props}
      data-scope="input-group"
      data-part="clear-trigger"
      data-slot="input-group-clear-trigger"
      data-size={size ?? groupSize}
      className={cn(inputGroupClearTriggerClass, className)}
      type={type}
      aria-label={ariaLabel ?? (ariaLabelledBy == null ? a11yLabels.clearInput : undefined)}
      aria-labelledby={ariaLabelledBy}
    >
      {children ?? <CloseIcon className="size-4 shrink-0" />}
    </CloseButton>
  );
});

export {
  InputGroup,
  InputGroupClearTrigger,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
};
export type { InputGroupSize };