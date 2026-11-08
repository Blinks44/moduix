<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Breadcrumbs,
    BreadcrumbsEllipsis,
    BreadcrumbsItem,
    BreadcrumbsLink,
    BreadcrumbsList,
    BreadcrumbsPage,
    BreadcrumbsPath,
    BreadcrumbsSeparator,
  } from '@/components/breadcrumbs';
  import {
    Menu,
    MenuContent,
    MenuItem,
    MenuPositioner,
    MenuTrigger,
    MenuViewport,
  } from '@/components/menu';
  import { SeparatorMarkIcon } from '@/lib/moduix/icons/ui';

  const { Story } = defineMeta({
    title: 'Components/Breadcrumbs',
    component: Breadcrumbs,
    parameters: { layout: 'centered' },
  });

  const defaultLinks = [
    { href: '#', label: 'Home' },
    { href: '#', label: 'Vacancies' },
  ];

  const defaultPage = 'Go Developer';
  const longCurrentLabel =
    'Go lang developer to production team with cross-functional ownership and platform support';

  const rtlLinks = [
    { href: '#', label: 'الرئيسية' },
    { href: '#', label: 'الوظائف' },
  ];
</script>

{#snippet customSeparator()}
  <SeparatorMarkIcon style="width: 0.75rem; height: 0.25rem" />
{/snippet}

{#snippet longCurrentPage()}
  <span title={longCurrentLabel}>{longCurrentLabel}</span>
{/snippet}

<Story name="Default" asChild>
  <Breadcrumbs>
    <BreadcrumbsPath links={defaultLinks} page={defaultPage} />
  </Breadcrumbs>
</Story>

<Story name="Collapsed" asChild>
  <Breadcrumbs>
    <BreadcrumbsList>
      <BreadcrumbsItem><BreadcrumbsLink href="#">Home</BreadcrumbsLink></BreadcrumbsItem>
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
                <MenuItem value="engineering" class="px-2 text-xs">
                  {#snippet asChild(props)}<a {...props()} href="#docs">Engineering</a>{/snippet}
                </MenuItem>
                <MenuItem value="backend" class="px-2 text-xs">
                  {#snippet asChild(props)}<a {...props()} href="#docs">Backend</a>{/snippet}
                </MenuItem>
                <MenuItem value="golang" class="px-2 text-xs">
                  {#snippet asChild(props)}<a {...props()} href="#docs">Golang</a>{/snippet}
                </MenuItem>
              </MenuViewport>
            </MenuContent>
          </MenuPositioner>
        </Menu>
      </BreadcrumbsItem>
      <BreadcrumbsSeparator />
      <BreadcrumbsItem><BreadcrumbsLink href="#">Vacancies</BreadcrumbsLink></BreadcrumbsItem>
      <BreadcrumbsSeparator />
      <BreadcrumbsItem><BreadcrumbsPage>Go Developer</BreadcrumbsPage></BreadcrumbsItem>
    </BreadcrumbsList>
  </Breadcrumbs>
</Story>

<Story name="Custom Separator" asChild>
  <Breadcrumbs>
    <BreadcrumbsPath links={defaultLinks} page={defaultPage} separator={customSeparator} />
  </Breadcrumbs>
</Story>

<Story name="Right To Left" asChild>
  <Breadcrumbs dir="rtl" aria-label="مسار التنقل">
    <BreadcrumbsPath links={rtlLinks} page="مطور Go" />
  </Breadcrumbs>
</Story>

<Story name="Framework Link" asChild>
  <Breadcrumbs>
    <BreadcrumbsList>
      <BreadcrumbsItem>
        <BreadcrumbsLink>
          {#snippet asChild(props)}
            <a {...props()} href="#home" data-framework-link>Home</a>
          {/snippet}
        </BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsSeparator />
      <BreadcrumbsItem>
        <BreadcrumbsLink>
          {#snippet asChild(props)}
            <a {...props()} href="#vacancies" data-framework-link>Vacancies</a>
          {/snippet}
        </BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsSeparator />
      <BreadcrumbsItem><BreadcrumbsPage>Go Developer</BreadcrumbsPage></BreadcrumbsItem>
    </BreadcrumbsList>
  </Breadcrumbs>
</Story>

<Story name="Long Current Label" asChild>
  <Breadcrumbs>
    <BreadcrumbsPath links={defaultLinks} page={longCurrentPage} />
  </Breadcrumbs>
</Story>

<Story name="Advanced Customization" asChild>
  <Breadcrumbs>
    <BreadcrumbsList>
      <BreadcrumbsItem>
        <BreadcrumbsLink>
          {#snippet asChild(props)}
            <a {...props()} href="#home" data-framework-link>Home</a>
          {/snippet}
        </BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsSeparator />
      <BreadcrumbsItem>
        <BreadcrumbsLink>
          {#snippet asChild(props)}
            <a {...props()} href="#engineering" data-framework-link>Engineering</a>
          {/snippet}
        </BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsSeparator>
        <SeparatorMarkIcon style="width: 0.75rem; height: 0.25rem" />
      </BreadcrumbsSeparator>
      <BreadcrumbsItem>
        <BreadcrumbsPage><span title={longCurrentLabel}>{longCurrentLabel}</span></BreadcrumbsPage>
      </BreadcrumbsItem>
    </BreadcrumbsList>
  </Breadcrumbs>
</Story>