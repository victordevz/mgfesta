"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  galleryCategories,
  galleryLayouts,
  type GalleryItem,
} from "@/data/landing";

export function MobileProfile() {
  const [activeCategoryId, setActiveCategoryId] = useState(
    galleryCategories[0].id,
  );
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);
  const activeCategory = useMemo(
    () =>
      galleryCategories.find((category) => category.id === activeCategoryId) ??
      galleryCategories[0],
    [activeCategoryId],
  );
  const galleryItems: GalleryItem[] = useMemo(
    () =>
      activeCategory.images.map((image, index) => ({
        id: `${activeCategory.id}-${index}`,
        image,
        className: galleryLayouts[index].className,
        sizes: galleryLayouts[index].sizes,
      })),
    [activeCategory],
  );
  const isGalleryOpen = activeImageIndex !== null;
  const activeImage =
    activeImageIndex === null ? null : galleryItems[activeImageIndex];

  const closeGallery = useCallback(() => {
    setActiveImageIndex(null);
  }, []);

  const showPreviousImage = useCallback(() => {
    setActiveImageIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return (
        (currentIndex - 1 + galleryItems.length) % galleryItems.length
      );
    });
  }, [galleryItems.length]);

  const showNextImage = useCallback(() => {
    setActiveImageIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return (currentIndex + 1) % galleryItems.length;
    });
  }, [galleryItems.length]);

  const handleCarouselTouchStart = useCallback((clientX: number) => {
    touchStartX.current = clientX;
  }, []);

  const handleCarouselTouchEnd = useCallback(
    (clientX: number) => {
      if (touchStartX.current === null) {
        return;
      }

      const distance = clientX - touchStartX.current;
      touchStartX.current = null;

      if (Math.abs(distance) < 42) {
        return;
      }

      if (distance < 0) {
        showNextImage();
        return;
      }

      showPreviousImage();
    },
    [showNextImage, showPreviousImage],
  );

  useEffect(() => {
    if (!isGalleryOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeGallery();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [closeGallery, isGalleryOpen, showNextImage, showPreviousImage]);

  useEffect(() => {
    if (activeImageIndex === null) {
      return;
    }

    thumbnailRefs.current[activeImageIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeImageIndex]);

  return (
    <main className="flex min-h-dvh items-start justify-center bg-[#f2f2f2] p-0 sm:items-center sm:p-6">
      <section
        aria-label="MG FESTA mobile landing page"
        className="phone-frame relative overflow-hidden bg-white shadow-[0_24px_80px_rgba(0,0,0,0.12)]"
      >
        <div className="phone-canvas relative h-[823px] w-[411px] overflow-hidden rounded-[25px]">
          <div className="absolute left-[10px] top-[12px] h-[238px] w-[391px] overflow-hidden rounded-[28px] bg-[#ff333a] shadow-[0_16px_34px_rgba(255,51,58,0.22)]">
            <div className="absolute left-[-70px] top-[-95px] size-[230px] rounded-full bg-white/15 blur-[2px]" />
            <div className="absolute bottom-[-88px] right-[-74px] size-[210px] rounded-full bg-black/10 blur-[4px]" />
            <div className="absolute bottom-[18px] left-[22px] h-px w-[347px] bg-white/18" />
          </div>

          <div className="absolute left-[28px] top-[34px] size-[94px] overflow-hidden rounded-full bg-[#fff6f1] shadow-[0_10px_24px_rgba(0,0,0,0.14)] ring-[3px] ring-white/95">
            <Image
              src="/assets/figma/mgfestaicon.png"
              alt="MG FESTA profile"
              fill
              priority
              sizes="94px"
              className="object-cover"
            />
          </div>

          <span className="absolute left-[138px] top-[44px] rounded-full bg-white/16 px-[9px] py-[3px] text-[8px] font-semibold uppercase tracking-[0.18em] text-white/90">
            Portfólio criativo
          </span>
          <h1 className="absolute left-[138px] top-[65px] h-[30px] w-[248px] text-[19px] font-semibold leading-normal text-white">
            MG FESTA / GRÁFICA
          </h1>
          <p className="absolute left-[138px] top-[96px] w-[232px] text-[10px] font-light leading-[1.35] text-white/90">
            Impressos, lembranças e decoração para festas com acabamento sob medida.
          </p>
          <div className="absolute left-[27px] top-[158px] flex w-[357px] justify-between">
            {galleryCategories.map((category) => {
              const isActive = category.id === activeCategoryId;

              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveCategoryId(category.id);
                    setActiveImageIndex(null);
                  }}
                  className="group flex w-[76px] flex-col items-center gap-[5px] text-white"
                >
                  <span
                    className={`relative size-[54px] overflow-hidden rounded-full bg-white ring-[2px] transition ${
                      isActive
                        ? "scale-105 ring-white shadow-[0_8px_20px_rgba(0,0,0,0.22)]"
                        : "ring-white/45 group-hover:scale-105 group-hover:ring-white/85"
                    }`}
                  >
                    <Image
                      src={category.cover}
                      alt=""
                      fill
                      sizes="54px"
                      className="object-cover"
                    />
                  </span>
                  <span
                    className={`max-w-[74px] truncate text-center text-[9px] font-semibold leading-none ${
                      isActive ? "text-white" : "text-white/78"
                    }`}
                  >
                    {category.title}
                  </span>
                </button>
              );
            })}
          </div>

          {galleryItems.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-label="Open gallery image"
              onClick={() => setActiveImageIndex(galleryItems.indexOf(item))}
              className={`absolute overflow-hidden rounded-[10px] transition-[transform,box-shadow,filter] duration-200 ease-out hover:scale-[1.03] hover:brightness-110 hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)] focus-visible:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#ff333a] ${item.className}`}
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes={item.sizes}
                className="object-cover"
              />
            </button>
          ))}

          <a
            href="https://wa.me/5581981472018"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open MG FESTA on WhatsApp"
            className="absolute left-[324px] top-[746px] flex size-[54px] items-center justify-center rounded-full bg-white p-[5px] shadow-[0_10px_28px_rgba(13,184,79,0.38)] transition-[transform,box-shadow,filter] duration-200 ease-out hover:scale-110 hover:shadow-[0_14px_34px_rgba(13,184,79,0.52)] hover:brightness-105 focus-visible:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25d366]"
          >
            <span className="absolute inset-[-4px] rounded-full bg-[#25d366] opacity-20 blur-[8px]" />
            <Image
              src="/assets/figma/iconwhatsappfinal.png"
              alt="WhatsApp"
              width={48}
              height={48}
              priority
              className="relative size-full rounded-full object-cover brightness-110 contrast-110 saturate-125"
            />
          </a>
        </div>
      </section>

      {isGalleryOpen && activeImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery carousel"
          onClick={closeGallery}
        >
          <div
            className="relative flex max-h-[92dvh] w-full max-w-[920px] flex-col gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close gallery"
              onClick={closeGallery}
              className="absolute right-0 top-0 z-10 flex size-10 items-center justify-center rounded-full bg-white/95 text-[24px] leading-none text-black shadow-[0_8px_22px_rgba(0,0,0,0.25)] transition hover:scale-105 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              ×
            </button>

            <div
              className="relative flex min-h-[260px] flex-1 touch-pan-y items-center justify-center overflow-hidden rounded-[12px] bg-black/35 sm:min-h-[560px]"
              onTouchStart={(event) =>
                handleCarouselTouchStart(event.changedTouches[0].clientX)
              }
              onTouchEnd={(event) =>
                handleCarouselTouchEnd(event.changedTouches[0].clientX)
              }
            >
              <Image
                src={activeImage.image}
                alt=""
                fill
                sizes="(max-width: 920px) 100vw, 920px"
                className="object-contain"
                priority
              />

              <button
                type="button"
                aria-label="Previous image"
                onClick={showPreviousImage}
                className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[34px] leading-[0.85] text-black shadow-[0_8px_22px_rgba(0,0,0,0.25)] transition hover:scale-105 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                ‹
              </button>

              <button
                type="button"
                aria-label="Next image"
                onClick={showNextImage}
                className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[34px] leading-[0.85] text-black shadow-[0_8px_22px_rgba(0,0,0,0.25)] transition hover:scale-105 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                ›
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto rounded-[12px] bg-white/10 p-2">
              {galleryItems.map((item, index) => (
                <button
                  key={item.id}
                  ref={(element) => {
                    thumbnailRefs.current[index] = element;
                  }}
                  type="button"
                  aria-label={`Show image ${index + 1}`}
                  aria-current={index === activeImageIndex}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative h-[64px] w-[88px] shrink-0 overflow-hidden rounded-[8px] transition ${
                    index === activeImageIndex
                      ? "ring-2 ring-white"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="88px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
