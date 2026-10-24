import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { createContext, splitProps, useContext } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import { Button } from '../button';
import { CloseButton } from '../close-button';
import { Input, type InputSize } from '../input';
import { Textarea } from '../textarea';
import styles from './InputGroup.module.css';

type InputGroupSize = InputSize;

type InputGroupAddonAlign = 'inline' | 'block';

type InputGroupAddonProps = HTMLArkProps<'span'> & {
  align?: InputGroupAddonAlign;
};

type InputGroupProps = HTMLArkProps<'div'> & {
  size?: InputGroupSize;
};

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
        class={clsx(styles.root, local.class)}
      >
        {local.children}
      </ark.div>
    </InputGroupSizeContext.Provider>
  );
}

function InputGroupInput(props: ComponentProps<typeof Input>) {
  const [local, others] = splitProps(props, ['class', 'size']);
  const groupSize = useContext(InputGroupSizeContext);

  return (
    <Input {...others} class={clsx(styles.input, local.class)} size={local.size ?? groupSize()} />
  );
}

function InputGroupTextarea(props: ComponentProps<typeof Textarea>) {
  const [local, others] = splitProps(props, ['class', 'size']);
  const groupSize = useContext(InputGroupSizeContext);

  return (
    <Textarea
      {...others}
      class={clsx(styles.textarea, local.class)}
      size={local.size ?? groupSize()}
    />
  );
}

function InputGroupAddon(props: InputGroupAddonProps) {
  const [local, others] = splitProps(props, ['align', 'class']);

  return (
    <ark.span
      {...others}
      data-scope="input-group"
      data-part="addon"
      data-slot="input-group-addon"
      data-align={local.align ?? 'inline'}
      class={clsx(styles.addon, local.class)}
    />
  );
}

function InputGroupText(props: InputGroupAddonProps) {
  const [local, others] = splitProps(props, ['align', 'class']);

  return (
    <ark.span
      {...others}
      data-scope="input-group"
      data-part="text"
      data-slot="input-group-text"
      data-align={local.align ?? 'inline'}
      class={clsx(styles.text, local.class)}
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
      class={clsx(styles.button, local.class)}
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
      class={clsx(styles.clearTrigger, local.class)}
      type={local.type ?? 'button'}
      aria-label={
        local['aria-label'] ??
        (local['aria-labelledby'] == null ? a11yLabels.clearInput : undefined)
      }
      aria-labelledby={local['aria-labelledby']}
    >
      {local.children ?? <CloseIcon />}
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