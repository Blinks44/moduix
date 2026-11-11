<script lang="ts">
  import {
    Breadcrumbs,
    BreadcrumbsItem,
    BreadcrumbsLink,
    BreadcrumbsList,
    BreadcrumbsPage,
    BreadcrumbsSeparator,
  } from '@moduix/svelte/breadcrumbs';
</script>

<Breadcrumbs>
  <BreadcrumbsList>
    <BreadcrumbsItem>
      <BreadcrumbsLink>
        {#snippet asChild(props)}
          <a {...props()} href="/home" data-framework-link>Home</a>
        {/snippet}
      </BreadcrumbsLink>
    </BreadcrumbsItem>
    <BreadcrumbsSeparator />
    <BreadcrumbsItem>
      <BreadcrumbsLink>
        {#snippet asChild(props)}
          <a {...props()} href="/vacancies" data-framework-link>Vacancies</a>
        {/snippet}
      </BreadcrumbsLink>
    </BreadcrumbsItem>
    <BreadcrumbsSeparator />
    <BreadcrumbsItem><BreadcrumbsPage>Go Developer</BreadcrumbsPage></BreadcrumbsItem>
  </BreadcrumbsList>
</Breadcrumbs>