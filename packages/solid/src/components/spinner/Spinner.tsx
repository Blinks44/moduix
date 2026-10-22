import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import styles from './Spinner.module.css';

type SpinnerSize = 'inherit' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type SpinnerRootProps = HTMLArkProps<'span'> & {
  size?: SpinnerSize;
  decorative?: boolean;
};

function Spinner(props: SpinnerRootProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'children',
    'class',
    'decorative',
    'aria-label',
    'size',
  ]);

  return (
    <ark.span
      asChild={local.asChild}
      {...others}
      data-scope="spinner"
      data-part="root"
      data-slot="spinner-root"
      data-size={local.size ?? 'md'}
      role={local.decorative ? undefined : 'status'}
      aria-hidden={local.decorative || undefined}
      aria-label={
        local['aria-label'] ??
        (local.decorative || others['aria-labelledby'] ? undefined : a11yLabels.loading)
      }
      class={clsx(styles.root, local.class)}
    >
      <span
        data-scope="spinner"
        data-part="indicator"
        data-slot="spinner-indicator"
        class={styles.indicator}
        aria-hidden="true"
      >
        {local.children ?? (
          <span
            data-scope="spinner"
            data-part="ring"
            data-slot="spinner-ring"
            class={styles.ring}
          />
        )}
      </span>
    </ark.span>
  );
}

export { Spinner };
export type { SpinnerRootProps, SpinnerSize };