import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { CloseButton } from '../close-button';
import styles from './Tag.module.css';

type TagVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type TagSize = 'sm' | 'md' | 'lg';
type TagRootProps = HTMLArkProps<'span'> & {
  variant?: TagVariant;
  size?: TagSize;
};

function Tag(props: TagRootProps) {
  const [local, others] = splitProps(props, ['class', 'size', 'variant']);

  return (
    <ark.span
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

function TagLabel(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      {...others}
      data-scope="tag"
      data-part="label"
      data-slot="tag-label"
      class={clsx(styles.label, local.class)}
    />
  );
}

function TagStartElement(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      {...others}
      data-scope="tag"
      data-part="start-element"
      data-slot="tag-start-element"
      class={clsx(styles.startElement, local.class)}
    />
  );
}

function TagEndElement(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      {...others}
      data-scope="tag"
      data-part="end-element"
      data-slot="tag-end-element"
      class={clsx(styles.endElement, local.class)}
    />
  );
}

function TagCloseTrigger(props: HTMLArkProps<'button'>) {
  const [local, others] = splitProps(props, ['aria-label', 'class']);

  return (
    <CloseButton
      {...others}
      data-scope="tag"
      data-part="close-trigger"
      data-slot="tag-close-trigger"
      aria-label={
        local['aria-label'] ?? (others['aria-labelledby'] == null ? a11yLabels.closeTag : undefined)
      }
      class={clsx(styles.closeTrigger, local.class)}
    />
  );
}

export { Tag, TagCloseTrigger, TagEndElement, TagLabel, TagStartElement };
export type { TagRootProps, TagSize, TagVariant };