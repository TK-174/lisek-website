import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { PriceCategory } from '@/data/salon';

interface Props {
  categories: readonly PriceCategory[];
}

const tabId = (catId: string) => `cennik-tab-${catId}`;
const panelId = (catId: string) => `cennik-panel-${catId}`;

export default function PricingTabs({ categories }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const moveFocusOnSelect = useRef(false);

  const activate = useCallback((index: number) => {
    if (categories.length === 0) return;
    const clamped = ((index % categories.length) + categories.length) % categories.length;
    setActiveIndex(clamped);
  }, [categories.length]);

  useEffect(() => {
    if (!moveFocusOnSelect.current) return;
    moveFocusOnSelect.current = false;
    tabRefs.current[activeIndex]?.focus();
  }, [activeIndex]);

  if (categories.length === 0) return null;

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        moveFocusOnSelect.current = true;
        activate(index + 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        moveFocusOnSelect.current = true;
        activate(index - 1);
        break;
      case 'Home':
        e.preventDefault();
        moveFocusOnSelect.current = true;
        activate(0);
        break;
      case 'End':
        e.preventDefault();
        moveFocusOnSelect.current = true;
        activate(categories.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        activate(index);
        break;
      default:
        break;
    }
  };

  return (
    <div className="mt-10">
      <div
        role="tablist"
        aria-label="Kategorie cennika"
        className="flex flex-wrap gap-2 rounded-pill border border-line bg-surface p-1.5 shadow-card sm:inline-flex sm:gap-1"
      >
        {categories.map((cat, i) => {
          const selected = i === activeIndex;
          return (
            <button
              key={cat.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={tabId(cat.id)}
              aria-selected={selected}
              aria-controls={panelId(cat.id)}
              tabIndex={selected ? 0 : -1}
              onClick={() => activate(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={[
                'rounded-pill px-5 py-2.5 font-display text-sm font-semibold transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
                selected
                  ? 'bg-primary text-white shadow-card'
                  : 'text-ink-secondary hover:text-ink-primary hover:bg-background/60',
              ].join(' ')}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {categories.map((cat, i) => {
        const selected = i === activeIndex;
        return (
          <div
            key={cat.id}
            role="tabpanel"
            id={panelId(cat.id)}
            aria-labelledby={tabId(cat.id)}
            hidden={!selected}
            tabIndex={0}
            className="mt-6 rounded-card border border-line bg-surface shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="border-b border-line px-5 py-4 sm:px-6">
              <h3 className="font-display text-lg font-semibold text-ink-primary">{cat.label}</h3>
              <p className="mt-1 text-body-sm text-ink-secondary">{cat.description}</p>
            </div>

            <table
              className="w-full text-left"
              aria-describedby={`${panelId(cat.id)}-info`}
            >
              <caption id={`${panelId(cat.id)}-info`} className="sr-only">
                Cennik — {cat.label}
              </caption>
              <thead className="bg-background/50">
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 font-mono text-label-md uppercase tracking-wider text-ink-secondary sm:px-6"
                  >
                    Usługa
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-right font-mono text-label-md uppercase tracking-wider text-ink-secondary sm:px-6"
                  >
                    Cena
                  </th>
                </tr>
              </thead>
              <tbody>
                {cat.rows.map((row, rIdx) => (
                  <tr
                    key={row.label}
                    className={rIdx % 2 === 0 ? 'bg-surface' : 'bg-background/30'}
                  >
                    <th
                      scope="row"
                      className="px-5 py-4 font-display text-base font-medium text-ink-primary sm:px-6"
                    >
                      {row.label}
                    </th>
                    <td className="px-5 py-4 text-right font-display text-base font-semibold text-ink-primary sm:px-6">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
