<script lang="ts">
  import {
    Breadcrumbs,
    BreadcrumbsEllipsis,
    BreadcrumbsItem,
    BreadcrumbsLink,
    BreadcrumbsList,
    BreadcrumbsPage,
    BreadcrumbsSeparator,
  } from '@moduix/svelte/breadcrumbs';
  import {
    Menu,
    MenuContent,
    MenuItem,
    MenuPositioner,
    MenuTrigger,
    MenuViewport,
  } from '@moduix/svelte/menu';
  import styles from '@/components/examples/breadcrumbs/breadcrumbs-collapsed-path.module.css';

  const collapsedItems = [
    { href: '/docs', label: 'Docs' },
    { href: '/docs/quick-start', label: 'Quick Start' },
    { href: '/docs/composition-patterns', label: 'Composition Patterns' },
  ];
</script>

<Breadcrumbs>
  <BreadcrumbsList>
    <BreadcrumbsItem><BreadcrumbsLink href="/">Home</BreadcrumbsLink></BreadcrumbsItem>
    <BreadcrumbsSeparator />
    <BreadcrumbsItem>
      <Menu positioning={{ placement: 'bottom-start' }}>
        <MenuTrigger>
          {#snippet asChild(props)}
            <button {...props()} type="button" aria-label="Show hidden path items">
              <BreadcrumbsEllipsis />
            </button>
          {/snippet}
        </MenuTrigger>
        <MenuPositioner>
          <MenuContent class={styles.content}>
            <MenuViewport>
              {#each collapsedItems as item (item.href)}
                <MenuItem value={item.href}>
                  {#snippet asChild(props)}
                    <a {...props()} href={item.href}>{item.label}</a>
                  {/snippet}
                </MenuItem>
              {/each}
            </MenuViewport>
          </MenuContent>
        </MenuPositioner>
      </Menu>
    </BreadcrumbsItem>
    <BreadcrumbsSeparator />
    <BreadcrumbsItem>
      <BreadcrumbsLink href="/docs/breadcrumbs">Breadcrumbs</BreadcrumbsLink>
    </BreadcrumbsItem>
    <BreadcrumbsSeparator />
    <BreadcrumbsItem><BreadcrumbsPage>Go Developer</BreadcrumbsPage></BreadcrumbsItem>
  </BreadcrumbsList>
</Breadcrumbs>