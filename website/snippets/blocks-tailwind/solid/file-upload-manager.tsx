import { For, Show } from 'solid-js';
import { Button } from '@/registry/solid/ui/button';
import { Card, CardAction, CardBody, CardDescription, CardHeader } from '@/registry/solid/ui/card';
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
} from '@/registry/solid/ui/file-upload';

const maxFiles = 5;
const maxFileSize = 10 * 1024 * 1024;

export function FileUploadManager() {
  return (
    <div class="grid w-full min-w-0 p-3 min-[34rem]:p-[clamp(1rem,5vw,2rem)]">
      <FileUpload
        class="w-full max-w-full min-w-0"
        accept="application/pdf,.doc,.docx,image/png,image/jpeg"
        maxFiles={maxFiles}
        maxFileSize={maxFileSize}
      >
        <FileUploadHiddenInput />
        <Card class="w-full min-w-0">
          <CardHeader>
            <div>
              <FileUploadLabel class="text-lg font-semibold text-foreground">
                Project attachments
              </FileUploadLabel>
              <CardDescription>
                Share briefs, documents, and reference images with your team.
              </CardDescription>
            </div>
            <FileUploadContext>
              {(api) => (
                <Show when={api().acceptedFiles.length}>
                  <CardAction>
                    <FileUploadClearTrigger
                      asChild={(props) => (
                        <Button {...props()} class="flex-none" variant="outline" size="sm">
                          Clear all
                        </Button>
                      )}
                    />
                  </CardAction>
                </Show>
              )}
            </FileUploadContext>
          </CardHeader>

          <CardBody class="grid min-w-0 gap-6">
            <FileUploadDropzone
              class="grid min-h-40 place-items-center content-center gap-3 rounded-lg border border-dashed border-[color-mix(in_oklab,var(--color-border)_82%,var(--color-foreground))] bg-muted/45 p-5 text-center transition-all duration-normal ease-in-out data-[dragging]:border-primary data-[dragging]:bg-[color-mix(in_oklab,var(--color-primary)_8%,var(--color-background))] min-[34rem]:min-h-48 min-[34rem]:p-6"
              disableClick
            >
              <FileUploadDropzoneIcon class="text-primary" />
              <div class="grid gap-1 [&_span]:text-sm [&_span]:text-muted-foreground [&_strong]:text-sm [&_strong]:font-semibold [&_strong]:text-foreground">
                <strong>Drop files here</strong>
                <span>PDF, DOCX, PNG, or JPG up to 10 MB</span>
              </div>
              <FileUploadTrigger
                asChild={(props) => (
                  <Button {...props()} class="mt-1">
                    Browse files
                  </Button>
                )}
              />
            </FileUploadDropzone>

            <FileUploadContext>
              {(api) => (
                <div class="grid min-w-0 gap-3 border-t border-border pt-4">
                  <div class="flex items-start justify-between gap-4 min-[34rem]:items-center [&>span:first-child]:text-sm [&>span:first-child]:font-semibold [&>span:first-child]:text-foreground">
                    <span>Attachments</span>
                    <span class="text-sm text-muted-foreground" aria-live="polite">
                      {api().acceptedFiles.length} of {maxFiles} files
                    </span>
                  </div>

                  <Show
                    when={api().acceptedFiles.length}
                    fallback={<p class="m-0 text-sm text-muted-foreground">No files added yet.</p>}
                  >
                    <FileUploadItemGroup class="min-w-0 gap-2 [&_[data-slot=file-upload-item]]:max-w-full [&_[data-slot=file-upload-item]]:min-w-0">
                      <FileUploadItems />
                    </FileUploadItemGroup>
                  </Show>

                  <Show when={api().rejectedFiles.length}>
                    <FileUploadItemGroup
                      class="min-w-0 gap-2 [&_[data-slot=file-upload-item]]:max-w-full [&_[data-slot=file-upload-item]]:min-w-0 [&_[data-slot=file-upload-item]]:border-[color-mix(in_oklab,var(--color-destructive)_36%,var(--color-border))]"
                      type="rejected"
                    >
                      <For each={api().rejectedFiles}>
                        {({ file, errors }) => (
                          <FileUploadItem file={file}>
                            <FileUploadItemName />
                            <p class="m-0 text-xs text-destructive" role="alert">
                              {errors.join(', ')}
                            </p>
                            <FileUploadItemDeleteTrigger />
                          </FileUploadItem>
                        )}
                      </For>
                    </FileUploadItemGroup>
                  </Show>
                </div>
              )}
            </FileUploadContext>
          </CardBody>
        </Card>
      </FileUpload>
    </div>
  );
}