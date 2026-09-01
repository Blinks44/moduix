import { Bleed } from '@moduix/react/bleed';
import { Container } from '@moduix/react/container';
import { Heading } from '@moduix/react/heading';
import { Text } from '@moduix/react/text';
import styles from '@/components/examples/container/container-with-bleed.module.css';

const bleedContent = {
  title: 'Article body',
  description:
    'Keep the reading width constrained, then use Bleed for content that should stretch wider.',
  callout: 'Bleed content escapes the constrained column.',
};

export default function ContainerBleedDemo() {
  return (
    <Container className={styles.root}>
      <Heading as="h3" size="lg">
        {bleedContent.title}
      </Heading>
      <Text tone="muted">{bleedContent.description}</Text>
      <Bleed inline="md">
        <div className={styles.bleedSurface}>{bleedContent.callout}</div>
      </Bleed>
    </Container>
  );
}