import { Container } from '@moduix/react/container';
import { Heading } from '@moduix/react/heading';
import { Text } from '@moduix/react/text';

const containerContent = {
  title: 'Responsive page content',
  description: 'The content column stays readable while inline gutters fluidly adapt.',
};

export default function ContainerDemo() {
  return (
    <Container
      style={{
        paddingBlock: 'var(--moduix-spacing-4)',
        borderBlock: 'var(--moduix-border-width-sm) dashed var(--moduix-color-border)',
        backgroundColor: 'var(--moduix-color-muted)',
      }}
    >
      <Heading as="h3" size="lg">
        {containerContent.title}
      </Heading>
      <Text tone="muted">{containerContent.description}</Text>
    </Container>
  );
}