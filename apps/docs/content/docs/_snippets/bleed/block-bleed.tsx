//#region demo
import { Bleed, Text } from '@moduix/react';

const content = {
  before: 'Container padding above.',
  surface: 'Inline and block bleed',
  after: 'Container padding below.',
};

export function BleedBlockDemo() {
  return (
    <div className="bleed-demo-padded-container">
      <Text tone="muted">{content.before}</Text>
      <Bleed inline="md" block="md" className="bleed-demo-panel">
        <Text>{content.surface}</Text>
      </Bleed>
      <Text tone="muted">{content.after}</Text>
    </div>
  );
}
//#endregion