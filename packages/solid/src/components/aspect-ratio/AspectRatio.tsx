import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './AspectRatio.module.css';

type AspectRatioRootProps = HTMLArkProps<'div'> & {
  ratio: number;
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
};

function AspectRatioRoot(props: AspectRatioRootProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'ratio',
    'style',
    'data-scope',
    'data-part',
    'data-slot',
  ]);
  const aspectRatioStyle = (): JSX.CSSProperties | string => {
    const ratio = local.ratio;

    if (!Number.isFinite(ratio) || ratio <= 0) {
      throw new RangeError('AspectRatio `ratio` must be a finite number greater than zero.');
    }

    if (typeof local.style === 'string') {
      return `${local.style};--_aspect-ratio-value:${ratio}`;
    }

    return { ...local.style, '--_aspect-ratio-value': ratio };
  };

  return (
    <ark.div
      asChild={local.asChild}
      {...others}
      data-scope="aspect-ratio"
      data-part="root"
      data-slot="aspect-ratio-root"
      class={clsx(styles.root, local.class)}
      style={aspectRatioStyle()}
    />
  );
}

const AspectRatio = Object.assign(AspectRatioRoot, {
  Root: AspectRatioRoot,
});

export { AspectRatio };