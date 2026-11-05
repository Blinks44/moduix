<script lang="ts">
  import {
    Empty,
    EmptyActions,
    EmptyContent,
    EmptyDescription,
    EmptyIcon,
    EmptyTitle,
  } from '@/components/empty';

  let rootRef: Element | null = $state(null);
  let iconRef: Element | null = $state(null);
  let contentRef: Element | null = $state(null);
  let titleRef: Element | null = $state(null);
  let descriptionRef: Element | null = $state(null);
  let actionsRef: Element | null = $state(null);

  export const getRefs = () => ({
    rootRef,
    iconRef,
    contentRef,
    titleRef,
    descriptionRef,
    actionsRef,
  });
</script>

<Empty bind:ref={rootRef}>
  {#snippet asChild(props)}
    <section {...props()} aria-label="Projects">
      <EmptyIcon bind:ref={iconRef}>
        {#snippet asChild(iconProps)}
          <span {...iconProps()} data-testid="empty-icon">⌘</span>
        {/snippet}
      </EmptyIcon>
      <EmptyContent bind:ref={contentRef}>
        {#snippet asChild(contentProps)}
          <div {...contentProps()} data-testid="empty-content">
            <EmptyTitle bind:ref={titleRef}>
              {#snippet asChild(titleProps)}
                <h2 {...titleProps()}>No projects</h2>
              {/snippet}
            </EmptyTitle>
            <EmptyDescription bind:ref={descriptionRef}>
              {#snippet asChild(descriptionProps)}
                <p {...descriptionProps()}>Start by creating a project.</p>
              {/snippet}
            </EmptyDescription>
          </div>
        {/snippet}
      </EmptyContent>
      <EmptyActions bind:ref={actionsRef}>
        {#snippet asChild(actionsProps)}
          <nav {...actionsProps()} aria-label="Project actions">
            <button type="button">Create project</button>
          </nav>
        {/snippet}
      </EmptyActions>
    </section>
  {/snippet}
</Empty>