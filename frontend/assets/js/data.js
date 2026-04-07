// Mock Data for Frontend
const MockData = {
  products: [
    {
      id: '1',
      name: 'Examly Course Video Fastener',
      slug: 'examly-course-video-fastener',
      description: 'Speed through Examly course videos — 1 second of watching counts as 1 minute in the backend.',
      longDescription: 'A browser extension built for mbu.examly.io that accelerates your course video progress. When you watch a video for just 1 second, the backend registers it as 1 minute of watch time. Complete hours of course content in minutes. Works seamlessly with all Examly course videos.',
      price: 300,
      discountPrice: null,
      category: 'Browser Extensions',
      thumbnailURL: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
      compatibility: 'Chrome, Edge, Brave',
      version: '1.0.0',
      rating: 4.9,
      reviewCount: 312,
      featured: true,
      tags: ['examly', 'video', 'speed', 'course', 'mbu', 'browser extension'],
      contactName: 'Sameer',
      contactPhone: '+91 89851 37419'
    }
  ],

  getProducts(filters = {}) {
    let filtered = [...this.products];

    // Filter by category
    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    // Filter by featured
    if (filters.featured) {
      filtered = filtered.filter(p => p.featured);
    }

    // Search
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.tags.some(tag => tag.includes(search))
      );
    }

    // Sort
    if (filters.sort === 'price-low') {
      filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (filters.sort === 'price-high') {
      filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (filters.sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else {
      // Default: featured first, then newest
      filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
    }

    return filtered;
  },

  getProduct(slug) {
    return this.products.find(p => p.slug === slug);
  },

  getProductById(id) {
    return this.products.find(p => p.id === id);
  },

  getFeaturedProducts() {
    return this.products.filter(p => p.featured);
  },

  getCategories() {
    return ['All', 'Browser Extensions'];
  }
};
