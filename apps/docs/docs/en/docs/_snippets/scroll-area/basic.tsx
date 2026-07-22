import { ScrollArea } from '@moduix/react';
import styles from '@/components/examples/scroll-area.module.css';

const sections = [
  {
    title: 'What this surface is for',
    body: 'Use temporary surfaces for focused tasks that should keep users in the current page context.',
  },
  {
    title: 'Keyboard and focus',
    body: 'Tab and Shift+Tab should stay predictable while Escape or explicit controls request close.',
  },
  {
    title: 'Viewport overflow',
    body: 'Keep the container visible and place long content in a dedicated scrollable inner region.',
  },
  {
    title: 'Close affordances',
    body: 'Always provide an explicit close action when the surface can be dismissed by the user.',
  },
  {
    title: 'Mobile ergonomics',
    body: 'Keep touch targets reachable and avoid cramped headers on narrow viewports.',
  },
  {
    title: 'Persistent panels',
    body: 'For persistent workflows, keep the important controls fixed and scroll only the supporting content.',
  },
  {
    title: 'Status updates',
    body: 'After completion, close the surface and show an inline confirmation or toast.',
  },
  {
    title: 'Error handling',
    body: 'When an action fails, keep the user in context and show the recovery step near the failed control.',
  },
  {
    title: 'Long descriptions',
    body: 'Dense explanatory copy should remain readable without pushing primary actions out of reach.',
  },
  {
    title: 'Scrolling feedback',
    body: 'Visible scrollbars, fades, or edge states help users understand that additional content is available.',
  },
  {
    title: 'Footer behavior',
    body: 'Footer actions should stay stable when the user reviews long terms, warnings, or settings.',
  },
  {
    title: 'Review checklist',
    body: 'Use repeated sections to test keyboard scrolling, wheel scrolling, touch scrolling, and drag gestures.',
  },
  {
    title: 'Final confirmation',
    body: 'The final section should be reachable without layout jumps or hidden content at the bottom edge.',
  },
];

export default function ScrollAreaDemo() {
  return (
    <ScrollArea className={styles.root}>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <div className={styles.textContent}>
            {sections.map((item) => (
              <section key={item.title}>
                <h3>{item.title}</h3>
                <p className={styles.paragraph}>{item.body}</p>
              </section>
            ))}
          </div>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  );
}