import type * as React from 'react';
import { Container, Heading, Text } from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './container.module.css';

export const containerOverrideCssProperties: CssPropertyInput[] = [
  ['--container-gutter-sm', 'clamp(0.75rem, 3vw, 1.5rem)', 'Controls small inline gutters.'],
  ['--container-gutter-md', 'clamp(1rem, 4vw, 2rem)', 'Controls medium inline gutters.'],
  ['--container-gutter-lg', 'clamp(1.5rem, 5vw, 3rem)', 'Controls large inline gutters.'],
  ['--container-max-width-xs', '40rem', 'Controls the `xs` content width.'],
  ['--container-max-width-sm', '48rem', 'Controls the `sm` content width.'],
  ['--container-max-width-md', '64rem', 'Controls the `md` content width.'],
  ['--container-max-width-lg', '72rem', 'Controls the `lg` content width.'],
  ['--container-max-width-xl', '90rem', 'Controls the `xl` content width.'],
];

export const containerPlaygroundCssProperties: CssPropertyInput[] = [
  ['--container-gutter-md', 'clamp(1rem, 4vw, 2rem)', 'Controls medium inline gutters.'],
  ['--container-max-width-lg', '72rem', 'Controls the `lg` content width.'],
];

export function ContainerCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={containerOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function ContainerCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={containerPlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function ContainerExample(props: React.ComponentProps<typeof Container>) {
  return (
    <div className={styles.viewport}>
      <Container className={styles.container} {...props}>
        <Heading as="h3" size="lg">
          Responsive page content
        </Heading>
        <Text tone="muted">
          The content column stays readable while inline gutters fluidly adapt to viewport width.
        </Text>
      </Container>
    </div>
  );
}

export function ContainerSizesExample() {
  return (
    <div className={styles.viewport}>
      <div className={styles.stack}>
        {(['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => (
          <Container key={size} size={size} className={styles.container}>
            <Text weight="semibold">size=&quot;{size}&quot;</Text>
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
        {(['none', 'sm', 'md', 'lg'] as const).map((gutter) => (
          <Container key={gutter} gutter={gutter} className={styles.container}>
            <Text weight="semibold">gutter=&quot;{gutter}&quot;</Text>
          </Container>
        ))}
      </div>
    </div>
  );
}

export function ContainerSemanticExample() {
  return (
    <div className={styles.viewport}>
      <Container as="main" size="md" className={styles.container}>
        <Heading as="h3" size="lg">
          Main content area
        </Heading>
        <Text tone="muted">Use `as` when the wrapper should carry semantic meaning.</Text>
      </Container>
    </div>
  );
}

export function CustomStylesContainerExample() {
  return (
    <div className={styles.viewport}>
      <Container className={styles.customContainer}>
        <Text weight="semibold">Customized max width and gutters</Text>
      </Container>
    </div>
  );
}