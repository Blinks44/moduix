<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    HoverCard,
    HoverCardBody,
    HoverCardContent,
    HoverCardPositioner,
    HoverCardTrigger,
  } from '@moduix/svelte/hover-card';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/hover-card/hover-card-controlled.module.css';

  let open = $state(false);
</script>

<HoverCard bind:open>
  <HoverCardTrigger>@sarah_chen</HoverCardTrigger>
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
            <strong>Design systems that scale</strong>
            <p class={styles.description}>
              A practical guide to building clear, consistent product experiences.
            </p>
          </Stack>
        </div>
      </HoverCardBody>
    </HoverCardContent>
  </HoverCardPositioner>
</HoverCard>
<div>
  <output>Open: {open ? 'yes' : 'no'}</output>
  <Button size="sm" variant="outline" onclick={() => (open = !open)}>Toggle</Button>
</div>