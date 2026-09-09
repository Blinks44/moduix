import { Container } from '@moduix/solid/container';
import { Heading } from '@moduix/solid/heading';
import { Text } from '@moduix/solid/text';
import styles from '@/components/examples/container/container-semantic-element.module.css';

const semanticContent = {
  title: 'Main content area',
  description: 'Use asChild when the wrapper should carry semantic meaning.',
};

export default function ContainerSemanticDemo() {
  return (
    <Container
      asChild={(props) => (
        <main {...props()}>
          <Heading as="h3" size="lg">
            {semanticContent.title}
          </Heading>
          <Text tone="muted">{semanticContent.description}</Text>
        </main>
      )}
      size="md"
      class={styles.root}
    />
  );
}