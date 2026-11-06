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
  import HoverCardSurface from './HoverCardSurface.svelte';
  import { profiles } from './profiles';

  const { Story } = defineMeta({
    title: 'Components/HoverCard',
    component: HoverCard,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const profileLinkClass = 'inline-flex items-center gap-1';
  const paragraphClass = 'm-0 max-w-[33rem] text-md leading-6 text-foreground [&_svg]:size-[1em]';
  const stackClass = 'grid justify-items-center gap-3';
  const buttonClass =
    'min-h-control-lg cursor-pointer rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground transition-[background-color,border-color] duration-normal ease-in-out [@media(hover:hover)]:hover:bg-accent';
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
    <p class={paragraphClass}>
      Liked by
      <HoverCardTrigger>
        {#snippet asChild(props)}<a {...props()} class={profileLinkClass} href="#profile"
            >@sarah_chen</a
          >{/snippet}
      </HoverCardTrigger>
      and 3 others
    </p>
    <HoverCardSurface profile={profiles[0]} />
  </HoverCard>
</Story>

<Story name="With Arrow" asChild>
  <HoverCard>
    <p class={paragraphClass}>
      Liked by
      <HoverCardTrigger>
        {#snippet asChild(props)}<a {...props()} class={profileLinkClass} href="#profile"
            >@sarah_chen</a
          >{/snippet}
      </HoverCardTrigger>
      and 3 others
    </p>
    <HoverCardSurface profile={profiles[0]} withArrow />
  </HoverCard>
</Story>

<Story name="Controlled" asChild>
  <div class={stackClass}>
    <button type="button" class={buttonClass} onclick={() => (open = !open)}>Toggle</button>
    <HoverCard bind:open>
      <p class={paragraphClass}>
        Liked by
        <HoverCardTrigger>
          {#snippet asChild(props)}<a {...props()} class={profileLinkClass} href="#profile"
              >@sarah_chen</a
            >{/snippet}
        </HoverCardTrigger>
        and 3 others
      </p>
      <HoverCardSurface profile={profiles[0]} />
    </HoverCard>
  </div>
</Story>

<Story name="Root Provider" asChild>
  <div class={stackClass}>
    <output>Open: {String(hoverCard().open)}</output>
    <HoverCardRootProvider value={hoverCard}>
      <p class={paragraphClass}>
        Liked by
        <HoverCardTrigger>
          {#snippet asChild(props)}<a {...props()} class={profileLinkClass} href="#profile"
              >@sarah_chen</a
            >{/snippet}
        </HoverCardTrigger>
        and 3 others
      </p>
      <HoverCardSurface profile={profiles[0]} />
    </HoverCardRootProvider>
  </div>
</Story>

<Story name="Delay" asChild>
  <HoverCard openDelay={200} closeDelay={500}>
    <p class={paragraphClass}>
      Liked by
      <HoverCardTrigger>
        {#snippet asChild(props)}<a {...props()} class={profileLinkClass} href="#profile"
            >@sarah_chen</a
          >{/snippet}
      </HoverCardTrigger>
      and 3 others
    </p>
    <HoverCardSurface profile={profiles[0]} />
  </HoverCard>
</Story>

<Story name="Positioning" asChild>
  <HoverCard positioning={{ placement: 'right', gutter: 12 }}>
    <p class={paragraphClass}>
      Liked by
      <HoverCardTrigger>
        {#snippet asChild(props)}<a {...props()} class={profileLinkClass} href="#profile"
            >@sarah_chen</a
          >{/snippet}
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
        <p class={paragraphClass}>
          Liked by
          <HoverCardTrigger>
            {#snippet asChild(props)}
              <a {...props()} class={profileLinkClass} href="#profile">
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
    <p class={paragraphClass}>
      Liked by
      <HoverCardTrigger>
        {#snippet asChild(props)}<a {...props()} class={profileLinkClass} href="#profile"
            >@sarah_chen</a
          >{/snippet}
      </HoverCardTrigger>
      and 3 others
    </p>
    <HoverCardSurface profile={profiles[0]} />
  </HoverCard>
</Story>

<Story name="Multiple Triggers" asChild>
  <HoverCard onTriggerValueChange={handleTriggerValueChange}>
    <p class={paragraphClass}>
      Reviewed by
      {#each profiles as profile, index (profile.id)}
        <HoverCardTrigger value={profile.id}>
          {#snippet asChild(props)}<a {...props()} class={profileLinkClass} href={'#' + profile.id}
              >{profile.username}</a
            >{/snippet}
        </HoverCardTrigger>{#if index < profiles.length - 2}{', '}{:else if index === profiles.length - 2}{', and '}{/if}
      {/each}
    </p>
    {#if activeProfile}
      <HoverCardSurface profile={activeProfile} />
    {/if}
  </HoverCard>
</Story>