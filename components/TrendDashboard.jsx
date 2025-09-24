
import React, { useMemo, useState } from "react"

const CATEGORIES = {
  Accessories: {
    Jewellery: ["Silver Jewellery", "Gold Jewellery", "Diamonds", "New Brands"],
    Shoes: ["Trainer", "Flat Shoes", "Heels", "Smart Shoes", "New Brands"],
    Handbags: [
      "Day handbags",
      "Work bags",
      "Party bags",
      "Dinner handbags",
      "Workwear handbags",
      "New Brands",
    ],
  },
  "Runway Styles": {},
  "Celebrity Styles": {},
  "RTW Womens": {
    Denim: [],
    Shirts: [],
    "Pants & Trousers": [],
    "Summer dresses": [],
    "Dinner dresses": [],
    "Winter coats": [],
    "Autumn cardigans": [],
    "Festival Wear": [],
    "Holidays Looks (Christmas, Thanks Giving)": [],
    Workwear: [],
    "Casual day time looks": [],
  },
  "RTW Mens": {
    Denim: [],
    Shirts: [],
    "Pants & Trousers": [],
    "Summer looks": [],
    "Dinner looks": [],
    "Winter coats": [],
    "Autumn cardigans": [],
    "Festival Wear": [],
    "Holidays Looks (Christmas, Thanks Giving)": [],
    Workwear: [],
    "Casual day time looks": [],
  },
  Sports: {
    "Mens Athleisure": [],
    "Women’s  Athleisure": [],
    "Apres Ski / Ski": [],
    "Performance Gear": [],
  },
  "Cultural Translators": {
    Art: ["Colours, Form and Emotion", "Texture"],
    "Design objects": [
      "Ceramics",
      "Glassware",
      "Surface Finishes: glossy vs matte",
      "Shape Language: organic vs geometric",
    ],
    "Interiors & architecture": ["Tones", "Forms", "Modular furniture", "Finishes"],
  },
}


function classNames(...xs) {
  return xs.filter(Boolean).join(" ")
}

function Section({ title, children }) {
  return (
    <section className="mt-6">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{children}</div>
    </section>
  )
}

function Sparkline({ data }) {
  const max = Math.max(...data)
  return (
    <div className="flex items-end gap-0.5 h-10">
      {data.map((v, i) => (
        <div
          key={i}
          className="w-1.5 rounded-t"
          style={{
            height: `${(v / (max || 1)) * 40 + 2}px`,
            background: "linear-gradient(180deg,#fff, #6b7280)",
          }}
        />
      ))}
    </div>
  )
}

function Badge({ children, tone = "zinc" }) {
  const styles = {
    zinc: "bg-zinc-900 text-zinc-200 border-zinc-800",
    green: "bg-emerald-900/30 text-emerald-300 border-emerald-700/50",
    red: "bg-rose-900/30 text-rose-300 border-rose-700/50",
    blue: "bg-sky-900/30 text-sky-300 border-sky-700/50",
  }[tone]
  return (
    <span className={classNames("text-xs px-2 py-1 rounded-full border", styles)}>
      {children}
    </span>
  )
}

function TrendCard({ t, onOpen }) {
  const onFire = t.growth >= 10
  const fading = t.growth < 0
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 hover:border-zinc-600 transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-base font-medium">{t.label}</div>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
            <span>{t.path.join(" › ")}</span>
            <Badge tone="blue">{t.region || "GLOBAL"}</Badge>
            {onFire && <Badge tone="green">ON FIRE 🔥</Badge>}
            {fading && <Badge tone="red">FADING</Badge>}
          </div>
        </div>
        <div className="text-right text-sm">
          <div>
            Last 7d: <b>{t.last7}</b>
          </div>
          <div>
            Prev 7d: <b>{t.prev7}</b>
          </div>
          <div className={classNames("mt-1 font-semibold", t.growth >= 0 ? "text-emerald-400" : "text-rose-400")}>
            {t.growth >= 0 ? "+" : ""}
            {t.growth}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Sparkline data={t.spark} />
      </div>
      <div className="mt-4 flex items-center gap-2 text-xl">
        {t.mood.map((m, i) => (
          <span key={i} aria-hidden>
            {m}
          </span>
        ))}
      </div>
      <button
        onClick={onOpen}
        className="mt-4 w-full rounded-xl bg-white text-black py-2 text-sm font-semibold"
      >
        View moodboard
      </button>
    </div>
  )
}

function Sidebar({ selected, setSelected }) {
  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="sticky top-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-4">
        <h3 className="text-sm font-semibold text-zinc-200">Browse categories</h3>
        <div className="mt-3 space-y-3">
          {Object.entries(CATEGORIES).map(([group, subs]) => (
            <div key={group}>
              <div className="text-zinc-300 text-sm font-medium mb-1">{group}</div>
              {Object.keys(subs).length === 0 ? (
                <button
                  onClick={() => setSelected([group])}
                  className={classNames(
                    "text-xs px-2 py-1 rounded-lg border transition",
                    selected.join(" › ") === [group].join(" › ")
                      ? "border-white text-white"
                      : "border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500"
                  )}
                >
                  View {group}
                </button>
              ) : (
                <div className="ml-2 flex flex-wrap gap-1">
                  {Object.entries(subs).map(([sub, kids]) => (
                    <div key={sub} className="mb-2">
                      <div className="text-zinc-500 text-xs mb-1">{sub}</div>
                      <div className="flex flex-wrap gap-1">
                        {(kids.length ? kids : [sub]).map((leaf) => {
                          const path = [group, sub, kids.length ? leaf : sub]
                          const active = selected.join(" › ") === path.join(" › ")
                          return (
                            <button
                              key={leaf}
                              onClick={() => setSelected(path)}
                              className={classNames(
                                "text-xs px-2 py-1 rounded-lg border transition",
                                active
                                  ? "border-white text-white"
                                  : "border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500"
                              )}
                            >
                              {kids.length ? leaf : `All`}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative max-w-3xl w-[92vw] rounded-3xl border border-zinc-700 bg-zinc-950 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-sm opacity-70 hover:opacity-100">
            Close
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}

function Moodboard({ label }) {
  const tiles = Array.from({ length: 9 }, (_, i) => i)
  return (
    <div className="grid grid-cols-3 gap-2">
      {tiles.map((i) => (
        <div
          key={i}
          className="aspect-square rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-end p-2 text-xs text-zinc-200"
        >
          {label}
        </div>
      ))}
    </div>
  )
}

export default function TrendDashboard() {
  const [selected, setSelected] = useState(["Accessories", "Handbags", "Party bags"])
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [openLabel, setOpenLabel] = useState("")

  const filtered = useMemo(() => {
    return SAMPLE_TRENDS.filter((t) => {
      const inPath =
        selected.length === 1 ? t.path[0] === selected[0] : selected.every((seg, i) => t.path[i] === seg)
      const q = query.trim().toLowerCase()
      const matchQ = !q || t.label.toLowerCase().includes(q)
      return inPath && matchQ
    }).sort((a, b) => b.growth - a.growth)
  }, [selected, query])

  const emerging = filtered.filter((t) => t.growth > 0)
  const fading = filtered.filter((t) => t.growth < 0)
  const top = filtered.slice(0, 3)

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-40 border-b border-zinc-900/60 bg-black/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-white to-zinc-400" />
              <div>
                <div className="text-lg font-semibold tracking-tight">Aura</div>
                <div className="text-xs text-zinc-400">Gen‑Z trend radar for indie brands</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search labels (e.g., silver, ballet, tote)"
                className="w-72 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm placeholder-zinc-500 outline-none focus:border-zinc-500"
              />
              <button className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black">
                Export digest
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-10 pt-6 lg:flex lg:gap-6">
        <Sidebar selected={selected} setSelected={setSelected} />

        <div className="mt-6 lg:mt-0 flex-1">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-zinc-400">Showing</div>
                <div className="text-lg font-semibold">{selected.join(" › ")}</div>
              </div>
              <div className="text-right text-sm text-zinc-400">Demo data • 14‑day view</div>
            </div>

            <Section title="Top picks">
              {top.map((t) => (
                <TrendCard key={t.label} t={t} onOpen={() => { setOpen(true); setOpenLabel(t.label) }} />
              ))}
            </Section>

            <Section title="Emerging">
              {emerging.map((t) => (
                <TrendCard key={t.label + "em"} t={t} onOpen={() => { setOpen(true); setOpenLabel(t.label) }} />
              ))}
            </Section>

            {fading.length > 0 && (
              <Section title="Fading out">
                {fading.map((t) => (
                  <TrendCard key={t.label + "fd"} t={t} onOpen={() => { setOpen(true); setOpenLabel(t.label) }} />
                ))}
              </Section>
            )}
          </div>
        </div>
      </main>

      <Modal open={open} onClose={() => setOpen(false)} title={`Moodboard — ${openLabel}`}>
        <Moodboard label={openLabel} />
      </Modal>

      <footer className="mx-auto max-w-7xl px-4 py-8 text-xs text-zinc-500">
        Demo only. Hook this UI to your Google Sheet or API when ready.
      </footer>
    </div>
  )
}
