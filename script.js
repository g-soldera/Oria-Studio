
// ============================================
// Links Data (JSON structure)
// ============================================
const linksData = [
    {
        id: 1,
        title: "Loja Própria",
        url: "#",
        iconType: "image",
        iconSource: "assets/logo.png"
    },
    {
        id: 2,
        title: "Shopee",
        url: "#",
        iconType: "fontawesome",
        iconClass: "fa-brands fa-shopify"
    },
    {
        id: 3,
        title: "Encomendas Personalizadas",
        url: "#",
        iconType: "fontawesome",
        iconClass: "fa-brands fa-whatsapp"
    }
];

// ============================================
// Theme Management
// ============================================
class ThemeManager {
    constructor() {
        this.theme = this.getInitialTheme();
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }

    getInitialTheme() {
        // Check device preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    init() {
        this.applyTheme(this.theme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            this.theme = e.matches ? 'dark' : 'light';
            this.applyTheme(this.theme);
        });
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.theme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);

        // Update toggle icon
        const icon = this.themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// ============================================
// Links Renderer
// ============================================
class LinksRenderer {
    constructor(containerId, links) {
        this.container = document.getElementById(containerId);
        this.links = links;
        this.render();
    }

    createLinkCard(link) {
        const card = document.createElement('a');
        card.href = link.url;
        card.className = 'link-card';
        card.target = '_blank';
        card.rel = 'noopener noreferrer';

        // Create icon
        const iconDiv = document.createElement('div');
        iconDiv.className = 'link-icon';

        if (link.iconType === 'image') {
            const img = document.createElement('img');
            img.src = link.iconSource;
            img.alt = link.title;
            iconDiv.appendChild(img);
        } else if (link.iconType === 'fontawesome') {
            const icon = document.createElement('i');
            icon.className = link.iconClass;
            iconDiv.appendChild(icon);
        }

        // Create content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'link-content';

        const title = document.createElement('h3');
        title.className = 'link-title';
        title.textContent = link.title;

        contentDiv.appendChild(title);

        // Assemble card
        card.appendChild(iconDiv);
        card.appendChild(contentDiv);

        return card;
    }

    render() {
        this.container.innerHTML = '';

        this.links.forEach((link, index) => {
            const card = this.createLinkCard(link);
            card.style.animationDelay = `${index * 0.1}s`;
            this.container.appendChild(card);
        });
    }
}

// ============================================
// Initialize App
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme manager
    const themeManager = new ThemeManager();

    // Initialize links renderer
    const linksRenderer = new LinksRenderer('linksContainer', linksData);
});