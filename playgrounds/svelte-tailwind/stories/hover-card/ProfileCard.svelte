<script lang="ts">
  const cardClass = 'grid w-[min(14rem,calc(100vw-4rem))]';
  const imageClass = 'aspect-video w-full rounded-md object-cover';
  const contentClass = 'mt-2 grid gap-1';
  const nameClass = 'm-0 text-md leading-6 font-bold text-popover-foreground';
  const bioClass = 'm-0 text-sm leading-5 text-muted-foreground';

  import type { Profile } from './profiles';

  let { profile }: { profile: Profile } = $props();
</script>

<div class={cardClass}>
  <img
    class={imageClass}
    alt="Sunlit workspace with a laptop and plants"
    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=640&q=80"
  />
  <div class={contentClass}>
    <p class={nameClass}>{profile.name}</p>
    <p class={bioClass}>{profile.bio}</p>
  </div>
</div>