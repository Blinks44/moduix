import {
  HoverCard,
  HoverCardBody,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardTrigger,
} from '@moduix/react/hover-card';
import { useState } from 'react';
import styles from '@/components/examples/hover-card/hover-card-multiple-triggers.module.css';

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
            <HoverCardTrigger value={profile.id} className={styles.trigger}>
              {profile.username}
            </HoverCardTrigger>
            {index < profiles.length - 1 ? ' and ' : null}
          </span>
        ))}
      </p>
      <HoverCardPositioner>
        <HoverCardContent>
          <HoverCardBody>
            <div className={styles.preview}>
              <img
                alt="Sunlit workspace with a laptop and plants"
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=640&q=80"
                className={styles.image}
              />
              <div className={styles.details}>
                <strong>{activeProfile.name}</strong>
                <p className={styles.description}>{activeProfile.description}</p>
              </div>
            </div>
          </HoverCardBody>
        </HoverCardContent>
      </HoverCardPositioner>
    </HoverCard>
  );
}