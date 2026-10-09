<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Dialog,
  DialogBackdrop,
  DialogContent,
  DialogHeader,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/vue/dialog';
import {
  HoverCard,
  HoverCardBody,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardTrigger,
} from '@moduix/vue/hover-card';
import { ref } from 'vue';
import styles from '@/components/examples/hover-card/hover-card-dialog.module.css';

const titleRef = ref<HTMLElement | null>(null);
</script>

<template>
  <Dialog :initial-focus-el="() => titleRef">
    <DialogTrigger as-child><Button>View profile</Button></DialogTrigger>
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <DialogHeader>
          <DialogTitle ref="titleRef" tabindex="-1">Team member</DialogTitle>
        </DialogHeader>
        <HoverCard :portalled="false">
          <HoverCardTrigger :class="styles.trigger">@sarah_chen</HoverCardTrigger>
          <HoverCardPositioner>
            <HoverCardContent>
              <HoverCardBody>
                <div :class="styles.preview">
                  <img
                    alt="Sunlit workspace with a laptop and plants"
                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=640&q=80"
                    :class="styles.image"
                  />
                  <div :class="styles.details">
                    <strong>Design systems that scale</strong>
                    <p :class="styles.description">
                      A practical guide to building clear, consistent product experiences.
                    </p>
                  </div>
                </div>
              </HoverCardBody>
            </HoverCardContent>
          </HoverCardPositioner>
        </HoverCard>
      </DialogContent>
    </DialogPositioner>
  </Dialog>
</template>