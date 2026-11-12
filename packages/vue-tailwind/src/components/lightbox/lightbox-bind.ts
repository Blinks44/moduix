import { toValue } from 'vue';
import type { Ref } from 'vue';

export type LightboxImageSelectDetails = {
  alt?: string;
  element: HTMLImageElement;
  src: string;
};

export type LightboxBindProps = {
  onImageSelect: (details: LightboxImageSelectDetails) => void;
  selector: string;
  rootRef?:
    | HTMLElement
    | Ref<HTMLElement | null | undefined>
    | (() => HTMLElement | null | undefined);
  rootSelector?: string;
};

export const resolveImage = (
  target: EventTarget | null,
  selector: string,
  rootNode: HTMLElement,
): LightboxImageSelectDetails | null => {
  const matchedNode = target instanceof Element ? target.closest(selector) : null;
  if (!matchedNode || !rootNode.contains(matchedNode)) {
    return null;
  }

  const imageNode =
    matchedNode instanceof HTMLImageElement ? matchedNode : matchedNode.querySelector('img');
  if (!imageNode) {
    return null;
  }

  // An explicitly empty data-lightbox-src excludes the image.
  const src = imageNode.dataset.lightboxSrc ?? (imageNode.currentSrc || imageNode.src);
  return src ? { src, alt: imageNode.alt || undefined, element: imageNode } : null;
};

export const resolveRootNode = (
  rootRef: LightboxBindProps['rootRef'],
  rootSelector: string | undefined,
): HTMLElement | null => {
  const rootNode = toValue(rootRef);
  return rootNode ?? (rootSelector ? document.querySelector<HTMLElement>(rootSelector) : null);
};