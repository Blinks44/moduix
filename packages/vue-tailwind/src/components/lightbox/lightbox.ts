import { isRef } from 'vue';
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

export const preloadImage = (src?: string) => {
  if (!src || typeof Image === 'undefined') {
    return;
  }

  const image = new Image();
  image.src = src;
};

export const resolveImage = (
  target: EventTarget | null,
  selector: string,
  rootNode: HTMLElement,
): LightboxImageSelectDetails | null => {
  if (!(target instanceof Element)) {
    return null;
  }

  const matchedNode = target.closest(selector);
  if (!matchedNode || !rootNode.contains(matchedNode)) {
    return null;
  }

  const imageNode =
    matchedNode instanceof HTMLImageElement ? matchedNode : matchedNode.querySelector('img');
  if (!(imageNode instanceof HTMLImageElement)) {
    return null;
  }

  const src = imageNode.dataset.lightboxSrc ?? (imageNode.currentSrc || imageNode.src);
  if (!src) {
    return null;
  }

  return {
    src,
    alt: imageNode.alt || undefined,
    element: imageNode,
  };
};

export const resolveRootNode = (
  rootRef: LightboxBindProps['rootRef'],
  rootSelector: string | undefined,
): HTMLElement | null => {
  const rootNode =
    typeof rootRef === 'function' ? rootRef() : isRef(rootRef) ? rootRef.value : rootRef;
  return rootNode ?? (rootSelector ? document.querySelector<HTMLElement>(rootSelector) : null);
};