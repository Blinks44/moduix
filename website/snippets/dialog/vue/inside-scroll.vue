<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/vue/dialog';
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@moduix/vue/scroll-area';
import styles from '@/components/examples/dialog/dialog-inside-scroll.module.css';

const sections = [
  {
    title: 'Prepare',
    body: 'Confirm the release branch, generated artifacts, and versioned package metadata before starting the release.',
  },
  {
    title: 'Validate',
    body: 'Run formatting, linting, builds, and type checks. Resolve every failure before publishing an artifact.',
  },
  {
    title: 'Publish',
    body: 'Publish only after every required validation succeeds and the release notes accurately describe the changes.',
  },
  {
    title: 'Verify',
    body: 'Install the published package in a clean project and verify that the documented consumer path still works.',
  },
  {
    title: 'Communicate',
    body: 'Share the release with the team, include migration notes where needed, and monitor the first consumer reports.',
  },
];
</script>

<template>
  <Dialog>
    <DialogTrigger as-child><Button>Open terms</Button></DialogTrigger>
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Terms of service</DialogTitle>
        <ScrollArea :class="styles.scrollArea">
          <ScrollAreaViewport>
            <ScrollAreaContent>
              <div :class="styles.content">
                <section v-for="section in sections" :key="section.title" :class="styles.section">
                  <h3 :class="styles.heading">{{ section.title }}</h3>
                  <p :class="styles.paragraph">{{ section.body }}</p>
                </section>
              </div>
            </ScrollAreaContent>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
          <ScrollAreaCorner />
        </ScrollArea>
        <DialogFooter>
          <DialogCloseTrigger as-child><Button variant="outline">Close</Button></DialogCloseTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogPositioner>
  </Dialog>
</template>