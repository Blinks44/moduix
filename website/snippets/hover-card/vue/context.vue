<script setup lang="ts">
import { ChevronDown as ChevronDownIcon, ChevronUp as ChevronUpIcon } from '@lucide/vue';
import {
  HoverCard,
  HoverCardBody,
  HoverCardContent,
  HoverCardContext,
  HoverCardPositioner,
  HoverCardTrigger,
} from '@moduix/vue/hover-card';
import styles from '@/components/examples/hover-card/hover-card-context.module.css';
</script>

<template>
  <HoverCard>
    <HoverCardContext v-slot="hoverCard">
      <HoverCardTrigger :class="styles.trigger">
        @sarah_chen
        <ChevronUpIcon v-if="hoverCard.open" aria-hidden :size="16" />
        <ChevronDownIcon v-else aria-hidden :size="16" />
      </HoverCardTrigger>
    </HoverCardContext>
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
</template>