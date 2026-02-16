// Volcano Arts - Gallery & Artwork Data

// Artwork catalog
const artworks = [
    {
        id: 'art-001',
        title: 'Sunrise Over Virunga',
        artist: 'Jean-Baptiste Habimana',
        category: 'painting',
        price: 250,
        description: 'A stunning oil painting capturing the golden light of dawn breaking over the Virunga volcanic mountains. The warm colors reflect the hope and energy of a new day in Rwanda.',
        dimensions: '60cm x 80cm',
        medium: 'Oil on canvas',
        image: 'images/artwork-001.jpg'
    },
    {
        id: 'art-002',
        title: 'Village Morning',
        artist: 'Marie-Claire Uwimana',
        category: 'painting',
        price: 180,
        description: 'A vibrant acrylic painting depicting daily life in Nyange village. Women carrying water, children playing, and the beautiful terraced hillsides in the background.',
        dimensions: '50cm x 70cm',
        medium: 'Acrylic on canvas',
        image: 'images/artwork-002.jpg'
    },
    {
        id: 'art-003',
        title: 'Imigongo Pattern Bowl',
        artist: 'Emmanuel Nkurunziza',
        category: 'handicraft',
        price: 85,
        description: 'Traditional Rwandan Imigongo art adapted into a beautiful decorative bowl. The geometric patterns are created using natural materials and cow dung mixed with natural pigments.',
        dimensions: '25cm diameter',
        medium: 'Mixed natural materials',
        image: 'images/artwork-003.jpg'
    },
    {
        id: 'art-004',
        title: 'The Coffee Harvest',
        artist: 'Jean-Baptiste Habimana',
        category: 'painting',
        price: 320,
        description: 'A large-scale painting celebrating the coffee harvest that sustains our community. Rich earthy tones capture workers picking ripe coffee cherries on the hillsides.',
        dimensions: '80cm x 100cm',
        medium: 'Oil on canvas',
        image: 'images/artwork-004.jpg'
    },
    {
        id: 'art-005',
        title: 'Woven Peace Basket',
        artist: 'Esperance Mukamana',
        category: 'handicraft',
        price: 65,
        description: 'An intricately woven basket using traditional Rwandan techniques. The pattern symbolizes peace and unity, with natural sisal fibers dyed using local plants.',
        dimensions: '30cm x 20cm',
        medium: 'Woven sisal',
        image: 'images/artwork-005.jpg'
    },
    {
        id: 'art-006',
        title: 'Mountain Gorilla',
        artist: 'Patrick Ishimwe',
        category: 'painting',
        price: 420,
        description: 'A powerful portrait of a silverback mountain gorilla, one of Rwanda\'s most treasured species. Painted with incredible detail to capture the majesty of these gentle giants.',
        dimensions: '70cm x 90cm',
        medium: 'Oil on canvas',
        image: 'images/artwork-006.jpg'
    },
    {
        id: 'art-007',
        title: 'Ceremonial Drum',
        artist: 'Emmanuel Nkurunziza',
        category: 'handicraft',
        price: 150,
        description: 'A handcrafted traditional Rwandan drum (Ingoma). Decorated with carved patterns and made using cowhide stretched over carved wood.',
        dimensions: '40cm height, 25cm diameter',
        medium: 'Wood and cowhide',
        image: 'images/artwork-007.jpg'
    },
    {
        id: 'art-008',
        title: 'Lake Kivu Sunset',
        artist: 'Marie-Claire Uwimana',
        category: 'painting',
        price: 280,
        description: 'A serene painting of the sunset over Lake Kivu, with fishing boats silhouetted against the orange and purple sky. Captures the peaceful beauty of Rwanda\'s great lake.',
        dimensions: '60cm x 90cm',
        medium: 'Acrylic on canvas',
        image: 'images/artwork-008.jpg'
    },
    {
        id: 'art-009',
        title: 'Beaded Wall Hanging',
        artist: 'Esperance Mukamana',
        category: 'handicraft',
        price: 95,
        description: 'A colorful wall hanging featuring traditional beadwork patterns. Each bead is hand-sewn onto fabric, creating a vibrant display of Rwandan artistic heritage.',
        dimensions: '45cm x 60cm',
        medium: 'Glass beads on fabric',
        image: 'images/artwork-009.jpg'
    },
    {
        id: 'art-010',
        title: 'Children of Hope',
        artist: 'Patrick Ishimwe',
        category: 'painting',
        price: 350,
        description: 'A joyful painting showing children from our village at play. The bright colors and dynamic composition capture the energy and optimism of Rwanda\'s next generation.',
        dimensions: '70cm x 80cm',
        medium: 'Acrylic on canvas',
        image: 'images/artwork-010.jpg'
    },
    {
        id: 'art-011',
        title: 'Imigongo Wall Art',
        artist: 'Emmanuel Nkurunziza',
        category: 'handicraft',
        price: 120,
        description: 'Traditional Imigongo geometric art panel, perfect for wall display. The black and white patterns with earth-toned accents represent ancient Rwandan royal art.',
        dimensions: '40cm x 50cm',
        medium: 'Cow dung and natural pigments on wood',
        image: 'images/artwork-011.jpg'
    },
    {
        id: 'art-012',
        title: 'Terrace Farming',
        artist: 'Jean-Baptiste Habimana',
        category: 'painting',
        price: 290,
        description: 'An impressive landscape showing the famous terraced hillsides of Rwanda. The painting celebrates the agricultural traditions that have shaped our land for generations.',
        dimensions: '65cm x 85cm',
        medium: 'Oil on canvas',
        image: 'images/artwork-012.jpg'
    },
    {
        id: 'art-013',
        title: 'Gorilla Chessboard',
        artist: 'Emmanuel Nkurunziza',
        category: 'handicraft',
        price: 175,
        description: 'A beautifully handcrafted chessboard featuring carved gorilla figurines as chess pieces. This unique piece celebrates Rwanda\'s iconic mountain gorillas and traditional woodworking craftsmanship. Each piece is intricately carved and the board features inlaid wood patterns.',
        dimensions: '45cm x 45cm',
        medium: 'Carved wood with inlay',
        image: 'images/artwork-013.jpg'
    }
];

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.gallery-grid')) {
        renderGallery(artworks);
        initFilters();
    }
});

// Render gallery items
function renderGallery(items) {
    const gallery = document.querySelector('.gallery-grid');
    if (!gallery) return;

    gallery.innerHTML = items.map(artwork => `
        <article class="card" data-category="${artwork.category}">
            <div class="card__image-wrapper">
                <img src="${artwork.image}" alt="${artwork.title}" class="card__image">
            </div>
            <div class="card__content">
                <h3 class="card__title">${artwork.title}</h3>
                <p class="card__artist">by ${artwork.artist}</p>
                <p class="card__price">${formatPrice(artwork.price)}</p>
                <div class="card__actions">
                    <a href="artwork.html?id=${artwork.id}" class="btn btn--outline">View Details</a>
                    <button class="btn btn--accent" onclick="addToCartFromGallery('${artwork.id}')">Add to Cart</button>
                </div>
            </div>
        </article>
    `).join('');
}

// Initialize filter buttons
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
            this.classList.add('filter-btn--active');

            // Filter artworks
            const category = this.dataset.category;
            const filtered = category === 'all'
                ? artworks
                : artworks.filter(a => a.category === category);

            renderGallery(filtered);
        });
    });
}

// Add to cart from gallery
function addToCartFromGallery(artworkId) {
    const artwork = artworks.find(a => a.id === artworkId);
    if (artwork) {
        addToCart(artwork);
    }
}

// Get artwork by ID
function getArtworkById(id) {
    return artworks.find(a => a.id === id);
}

// Get featured artworks (first 4)
function getFeaturedArtworks() {
    return artworks.slice(0, 4);
}
