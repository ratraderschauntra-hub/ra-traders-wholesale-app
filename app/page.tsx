import { products, dashboardStats, orderCards, inventory } from '@/data/mockData';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">RA Traders</p>
            <h1 className="text-xl font-bold">Wholesale App</h1>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#catalog">Catalog</a>
            <a href="#pricing">Pricing</a>
            <a href="#dashboard">Dashboard</a>
            <a href="#contact">Support</a>
          </nav>
          <button className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-600/20">
            Login as Dealer
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="badge">Wholesale • Retail • B2B</span>
            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              Smart ordering for every trade partner.
            </h2>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              Manage your inventory, respond faster to orders, and give retailers better deals with one central wholesale platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-brand-600 px-6 py-3 font-semibold text-white">Start Ordering</button>
              <button className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700">View Dashboard</button>
            </div>
            <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-600">
              <div><strong className="block text-2xl text-slate-900">1.3k+</strong> Retailers</div>
              <div><strong className="block text-2xl text-slate-900">98%</strong> On-time fulfilment</div>
              <div><strong className="block text-2xl text-slate-900">24/7</strong> Order support</div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Today’s summary</p>
                <h3 className="mt-1 text-3xl font-bold">₹18.6L</h3>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">+12.8%</span>
            </div>

            <div className="mt-6 space-y-4">
              {dashboardStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <div>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                    <p className="mt-1 text-xl font-bold">{stat.value}</p>
                  </div>
                  <span className="text-sm font-semibold text-emerald-600">{stat.change}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Catalog</p>
            <h3 className="mt-2 text-3xl font-bold">Best-selling wholesale products</h3>
          </div>
          <button className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-600">Browse all</button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article key={product.sku} className="card p-5">
              <div className="flex items-center justify-between">
                <span className="badge">{product.category}</span>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">{product.tag}</span>
              </div>
              <h4 className="mt-5 text-xl font-bold">{product.name}</h4>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p>SKU: {product.sku}</p>
                <p>Pack Size: {product.pack}</p>
                <p>Stock: {product.stock}</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                <div>
                  <p className="text-sm text-slate-500">Wholesale price</p>
                  <p className="text-2xl font-bold text-brand-700">{product.price}</p>
                </div>
                <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Add</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="card p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">Pricing</p>
            <h3 className="mt-3 text-3xl font-bold">Tiered rate plan for traders</h3>
            <ul className="mt-6 space-y-4 text-slate-600">
              <li>• 0-50 orders / month: Standard wholesale pricing</li>
              <li>• 51-200 orders / month: 8% rebate</li>
              <li>• 201+ orders / month: 12% rebate + priority dispatch</li>
            </ul>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="card p-6">
              <p className="text-sm font-semibold text-slate-500">Starter</p>
              <h4 className="mt-2 text-3xl font-black">₹0</h4>
              <p className="mt-2 text-sm text-slate-600">Basic catalog access</p>
              <button className="mt-6 w-full rounded-full border border-slate-300 px-4 py-2 font-semibold">Choose</button>
            </div>
            <div className="card border-brand-200 bg-brand-50 p-6">
              <p className="text-sm font-semibold text-brand-700">Growth</p>
              <h4 className="mt-2 text-3xl font-black">₹999</h4>
              <p className="mt-2 text-sm text-slate-600">Best for active dealers</p>
              <button className="mt-6 w-full rounded-full bg-brand-600 px-4 py-2 font-semibold text-white">Popular</button>
            </div>
            <div className="card p-6">
              <p className="text-sm font-semibold text-slate-500">Enterprise</p>
              <h4 className="mt-2 text-3xl font-black">Custom</h4>
              <p className="mt-2 text-sm text-slate-600">Dedicated account support</p>
              <button className="mt-6 w-full rounded-full border border-slate-300 px-4 py-2 font-semibold">Contact sales</button>
            </div>
          </div>
        </div>
      </section>

      <section id="dashboard" className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">Operations</p>
              <h3 className="mt-2 text-3xl font-bold">Live dispatch overview</h3>
            </div>
            <button className="rounded-full bg-white px-5 py-2 font-semibold text-slate-900">Open manager panel</button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
              <h4 className="text-xl font-bold">Recent orders</h4>
              <div className="mt-5 space-y-4">
                {orderCards.map((order) => (
                  <div key={order.id} className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-900 p-4">
                    <div>
                      <p className="font-semibold">{order.customer}</p>
                      <p className="text-sm text-slate-400">{order.id} • {order.items} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-brand-300">{order.total}</p>
                      <p className="text-xs text-slate-300">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
              <h4 className="text-xl font-bold">Inventory health</h4>
              <div className="mt-5 space-y-4">
                {inventory.map((row) => (
                  <div key={row.item} className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-900 p-4">
                    <div>
                      <p className="font-semibold">{row.item}</p>
                      <p className="text-sm text-slate-400">{row.low} stock</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">{row.qty}</p>
                      <p className="text-xs text-slate-300">units</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="mx-auto max-w-7xl px-6 py-10 text-center text-slate-600">
        <p>RA Traders Wholesale App</p>
        <p className="mt-2 text-sm">Support: +91 98765 43210 • sales@ratraders.in</p>
      </footer>
    </main>
  );
}
