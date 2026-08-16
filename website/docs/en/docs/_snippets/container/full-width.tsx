import { Container } from '@moduix/react/container';
import { Heading } from '@moduix/react/heading';
import { Text } from '@moduix/react/text';

const fullWidthContent = {
  title: 'Full-width section',
  description:
    'The content can use all available width while the selected gutter protects it from viewport edges.',
};

export default function ContainerFullWidthDemo() {
  return (
    <Container
      size="full"
      gutter="lg"
      style={{
        paddingBlock: 'var(--moduix-spacing-4)',
        borderBlock: 'var(--moduix-border-width-sm) dashed var(--moduix-color-border)',
        backgroundColor: 'var(--moduix-color-muted)',
      }}
    >
      <Heading as="h3" size="lg">
        {fullWidthContent.title}
      </Heading>
      <Text tone="muted">{fullWidthContent.description}</Text>
    </Container>
  );
}