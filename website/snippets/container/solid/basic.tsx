import { Container } from '@moduix/solid/container';
import { Heading } from '@moduix/solid/heading';
import { Text } from '@moduix/solid/text';
import styles from '@/components/examples/container/container-basic.module.css';

const containerContent = {
  title: 'Responsive page content',
  description: 'The content column stays readable while inline gutters fluidly adapt.',
};

export default function ContainerDemo() {
  return (
    <Container class={styles.root}>
      <Heading as="h3" size="lg">
        {containerContent.title}
      </Heading>
      <Text tone="muted">{containerContent.description}</Text>
    </Container>
  );
}