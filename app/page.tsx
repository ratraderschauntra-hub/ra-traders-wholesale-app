'use client';

import { useEffect, useMemo, useState } from 'react';

type Product = {
  name: string;
  category: string;
  sku: string;
  pack: string;
  price: number;
  stock: string;
  tag: string;
  emoji: string;
};

const products: Product[] = [
  { name: 'Premium Rice Bag', category: 'Groceries', sku: 'RT-1024', pack: '25 kg bag', price: 1980, stock: '148 bags', tag: 'Popular', emoji: '🌾' },
  { name: 'Refined Cooking Oil', category: 'Cooking essentials', sku: 'RT-2128', pack: '15 L case', price: 2840, stock: '96 cases', tag: 'Bulk pack', emoji: '🫒' },
  { name: 'Family Flour Pack', category: 'Groceries', sku: 'RT-4401', pack: '10 kg pack', price: 890, stock: '220 packs', tag: 'Fresh stock', emoji: '🌾' },
  { name: 'Spice Combo Set', category: 'Spices', sku: 'RT-9042', pack: '12 units', price: 1450, stock: '74 sets', tag: 'Assorted', emoji: '🌶️' },
  { name: 'Tea & Coffee Mix', category: 'Beverages', sku: 'RT-3359', pack: '24 boxes', price: 2170, stock: '58 boxes', tag: 'Popular', emoji: '☕' },
  { name: 'Soap & Detergent Pack', category: 'Household', sku: 'RT-7772', pack: '30 pieces', price: 1760, stock: '180 packs', tag: 'Value pack', emoji: '🧼' },
];

const categories = ['All products', ...Array.from(new Set(products.map((product) => product.category)))];
type Cart = Record<string, number>;
type Customer = { name: string; shop: string; phone: string; address: string };
const formatPrice = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

export default function HomePage() {
  const [cart, setCart] = useState<Cart>({});
  const [category, setCategory] = useState('All products');
  const [search, setSearch] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [customer, setCustomer] = useState<Customer>({ name: '', shop: '', phone: '', address: '' });
  const [notice, setNotice] = useState('');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('ra-traders-cart');
      if (saved) setCart(JSON.parse(saved) as Cart);
    } catch {
      window.localStorage.removeItem('ra-traders-cart');
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('ra-traders-cart', JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === 'All products' || product.category === category;
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || `${product.name} ${product.category} ${product.sku}`.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  }), [category, search]);

  const cartItems = products.filter((product) => (cart[product.sku] ?? 0) > 0);
  const itemCount = cartItems.reduce((sum, product) => sum + cart[product.sku], 0);
  const subtotal = cartItems.reduce((sum, product) => sum + product.price * cart[product.sku], 0);

  function updateQuantity(sku: string, amount: number) {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[sku] ?? 0) + amount;
      if (quantity <= 0) delete next[sku];
      else next[sku] = quantity;
      return next;
    });
    setNotice('');
  }

  async function shareOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const lines = cartItems.map((product) => `• ${product.name} (${product.pack}) × ${cart[product.sku]} — ${formatPrice(product.price * cart[product.sku])}`);
    const orderText = [
      'RA TRADERS — WHOLESALE ORDER REQUEST',
      `Customer: ${customer.name}`,
      `Shop: ${customer.shop}`,
      `Phone: ${customer.phone}`,
      `Delivery address: ${customer.address}`,
      '',
      ...lines,
      '',
      `Estimated subtotal: ${formatPrice(subtotal)}`,
      'Please confirm availability, final price, delivery charges, and payment details.',
    ].join('\n');

    try {
      if (navigator.share) {
        await navigator.share({ title: 'RA Traders order request', text: orderText });
        setNotice('Order request shared. It is not confirmed until RA Traders replies.');
      } else {
        await navigator.clipboard.writeText(orderText);
        setNotice('Order copied. Paste and send it to RA Traders to request confirmation.');
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      setNotice('Could not share automatically. Please try again or copy your order details.');
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <a href="#home" className="flex items-center gap-3" aria-label="RA Traders home">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-700 text-xl text-white">RA</span>
            <span><span className="block text-lg font-extrabold leading-tight">RA Traders</span><span className="text-xs text-slate-500">Wholesale ordering</span></span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <a className="hover:text-emerald-700" href="#catalog">Products</a>
            <a className="hover:text-emerald-700" href="#how-it-works">How ordering works</a>
          </nav>
          <button onClick={() => setCartOpen(true)} className="relative rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800" aria-label={`Open order cart, ${itemCount} items`}>
            My order <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5">{itemCount}</span>
          </button>
        </div>
      </header>

      <section id="home" className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">Wholesale orders, made simple</p>
          <h1 className="mt-5 max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">Stock your shop.<br /><span className="text-emerald-700">Order with ease.</span></h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">Browse the product list, build your order, and share your request with RA Traders for confirmation.</p>
          <a href="#catalog" className="mt-8 inline-flex rounded-xl bg-emerald-700 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-900/10 hover:bg-emerald-800">Browse products <span className="ml-2" aria-hidden="true">↓</span></a>
          <p className="mt-4 text-xs text-slate-500">Displayed products, prices, and stock are sample information. Confirm current details before ordering.</p>
        </div>
        <div className="rounded-3xl bg-emerald-950 p-7 text-white sm:p-9">
          <p className="text-sm font-semibold text-emerald-200">A straightforward way to order</p>
          <h2 className="mt-3 text-3xl font-extrabold">Your next stock-up starts here.</h2>
          <div className="mt-8 space-y-5">
            {['Choose products and quantities', 'Add your shop and delivery details', 'Share the order request for confirmation'].map((step, index) => (
              <div key={step} className="flex items-center gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 font-bold text-emerald-200">0{index + 1}</span><span className="text-sm text-emerald-50">{step}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Product catalog</p><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Products for your shop</h2><p className="mt-2 text-slate-600">Sample catalog — please confirm prices and availability with RA Traders.</p></div>
          <label className="relative block w-full sm:max-w-xs"><span className="sr-only">Search products</span><span className="absolute left-3 top-2.5 text-slate-400">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products or SKU" className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" /></label>
        </div>
        <div className="mt-7 flex gap-2 overflow-x-auto pb-2" aria-label="Product categories">
          {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${category === item ? 'bg-emerald-800 text-white' : 'border border-slate-200 bg-white text-slate-600 hover:border-emerald-300'}`}>{item}</button>)}
        </div>
        {filteredProducts.length ? <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => <article key={product.sku} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex h-36 items-center justify-center bg-gradient-to-br from-emerald-50 to-amber-50 text-6xl" aria-hidden="true">{product.emoji}</div>
            <div className="p-5">
              <div className="flex items-center justify-between gap-2"><span className="text-xs font-semibold text-emerald-800">{product.category}</span><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">{product.tag}</span></div>
              <h3 className="mt-3 text-lg font-bold">{product.name}</h3><p className="mt-1 text-sm text-slate-500">{product.pack} · SKU {product.sku}</p>
              <p className="mt-2 text-xs text-slate-500">Sample stock: {product.stock}</p>
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><div><span className="block text-xs text-slate-500">Sample price / pack</span><span className="text-xl font-extrabold">{formatPrice(product.price)}</span></div>
                {(cart[product.sku] ?? 0) === 0 ? <button onClick={() => updateQuantity(product.sku, 1)} className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800">Add to order</button> : <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-1"><button onClick={() => updateQuantity(product.sku, -1)} className="grid h-9 w-9 place-items-center rounded-lg bg-white font-bold text-emerald-800 shadow-sm" aria-label={`Remove one ${product.name}`}>−</button><span className="min-w-5 text-center font-bold">{cart[product.sku]}</span><button onClick={() => updateQuantity(product.sku, 1)} className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-700 font-bold text-white" aria-label={`Add one ${product.name}`}>+</button></div>}
              </div>
            </div>
          </article>)}
        </div> : <p className="mt-8 rounded-2xl bg-white p-8 text-center text-slate-600">No products match that search. Try another name or category.</p>}
      </section>

      <section id="how-it-works" className="border-y border-slate-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6"><p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Next steps</p><h2 className="mt-2 text-3xl font-black">From catalog to order request</h2><div className="mt-7 grid gap-4 md:grid-cols-3">{[
          ['01', 'Build your order', 'Select products and quantities from the catalog.'],
          ['02', 'Add shop details', 'Include your name, shop, phone number, and delivery address.'],
          ['03', 'Share for confirmation', 'Share or copy the order request. RA Traders must confirm the final price and availability.'],
        ].map(([number, title, detail]) => <div key={number} className="rounded-2xl border border-slate-200 p-5"><span className="text-sm font-extrabold text-emerald-700">{number}</span><h3 className="mt-3 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p></div>)}</div></div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6"><span className="font-bold text-slate-700">RA Traders · Wholesale ordering</span><span>Sample catalog only. Orders are requests, not confirmed purchases.</span></footer>

      {cartOpen && <div className="fixed inset-0 z-40 flex justify-end bg-slate-950/40" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
        <aside role="dialog" aria-modal="true" aria-labelledby="cart-title" className="flex h-full w-full max-w-lg flex-col overflow-y-auto bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 p-5"><div><h2 id="cart-title" className="text-xl font-extrabold">Your order request</h2><p className="text-sm text-slate-500">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p></div><button onClick={() => setCartOpen(false)} aria-label="Close order" className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-xl">×</button></div>
          <div className="flex-1 p-5">
            {cartItems.length === 0 ? <div className="py-10 text-center"><p className="text-4xl">🛒</p><p className="mt-3 font-bold">Your order is empty</p><p className="mt-1 text-sm text-slate-500">Add products from the catalog to get started.</p><button onClick={() => setCartOpen(false)} className="mt-5 rounded-xl bg-emerald-700 px-5 py-2.5 font-bold text-white">Browse products</button></div> : <>
              <div className="space-y-4">{cartItems.map((product) => <div key={product.sku} className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4"><div className="min-w-0"><p className="font-bold">{product.name}</p><p className="text-sm text-slate-500">{formatPrice(product.price)} · {product.pack}</p></div><div className="flex items-center gap-2"><button onClick={() => updateQuantity(product.sku, -1)} className="grid h-8 w-8 place-items-center rounded-lg border font-bold" aria-label={`Remove one ${product.name}`}>−</button><span className="w-5 text-center font-bold">{cart[product.sku]}</span><button onClick={() => updateQuantity(product.sku, 1)} className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-700 font-bold text-white" aria-label={`Add one ${product.name}`}>+</button></div></div>)}</div>
              <div className="mt-5 flex justify-between text-lg font-extrabold"><span>Estimated subtotal</span><span>{formatPrice(subtotal)}</span></div><p className="mt-1 text-xs leading-5 text-slate-500">Sample prices only; taxes, delivery, availability, and final price need confirmation.</p>
              <form onSubmit={shareOrder} className="mt-6 space-y-3"><h3 className="font-bold">Shop and delivery details</h3>
                <input required autoComplete="name" value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} placeholder="Your name" className="w-full rounded-xl border border-slate-300 px-3 py-3 outline-none focus:border-emerald-600" />
                <input required value={customer.shop} onChange={(event) => setCustomer({ ...customer, shop: event.target.value })} placeholder="Shop name" className="w-full rounded-xl border border-slate-300 px-3 py-3 outline-none focus:border-emerald-600" />
                <input required type="tel" autoComplete="tel" value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} placeholder="Phone number" className="w-full rounded-xl border border-slate-300 px-3 py-3 outline-none focus:border-emerald-600" />
                <textarea required autoComplete="street-address" value={customer.address} onChange={(event) => setCustomer({ ...customer, address: event.target.value })} placeholder="Delivery address" rows={3} className="w-full resize-y rounded-xl border border-slate-300 px-3 py-3 outline-none focus:border-emerald-600" />
                <button type="submit" className="w-full rounded-xl bg-emerald-700 px-5 py-3.5 font-bold text-white hover:bg-emerald-800">Share order request</button>
                <p className="text-xs leading-5 text-slate-500">This shares or copies a message; it does not place or pay for an order. Wait for RA Traders to confirm.</p>
                {notice && <p role="status" className="rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-900">{notice}</p>}
              </form>
            </>}
          </div>
        </aside>
      </div>}
    </main>
  );
}
