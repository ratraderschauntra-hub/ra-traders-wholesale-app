const products = [
  {
    name: 'Premium Rice Bag',
    category: 'Groceries',
    sku: 'RT-1024',
    pack: '25kg',
    price: '₹1,980',
    stock: '148 bags',
    tag: 'Best Seller',
  },
  {
    name: 'Refined Cooking Oil',
    category: 'Cooking Essentials',
    sku: 'RT-2128',
    pack: '15L',
    price: '₹2,840',
    stock: '96 cases',
    tag: 'Bulk Deal',
  },
  {
    name: 'Family Flour Pack',
    category: 'Bakery',
    sku: 'RT-4401',
    pack: '10kg',
    price: '₹890',
    stock: '220 packs',
    tag: 'Fresh Stock',
  },
  {
    name: 'Spice Combo Set',
    category: 'Seasonings',
    sku: 'RT-9042',
    pack: '12 units',
    price: '₹1,450',
    stock: '74 sets',
    tag: 'Hot Deal',
  },
  {
    name: 'Tea & Coffee Mix',
    category: 'Beverages',
    sku: 'RT-3359',
    pack: '24 boxes',
    price: '₹2,170',
    stock: '58 boxes',
    tag: 'Popular',
  },
  {
    name: 'Soap & Detergent Pack',
    category: 'Household',
    sku: 'RT-7772',
    pack: '30 pcs',
    price: '₹1,760',
    stock: '180 packs',
    tag: 'New Arrival',
  },
];

const dashboardStats = [
  { label: 'Monthly Revenue', value: '₹42.8L', change: '+18.4%' },
  { label: 'Active Retailers', value: '1,284', change: '+6.2%' },
  { label: 'Stock Health', value: '94%', change: '+3.1%' },
  { label: 'Pending Orders', value: '214', change: '-12%' },
];

const orderCards = [
  { id: '#RT-1001', customer: 'Aarav Mart', items: 18, total: '₹18,400', status: 'Packed' },
  { id: '#RT-1002', customer: 'Sharma Stores', items: 12, total: '₹14,280', status: 'Dispatched' },
  { id: '#RT-1003', customer: 'Nirmala Foods', items: 27, total: '₹22,190', status: 'Awaiting Payment' },
];

const inventory = [
  { item: 'Rice Bag', qty: '148', low: 'Normal' },
  { item: 'Oil', qty: '96', low: 'Low' },
  { item: 'Flour', qty: '220', low: 'Normal' },
  { item: 'Tea', qty: '58', low: 'Low' },
];

export { products, dashboardStats, orderCards, inventory };
