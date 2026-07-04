//#region demo
import { Collapsible } from '@moduix/react';

const paragraphs = [
  'Ark UI is a headless component library for building accessible, high-quality UI components for React, Solid, Vue, and Svelte.',
  'Built on top of Zag.js state machines, Ark UI keeps behavior consistent while leaving styling under your control.',
  'Use partial collapse when a short preview should stay visible while the rest of the content is inert.',
];

export function PartialCollapseCollapsibleDemo() {
  return (
    <Collapsible collapsedHeight="3rem">
      <Collapsible.Trigger>
        Read more
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className="collapsible-content-body">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Collapsible.Content>
    </Collapsible>
  );
}
//#endregion