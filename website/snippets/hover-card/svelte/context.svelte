<script lang="ts">
  import { ChevronDown as ChevronDownIcon, ChevronUp as ChevronUpIcon } from '@lucide/svelte';
  import {
    HoverCard,
    HoverCardBody,
    HoverCardContent,
    HoverCardContext,
    HoverCardPositioner,
    HoverCardTrigger,
  } from '@moduix/svelte/hover-card';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/hover-card/hover-card-context.module.css';
</script>

<HoverCard>
  <HoverCardContext>
    {#snippet render(hoverCard)}
      <HoverCardTrigger>
        @sarah_chen
        {#if hoverCard().open}
          <ChevronUpIcon aria-hidden="true" size={16} />
        {:else}
          <ChevronDownIcon aria-hidden="true" size={16} />
        {/if}
      </HoverCardTrigger>
    {/snippet}
  </HoverCardContext>
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