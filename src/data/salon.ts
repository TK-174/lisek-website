export type Service = {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
};

export type PriceRow = {
  readonly label: string;
  readonly price: string;
};

export type PriceCategoryId = 'psy' | 'koty' | 'inne';

export type PriceCategory = {
  readonly id: PriceCategoryId;
  readonly label: string;
  readonly description: string;
  readonly rows: readonly PriceRow[];
};

export type OpeningHours = {
  readonly days: string;
  readonly hours: string;
};

export type HeroImage = {
  readonly src: string;
  readonly alt: string;
};

export type Certificate = {
  readonly title: string;
  readonly holder?: string;
  readonly description: string;
  readonly upcoming?: boolean;
};

export type SalonInfo = {
  readonly name: string;
  readonly tagline: string;
  readonly city: string;
  readonly address: string;
  readonly phone: string;
  readonly phoneHref: string;
  readonly email: string;
  readonly hours: readonly OpeningHours[];
  readonly services: readonly Service[];
  readonly pricing: readonly PriceCategory[];
  readonly certificates: readonly Certificate[];
  readonly heroImage: HeroImage;
  readonly booksyUrl: string | null;
};

export const salon: SalonInfo = {
  name: 'Lisek Salon Groomerski',
  tagline: 'Profesjonalna pielęgnacja psów i kotów w Lesznie.',
  city: 'Leszno',
  address: 'ul. Niepodległości 49, 64-100 Leszno',
  phone: '667 837 773',
  phoneHref: '+48667837773',
  email: 'alalis@salongroomerski.com',
  hours: [
    { days: 'Poniedziałek – Piątek', hours: '8:00 – 18:00' },
    { days: 'Sobota', hours: '8:00 – 14:00' },
    { days: 'Niedziela', hours: 'Nieczynne' },
  ],
  services: [
    {
      slug: 'kapiel',
      title: 'Kąpiel',
      description: 'Delikatne kosmetyki dopasowane do potrzeb Twojego pupila.',
    },
    {
      slug: 'strzyzenie',
      title: 'Strzyżenie',
      description: 'Profesjonalne strzyżenie zgodne ze standardem rasy lub według życzenia.',
    },
    {
      slug: 'pielegnacja',
      title: 'Pielęgnacja',
      description: 'Czesanie, rozczesywanie, usuwanie kołtunów i podszerstka.',
    },
    {
      slug: 'pazurki',
      title: 'Pielęgnacja pazurków',
      description: 'Bezpieczne obcinanie i szlifowanie pazurków.',
    },
    {
      slug: 'uszy-oczy',
      title: 'Czyszczenie uszu i oczu',
      description: 'Delikatna pielęgnacja dla zdrowia i komfortu pupila.',
    },
  ],
  pricing: [
    {
      id: 'psy',
      label: 'Psy',
      description: 'Ceny pełnej pielęgnacji uzależnione od wielkości pupila.',
      rows: [
        { label: 'Małe psy', price: '130 zł' },
        { label: 'Średnie psy', price: '140 zł' },
        { label: 'Duże psy', price: '250 zł' },
        { label: 'Psy powyżej 40 kg', price: '300 zł' },
      ],
    },
    {
      id: 'koty',
      label: 'Koty',
      description: 'Pakiety pielęgnacyjne dla kotów krótko- i długowłosych.',
      rows: [
        { label: 'Koty krótkowłose (wyczesywanie + obcinanie pazurków)', price: '110 zł' },
        { label: 'Koty długowłose (kąpiel + wyczesywanie + obcinanie pazurków)', price: '170 zł' },
      ],
    },
    {
      id: 'inne',
      label: 'Inne',
      description: 'Usługi dodatkowe wykonywane poza pełną pielęgnacją.',
      rows: [
        { label: 'Obcinanie pazurków', price: '20 zł' },
        { label: 'Wyciąganie kleszczy', price: '15 zł' },
      ],
    },
  ],
  certificates: [
    {
      title: 'Dyplomowany Technik Weterynarii',
      holder: 'Alicja Lis',
      description:
        'Gruntowna wiedza z zakresu anatomii, zdrowia i behawioru zwierząt, dająca gwarancję najwyższego bezpieczeństwa podczas zabiegów pielęgnacyjnych.',
    },
    // TODO: replace with real course name + holder once the certificate is issued.
    {
      title: 'Certyfikowany Groomer',
      description: 'Nazwa kursu i certyfikat — w przygotowaniu.',
      upcoming: true,
    },
  ],
  heroImage: {
    // Placeholder. Replace with your own photo:
    //   1. drop the file into `public/` (e.g. public/hero.jpg)
    //   2. change `src` to `'/lisek-website/hero.jpg'` (or use `${import.meta.env.BASE_URL}hero.jpg` in the component).
    src: 'https://picsum.photos/seed/lisek-groomer/1200/1400',
    alt: 'Zadowolony pies podczas profesjonalnej pielęgnacji groomerskiej',
  },
  booksyUrl: null,
};
