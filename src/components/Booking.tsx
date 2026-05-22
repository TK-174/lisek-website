interface Props {
  booksyUrl: string | null;
  phone: string;
  phoneHref: string;
}

export default function Booking({ booksyUrl, phone, phoneHref }: Props) {
  if (booksyUrl) {
    return (
      <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
        <iframe
          src={booksyUrl}
          title="Booksy — rezerwacja wizyty"
          loading="lazy"
          className="block h-[720px] w-full border-0"
        />
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label="Rezerwacja wizyty"
      className="rounded-card border border-dashed border-primary/40 bg-surface p-8 text-center shadow-card"
    >
      <span className="label">Booksy · wkrótce</span>
      <h3 className="mt-3 font-display text-2xl font-medium">Widget rezerwacji jest w przygotowaniu.</h3>
      <p className="mx-auto mt-3 max-w-xl text-body-md text-ink-secondary">
        Zanim widget Booksy zostanie zintegrowany, zarezerwuj wizytę telefonicznie. Zadzwonimy też,
        jeśli zostawisz wiadomość przez formularz kontaktowy.
      </p>
      <a href={`tel:${phoneHref}`} className="btn-primary mt-6 inline-flex">
        Zadzwoń — {phone}
      </a>
    </div>
  );
}
