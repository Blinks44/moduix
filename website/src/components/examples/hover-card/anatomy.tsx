import {
  HoverCard,
  HoverCardArrow,
  HoverCardBody,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardTrigger,
} from '@moduix/react/hover-card';

// Anatomy scene: the hover card stays open and inline so every part can be outlined.
export default function HoverCardAnatomy() {
  return (
    <div
      style={{
        minHeight: 240,
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <HoverCard open portalled={false}>
        <p>
          Liked by <HoverCardTrigger>@sarah_chen</HoverCardTrigger> and 3 others
        </p>
        <HoverCardPositioner>
          <HoverCardContent>
            <HoverCardArrow />
            <HoverCardBody>
              <strong>Design systems that scale</strong>
              <p>A practical guide to clear, consistent product experiences.</p>
            </HoverCardBody>
          </HoverCardContent>
        </HoverCardPositioner>
      </HoverCard>
    </div>
  );
}