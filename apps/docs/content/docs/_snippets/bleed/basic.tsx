//#region demo
import { Bleed, Text } from '@moduix/react';

const content = {
  before: 'Container content stays constrained.',
  surface: 'This block bleeds to the viewport edges.',
  after: 'Following content returns to the container width.',
};

export function BleedDemo() {
  return (
    <div className="bleed-demo-container">
      <Text tone="muted">{content.before}</Text>
      <Bleed className="bleed-demo-surface">
        <Text weight="semibold">{content.surface}</Text>
      </Bleed>
      <Text tone="muted">{content.after}</Text>
    </div>
  );
}
//#endregion