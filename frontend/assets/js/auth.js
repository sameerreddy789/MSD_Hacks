// Authentication Management
const Auth = {
  user: null,
  token: null,

  init() {
    this.load();
    this.updateUI();
  },

  load() {
    const savedUser = localStorage.getItem('msd_user');
    const savedToken = localStorage.getItem('msd_token');
    
    if (savedUser && savedToken) {
      this.user = JSON.parse(savedUser);
      this.token = savedToken;
    }
  },

  login(email, password) {
    // Mock login - replace with actual API call later
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const user = {
            id: '1',
            name: 'Demo User',
            email: email,
            isAdmin: false
          };
          
          const token = 'mock_jwt_token_' + Date.now();
          
          this.user = user;
          this.token = token;
          
          localStorage.setItem('msd_user', JSON.stringify(user));
          localStorage.setItem('msd_token', token);
          
          this.updateUI();
          resolve({ user, token });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },

  register(name, email, password) {
    // Mock register - replace with actual API call later
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const user = {
            id: Date.now().toString(),
            name: name,
            email: email,
            isAdmin: false
          };
          
          const token = 'mock_jwt_token_' + Date.now();
          
          this.user = user;
          this.token = token;
          
          localStorage.setItem('msd_user', JSON.stringify(user));
          localStorage.setItem('msd_token', token);
          
          this.updateUI();
          resolve({ user, token });
        } else {
          reject(new Error('All fields required'));
        }
      }, 500);
    });
  },

  logout() {
    this.user = null;
    this.token = null;
    
    localStorage.removeItem('msd_user');
    localStorage.removeItem('msd_token');
    
    this.updateUI();
    window.location.href = '/';
  },

  isAuthenticated() {
    return !!this.token && !!this.user;
  },

  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },

  updateUI() {
    const loginBtn = document.getElementById('loginBtn');
    
    if (loginBtn) {
      if (this.isAuthenticated()) {
        loginBtn.textContent = this.user.name;
        loginBtn.onclick = () => {
          if (confirm('Logout?')) {
            this.logout();
          }
        };
      } else {
        loginBtn.textContent = 'Login';
        loginBtn.onclick = () => {
          window.location.href = 'login.html';
        };
      }
    }
  }
};

// Initialize auth on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Auth.init());
} else {
  Auth.init();
}
