import type { ComponentProps } from 'react';
import { Heading } from 'moduix';
import type { CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

export const headingOverrideCssProperties = [
  {
    name: '--heading-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls heading text color.',
  },
  {
    name: '--heading-font-family',
    defaultValue: 'var(--font-sans)',
    description: 'Controls heading font family.',
  },
  {
    name: '--heading-font-size',
    defaultValue: 'size-dependent',
    description: 'Controls heading font size for all sizes.',
  },
  {
    name: '--heading-font-size-xs',
    defaultValue: 'var(--text-sm)',
    description: 'Controls `xs` heading font size.',
  },
  {
    name: '--heading-font-size-sm',
    defaultValue: 'var(--text-md)',
    description: 'Controls `sm` heading font size.',
  },
  {
    name: '--heading-font-size-md',
    defaultValue: 'var(--text-lg)',
    description: 'Controls `md` heading font size.',
  },
  {
    name: '--heading-font-size-lg',
    defaultValue: 'var(--text-xl)',
    description: 'Controls `lg` heading font size.',
  },
  {
    name: '--heading-font-size-xl',
    defaultValue: 'var(--text-2xl)',
    description: 'Controls `xl` heading font size.',
  },
  {
    name: '--heading-font-size-2xl',
    defaultValue: 'var(--text-3xl)',
    description: 'Controls `2xl` heading font size.',
  },
  {
    name: '--heading-font-weight',
    defaultValue: 'var(--weight-semibold)',
    description: 'Controls heading font weight.',
  },
  {
    name: '--heading-font-weight-bold',
    defaultValue: 'var(--weight-bold)',
    description: 'Controls `bold` heading font weight.',
  },
  {
    name: '--heading-font-weight-medium',
    defaultValue: 'var(--weight-medium)',
    description: 'Controls `medium` heading font weight.',
  },
  {
    name: '--heading-font-weight-regular',
    defaultValue: 'var(--weight-regular)',
    description: 'Controls `regular` heading font weight.',
  },
  {
    name: '--heading-font-weight-semibold',
    defaultValue: 'var(--weight-semibold)',
    description: 'Controls `semibold` heading font weight.',
  },
  {
    name: '--heading-letter-spacing',
    defaultValue: '0',
    description: 'Controls heading letter spacing.',
  },
  {
    name: '--heading-line-height',
    defaultValue: 'size-dependent',
    description: 'Controls heading line height for all sizes.',
  },
  {
    name: '--heading-line-height-xs',
    defaultValue: 'var(--line-height-text-sm)',
    description: 'Controls `xs` heading line height.',
  },
  {
    name: '--heading-line-height-sm',
    defaultValue: 'var(--line-height-text-md)',
    description: 'Controls `sm` heading line height.',
  },
  {
    name: '--heading-line-height-md',
    defaultValue: 'var(--line-height-text-lg)',
    description: 'Controls `md` heading line height.',
  },
  {
    name: '--heading-line-height-lg',
    defaultValue: 'var(--line-height-text-xl)',
    description: 'Controls `lg` heading line height.',
  },
  {
    name: '--heading-line-height-xl',
    defaultValue: 'var(--line-height-text-2xl)',
    description: 'Controls `xl` heading line height.',
  },
  {
    name: '--heading-line-height-2xl',
    defaultValue: 'var(--line-height-text-3xl)',
    description: 'Controls `2xl` heading line height.',
  },
  {
    name: '--heading-text-wrap',
    defaultValue: 'balance',
    description: 'Controls heading text wrapping.',
  },
] satisfies CssPropertyInput[];

export function HeadingCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={headingOverrideCssProperties} />;
}

export function HeadingExample(props: ComponentProps<typeof Heading>) {
  return <Heading {...props}>Build reliable interfaces</Heading>;
}

export function HeadingElementsExample() {
  return (
    <div className="heading-stack">
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
    <div className="heading-stack">
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
    <div className="heading-stack">
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

export function HeadingSemanticLevelExample() {
  return (
    <Heading as="h2" size="2xl">
      Page title rendered as h2
    </Heading>
  );
}

export function CustomStylingHeadingExample() {
  return (
    <Heading as="h2" className="heading-custom">
      Customized heading
    </Heading>
  );
}