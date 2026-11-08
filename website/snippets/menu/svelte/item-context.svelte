<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Menu,
    MenuContent,
    MenuIndicator,
    MenuItem,
    MenuItemContext,
    MenuPositioner,
    MenuTrigger,
    MenuViewport,
  } from '@moduix/svelte/menu';

  const items = ['profile', 'notifications', 'appearance', 'security'];
</script>

<Menu>
  <MenuTrigger>
    {#snippet asChild(props)}
      <Button {...props()}>Settings <MenuIndicator /></Button>
    {/snippet}
  </MenuTrigger>
  <MenuPositioner>
    <MenuContent>
      <MenuViewport>
        {#each items as item (item)}
          <MenuItem value={item}>
            <MenuItemContext>
              {#snippet render(context)}
                <span data-highlighted={context().highlighted ? '' : undefined}>
                  {item[0].toUpperCase() + item.slice(1)}{item === 'profile' ? ' Settings' : ''}
                </span>
              {/snippet}
            </MenuItemContext>
          </MenuItem>
        {/each}
      </MenuViewport>
    </MenuContent>
  </MenuPositioner>
</Menu>