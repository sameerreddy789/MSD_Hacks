// Cart Management with localStorage
const Cart = {
  items: [],

  init() {
    this.load();
    this.updateBadge();
  },

  load() {
    const saved = localStorage.getItem('msd_cart');
    this.items = saved ? JSON.parse(saved) : [];
  },

  save() {
    localStorage.setItem('msd_cart', JSON.stringify(this.items));
    this.updateBadge();
  },

  add(product) {
    const existing = this.items.find(item => item.id === product.id);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        thumbnailURL: product.thumbnailURL,
        slug: product.slug,
        quantity: 1
      });
    }
    
    this.save();
    this.showToast(`${product.name} added to cart!`, 'success');
  },

  remove(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.save();
    this.showToast('Item removed from cart', 'success');
  },

  updateQuantity(id, quantity) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.save();
    }
  },

  clear() {
    this.items = [];
    this.save();
  },

  getCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  },

  getSubtotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getTax() {
    return this.getSubtotal() * 0.18; // 18% GST
  },

  getTotal() {
    return this.getSubtotal() + this.getTax();
  },

  updateBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
      badge.textContent = this.getCount();
    }
  },

  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} show`;
    toast.innerHTML = `
      <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        ${type === 'success' 
          ? '<path d="M20 6L9 17l-5-5"/>' 
          : '<path d="M6 18L18 6M6 6l12 12"/>'}
      </svg>
      <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};

// Initialize cart on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Cart.init());
} else {
  Cart.init();
}
