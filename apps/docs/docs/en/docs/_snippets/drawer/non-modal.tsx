import { Button, Card, Drawer, ScrollArea } from '@moduix/react';

const modal = false;
const snapPoints = [0.18, 1];
const paragraphs = [
  'A non-modal drawer can keep quick controls visible without preventing work in the surrounding page.',
  'The grabber owns drawer movement. The content below remains a normal reading and scrolling region.',
  'This paragraph is intentionally long enough to make the scroll viewport useful on compact screens and short browser windows.',
  'Scrollable content can include release notes, filters, activity history, or supporting explanation without moving the header.',
  'The page outside the drawer remains available for pointer interaction and can continue to scroll independently.',
  'Use a dedicated viewport when the panel contains more content than fits beside its persistent controls.',
  'The scrollbar confirms that the long content belongs to the drawer rather than the page behind it.',
  'The final paragraph verifies that the viewport reaches the bottom without dragging the sheet itself.',
  'A compact maximum height makes the panel useful for a persistent utility surface rather than a full-page sheet.',
  'ScrollArea keeps wheel, keyboard, and touch scrolling within this content viewport until it reaches an edge.',
  'Users can still operate controls in the surrounding page because the non-modal positioner does not intercept them.',
  'This additional copy makes overflow visible in both a wide documentation preview and a narrow mobile viewport.',
];
export default function NonModalDrawerDemo() {
  return (
    <Drawer
      modal={modal}
      preventScroll={false}
      snapPoints={snapPoints}
      defaultSnapPoint={snapPoints[0]}
    >
      <Drawer.Trigger asChild>
        <Button>Open non-modal drawer</Button>
      </Drawer.Trigger>
      <Drawer.Positioner>
        <Drawer.Content draggable={false}>
          <Drawer.Grabber
            style={{
              flexDirection: 'column',
              alignItems: 'stretch',
              gap: 'var(--moduix-spacing-2)',
            }}
          >
            <Drawer.GrabberIndicator style={{ alignSelf: 'center' }} />
            <Drawer.Header style={{ width: '100%' }}>
              <Drawer.Title>Non-modal drawer</Drawer.Title>
              <Drawer.CloseIcon data-no-drag />
              <Drawer.Description>
                The page remains interactive while this drawer is open.
              </Drawer.Description>
            </Drawer.Header>
          </Drawer.Grabber>
          <Drawer.Body style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <ScrollArea style={{ height: '100%', minHeight: 0 }}>
              <ScrollArea.Viewport
                style={{
                  height: '100%',
                  minHeight: 0,
                  paddingInlineEnd: 'var(--moduix-spacing-2)',
                }}
              >
                <ScrollArea.Content style={{ display: 'grid', gap: 'var(--moduix-spacing-3)' }}>
                  {paragraphs.map((paragraph) => (
                    <Card
                      key={paragraph}
                      size="sm"
                      style={{ backgroundColor: 'var(--moduix-color-muted)' }}
                    >
                      <Card.Body>
                        <p style={{ margin: 0 }}>{paragraph}</p>
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