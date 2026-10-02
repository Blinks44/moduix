<script setup lang="ts">
import { FocusTrap } from '@ark-ui/vue/focus-trap';
import { Button } from '@moduix/vue/button';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from '@moduix/vue/card';
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';
import styles from '../css-modules/focus-trap-basic.module.css';

const isReviewing = ref(false);
const detailsButton = ref<{ $el: HTMLButtonElement } | null>(null);
</script>
<template>
  <Stack align="center" :class="styles.root" :gap="4">
    <FocusTrap
      :class="styles.trap"
      :disabled="!isReviewing"
      :initial-focus="() => detailsButton?.$el || false"
      @deactivate="isReviewing = false"
    >
      <Card>
        <CardHeader><CardTitle>Review mode</CardTitle></CardHeader>
        <CardBody>When active, Tab and Shift + Tab stay inside these actions.</CardBody>
        <CardFooter>
          <Button ref="detailsButton" size="sm" type="button" variant="outline"
            >Review details</Button
          >
          <Button size="sm" type="button" @click="isReviewing = false">Finish review</Button>
        </CardFooter>
      </Card>
    </FocusTrap>
    <Stack align="center" direction="row" :gap="2">
      <output aria-live="polite">Focus trap: {{ isReviewing ? 'active' : 'inactive' }}</output>
      <Button :disabled="isReviewing" size="sm" type="button" @click="isReviewing = true"
        >Start review</Button
      >
    </Stack>
  </Stack>
</template>