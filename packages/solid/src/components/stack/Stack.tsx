import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './Stack.module.css';

type StackDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type StackSpacing =
  | '0'
  | '0.5'
  | '1'
  | '1.5'
  | '2'
  | '2.5'
  | '3'
  | '3.5'
  | '4'
  | '4.5'
  | '5'
  | '6'
  | '7'
  | '8'
  | '10';

type StackRootProps = HTMLArkProps<'div'> & {
  direction?: StackDirection | { mobile?: StackDirection; desktop?: StackDirection };
  gap?: number | StackSpacing | (string & {});
  align?: JSX.CSSProperties['align-items'];
  justify?: JSX.CSSProperties['justify-content'];
  wrap?: JSX.CSSProperties['flex-wrap'];
  fill?: boolean;
};

// A spacing step such as `'2'` or `'1.5'` reads `--moduix-spacing-*`, so presets rescale the gap;
// numbers are pixels and other strings are CSS lengths.
function toGap(value: number | string | undefined) {
  if (typeof value === 'number') return `${value}px`;
  return value && /^\d+(\.5)?$/.test(value)
    ? `var(--moduix-spacing-${value.replace('.', '-')})`
    : value;
}

function Stack(props: StackRootProps) {
  const [local, others] = splitProps(props, [
    'class',
    'style',
    'direction',
    'gap',
    'align',
    'justify',
    'wrap',
    'fill',
  ]);

  const style = (): JSX.CSSProperties | string => {
    const responsive =
      typeof local.direction === 'string' ? { mobile: local.direction } : local.direction;
    const layoutStyle: JSX.CSSProperties = {
      '--_stack-direction': responsive?.mobile,
      '--_stack-direction-desktop': responsive?.desktop,
      gap: toGap(local.gap),
      'align-items': local.align,
      'justify-content': local.justify,
      'flex-wrap': local.wrap,
    };

    if (typeof local.style !== 'string') {
      return { ...layoutStyle, ...local.style };
    }

    // A string style keeps its native form and stays last, so it overrides the generated layout.
    const layoutStyleText = Object.entries(layoutStyle)
      .filter(([, value]) => value != null)
      .map(([property, value]) => `${property}:${value};`)
      .join('');
    return layoutStyleText + local.style;
  };

  return (
    <ark.div
      {...others}
      data-scope="stack"
      data-part="root"
      data-slot="stack-root"
      class={clsx(styles.root, local.fill && styles.fill, local.class)}
      style={style()}
    />
  );
}

export { Stack };
export type { StackDirection, StackRootProps, StackSpacing };