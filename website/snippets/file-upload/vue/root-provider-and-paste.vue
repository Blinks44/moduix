<script setup lang="ts">
import {
  useFileUpload,
  FileUploadContext,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadLabel,
  FileUploadRootProvider,
} from '@moduix/vue/file-upload';
import { Textarea } from '@moduix/vue/textarea';
import styles from '@/components/examples/file-upload/file-upload-root-provider-and-paste.module.css';
const maxFiles = 3;
const accept = 'image/*';
const fileUpload = useFileUpload({ maxFiles, accept });
</script>
<template>
  <FileUploadRootProvider :class="styles.root" :value="fileUpload"
    ><FileUploadLabel>Images</FileUploadLabel
    ><Textarea
      placeholder="Paste an image here"
      @paste="fileUpload.setClipboardFiles($event.clipboardData)" /><FileUploadItemGroup
      ><FileUploadContext v-slot="{ acceptedFiles }"
        ><FileUploadItem v-for="file in acceptedFiles" :key="file.name + file.size" :file="file"
          ><FileUploadItemName /><FileUploadItemDeleteTrigger
            :aria-label="
              'Remove ' + file.name
            " /></FileUploadItem></FileUploadContext></FileUploadItemGroup
    ><FileUploadHiddenInput
  /></FileUploadRootProvider>
</template>