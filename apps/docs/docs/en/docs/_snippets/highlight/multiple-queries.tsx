import { Highlight, Text } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function HighlightMultipleQueriesDemo() {
  return (
    <PreviewLayout maxWidth="24rem" textAlign="center">
      <Text>
        <Highlight
          query={['React', 'Vue']}
          text="Ark UI provides React, Solid, Vue, and Svelte components that are accessible and customizable."
        />
      </Text>
    </PreviewLayout>
  );
}