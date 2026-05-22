import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { FocusEvent as ReactFocusEvent } from 'react';

export type GalleryPhoto = {
  src: string;
  alt: string;
};

interface Props {
  photos: readonly GalleryPhoto[];
  autoAdvanceMs?: number;
  caption?: string;
  placeholderNote?: string;
}

const DEFAULT_AUTO_ADVANCE_MS = 6000;

export default function HeroGallery({
  photos,
  autoAdvanceMs = DEFAULT_AUTO_ADVANCE_MS,
  caption,
  placeholderNote,
}: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const labelId = useId();
  const rotationId = useId();
  const touchStartX = useRef<number | null>(null);

  const total = photos.length;

  const goTo = useCallback(
    (next: number) => {
      if (total === 0) return;
      setIndex(((next % total) + total) % total);
    },
    [total]
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (paused || total <= 1 || autoAdvanceMs <= 0) return;
    const prefersReduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, autoAdvanceMs);
    return () => window.clearInterval(id);
  }, [paused, total, autoAdvanceMs]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goTo(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goTo(total - 1);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX === null) return;
    const endX = e.changedTouches[0]?.clientX ?? startX;
    const delta = endX - startX;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) goNext();
    else goPrev();
  };

  const onFocusCapture = () => setPaused(true);
  const onBlurCapture = (e: ReactFocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setPaused(false);
    }
  };

  if (total === 0) return null;

  return (
    <figure
      className="card p-3 sm:p-4"
      aria-labelledby={labelId}
      aria-roledescription="karuzela"
    >
      <div
        className="group relative overflow-hidden rounded-control bg-background ring-1 ring-line"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={onFocusCapture}
        onBlurCapture={onBlurCapture}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyDown={onKeyDown}
        role="group"
        aria-label="Galeria zdjęć salonu"
      >
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          Zdjęcie {index + 1} z {total}: {photos[index]?.alt}
        </div>

        <ul
          id={rotationId}
          aria-live="off"
          className="relative aspect-[4/3] w-full"
        >
          {photos.map((photo, i) => {
            const active = i === index;
            return (
              <li
                key={`slide-${i}-${photo.src}`}
                role="group"
                aria-roledescription="slajd"
                aria-label={`${i + 1} z ${total}`}
                aria-hidden={!active}
                className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                  active ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={1200}
                  height={900}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Poprzednie zdjęcie"
          aria-controls={rotationId}
          className="absolute left-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/90 text-ink-primary shadow-card transition hover:bg-surface focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Następne zdjęcie"
          aria-controls={rotationId}
          className="absolute right-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/90 text-ink-primary shadow-card transition hover:bg-surface focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span aria-hidden="true">›</span>
        </button>

        <div
          role="group"
          aria-label="Wybierz zdjęcie"
          className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-pill bg-surface/85 px-3 py-1.5 backdrop-blur"
        >
          {photos.map((photo, i) => {
            const active = i === index;
            return (
              <button
                key={`dot-${i}-${photo.src}`}
                type="button"
                aria-current={active ? 'true' : undefined}
                aria-controls={rotationId}
                aria-label={`Pokaż zdjęcie ${i + 1} z ${total}`}
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-primary ${
                  active ? 'w-6 bg-primary' : 'w-2.5 bg-ink-primary/25 hover:bg-ink-primary/45'
                }`}
              />
            );
          })}
        </div>
      </div>

      <figcaption
        id={labelId}
        className="mt-3 flex items-center justify-between gap-3 px-1"
      >
        <span className="font-mono text-label-md uppercase tracking-wider text-ink-secondary">
          {caption ?? 'Galeria'}
        </span>
        {placeholderNote && (
          <span className="font-mono text-label-md uppercase tracking-wider text-ink-secondary">
            {placeholderNote}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
