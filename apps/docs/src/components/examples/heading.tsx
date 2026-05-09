import { Heading, type HeadingProps } from 'moduix';
import type { CssPropertyInput } from '../preview';
import styles from './heading.module.css';

export const headingCssProperties: CssPropertyInput[] = [
  ['--heading-color', 'var(--color-foreground)', 'Controls heading text color.'],
  ['--heading-font-family', 'var(--font-sans)', 'Controls heading font family.'],
  ['--heading-letter-spacing', '0', 'Controls heading letter spacing.'],
  ['--heading-text-wrap', 'balance', 'Controls heading text wrapping.'],
  ['--heading-font-size-2xl', 'var(--text-3xl)', 'Controls `2xl` heading font size.'],
  [
    '--heading-line-height-2xl',
    'var(--line-height-text-3xl)',
    'Controls `2xl` heading line height.',
  ],
];

export function HeadingExample(props: HeadingProps) {
  return <Heading {...props}>Build reliable interfaces</Heading>;
}

export function HeadingElementsExample() {
  return (
    <div className={styles.stack}>
      <Heading as="h1">Heading level 1</Heading>
      <Heading as="h2">Heading level 2</Heading>
      <Heading as="h3">Heading level 3</Heading>
      <Heading as="h4">Heading level 4</Heading>
      <Heading as="h5">Heading level 5</Heading>
      <Heading as="h6">Heading level 6</Heading>
    </div>
  );
}

export function HeadingSizesExample() {
  return (
    <div className={styles.stack}>
      <Heading as="h2" size="2xl">
        Extra-large heading
      </Heading>
      <Heading as="h2" size="xl">
        Large heading
      </Heading>
      <Heading as="h2" size="lg">
        Medium-large heading
      </Heading>
      <Heading as="h2" size="md">
        Medium heading
      </Heading>
      <Heading as="h2" size="sm">
        Small heading
      </Heading>
      <Heading as="h2" size="xs">
        Extra-small heading
      </Heading>
    </div>
  );
}

export function HeadingWeightsExample() {
  return (
    <div className={styles.stack}>
      <Heading as="h2" weight="regular">
        Regular weight
      </Heading>
      <Heading as="h2" weight="medium">
        Medium weight
      </Heading>
      <Heading as="h2" weight="semibold">
        Semibold weight
      </Heading>
      <Heading as="h2" weight="bold">
        Bold weight
      </Heading>
    </div>
  );
}

export function HeadingAlignedExample() {
  return (
    <div className={styles.aligned}>
      <Heading as="h2" align="left">
        Left aligned
      </Heading>
      <Heading as="h2" align="center">
        Center aligned
      </Heading>
      <Heading as="h2" align="right">
        Right aligned
      </Heading>
    </div>
  );
}

export function HeadingSemanticExample() {
  return (
    <Heading as="h2" size="2xl">
      Page title rendered as h2
    </Heading>
  );
}

export function CustomStylesHeadingExample() {
  return (
    <Heading as="h2" className={styles.customHeading}>
      Customized heading
    </Heading>
  );
}