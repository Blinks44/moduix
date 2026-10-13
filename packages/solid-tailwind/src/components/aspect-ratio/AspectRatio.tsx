import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type AspectRatioProps = HTMLArkProps<'div'> & {
  ratio?: number | undefined;
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
};

function AspectRatio(props: AspectRatioProps) {
  const [local, others] = splitProps(props, [
    'class',
    'ratio',
    'style',
    'data-scope',
    'data-part',
    'data-slot',
  ]);
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
      class={cn('relative block aspect-[var(--_aspect-ratio-value)] min-h-0 w-full', local.class)}
      style={aspectRatioStyle()}
    />
  );
}

// Invalid ratios, such as `0 / 0` before media metadata loads, fall back to a square frame.
function toAspectRatioValue(ratio = 1) {
  return Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
}

export { AspectRatio };