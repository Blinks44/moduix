import { Avatar, HoverCard } from '@moduix/react';
import { useState } from 'react';

const profiles = [
  { id: 'sarah', name: 'Sarah Chen', username: '@sarah_chen', role: 'Design Engineer' },
  { id: 'alex', name: 'Alex Rivera', username: '@alex_r', role: 'Product Manager' },
];

export default function MultipleTriggersHoverCard() {
  const [activeProfile, setActiveProfile] = useState(profiles[0]);

  return (
    <HoverCard
      onTriggerValueChange={(details) => {
        setActiveProfile(profiles.find((profile) => profile.id === details.value) ?? profiles[0]);
      }}
    >
      <p>
        Reviewed by{' '}
        {profiles.map((profile, index) => (
          <span key={profile.id}>
            <HoverCard.Trigger
              value={profile.id}
              style={{
                backgroundColor: 'var(--moduix-color-muted)',
                borderRadius: 'var(--moduix-radius-sm)',
                paddingInline: 'var(--moduix-spacing-1)',
                textDecoration: 'none',
              }}
            >
              {profile.username}
            </HoverCard.Trigger>
            {index < profiles.length - 1 ? ' and ' : null}
          </span>
        ))}
      </p>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Arrow />
          <div style={{ display: 'flex', gap: 'var(--moduix-spacing-2)' }}>
            <Avatar size="sm">
              <Avatar.Fallback name={activeProfile.name} />
            </Avatar>
            <div>
              <strong>{activeProfile.name}</strong>
              <div style={{ color: 'var(--moduix-color-muted-foreground)' }}>
                {activeProfile.role}
              </div>
            </div>
          </div>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard>
  );
}