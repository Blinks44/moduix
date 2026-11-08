<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Dialog,
    DialogBackdrop,
    DialogContent,
    DialogHeader,
    DialogPositioner,
    DialogTitle,
    DialogTrigger,
  } from '@moduix/svelte/dialog';
  import {
    HoverCard,
    HoverCardBody,
    HoverCardContent,
    HoverCardPositioner,
    HoverCardTrigger,
  } from '@moduix/svelte/hover-card';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/hover-card/hover-card-dialog.module.css';

  let titleRef = $state<HTMLElement | null>(null);
</script>

<Dialog initialFocusEl={() => titleRef}>
  <DialogTrigger>
    {#snippet asChild(props)}<Button {...props()}>View profile</Button>{/snippet}
  </DialogTrigger>
  <DialogBackdrop />
  <DialogPositioner>
    <DialogContent>
      <DialogHeader>
        <DialogTitle bind:ref={titleRef} tabindex={-1}>Team member</DialogTitle>
      </DialogHeader>
      <HoverCard portalled={false}>
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
    </DialogContent>
  </DialogPositioner>
</Dialog>