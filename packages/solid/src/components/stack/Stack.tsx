import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './Stack.module.css';

type StackDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type StackRootProps = HTMLArkProps<'div'> & {
  direction?:
    | StackDirection
    | {
        mobile?: StackDirection;
        desktop?: StackDirection;
      };
  gap?: number | string;
  align?: JSX.CSSProperties['align-items'];
  justify?: JSX.CSSProperties['justify-content'];
  wrap?: JSX.CSSProperties['flex-wrap'];
  fill?: boolean;
};

const toCssLength = (value: number | string | undefined) =>
  typeof value === 'number' ? `${value}px` : value;

function StackRoot(props: StackRootProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'direction',
    'gap',
    'align',
    'justify',
    'wrap',
    'fill',
    'style',
  ]);

  const mobileDirection = () =>
    typeof local.direction === 'string'
      ? local.direction
      : (local.direction?.mobile ?? local.direction?.desktop);
  const desktopDirection = () =>
    typeof local.direction === 'string'
      ? local.direction
      : (local.direction?.desktop ?? local.direction?.mobile);

  const stackStyle = (): JSX.CSSProperties | string => {
    const mobile = mobileDirection();
    const desktop = desktopDirection();
    const generatedStyle: JSX.CSSProperties = {
      '--moduix-stack-direction-desktop': desktop ?? 'column',
      '--moduix-stack-direction-mobile': mobile ?? 'column',
      '--moduix-stack-flex': local.fill == null ? undefined : local.fill ? '1 1 0%' : 'initial',
      gap: toCssLength(local.gap),
      'align-items': local.align,
      'justify-content': local.justify,
      'flex-wrap': local.wrap,
    };

    if (typeof local.style === 'string') {
      const generatedStyleText = Object.entries(generatedStyle)
        .filter(([, value]) => value !== undefined)
        .map(([property, value]) => `${property}:${value}`)
        .join(';');

      return `${generatedStyleText}${generatedStyleText && local.style ? ';' : ''}${local.style}`;
    }

    return { ...generatedStyle, ...local.style };
  };

  return (
    <ark.div
      asChild={local.asChild}
      {...others}
      data-scope="stack"
      data-part="root"
      data-slot="stack-root"
      class={clsx(styles.root, local.class)}
      style={stackStyle()}
    />
  );
}

const Stack = Object.assign(StackRoot, {
  Root: StackRoot,
});

export { Stack };