<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Empty,
    EmptyActions,
    EmptyContent,
    EmptyDescription,
    EmptyTitle,
  } from '@moduix/svelte/empty';
  import styles from '@/components/examples/empty/empty-custom-element.module.css';

  const emptyState = {
    title: 'Create your first project',
    action: 'Create project',
  };
</script>

<Empty class={styles.root}>
  {#snippet asChild(props)}
    <section {...props()} aria-labelledby="projects-empty-title">
      <EmptyContent>
        <EmptyTitle>
          {#snippet asChild(titleProps)}
            <h2 {...titleProps()} id="projects-empty-title">{emptyState.title}</h2>
          {/snippet}
        </EmptyTitle>
        <EmptyDescription>
          {#snippet asChild(descriptionProps)}
            <div {...descriptionProps()}>
              <p>
                Start from a template or <strong>build a workspace from scratch</strong> for your team.
              </p>
            </div>
          {/snippet}
        </EmptyDescription>
      </EmptyContent>
      <EmptyActions>
        <Button>{emptyState.action}</Button>
      </EmptyActions>
    </section>
  {/snippet}
</Empty>