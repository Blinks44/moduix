//#region demo
import { Bleed, Text } from '@moduix/react';

const content = {
  shell: 'Nested shell content stays constrained.',
  surface: 'This bleed matches the shell width instead of the viewport.',
};

export function BleedCustomStylingDemo() {
  return (
    <div className="bleed-demo-shell">
      <div className="bleed-demo-shell-content">
        <Text tone="muted">{content.shell}</Text>
        <Bleed className="bleed-demo-custom-surface">
          <Text weight="semibold">{content.surface}</Text>
        </Bleed>
      </div>
    </div>
  );
}
//#endregion