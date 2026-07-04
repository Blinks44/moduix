//#region demo
import { Bleed, Text } from '@moduix/react';

const content = {
  surface: 'Customized bleed amount.',
};

export function CustomStylingBleedDemo() {
  return (
    <div className="bleed-demo-container">
      <Bleed className="bleed-demo-custom-surface">
        <Text weight="semibold">{content.surface}</Text>
      </Bleed>
    </div>
  );
}
//#endregion