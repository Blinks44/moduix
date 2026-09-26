import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/react/collapsible';
import styles from '@/components/examples/collapsible/collapsible-partial-collapse.module.css';

const paragraphs = [
  'Ark UI is a headless component library for building accessible, high-quality UI components for React, Solid, Vue, and Svelte.',
  'Built on top of Zag.js state machines, Ark UI keeps behavior consistent while leaving styling under your control.',
  'Use partial collapse when a short preview should stay visible while the rest of the content is inert.',
];

export default function PartialCollapseCollapsibleDemo() {
  return (
    <Collapsible className={styles.root} collapsedHeight="3rem">
      <CollapsibleTrigger>
        Read more
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  );
}