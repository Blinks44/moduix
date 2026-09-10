import { HoverCard } from '@moduix/solid/hover-card';
import { createSignal, For } from 'solid-js';
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
  const [activeProfile, setActiveProfile] = createSignal(profiles[0]);

  return (
    <HoverCard
      onTriggerValueChange={(details) => {
        setActiveProfile(profiles.find((profile) => profile.id === details.value) ?? profiles[0]);
      }}
    >
      <p>
        Reviewed by{' '}
        <For each={profiles}>
          {(profile, index) => (
            <span>
              <HoverCard.Trigger value={profile.id} class={styles.trigger}>
                {profile.username}
              </HoverCard.Trigger>
              {index() < profiles.length - 1 ? ' and ' : null}
            </span>
          )}
        </For>
      </p>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Body>
            <div class={styles.preview}>
              <img
                alt="Sunlit workspace with a laptop and plants"
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=640&q=80"
                class={styles.image}
              />
              <div class={styles.details}>
                <strong>{activeProfile().name}</strong>
                <p class={styles.description}>{activeProfile().description}</p>
              </div>
            </div>
          </HoverCard.Body>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard>
  );
}