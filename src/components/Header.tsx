import { useEffect, useState } from 'react';

type NavLink = { href: string; label: string };

const links: readonly NavLink[] = [
  { href: '#o-nas', label: 'O nas' },
  { href: '#uslugi', label: 'Usługi' },
  { href: '#cennik', label: 'Cennik' },
  { href: '#oferta', label: 'Oferta' },
  { href: '#rezerwacja', label: 'Rezerwacja' },
  { href: '#kontakt', label: 'Kontakt' },
];

interface Props {
  logoSrc: string;
  salonName: string;
}

export default function Header({ logoSrc, salonName }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-background/85 backdrop-blur border-b border-line shadow-card'
          : 'bg-transparent'
      }`}
    >
      <div className="container-px flex h-16 items-center justify-between sm:h-20">
        <a
          href="#top"
          className="flex items-center gap-3 rounded-control focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={`${salonName} — strona główna`}
        >
          <img
            src={logoSrc}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover ring-1 ring-line"
          />
          <span className="font-display text-base font-semibold tracking-tight sm:text-lg">
            {salonName}
          </span>
        </a>

        <nav aria-label="Główna nawigacja" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-pill px-4 py-2 font-display text-sm font-medium text-ink-primary/80 transition-colors hover:bg-surface hover:text-ink-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#rezerwacja" className="btn-primary ml-2">
                Umów wizytę
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-control border border-line bg-surface"
          aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full bg-ink-primary transition-transform ${
                open ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-full bg-ink-primary transition-opacity ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-full bg-ink-primary transition-transform ${
                open ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden border-b border-line bg-surface transition-[max-height,opacity] duration-300 ease-out ${
          open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!open}
        {...(!open && { inert: '' })}
      >
        <nav aria-label="Nawigacja mobilna" className="container-px py-4">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-control px-4 py-3 font-display text-base font-medium text-ink-primary hover:bg-background"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#rezerwacja"
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                Umów wizytę
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
