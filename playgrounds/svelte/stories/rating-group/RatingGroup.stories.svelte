<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '@/components/button';
  import { Field, FieldHelperText } from '@/components/field';
  import {
    RatingGroup,
    RatingGroupContext,
    RatingGroupControl,
    RatingGroupHiddenInput,
    RatingGroupItem,
    RatingGroupItemIndicator,
    RatingGroupItems,
    RatingGroupLabel,
    RatingGroupRootProvider,
    useRatingGroup,
  } from '@/components/rating-group';
  import HeartIcon from './HeartIcon.svelte';
  import styles from './RatingGroup.stories.module.css';

  const { Story } = defineMeta({
    title: 'Components/RatingGroup',
    component: RatingGroup,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let value = $state(3);
  const ratingGroup = useRatingGroup({ count: 5, defaultValue: 3 });
</script>

<Story name="Basic" asChild>
  <RatingGroup defaultValue={4}>
    <RatingGroupLabel>Overall satisfaction</RatingGroupLabel>
    <RatingGroupControl>
      <RatingGroupItems />
    </RatingGroupControl>
  </RatingGroup>
</Story>

<Story name="Controlled" asChild>
  <div class={styles.stack}>
    <RatingGroup bind:value>
      <RatingGroupLabel>Support quality</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems />
      </RatingGroupControl>
      <RatingGroupHiddenInput />
    </RatingGroup>
    <span class={styles.hint}>Current value: {value}</span>
  </div>
</Story>

<Story name="Half Rating" asChild>
  <RatingGroup allowHalf defaultValue={3.5}>
    <RatingGroupLabel>Average delivery score</RatingGroupLabel>
    <RatingGroupControl>
      <RatingGroupItems />
    </RatingGroupControl>
  </RatingGroup>
</Story>

<Story name="Root Provider" asChild>
  <div class={styles.stack}>
    <output class={styles.hint}>Current value: {ratingGroup().value}</output>
    <RatingGroupRootProvider value={ratingGroup}>
      <RatingGroupLabel>Product quality</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupContext>
          {#snippet render(context)}
            {#each context().items as item (item)}
              <RatingGroupItem index={item}>
                <RatingGroupItemIndicator />
              </RatingGroupItem>
            {/each}
          {/snippet}
        </RatingGroupContext>
      </RatingGroupControl>
    </RatingGroupRootProvider>
  </div>
</Story>

<Story name="With Field" asChild>
  <Field class={styles.field}>
    <RatingGroup defaultValue={4} required>
      <RatingGroupLabel>Experience score</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems />
      </RatingGroupControl>
      <RatingGroupHiddenInput />
    </RatingGroup>
    <FieldHelperText>Required score from 1 to 5.</FieldHelperText>
  </Field>
</Story>

<Story name="Sizes" asChild>
  <div class={styles.stack}>
    <RatingGroup defaultValue={3} size="xs" aria-label="Extra-small rating">
      <RatingGroupControl>
        <RatingGroupItems />
      </RatingGroupControl>
    </RatingGroup>
    <RatingGroup defaultValue={3} size="sm" aria-label="Small rating">
      <RatingGroupControl>
        <RatingGroupItems />
      </RatingGroupControl>
    </RatingGroup>
    <RatingGroup defaultValue={3} size="md" aria-label="Medium rating">
      <RatingGroupControl>
        <RatingGroupItems />
      </RatingGroupControl>
    </RatingGroup>
    <RatingGroup defaultValue={3} size="lg" aria-label="Large rating">
      <RatingGroupControl>
        <RatingGroupItems />
      </RatingGroupControl>
    </RatingGroup>
    <RatingGroup defaultValue={3} size="xl" aria-label="Extra-large rating">
      <RatingGroupControl>
        <RatingGroupItems />
      </RatingGroupControl>
    </RatingGroup>
  </div>
</Story>

<Story name="Disabled And Read Only" asChild>
  <div class={styles.stack}>
    <RatingGroup defaultValue={4} disabled>
      <RatingGroupLabel>Disabled rating</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems />
      </RatingGroupControl>
    </RatingGroup>
    <RatingGroup defaultValue={2} readOnly>
      <RatingGroupLabel>Read-only rating</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems />
      </RatingGroupControl>
    </RatingGroup>
  </div>
</Story>

<Story name="Form Usage" asChild>
  <form class={styles.stack} onsubmit={(event) => event.preventDefault()}>
    <RatingGroup name="review" defaultValue={4} required>
      <RatingGroupLabel>Review score</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems />
      </RatingGroupControl>
      <RatingGroupHiddenInput />
    </RatingGroup>
    <Button type="submit">Submit</Button>
  </form>
</Story>

<Story name="Custom Styles" asChild>
  <RatingGroup class={styles.customRatingGroup} defaultValue={5}>
    <RatingGroupLabel>Styled rating</RatingGroupLabel>
    <RatingGroupControl>
      <RatingGroupItems />
    </RatingGroupControl>
  </RatingGroup>
</Story>

<Story name="Custom Icon" asChild>
  <RatingGroup defaultValue={3}>
    <RatingGroupLabel>Checklist score</RatingGroupLabel>
    <RatingGroupControl>
      <RatingGroupItems>
        <RatingGroupItemIndicator class={styles.customIcon}>
          <HeartIcon />
        </RatingGroupItemIndicator>
      </RatingGroupItems>
    </RatingGroupControl>
  </RatingGroup>
</Story>

<Story name="As Child" exportName="AsChild" asChild>
  <RatingGroup defaultValue={4}>
    {#snippet asChild(props)}
      <section {...props({ class: styles.asChild })}>
        <RatingGroupLabel>Semantic rating section</RatingGroupLabel>
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
      </section>
    {/snippet}
  </RatingGroup>
</Story>