import { Avatar } from '@moduix/react/avatar';
import { Button } from '@moduix/react/button';
import { Dialog } from '@moduix/react/dialog';
import { HoverCard } from '@moduix/react/hover-card';
import { useRef } from 'react';

export default function DialogHoverCard() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <Dialog initialFocusEl={() => titleRef.current}>
      <Dialog.Trigger asChild>
        <Button>View profile</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title ref={titleRef} tabIndex={-1}>
              Team member
            </Dialog.Title>
          </Dialog.Header>
          <HoverCard portalled={false}>
            <HoverCard.Trigger
              style={{
                backgroundColor: 'var(--moduix-color-muted)',
                borderRadius: 'var(--moduix-radius-sm)',
                paddingInline: 'var(--moduix-spacing-1)',
                textDecoration: 'none',
              }}
            >
              @sarah_chen
            </HoverCard.Trigger>
            <HoverCard.Positioner>
              <HoverCard.Content>
                <HoverCard.Arrow />
                <div style={{ display: 'flex', gap: 'var(--moduix-spacing-2)' }}>
                  <Avatar size="sm">
                    <Avatar.Fallback name="Sarah Chen" />
                  </Avatar>
                  <div>
                    <strong>Sarah Chen</strong>
                    <div style={{ color: 'var(--moduix-color-muted-foreground)' }}>
                      Reviewing this project
                    </div>
                  </div>
                </div>
              </HoverCard.Content>
            </HoverCard.Positioner>
          </HoverCard>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}