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
import { cn } from '@/internal/cn';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import { Button } from '../button';
import { CloseButton } from '../close-button';
import { Input } from '../input';

type InputGroupSize = NonNullable<ComponentProps<typeof Input>['size']>;

const inputGroupSizeVariants = {
  xs: 'px-2.5 text-xs leading-4',
  sm: 'px-3 text-sm leading-5',
  md: 'px-3.5 text-md leading-6',
  lg: 'px-4 text-lg leading-7',
  xl: 'px-4.5 text-lg leading-7',
};

const inputGroupRootVariants = cva(
  'flex w-full max-w-none items-stretch overflow-hidden rounded-md border border-border bg-background text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out focus-within:outline-ring has-[[data-slot=input-root][data-invalid]]:border-destructive has-[[data-slot=input-root][data-invalid]]:focus-within:outline-destructive has-[[data-slot=input-root][aria-invalid=true]]:border-destructive has-[[data-slot=input-root][aria-invalid=true]]:focus-within:outline-destructive has-[[data-slot=input-root][data-disabled]]:opacity-50 has-[[data-slot=input-root]:disabled]:opacity-50 [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100 motion-reduce:transition-none',
  {
    variants: {
      size: {
        xs: 'min-h-control-xs',
        sm: 'min-h-control-sm',
        md: 'min-h-control-md',
        lg: 'min-h-control-lg',
        xl: 'min-h-control-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const inputGroupInputVariants = cva(
  'min-h-0 min-w-0 grow basis-auto rounded-none border-0 bg-transparent outline-0',
  {
    variants: {
      size: inputGroupSizeVariants,
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const inputGroupAddonVariants = cva(
  'inline-flex min-w-0 items-center justify-center gap-2 truncate bg-muted text-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 border-s border-e border-border first:border-s-0 last:border-e-0',
  {
    variants: {
      size: inputGroupSizeVariants,
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const inputGroupTextVariants = cva(
  'inline-flex min-w-0 items-center justify-center gap-2 truncate bg-transparent text-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      size: inputGroupSizeVariants,
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const inputGroupButtonClass = 'h-auto self-stretch rounded-none border-0';

const inputGroupClearTriggerVariants = cva(
  'me-2 size-control-xs self-center focus-visible:outline-1 focus-visible:outline-offset-1 motion-reduce:transition-none',
  {
    variants: { size: { xs: 'size-5', sm: '', md: '', lg: '', xl: '' } },
    defaultVariants: { size: 'md' },
  },
);

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
    const buttonSize = size ?? groupSize;

    return (
      <Button
        ref={ref}
        {...props}
        data-slot="input-group-button"
        className={cn(inputGroupButtonClass, className)}
        variant={variant}
        size={buttonSize}
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
      className={cn(inputGroupClearTriggerVariants({ size: size ?? groupSize }), className)}
      type={type}
      aria-label={ariaLabel ?? (ariaLabelledBy == null ? 'Clear input' : undefined)}
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