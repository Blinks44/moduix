import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import styles from './Spinner.module.css';

type SpinnerProps = HTMLArkProps<'span'> & {
  size?: 'inherit' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  decorative?: boolean;
};

function Spinner(props: SpinnerProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'children',
    'class',
    'decorative',
    'aria-label',
    'aria-labelledby',
    'size',
  ]);
  const decorative = () => local.decorative ?? false;
  const accessibleLabel = () =>
    decorative()
      ? undefined
      : (local['aria-label'] ?? (local['aria-labelledby'] ? undefined : 'Loading'));

  return (
    <ark.span
      asChild={local.asChild}
      {...others}
      data-scope="spinner"
      data-part="root"
      data-slot="spinner-root"
      data-size={local.size ?? 'md'}
      role={decorative() && !local.asChild ? 'presentation' : decorative() ? undefined : 'status'}
      aria-hidden={decorative() && !local.asChild ? true : undefined}
      aria-label={accessibleLabel()}
      aria-labelledby={decorative() ? undefined : local['aria-labelledby']}
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
