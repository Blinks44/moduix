<script setup lang="ts">
import { Field, FieldErrorText, FieldHelperText } from '@moduix/vue/field';
import {
  FileUpload,
  FileUploadContext,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/vue/file-upload';
import styles from '@/components/examples/file-upload/file-upload-with-field.module.css';
const name = 'attachments';
const maxFiles = 3;
</script>
<template>
  <Field :class="styles.root" required
    ><FileUpload :name="name" :max-files="maxFiles"
      ><FileUploadLabel>Required attachments</FileUploadLabel
      ><FileUploadTrigger>Choose files</FileUploadTrigger
      ><FileUploadItemGroup
        ><FileUploadContext v-slot="{ acceptedFiles }"
          ><FileUploadItem v-for="file in acceptedFiles" :key="file.name + file.size" :file="file"
            ><FileUploadItemName /><FileUploadItemDeleteTrigger
              :aria-label="
                'Remove ' + file.name
              " /></FileUploadItem></FileUploadContext></FileUploadItemGroup
      ><FileUploadHiddenInput /></FileUpload
    ><FieldHelperText>Upload up to three files.</FieldHelperText
    ><FieldErrorText>Upload at least one file.</FieldErrorText></Field
  >
</template>