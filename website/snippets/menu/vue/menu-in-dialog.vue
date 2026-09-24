<script setup lang="ts">
import {
  DialogBackdrop,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@ark-ui/vue/dialog';
import { Button } from '@moduix/vue/button';
import {
  Menu,
  MenuContent,
  MenuIndicator,
  MenuItem,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  MenuViewport,
} from '@moduix/vue/menu';
</script>

<template>
  <DialogRoot>
    <DialogTrigger as-child><Button>Open dialog</Button></DialogTrigger>
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Project settings</DialogTitle>
        <DialogDescription>Choose an action without leaving the dialog.</DialogDescription>
        <Menu :portalled="false" :positioning="{ strategy: 'fixed', hideWhenDetached: true }">
          <MenuTrigger as-child>
            <Button variant="outline">Actions <MenuIndicator /></Button>
          </MenuTrigger>
          <MenuPositioner>
            <MenuContent>
              <MenuViewport>
                <MenuItem value="rename">Rename project</MenuItem>
                <MenuItem value="duplicate">Duplicate project</MenuItem>
                <MenuItem value="move">Move to folder</MenuItem>
                <MenuSeparator />
                <MenuItem value="archive" tone="destructive">Archive project</MenuItem>
              </MenuViewport>
            </MenuContent>
          </MenuPositioner>
        </Menu>
      </DialogContent>
    </DialogPositioner>
  </DialogRoot>
</template>