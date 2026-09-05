import { Highlight as HighlightPrimitive } from '@ark-ui/solid/highlight';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './Highlight.module.css';

type HighlightRootProps = ComponentProps<typeof HighlightPrimitive> & {
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
};

function HighlightRoot(props: HighlightRootProps) {
  const [local, others] = splitProps(props, ['class', 'data-scope', 'data-part', 'data-slot']);

  return (
    <HighlightPrimitive
      {...others}
      data-scope="highlight"
      data-part="root"
      data-slot="highlight-root"
      class={clsx(styles.root, local.class)}
    />
  );
}

const Highlight = Object.assign(HighlightRoot, {
  Root: HighlightRoot,
});

export { Highlight };