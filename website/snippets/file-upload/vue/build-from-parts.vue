<script setup lang="ts">
import { Trash2 as TrashIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import {
  FileUpload,
  FileUploadContext,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemMetadata,
  FileUploadItemName,
  FileUploadItemPreview,
  FileUploadItemPreviewIcon,
  FileUploadItemPreviewImage,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/vue/file-upload';
import styles from '@/components/examples/file-upload/file-upload-basic.module.css';

const maxFiles = 3;
const isImageFile = (file: File) => file.type.startsWith('image/');
</script>

<template>
  <FileUpload :class="styles.root" :max-files="maxFiles">
    <FileUploadLabel>Attachments</FileUploadLabel>
    <FileUploadHiddenInput />
    <FileUploadTrigger as-child><Button>Choose files</Button></FileUploadTrigger>
    <FileUploadItemGroup>
      <FileUploadContext v-slot="{ acceptedFiles }">
        <FileUploadItem
          v-for="file in acceptedFiles"
          :key="`${file.name}-${file.size}`"
          :file="file"
        >
          <FileUploadItemPreview>
            <FileUploadItemPreviewImage v-if="isImageFile(file)" />
            <FileUploadItemPreviewIcon v-else />
          </FileUploadItemPreview>
          <FileUploadItemName />
          <FileUploadItemMetadata :file="file" />
          <FileUploadItemDeleteTrigger><TrashIcon /></FileUploadItemDeleteTrigger>
        </FileUploadItem>
      </FileUploadContext>
    </FileUploadItemGroup>
  </FileUpload>
</template>