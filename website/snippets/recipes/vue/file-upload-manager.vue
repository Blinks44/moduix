<script setup lang="ts">
import { Card, CardAction, CardBody, CardDescription, CardHeader } from '@moduix/vue/card';
import {
  FileUpload,
  FileUploadClearTrigger,
  FileUploadContext,
  FileUploadDropzone,
  FileUploadDropzoneIcon,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadItems,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/vue/file-upload';
import styles from './file-upload-manager.module.css';

const maxFiles = 5;
const maxFileSize = 10 * 1024 * 1024;
</script>
<template>
  <div :class="styles.surface">
    <FileUpload
      :class="styles.fileUpload"
      accept="application/pdf,.doc,.docx,image/png,image/jpeg"
      :max-files="maxFiles"
      :max-file-size="maxFileSize"
    >
      <FileUploadHiddenInput />
      <Card :class="styles.card">
        <CardHeader>
          <div>
            <FileUploadLabel :class="styles.title">Project attachments</FileUploadLabel
            ><CardDescription
              >Share briefs, documents, and reference images with your team.</CardDescription
            >
          </div>
          <FileUploadContext v-slot="api"
            ><CardAction v-if="api.acceptedFiles.length"
              ><FileUploadClearTrigger :class="styles.clearTrigger"
                >Clear all</FileUploadClearTrigger
              ></CardAction
            ></FileUploadContext
          >
        </CardHeader>
        <CardBody :class="styles.body">
          <FileUploadDropzone :class="styles.dropzone" disable-click>
            <FileUploadDropzoneIcon :class="styles.dropzoneIcon" />
            <div :class="styles.dropzoneContent">
              <strong>Drop files here</strong><span>PDF, DOCX, PNG, or JPG up to 10 MB</span>
            </div>
            <FileUploadTrigger :class="styles.trigger">Browse files</FileUploadTrigger>
          </FileUploadDropzone>
          <FileUploadContext v-slot="api">
            <div :class="styles.fileList">
              <div :class="styles.listHeader">
                <span>Attachments</span
                ><span :class="styles.fileCount" aria-live="polite"
                  >{{ api.acceptedFiles.length }} of {{ maxFiles }} files</span
                >
              </div>
              <FileUploadItemGroup v-if="api.acceptedFiles.length" :class="styles.items"
                ><FileUploadItems
              /></FileUploadItemGroup>
              <p v-else :class="styles.emptyState">No files added yet.</p>
              <FileUploadItemGroup
                v-if="api.rejectedFiles.length"
                :class="styles.rejectedItems"
                type="rejected"
              >
                <FileUploadItem
                  v-for="({ file, errors }, index) in api.rejectedFiles"
                  :key="index"
                  :file="file"
                >
                  <FileUploadItemName />
                  <p :class="styles.error" role="alert">{{ errors.join(', ') }}</p>
                  <FileUploadItemDeleteTrigger :aria-label="`Remove ${file.name}`" />
                </FileUploadItem>
              </FileUploadItemGroup>
            </div>
          </FileUploadContext>
        </CardBody>
      </Card>
    </FileUpload>
  </div>
</template>