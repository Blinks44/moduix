import { Button, Dialog, HoverCard } from '@moduix/react';
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
              Profile
            </Dialog.Title>
          </Dialog.Header>
          <HoverCard portalled={false}>
            <HoverCard.Trigger asChild>
              <a href="#profile">@sarah_chen</a>
            </HoverCard.Trigger>
            <HoverCard.Positioner>
              <HoverCard.Content>
                <HoverCard.Arrow />
                Profile details
              </HoverCard.Content>
            </HoverCard.Positioner>
          </HoverCard>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}