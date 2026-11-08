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
          <MenuContent>
            <MenuViewport>
              <MenuItem value="engineering">
                {#snippet asChild(props)}<a {...props()} href="/engineering">Engineering</a
                  >{/snippet}
              </MenuItem>
              <MenuItem value="backend">
                {#snippet asChild(props)}<a {...props()} href="/engineering/backend">Backend</a
                  >{/snippet}
              </MenuItem>
              <MenuItem value="golang">
                {#snippet asChild(props)}<a {...props()} href="/engineering/backend/golang"
                    >Golang</a
                  >{/snippet}
              </MenuItem>
            </MenuViewport>
          </MenuContent>
        </MenuPositioner>
      </Menu>
    </BreadcrumbsItem>
    <BreadcrumbsSeparator />
    <BreadcrumbsItem>
      <BreadcrumbsLink href="/vacancies">Vacancies</BreadcrumbsLink>
    </BreadcrumbsItem>
    <BreadcrumbsSeparator />
    <BreadcrumbsItem><BreadcrumbsPage>Go Developer</BreadcrumbsPage></BreadcrumbsItem>
  </BreadcrumbsList>
</Breadcrumbs>