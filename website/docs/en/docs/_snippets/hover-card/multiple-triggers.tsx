import { HoverCard } from '@moduix/react/hover-card';
import { useState } from 'react';

const profiles = [
  {
    id: 'sarah',
    name: 'Design systems that scale',
    username: '@sarah_chen',
    description: 'A practical guide to building clear, consistent product experiences.',
  },
  {
    id: 'alex',
    name: 'Make room for better ideas',
    username: '@alex_r',
    description: 'A guide to calmer, more collaborative product work.',
  },
];

function HoverCardPreview({ description, title }: { description: string; title: string }) {
  return (
    <div style={{ display: 'grid', gap: 'var(--moduix-spacing-2)', width: '14rem' }}>
      <img
        alt="Sunlit workspace with a laptop and plants"
        src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=640&q=80"
        style={{
          aspectRatio: '16 / 9',
          borderRadius: 'var(--moduix-radius-md)',
          display: 'block',
          objectFit: 'cover',
          width: '100%',
        }}
      />
      <div style={{ display: 'grid', gap: 'var(--moduix-spacing-1)' }}>
        <strong>{title}</strong>
        <p style={{ color: 'var(--moduix-color-muted-foreground)', margin: 0 }}>{description}</p>
      </div>
    </div>
  );
}

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
          <HoverCardPreview description={activeProfile.description} title={activeProfile.name} />
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard>
  );
}