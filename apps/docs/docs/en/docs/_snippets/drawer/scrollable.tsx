import { Button, Card, Drawer, ScrollArea } from '@moduix/react';

const scrollSections = [
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
    body: 'Keep important controls fixed and scroll only the supporting content.',
  },
  {
    title: 'Status updates',
    body: 'After completion, close the surface and show an inline confirmation or toast.',
  },
  {
    title: 'Error handling',
    body: 'When an action fails, keep the user in context and show recovery near the failed control.',
  },
  {
    title: 'Long descriptions',
    body: 'Dense explanatory copy should remain readable without pushing primary actions out of reach.',
  },
  {
    title: 'Scrolling feedback',
    body: 'Visible scrollbars and edge states show that additional content is available.',
  },
  {
    title: 'Footer behavior',
    body: 'Footer actions should stay stable while the user reviews long terms, warnings, or settings.',
  },
  {
    title: 'Review checklist',
    body: 'Use repeated sections to test keyboard, wheel, touch, and scrollbar drag interactions.',
  },
  {
    title: 'Final confirmation',
    body: 'The final section should be reachable without layout jumps or hidden content at the bottom edge.',
  },
];

const snapPoints = [0.3, 1];
export default function ScrollableDrawerDemo() {
  return (
    <Drawer snapPoints={snapPoints} defaultSnapPoint={snapPoints[0]}>
      <Drawer.Trigger asChild>
        <Button>Open scrollable drawer</Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Grabber>
            <Drawer.GrabberIndicator />
          </Drawer.Grabber>
          <Drawer.Header>
            <Drawer.Title>Scrollable drawer</Drawer.Title>
            <Drawer.CloseIcon />
          </Drawer.Header>
          <Drawer.Body style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <ScrollArea style={{ height: '100%', minHeight: 0 }}>
              <ScrollArea.Viewport
                style={{ height: '100%', paddingInlineEnd: 'var(--moduix-spacing-2)' }}
              >
                <ScrollArea.Content style={{ display: 'grid', gap: '1rem' }}>
                  {scrollSections.map((section) => (
                    <Card
                      key={section.title}
                      size="sm"
                      style={{ backgroundColor: 'var(--moduix-color-muted)' }}
                    >
                      <Card.Body>
                        <strong>{section.title}</strong>
                        <p>{section.body}</p>
                      </Card.Body>
                    </Card>
                  ))}
                </ScrollArea.Content>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar>
                <ScrollArea.Thumb />
              </ScrollArea.Scrollbar>
              <ScrollArea.Corner />
            </ScrollArea>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer>
  );
}