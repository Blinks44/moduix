<script setup lang="ts">
import { useFileUploadContext } from '@ark-ui/vue/file-upload';
import FileUploadItem from './FileUploadItem.vue';
import FileUploadItemDeleteTrigger from './FileUploadItemDeleteTrigger.vue';
import FileUploadItemMetadata from './FileUploadItemMetadata.vue';
import FileUploadItemName from './FileUploadItemName.vue';
import FileUploadItemPreview from './FileUploadItemPreview.vue';
import FileUploadItemPreviewIcon from './FileUploadItemPreviewIcon.vue';
import FileUploadItemPreviewImage from './FileUploadItemPreviewImage.vue';

const fileUpload = useFileUploadContext();
const isImageFile = (file: File) => file.type.startsWith('image/');
</script>
<template>
  <FileUploadItem
    v-for="file in fileUpload.acceptedFiles"
    :key="`${file.name}-${file.size}`"
    :file="file"
  >
    <FileUploadItemPreview>
      <FileUploadItemPreviewImage v-if="isImageFile(file)" />
      <FileUploadItemPreviewIcon v-else />
    </FileUploadItemPreview>
    <FileUploadItemName />
    <FileUploadItemMetadata :file="file" />
    <FileUploadItemDeleteTrigger :aria-label="`Remove ${file.name}`" />
  </FileUploadItem>
</template>