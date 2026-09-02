import { Highlight } from '@moduix/react/highlight';
import { Text } from '@moduix/react/text';

export default function HighlightMultipleQueriesDemo() {
  return (
    <Text>
      <Highlight
        query={['React', 'Vue']}
        text="Ark UI provides React, Solid, Vue, and Svelte components that are accessible and customizable."
      />
    </Text>
  );
}