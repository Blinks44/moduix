<script lang="ts">
  import {
    HoverCard,
    HoverCardBody,
    HoverCardContent,
    HoverCardPositioner,
    HoverCardTrigger,
  } from '@moduix/svelte/hover-card';
  import { Stack } from '@moduix/svelte/stack';
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

  let activeProfile = $state(profiles[0]);
</script>

<HoverCard
  onTriggerValueChange={(details) => {
    activeProfile = profiles.find((profile) => profile.id === details.value) ?? profiles[0];
  }}
>
  <p>
    Reviewed by
    {#each profiles as profile, index (profile.id)}
      <HoverCardTrigger value={profile.id}>
        {profile.username}
      </HoverCardTrigger>
      {#if index < profiles.length - 1}{' and '}{/if}
    {/each}
  </p>
  <HoverCardPositioner>
    <HoverCardContent>
      <HoverCardBody>
        <div class={styles.preview}>
          <img
            alt="Sunlit workspace with a laptop and plants"
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=640&q=80"
            class={styles.image}
          />
          <Stack gap="1">
            <strong>{activeProfile.name}</strong>
            <p class={styles.description}>{activeProfile.description}</p>
          </Stack>
        </div>
      </HoverCardBody>
    </HoverCardContent>
  </HoverCardPositioner>
</HoverCard>