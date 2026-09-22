import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type StackDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type StackProps = HTMLArkProps<'div'> & {
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

const stackVariants = cva('flex', {
  variants: {
    mobileDirection: {
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
      column: 'flex-col',
      'column-reverse': 'flex-col-reverse',
    },
    desktopDirection: {
      row: 'sm:flex-row',
      'row-reverse': 'sm:flex-row-reverse',
      column: 'sm:flex-col',
      'column-reverse': 'sm:flex-col-reverse',
    },
    fill: {
      true: 'flex-1',
      false: '',
    },
  },
  defaultVariants: {
    mobileDirection: 'column',
  },
});

const toCssLength = (value: number | string | undefined) =>
  typeof value === 'number' ? `${value}px` : value;

function Stack(props: StackProps) {
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
    const generatedStyle: JSX.CSSProperties = {
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
      class={cn(
        stackVariants({
          mobileDirection: mobileDirection(),
          desktopDirection: desktopDirection(),
          fill: local.fill,
        }),
        local.class,
      )}
      style={stackStyle()}
    />
  );
}

export { Stack };
