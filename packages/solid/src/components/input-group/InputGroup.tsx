import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { Accessor, ComponentProps } from 'solid-js';
import { createContext, splitProps, useContext } from 'solid-js';
import { Button } from '../button';
import { Input } from '../input';
import styles from './InputGroup.module.css';

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
        class={clsx(styles.root, local.class)}
      >
        {local.children}
      </ark.div>
    </InputGroupSizeContext.Provider>
  );
}

function InputGroupInput(props: ComponentProps<typeof Input>) {
  const [local, others] = splitProps(props, ['class', 'size']);
  const groupSize = useContext(InputGroupSizeContext) ?? defaultInputGroupSizeAccessor;

  return (
    <Input {...others} class={clsx(styles.input, local.class)} size={local.size ?? groupSize()} />
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

  return (
    <ark.span
      asChild={local.asChild}
      {...others}
      data-scope="input-group"
      data-part="addon"
      data-slot="input-group-addon"
      class={clsx(styles.addon, local.class)}
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

  return (
    <ark.span
      asChild={local.asChild}
      {...others}
      data-scope="input-group"
      data-part="text"
      data-slot="input-group-text"
      class={clsx(styles.text, local.class)}
    />
  );
}

function InputGroupButton(props: ComponentProps<typeof Button>) {
  const [local, others] = splitProps(props, ['class', 'size', 'type', 'variant']);
  const groupSize = useContext(InputGroupSizeContext) ?? defaultInputGroupSizeAccessor;

  return (
    <Button
      {...others}
      data-slot="input-group-button"
      class={clsx(styles.button, local.class)}
      variant={local.variant ?? 'ghost'}
      size={local.size ?? groupSize()}
      type={local.type ?? 'button'}
    />
  );
}

export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText };