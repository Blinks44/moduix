import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { children as resolveChildren, splitProps } from 'solid-js';
import { CloseButton } from '../close-button';
import styles from './Tag.module.css';

type TagVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type TagSize = 'sm' | 'md';
type TagProps = HTMLArkProps<'span'> & {
  variant?: TagVariant;
  size?: TagSize;
};
type TagLabelProps = HTMLArkProps<'span'>;
type TagStartElementProps = HTMLArkProps<'span'>;
type TagEndElementProps = HTMLArkProps<'span'>;
type TagCloseTriggerProps = HTMLArkProps<'button'>;

const DEFAULT_CLOSE_LABEL = 'Remove tag';

function Tag(props: TagProps) {
  const [local, others] = splitProps(props, ['asChild', 'class', 'size', 'variant']);

  return (
    <ark.span
      asChild={local.asChild}
      {...others}
      data-scope="tag"
      data-part="root"
      data-slot="tag-root"
      data-size={local.size ?? 'md'}
      data-variant={local.variant ?? 'default'}
      class={clsx(styles.root, local.class)}
    />
  );
}

function TagLabel(props: TagLabelProps) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.span
      asChild={local.asChild}
      {...others}
      data-scope="tag"
      data-part="label"
      data-slot="tag-label"
      class={clsx(styles.label, local.class)}
    />
  );
}

function TagStartElement(props: TagStartElementProps) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.span
      asChild={local.asChild}
      {...others}
      data-scope="tag"
      data-part="start-element"
      data-slot="tag-start-element"
      class={clsx(styles.startElement, local.class)}
    />
  );
}

function TagEndElement(props: TagEndElementProps) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.span
      asChild={local.asChild}
      {...others}
      data-scope="tag"
      data-part="end-element"
      data-slot="tag-end-element"
      class={clsx(styles.endElement, local.class)}
    />
  );
}

function TagCloseTrigger(props: TagCloseTriggerProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'aria-label',
    'aria-labelledby',
    'children',
    'class',
  ]);
  const resolvedChildren = resolveChildren(() => local.children);

  return (
    <CloseButton
      asChild={local.asChild}
      {...others}
      data-scope="tag"
      data-part="close-trigger"
      data-slot="tag-close-trigger"
      aria-label={
        local['aria-label'] ??
        (!local.asChild && resolvedChildren() == null && local['aria-labelledby'] == null
          ? DEFAULT_CLOSE_LABEL
          : undefined)
      }
      aria-labelledby={local['aria-labelledby']}
      class={clsx(styles.closeTrigger, local.class)}
    >
      {local.children}
    </CloseButton>
  );
}

export { Tag, TagCloseTrigger, TagEndElement, TagLabel, TagStartElement };
