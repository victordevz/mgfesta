export type GalleryItem = {
  id: string;
  image: string;
  className: string;
  sizes: string;
};

export type GalleryCategory = {
  id: string;
  title: string;
  cover: string;
  images: string[];
};

export const galleryLayouts = [
  {
    className: "left-[23px] top-[278px] h-[112px] w-[220px]",
    sizes: "220px",
  },
  {
    className: "left-[258px] top-[278px] h-[112px] w-[125px]",
    sizes: "125px",
  },
  {
    className: "left-[23px] top-[404px] h-[112px] w-[125px]",
    sizes: "125px",
  },
  {
    className: "left-[163px] top-[404px] h-[112px] w-[220px]",
    sizes: "220px",
  },
  {
    className: "left-[23px] top-[530px] h-[112px] w-[220px]",
    sizes: "220px",
  },
  {
    className: "left-[258px] top-[530px] h-[112px] w-[125px]",
    sizes: "125px",
  },
  {
    className: "left-[23px] top-[656px] h-[112px] w-[125px]",
    sizes: "125px",
  },
  {
    className: "left-[163px] top-[656px] h-[112px] w-[220px]",
    sizes: "220px",
  },
];

export const galleryCategories: GalleryCategory[] = [
  {
    id: "kits",
    title: "Kits",
    cover: "/assets/categories/kit-1.png",
    images: [
      "/assets/categories/kit-1.png",
      "/assets/categories/kit-2.png",
      "/assets/categories/kit-3.png",
      "/assets/categories/kit-4.png",
      "/assets/categories/kit-5.png",
      "/assets/categories/kit-6.png",
      "/assets/categories/kit-7.png",
      "/assets/categories/kit-8.png",
    ],
  },
  {
    id: "cenarios",
    title: "Cenários",
    cover: "/assets/categories/scenario-1.png",
    images: [
      "/assets/categories/scenario-1.png",
      "/assets/categories/scenario-2.png",
      "/assets/categories/scenario-3.png",
      "/assets/categories/scenario-4.png",
      "/assets/categories/scenario-5.png",
      "/assets/categories/scenario-6.png",
      "/assets/categories/scenario-7.png",
      "/assets/categories/scenario-8.png",
    ],
  },
  {
    id: "parabens",
    title: "Parabéns",
    cover: "/assets/categories/parabens-2.png",
    images: [
      "/assets/categories/parabens-2.png",
      "/assets/categories/parabens-4.png",
      "/assets/categories/parabens-6.png",
      "/assets/categories/parabens-7.png",
      "/assets/categories/parabens-8.png",
      "/assets/categories/parabens-10.png",
      "/assets/categories/parabens-11.png",
    ],
  },
  {
    id: "flores",
    title: "Flores",
    cover: "/assets/categories/flower-1.png",
    images: [
      "/assets/categories/flower-1.png",
      "/assets/categories/flower-2.png",
      "/assets/categories/flower-3.png",
      "/assets/categories/flower-4.png",
      "/assets/categories/flower-5.png",
      "/assets/categories/flower-6.png",
      "/assets/categories/flower-7.png",
      "/assets/categories/flower-8.png",
    ],
  },
];
