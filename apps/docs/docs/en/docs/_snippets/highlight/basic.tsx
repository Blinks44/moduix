import { Highlight, Text } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function HighlightDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <Text>
        <Highlight
          query="component"
          text="Ark UI is a headless component library for building accessible web applications."
        />
      </Text>
    </PreviewLayout>
  );
}