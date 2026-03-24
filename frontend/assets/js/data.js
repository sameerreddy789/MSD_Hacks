// Mock Data for Frontend
const MockData = {
  products: [
    {
      id: '1',
      name: 'AI Web Scraper',
      slug: 'ai-web-scraper',
      description: 'Extract tables and content automatically from any website directly into your Google Sheets or Notion.',
      longDescription: 'The ultimate web scraping tool powered by AI. Extract data from any website without writing a single line of code. Perfect for research, data analysis, and automation.',
      price: 199,
      discountPrice: null,
      category: 'Browser Extensions',
      thumbnailURL: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
      compatibility: 'Chrome, Edge, Brave',
      version: '2.1.0',
      rating: 4.8,
      reviewCount: 124,
      featured: true,
      tags: ['automation', 'data', 'scraping']
    },
    {
      id: '2',
      name: 'Ultimate Notion Setup',
      slug: 'ultimate-notion',
      description: 'The last template you\'ll ever need. Complete productivity system for students.',
      longDescription: 'A comprehensive Notion workspace designed specifically for students. Includes task management, note-taking, project tracking, and study planning all in one place.',
      price: 299,
      discountPrice: 149,
      category: 'Templates & Presets',
      thumbnailURL: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
      compatibility: 'Notion',
      version: '3.0.0',
      rating: 5.0,
      reviewCount: 89,
      featured: true,
      tags: ['notion', 'productivity', 'templates']
    },
    {
      id: '3',
      name: 'ChatGPT AutoPrompt',
      slug: 'chatgpt-autoprompt',
      description: 'Enhance prompts with hidden shortcuts. Get better AI responses instantly.',
      longDescription: 'Browser extension that automatically enhances your ChatGPT prompts with proven techniques. Save time and get better results from AI conversations.',
      price: 99,
      discountPrice: null,
      category: 'AI Automation',
      thumbnailURL: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      compatibility: 'Chrome, Firefox',
      version: '1.5.0',
      rating: 4.5,
      reviewCount: 42,
      featured: false,
      tags: ['ai', 'chatgpt', 'automation']
    },
    {
      id: '4',
      name: 'Focus Timer Pro',
      slug: 'focus-timer-pro',
      description: 'Pomodoro timer with analytics and distraction blocking.',
      longDescription: 'Advanced focus timer that helps you stay productive. Track your work sessions, analyze your productivity patterns, and block distracting websites.',
      price: 149,
      discountPrice: 99,
      category: 'Productivity Widgets',
      thumbnailURL: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&q=80',
      compatibility: 'Windows, Mac, Linux',
      version: '2.0.0',
      rating: 4.7,
      reviewCount: 156,
      featured: false,
      tags: ['productivity', 'focus', 'timer']
    },
    {
      id: '5',
      name: 'Code Snippet Manager',
      slug: 'code-snippet-manager',
      description: 'Save and organize your code snippets with AI-powered search.',
      longDescription: 'Never lose a code snippet again. Organize, search, and share your code snippets across all your projects. AI-powered search finds exactly what you need.',
      price: 199,
      discountPrice: null,
      category: 'Productivity Widgets',
      thumbnailURL: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80',
      compatibility: 'VS Code, Web',
      version: '1.8.0',
      rating: 4.6,
      reviewCount: 78,
      featured: false,
      tags: ['coding', 'snippets', 'developer']
    },
    {
      id: '6',
      name: 'Email Template Pack',
      slug: 'email-template-pack',
      description: '50+ professional email templates for students and professionals.',
      longDescription: 'Professional email templates for every situation. From job applications to professor communications, we\'ve got you covered.',
      price: 79,
      discountPrice: 49,
      category: 'Templates & Presets',
      thumbnailURL: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&q=80',
      compatibility: 'Gmail, Outlook',
      version: '1.0.0',
      rating: 4.4,
      reviewCount: 34,
      featured: false,
      tags: ['email', 'templates', 'communication']
    },
    {
      id: '7',
      name: 'Auto Tab Organizer',
      slug: 'auto-tab-organizer',
      description: 'AI organizes your browser tabs automatically. Never lose a tab again.',
      longDescription: 'Intelligent tab management powered by AI. Automatically groups related tabs, saves sessions, and helps you find what you need instantly.',
      price: 129,
      discountPrice: null,
      category: 'Browser Extensions',
      thumbnailURL: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
      compatibility: 'Chrome, Edge',
      version: '1.3.0',
      rating: 4.3,
      reviewCount: 67,
      featured: false,
      tags: ['browser', 'organization', 'tabs']
    },
    {
      id: '8',
      name: 'Study Playlist Generator',
      slug: 'study-playlist-generator',
      description: 'AI creates perfect study playlists based on your mood and task.',
      longDescription: 'Science-backed music selection for optimal focus. AI analyzes your task and creates the perfect playlist to boost your productivity.',
      price: 99,
      discountPrice: 69,
      category: 'AI Automation',
      thumbnailURL: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
      compatibility: 'Spotify, Apple Music',
      version: '2.2.0',
      rating: 4.9,
      reviewCount: 203,
      featured: true,
      tags: ['music', 'study', 'focus']
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
    return ['All', 'Browser Extensions', 'Productivity Widgets', 'AI Automation', 'Templates & Presets'];
  }
};
