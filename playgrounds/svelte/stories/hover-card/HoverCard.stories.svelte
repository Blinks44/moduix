<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    HoverCard,
    HoverCardContext,
    HoverCardRootProvider,
    HoverCardTrigger,
    useHoverCard,
  } from '@/components/hover-card';
  import { ChevronDownIcon, ChevronUpIcon } from '@/lib/moduix/icons/ui';
  import storyStyles from './HoverCard.stories.module.css';
  import HoverCardSurface from './HoverCardSurface.svelte';
  import { profiles } from './profiles';

  const { Story } = defineMeta({
    title: 'Components/HoverCard',
    component: HoverCard,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let open = $state(false);
  let activeProfile = $state(profiles[0]);
  const hoverCard = useHoverCard({ id: 'hover-card-root-provider' });

  const handleTriggerValueChange = (details: { value?: string | null }) => {
    activeProfile = profiles.find((profile) => profile.id === details.value) ?? profiles[0];
  };
</script>

<Story name="Basic" asChild>
  <HoverCard>
    <p class={storyStyles.paragraph}>
      Liked by
      <HoverCardTrigger>
        {#snippet asChild(props)}<a {...props()} href="#profile">@sarah_chen</a>{/snippet}
      </HoverCardTrigger>
      and 3 others
    </p>
    <HoverCardSurface profile={profiles[0]} />
  </HoverCard>
</Story>

<Story name="With Arrow" asChild>
  <HoverCard>
    <p class={storyStyles.paragraph}>
      Liked by
      <HoverCardTrigger>
        {#snippet asChild(props)}<a {...props()} href="#profile">@sarah_chen</a>{/snippet}
      </HoverCardTrigger>
      and 3 others
    </p>
    <HoverCardSurface profile={profiles[0]} withArrow />
  </HoverCard>
</Story>

<Story name="Controlled" asChild>
  <div class={storyStyles.stack}>
    <button type="button" class={storyStyles.button} onclick={() => (open = !open)}>Toggle</button>
    <HoverCard bind:open>
      <p class={storyStyles.paragraph}>
        Liked by
        <HoverCardTrigger>
          {#snippet asChild(props)}<a {...props()} href="#profile">@sarah_chen</a>{/snippet}
        </HoverCardTrigger>
        and 3 others
      </p>
      <HoverCardSurface profile={profiles[0]} />
    </HoverCard>
  </div>
</Story>

<Story name="Root Provider" asChild>
  <div class={storyStyles.stack}>
    <output>Open: {String(hoverCard().open)}</output>
    <HoverCardRootProvider value={hoverCard}>
      <p class={storyStyles.paragraph}>
        Liked by
        <HoverCardTrigger>
          {#snippet asChild(props)}<a {...props()} href="#profile">@sarah_chen</a>{/snippet}
        </HoverCardTrigger>
        and 3 others
      </p>
      <HoverCardSurface profile={profiles[0]} />
    </HoverCardRootProvider>
  </div>
</Story>

<Story name="Delay" asChild>
  <HoverCard openDelay={200} closeDelay={500}>
    <p class={storyStyles.paragraph}>
      Liked by
      <HoverCardTrigger>
        {#snippet asChild(props)}<a {...props()} href="#profile">@sarah_chen</a>{/snippet}
      </HoverCardTrigger>
      and 3 others
    </p>
    <HoverCardSurface profile={profiles[0]} />
  </HoverCard>
</Story>

<Story name="Positioning" asChild>
  <HoverCard positioning={{ placement: 'right', gutter: 12 }}>
    <p class={storyStyles.paragraph}>
      Liked by
      <HoverCardTrigger>
        {#snippet asChild(props)}<a {...props()} href="#profile">@sarah_chen</a>{/snippet}
      </HoverCardTrigger>
      and 3 others
    </p>
    <HoverCardSurface profile={profiles[0]} />
  </HoverCard>
</Story>

<Story name="Context" asChild>
  <HoverCard>
    <HoverCardContext>
      {#snippet render(context)}
        <p class={storyStyles.paragraph}>
          Liked by
          <HoverCardTrigger>
            {#snippet asChild(props)}
              <a {...props()} href="#profile">
                @sarah_chen
                {#if context().open}<ChevronUpIcon />{:else}<ChevronDownIcon />{/if}
              </a>
            {/snippet}
          </HoverCardTrigger>
          and 3 others
        </p>
      {/snippet}
    </HoverCardContext>
    <HoverCardSurface profile={profiles[0]} />
  </HoverCard>
</Story>

<Story name="Disabled" asChild>
  <HoverCard disabled>
    <p class={storyStyles.paragraph}>
      Liked by
      <HoverCardTrigger>
        {#snippet asChild(props)}<a {...props()} href="#profile">@sarah_chen</a>{/snippet}
      </HoverCardTrigger>
      and 3 others
    </p>
    <HoverCardSurface profile={profiles[0]} />
  </HoverCard>
</Story>

<Story name="Multiple Triggers" asChild>
  <HoverCard onTriggerValueChange={handleTriggerValueChange}>
    <p class={storyStyles.paragraph}>
      Reviewed by
      {#each profiles as profile, index (profile.id)}
        <HoverCardTrigger value={profile.id}>
          {#snippet asChild(props)}<a {...props()} href={'#' + profile.id}>{profile.username}</a
            >{/snippet}
        </HoverCardTrigger>{#if index < profiles.length - 2}{', '}{:else if index === profiles.length - 2}{', and '}{/if}
      {/each}
    </p>
    {#if activeProfile}
      <HoverCardSurface profile={activeProfile} />
    {/if}
  </HoverCard>
</Story>