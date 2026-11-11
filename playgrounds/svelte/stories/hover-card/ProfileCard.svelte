<script lang="ts">
  import storyStyles from './HoverCard.stories.module.css';
  import type { Profile } from './profiles';

  let { profile }: { profile: Profile } = $props();
</script>

<div class={storyStyles.card}>
  <img
    class={storyStyles.image}
    alt="Sunlit workspace with a laptop and plants"
    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=640&q=80"
  />
  <div class={storyStyles.content}>
    <p class={storyStyles.name}>{profile.name}</p>
    <p class={storyStyles.bio}>{profile.bio}</p>
  </div>
</div>