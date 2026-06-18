import type { ComponentProps } from 'react';
import { Bleed, Container, Heading, Text } from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
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

export const containerPlaygroundCssProperties = [
  {
    name: '--container-gutter-md',
    defaultValue: 'clamp(1rem, 4vw, 2rem)',
    description: 'Controls medium inline gutters.',
  },
  {
    name: '--container-max-width-lg',
    defaultValue: '72rem',
    description: 'Controls the `lg` content width.',
  },
] satisfies CssPropertyInput[];

const containerSizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const;
const containerGutters = ['none', 'sm', 'md', 'lg'] as const;

export function ContainerCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={containerOverrideCssProperties} />;
}

export function ContainerCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={containerPlaygroundCssProperties}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

export function ContainerExample(props: ComponentProps<typeof Container>) {
  return (
    <div className={styles.viewport}>
      <Container.Root className={styles.container} {...props}>
        <Heading as="h3" size="lg">
          Responsive page content
        </Heading>
        <Text tone="muted">
          The content column stays readable while inline gutters fluidly adapt to viewport width.
        </Text>
      </Container.Root>
    </div>
  );
}

export function ContainerSizesExample() {
  return (
    <div className={styles.viewport}>
      <div className={styles.stack}>
        {containerSizes.map((size) => (
          <Container.Root key={size} size={size} className={styles.container}>
            <Text weight="semibold">size=&quot;{size}&quot;</Text>
          </Container.Root>
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
          <Container.Root key={gutter} gutter={gutter} className={styles.container}>
            <Text weight="semibold">gutter=&quot;{gutter}&quot;</Text>
          </Container.Root>
        ))}
      </div>
    </div>
  );
}

export function ContainerSemanticExample() {
  return (
    <div className={styles.viewport}>
      <Container.Root asChild size="md" className={styles.container}>
        <main>
          <Heading as="h3" size="lg">
            Main content area
          </Heading>
          <Text tone="muted">Use `asChild` when the wrapper should carry semantic meaning.</Text>
        </main>
      </Container.Root>
    </div>
  );
}

export function CustomStylingContainerExample() {
  return (
    <div className={styles.viewport}>
      <Container.Root className={styles.customContainer}>
        <Text weight="semibold">Customized max width and gutters</Text>
      </Container.Root>
    </div>
  );
}

export function ContainerBleedExample() {
  return (
    <div className={styles.viewport}>
      <Container.Root className={styles.container}>
        <Heading as="h3" size="lg">
          Article body
        </Heading>
        <Text tone="muted">
          Keep the reading width constrained, then use `Bleed` for elements that should stretch
          wider.
        </Text>
        <Bleed.Root inline="md">
          <div className={styles.bleedSurface}>Bleed content escapes the constrained column.</div>
        </Bleed.Root>
      </Container.Root>
    </div>
  );
}