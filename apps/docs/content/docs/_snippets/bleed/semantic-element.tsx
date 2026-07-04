//#region demo
import { Bleed, Text } from '@moduix/react';

const content = {
  caption: 'Full-width media with a constrained parent.',
};

export function BleedSemanticDemo() {
  return (
    <div className="bleed-demo-container">
      <Bleed asChild className="bleed-demo-figure">
        <figure>
          <div className="bleed-demo-media" />
          <Text tone="muted" size="sm">
            {content.caption}
          </Text>
        </figure>
      </Bleed>
    </div>
  );
}
//#endregion