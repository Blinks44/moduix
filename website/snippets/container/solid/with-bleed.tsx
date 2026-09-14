import { Bleed } from '@moduix/solid/bleed';
import { Container } from '@moduix/solid/container';
import { Heading } from '@moduix/solid/heading';
import { Text } from '@moduix/solid/text';
import styles from '@/components/examples/container/container-with-bleed.module.css';

const bleedContent = {
  title: 'Article body',
  description:
    'Keep the reading width constrained, then use Bleed for content that should stretch wider.',
  callout: 'Bleed content escapes the constrained column.',
};

export default function ContainerBleedDemo() {
  return (
    <Container class={styles.root}>
      <Heading as="h3" size="lg">
        {bleedContent.title}
      </Heading>
      <Text tone="muted">{bleedContent.description}</Text>
      <Bleed inline="md">
        <div class={styles.bleedSurface}>{bleedContent.callout}</div>
      </Bleed>
    </Container>
  );
}