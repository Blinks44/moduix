import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import type { Accessor, ComponentProps } from 'solid-js';
import { createContext, splitProps, useContext } from 'solid-js';
import { cn } from '@/internal/cn';
import { Button } from '../button';
import { Input } from '../input';

type InputGroupSize = NonNullable<ComponentProps<typeof Input>['size']>;

type InputGroupDataProps = {
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
};

type InputGroupProps = HTMLArkProps<'div'> &
  InputGroupDataProps & {
    size?: InputGroupSize;
    'data-size'?: string;
  };

const inputGroupSizeVariants = {
  xs: 'px-2.5 text-xs leading-4',
  sm: 'px-3 text-sm leading-5',
  md: 'px-3.5 text-md leading-6',
  lg: 'px-4 text-lg leading-7',
  xl: 'px-4.5 text-lg leading-7',
};

const inputGroupRootVariants = cva(
  'flex w-full max-w-none items-stretch overflow-hidden rounded-md border border-border bg-background text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out focus-within:outline-ring has-[[data-slot=input-root][data-invalid]]:border-destructive has-[[data-slot=input-root][data-invalid]]:focus-within:outline-destructive has-[[data-slot=input-root][aria-invalid=true]]:border-destructive has-[[data-slot=input-root][aria-invalid=true]]:focus-within:outline-destructive has-[[data-slot=input-root][data-disabled]]:opacity-50 has-[[data-slot=input-root]:disabled]:opacity-50 motion-reduce:transition-none',
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

const defaultInputGroupSize: InputGroupSize = 'md';
const defaultInputGroupSizeAccessor: Accessor<InputGroupSize> = () => defaultInputGroupSize;
const InputGroupSizeContext = createContext(defaultInputGroupSizeAccessor);

function InputGroup(props: InputGroupProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'children',
    'class',
    'data-part',
    'data-scope',
    'data-size',
    'data-slot',
    'size',
  ]);

  return (
    <InputGroupSizeContext.Provider value={() => local.size ?? defaultInputGroupSize}>
      <ark.div
        asChild={local.asChild}
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
  const groupSize = useContext(InputGroupSizeContext) ?? defaultInputGroupSizeAccessor;
  const inputSize = () => local.size ?? groupSize();

  return (
    <Input
      {...others}
      class={cn(inputGroupInputVariants({ size: inputSize() }), local.class)}
      size={inputSize()}
    />
  );
}

function InputGroupAddon(props: HTMLArkProps<'span'> & InputGroupDataProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'data-part',
    'data-scope',
    'data-slot',
  ]);
  const groupSize = useContext(InputGroupSizeContext) ?? defaultInputGroupSizeAccessor;

  return (
    <ark.span
      asChild={local.asChild}
      {...others}
      data-scope="input-group"
      data-part="addon"
      data-slot="input-group-addon"
      class={cn(inputGroupAddonVariants({ size: groupSize() }), local.class)}
    />
  );
}

function InputGroupText(props: HTMLArkProps<'span'> & InputGroupDataProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'data-part',
    'data-scope',
    'data-slot',
  ]);
  const groupSize = useContext(InputGroupSizeContext) ?? defaultInputGroupSizeAccessor;

  return (
    <ark.span
      asChild={local.asChild}
      {...others}
      data-scope="input-group"
      data-part="text"
      data-slot="input-group-text"
      class={cn(inputGroupTextVariants({ size: groupSize() }), local.class)}
    />
  );
}

function InputGroupButton(props: ComponentProps<typeof Button>) {
  const [local, others] = splitProps(props, ['class', 'size', 'type', 'variant']);
  const groupSize = useContext(InputGroupSizeContext) ?? defaultInputGroupSizeAccessor;
  const buttonSize = () => local.size ?? groupSize();

  return (
    <Button
      {...others}
      data-slot="input-group-button"
      class={cn(inputGroupButtonClass, local.class)}
      variant={local.variant ?? 'ghost'}
      size={buttonSize()}
      type={local.type ?? 'button'}
    />
  );
}

export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText };
