import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './AspectRatio.module.css';

type AspectRatioRootProps = HTMLArkProps<'div'> & {
  ratio?: number | undefined;
};

function AspectRatio(props: AspectRatioRootProps) {
  const [local, others] = splitProps(props, ['class', 'ratio', 'style']);
  const aspectRatioStyle = (): JSX.CSSProperties | string => {
    const ratio = toAspectRatioValue(local.ratio);

    if (typeof local.style === 'string') {
      return `${local.style};--_aspect-ratio-value:${ratio}`;
    }

    return { ...local.style, '--_aspect-ratio-value': ratio };
  };

  return (
    <ark.div
      {...others}
      data-scope="aspect-ratio"
      data-part="root"
      data-slot="aspect-ratio-root"
      class={clsx(styles.root, local.class)}
      style={aspectRatioStyle()}
    />
  );
}

// Invalid ratios, such as `0 / 0` before media metadata loads, fall back to a square frame.
function toAspectRatioValue(ratio = 1) {
  return Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
}

export { AspectRatio };
export type { AspectRatioRootProps };