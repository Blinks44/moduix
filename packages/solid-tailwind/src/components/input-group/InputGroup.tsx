import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import type { ComponentProps } from 'solid-js';
import { createContext, splitProps, useContext } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import { Button } from '../button';
import { CloseButton } from '../close-button';
import { Input, type InputSize } from '../input';
import { Textarea } from '../textarea';

type InputGroupSize = InputSize;

type InputGroupAddonAlign = 'inline' | 'block';

type InputGroupAddonProps = HTMLArkProps<'span'> & {
  align?: InputGroupAddonAlign;
};

type InputGroupProps = HTMLArkProps<'div'> & {
  size?: InputGroupSize;
};

const inputGroupPaddingVariants = {
  xs: 'px-2.5',
  sm: 'px-3',
  md: 'px-3.5',
  lg: 'px-4',
  xl: 'px-4.5',
};

const inputGroupRootVariants = cva(
  'flex w-full items-stretch overflow-hidden rounded-md border border-border bg-background text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-normal ease-in-out has-[>[data-align=block]]:flex-col focus-within:outline-ring has-[:is([data-slot=input-root],[data-slot=textarea-root]):is([data-invalid],[aria-invalid=true])]:border-destructive has-[:is([data-slot=input-root],[data-slot=textarea-root]):is([data-invalid],[aria-invalid=true])]:focus-within:outline-destructive has-[:is([data-slot=input-root],[data-slot=textarea-root]):is([data-disabled],:disabled)]:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100',
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

const inputGroupTextareaVariants = cva(
  'min-w-0 grow resize-none rounded-none border-0 bg-transparent outline-0 disabled:opacity-100 data-disabled:opacity-100',
  {
    variants: {
      size: inputGroupPaddingVariants,
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const inputGroupAddonVariants = cva(
  "inline-flex min-w-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap border-s border-e border-border bg-muted text-muted-foreground first:border-s-0 last:border-e-0 [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0 data-[align=block]:justify-start data-[align=block]:border-x-0 data-[align=block]:border-y data-[align=block]:py-2 data-[align=block]:first:border-t-0 data-[align=block]:last:border-b-0",
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
  "inline-flex min-w-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap text-muted-foreground [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0 data-[align=block]:justify-start data-[align=block]:py-2",
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
  'me-2 size-control-xs self-center focus-visible:outline-1 focus-visible:outline-offset-1 data-[size=xs]:size-5';

const InputGroupSizeContext = createContext((): InputGroupSize => 'md');

function InputGroup(props: InputGroupProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'size']);

  return (
    <InputGroupSizeContext.Provider value={() => local.size ?? 'md'}>
      <ark.div
        {...others}
        data-scope="input-group"
        data-part="root"
        data-slot="input-group-root"
        data-size={local.size ?? 'md'}
        class={cn(inputGroupRootVariants({ size: local.size }), local.class)}
      >
        {local.children}
      </ark.div>
    </InputGroupSizeContext.Provider>
  );
}

function InputGroupInput(props: ComponentProps<typeof Input>) {
  const [local, others] = splitProps(props, ['class', 'size']);
  const groupSize = useContext(InputGroupSizeContext);
  const inputSize = () => local.size ?? groupSize();

  return (
    <Input
      {...others}
      class={cn(inputGroupInputVariants({ size: inputSize() }), local.class)}
      size={inputSize()}
    />
  );
}

function InputGroupTextarea(props: ComponentProps<typeof Textarea>) {
  const [local, others] = splitProps(props, ['class', 'size']);
  const groupSize = useContext(InputGroupSizeContext);
  const textareaSize = () => local.size ?? groupSize();

  return (
    <Textarea
      {...others}
      class={cn(inputGroupTextareaVariants({ size: textareaSize() }), local.class)}
      size={textareaSize()}
    />
  );
}

function InputGroupAddon(props: InputGroupAddonProps) {
  const [local, others] = splitProps(props, ['align', 'class']);
  const groupSize = useContext(InputGroupSizeContext);

  return (
    <ark.span
      {...others}
      data-scope="input-group"
      data-part="addon"
      data-slot="input-group-addon"
      data-align={local.align ?? 'inline'}
      class={cn(inputGroupAddonVariants({ size: groupSize() }), local.class)}
    />
  );
}

function InputGroupText(props: InputGroupAddonProps) {
  const [local, others] = splitProps(props, ['align', 'class']);
  const groupSize = useContext(InputGroupSizeContext);

  return (
    <ark.span
      {...others}
      data-scope="input-group"
      data-part="text"
      data-slot="input-group-text"
      data-align={local.align ?? 'inline'}
      class={cn(inputGroupTextVariants({ size: groupSize() }), local.class)}
    />
  );
}

function InputGroupButton(props: ComponentProps<typeof Button>) {
  const [local, others] = splitProps(props, ['class', 'size', 'type', 'variant']);
  const groupSize = useContext(InputGroupSizeContext);

  return (
    <Button
      {...others}
      data-slot="input-group-button"
      class={cn(inputGroupButtonClass, local.class)}
      variant={local.variant ?? 'ghost'}
      size={local.size ?? groupSize()}
      type={local.type ?? 'button'}
    />
  );
}

function InputGroupClearTrigger(
  props: ComponentProps<typeof CloseButton> & { size?: InputGroupSize },
) {
  const [local, others] = splitProps(props, [
    'class',
    'children',
    'size',
    'type',
    'aria-label',
    'aria-labelledby',
  ]);
  const groupSize = useContext(InputGroupSizeContext);

  return (
    <CloseButton
      {...others}
      data-scope="input-group"
      data-part="clear-trigger"
      data-slot="input-group-clear-trigger"
      data-size={local.size ?? groupSize()}
      class={cn(inputGroupClearTriggerClass, local.class)}
      type={local.type ?? 'button'}
      aria-label={
        local['aria-label'] ??
        (local['aria-labelledby'] == null ? a11yLabels.clearInput : undefined)
      }
      aria-labelledby={local['aria-labelledby']}
    >
      {local.children ?? <CloseIcon class="size-4 shrink-0" />}
    </CloseButton>
  );
}

export {
  InputGroup,
  InputGroupClearTrigger,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};
export type { InputGroupAddonAlign, InputGroupSize };