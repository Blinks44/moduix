<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  MenuViewport,
} from '@moduix/vue/menu';
import {
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@moduix/vue/table';

const rows = [
  {
    name: 'Docs redesign',
    owner: 'Product Design',
    environment: 'Production',
    updated: '2 hours ago',
  },
  { name: 'Billing migration', owner: 'Growth', environment: 'Staging', updated: 'Yesterday' },
  { name: 'Command palette', owner: 'Platform', environment: 'Preview', updated: 'Today' },
];
</script>

<template>
  <TableScrollArea>
    <Table interactive>
      <TableHeader>
        <TableRow>
          <TableColumnHeader>Project</TableColumnHeader>
          <TableColumnHeader>Owner</TableColumnHeader>
          <TableColumnHeader>Environment</TableColumnHeader>
          <TableColumnHeader>Updated</TableColumnHeader>
          <TableColumnHeader>Actions</TableColumnHeader>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="row in rows" :key="row.name">
          <TableCell>{{ row.name }}</TableCell>
          <TableCell>{{ row.owner }}</TableCell>
          <TableCell>{{ row.environment }}</TableCell>
          <TableCell>{{ row.updated }}</TableCell>
          <TableCell>
            <Menu :positioning="{ placement: 'bottom-end' }">
              <MenuTrigger as-child>
                <Button variant="ghost" size="icon-sm" :aria-label="`Open actions for ${row.name}`">
                  <span aria-hidden="true">…</span>
                </Button>
              </MenuTrigger>
              <MenuPositioner>
                <MenuContent>
                  <MenuViewport>
                    <MenuItem value="open">Open project</MenuItem>
                    <MenuItem value="copy-link">Copy link</MenuItem>
                    <MenuItem value="duplicate">Duplicate</MenuItem>
                    <MenuSeparator />
                    <MenuItem value="archive" tone="destructive">Archive</MenuItem>
                  </MenuViewport>
                </MenuContent>
              </MenuPositioner>
            </Menu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableScrollArea>
</template>