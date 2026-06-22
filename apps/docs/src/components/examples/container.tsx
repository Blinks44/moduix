import type { ComponentProps } from 'react';
import { Bleed, Container, Heading, Text } from '@moduix/react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './container.module.css';

export const containerOverrideCssProperties = [
  {
    name: '--container-gutter-sm',
    defaultValue: 'clamp(0.75rem, 3vw, 1.5rem)',
    description: 'Controls small inline gutters.',
  },
  {
    name: '--container-gutter-md',
    defaultValue: 'clamp(1rem, 4vw, 2rem)',
    description: 'Controls medium inline gutters.',
  },
  {
    name: '--container-gutter-lg',
    defaultValue: 'clamp(1.5rem, 5vw, 3rem)',
    description: 'Controls large inline gutters.',
  },
  {
    name: '--container-max-width-xs',
    defaultValue: '40rem',
    description: 'Controls the `xs` content width.',
  },
  {
    name: '--container-max-width-sm',
    defaultValue: '48rem',
    description: 'Controls the `sm` content width.',
  },
  {
    name: '--container-max-width-md',
    defaultValue: '64rem',
    description: 'Controls the `md` content width.',
  },
  {
    name: '--container-max-width-lg',
    defaultValue: '72rem',
    description: 'Controls the `lg` content width.',
  },
  {
    name: '--container-max-width-xl',
    defaultValue: '90rem',
    description: 'Controls the `xl` content width.',
  },
] satisfies CssPropertyInput[];

const containerContent = {
  title: 'Responsive page content',
  description: 'The content column stays readable while inline gutters fluidly adapt.',
};

const containerSizes = [
  { value: 'xs', label: 'Extra small' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra large' },
  { value: 'full', label: 'Full width' },
] as const;

const containerGutters = [
  { value: 'none', label: 'No gutter' },
  { value: 'sm', label: 'Small gutter' },
  { value: 'md', label: 'Medium gutter' },
  { value: 'lg', label: 'Large gutter' },
] as const;

const semanticContent = {
  title: 'Main content area',
  description: 'Use asChild when the wrapper should carry semantic meaning.',
};

const bleedContent = {
  title: 'Article body',
  description:
    'Keep the reading width constrained, then use Bleed for elements that should stretch wider.',
  callout: 'Bleed content escapes the constrained column.',
};

const customContent = {
  label: 'Customized max width and gutters',
};

export function ContainerCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={containerOverrideCssProperties} />;
}

export function ContainerExample(props: ComponentProps<typeof Container>) {
  return (
    <div className={styles.viewport}>
      <Container className={styles.container} {...props}>
        <Heading as="h3" size="lg">
          {containerContent.title}
        </Heading>
        <Text tone="muted">{containerContent.description}</Text>
      </Container>
    </div>
  );
}

export function ContainerSizesExample() {
  return (
    <div className={styles.viewport}>
      <div className={styles.stack}>
        {containerSizes.map((size) => (
          <Container key={size.value} size={size.value} className={styles.container}>
            <Text weight="semibold">
              {size.label}: size=&quot;{size.value}&quot;
            </Text>
          </Container>
        ))}
      </div>
    </div>
  );
}

export function ContainerGuttersExample() {
  return (
    <div className={styles.viewport}>
      <div className={styles.stack}>
        {containerGutters.map((gutter) => (
          <Container key={gutter.value} gutter={gutter.value} className={styles.container}>
            <Text weight="semibold">{gutter.label}</Text>
          </Container>
        ))}
      </div>
    </div>
  );
}

export function ContainerSemanticExample() {
  return (
    <div className={styles.viewport}>
      <Container asChild size="md" className={styles.container}>
        <main>
          <Heading as="h3" size="lg">
            {semanticContent.title}
          </Heading>
          <Text tone="muted">{semanticContent.description}</Text>
        </main>
      </Container>
    </div>
  );
}

export function CustomStylingContainerExample() {
  return (
    <div className={styles.viewport}>
      <Container className={styles.customContainer}>
        <Text weight="semibold">{customContent.label}</Text>
      </Container>
    </div>
  );
}

export function ContainerBleedExample() {
  return (
    <div className={styles.viewport}>
      <Container className={styles.container}>
        <Heading as="h3" size="lg">
          {bleedContent.title}
        </Heading>
        <Text tone="muted">{bleedContent.description}</Text>
        <Bleed.Root inline="md">
          <div className={styles.bleedSurface}>{bleedContent.callout}</div>
        </Bleed.Root>
      </Container>
    </div>
  );
}