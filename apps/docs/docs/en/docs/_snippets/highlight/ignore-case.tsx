import { Highlight, Text } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function HighlightIgnoreCaseDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <Text>
        <Highlight
          ignoreCase
          query="typescript"
          text="TypeScript provides static type checking. Using typescript helps catch errors early in development."
        />
      </Text>
    </PreviewLayout>
  );
}