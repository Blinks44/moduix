import { Highlight as HighlightPrimitive } from '@ark-ui/solid/highlight';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './Highlight.module.css';

type HighlightProps = ComponentProps<typeof HighlightPrimitive>;

function Highlight(props: HighlightProps) {
  const [local, others] = splitProps(props, ['class']);

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

export { Highlight };