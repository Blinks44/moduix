<script lang="ts">
  import {
    HoverCard,
    HoverCardArrow,
    HoverCardBody,
    HoverCardContent,
    HoverCardPositioner,
    HoverCardTrigger,
  } from '@moduix/svelte/hover-card';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/hover-card/hover-card-with-arrow.module.css';
</script>

<HoverCard>
  <HoverCardTrigger>@sarah_chen</HoverCardTrigger>
  <HoverCardPositioner>
    <HoverCardContent>
      <HoverCardArrow />
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