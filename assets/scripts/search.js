const searchInput = document.getElementById("search-input");
const searchEngine = document.getElementById("search-engine");
const autocompleteList = document.getElementById("search-input-autocomplete-list");

const savedEngine = localStorage.getItem("searchEngine");
if (savedEngine) setSearchEngine(savedEngine);

searchEngine.addEventListener("input", () => {
    localStorage.setItem("searchEngine", searchEngine.value);
});

searchInput.addEventListener("keyup", (e) => {
    if (![40, 38, 13].includes(e.keyCode)) {
        showResults(searchInput.value);
    }
});

searchInput.addEventListener("keydown", (e) => {
    const rows = autocompleteList.getElementsByClassName("row");
    if (e.keyCode === 40) { // Arrow Down
        e.preventDefault();
        currentFocus++;
        addActive(rows);
    } else if (e.keyCode === 38) { // Arrow Up
        e.preventDefault();
        currentFocus--;
        addActive(rows);
    } else if (e.keyCode === 13) { // Enter
        e.preventDefault();
        if (currentFocus > -1 && rows[currentFocus]) {
            rows[currentFocus].click();
        } else {
            performSearch(searchInput.value, searchEngine.value);
        }
    }
});

autocompleteList.addEventListener("mousedown", function(e) {
    e.preventDefault();
});

let currentFocus = -1;

var searchTerms = [
    // Technology & Gadgets
    "iPhone 15",
    "Samsung Galaxy S23",
    "iPad Pro",
    "Apple Watch Series 8",
    "MacBook Air M2",
    "MacBook Pro 16-inch",
    "AirPods Pro 2nd generation",
    "Samsung Galaxy Z Flip 5",
    "Sony PlayStation 5",
    "Xbox Series X",
    "Nintendo Switch OLED",
    "Huawei MateBook",
    "OnePlus 11",
    "Google Pixel 8",
    "Surface Laptop 5",
    "Dell XPS 13",

    // Health & Fitness
    "Weight loss tips",
    "Best exercise for abs",
    "Keto diet recipes",
    "Vegan meal plan",
    "HIIT workouts",
    "Yoga poses for beginners",
    "Intermittent fasting",
    "Meditation techniques",
    "How to build muscle",
    "Low carb diet foods",
    "Healthy smoothie recipes",
    "Fitness tracker apps",
    "Best running shoes",
    "Home workout routines",
    "Plant-based protein sources",

    // Food & Recipes
    "Best pizza recipes",
    "Easy pasta dishes",
    "Vegan desserts",
    "Gluten-free bread recipe",
    "Keto snack ideas",
    "Quick breakfast recipes",
    "Chicken curry recipe",
    "Healthy salad recipes",
    "Best chocolate cake recipe",
    "Low-calorie dinner recipes",
    "Smoothie bowl recipes",
    "Air fryer recipes",
    "Healthy lunch ideas",
    "Gluten-free cookies",
    "Taco recipes",

    // Travel & Destinations
    "Best travel destinations 2025",
    "Paris travel guide",
    "Cheap flights to Japan",
    "Things to do in New York",
    "Best beaches in Hawaii",
    "Backpacking through Europe",
    "Solo travel tips",
    "Road trip ideas in the USA",
    "Luxury resorts in Bali",
    "Best ski resorts in the world",
    "Affordable hotels in Tokyo",
    "Adventure travel destinations",
    "Eco-tourism destinations",
    "Best places to visit in Australia",
    "Luxury cruises to the Caribbean",

    // Finance & Investing
    "Best credit cards for rewards",
    "How to invest in stocks",
    "Cryptocurrency news",
    "Budgeting tips for families",
    "How to save for retirement",
    "Real estate investment strategies",
    "Bitcoin vs Ethereum",
    "How to build an emergency fund",
    "Best investment apps",
    "How to get a personal loan",
    "Stock market predictions 2025",
    "Passive income ideas",
    "Financial planning for millennials",
    "Tax tips for freelancers",
    "How to buy your first home",

    // Entertainment & Pop Culture
    "Top movies of 2024",
    "Upcoming Marvel movies",
    "New music releases this week",
    "Best Netflix series",
    "Top 10 podcasts for entrepreneurs",
    "Best horror movies on Hulu",
    "Popular TikTok trends",
    "Best video games of the year",
    "Music festivals in 2025",
    "Upcoming Star Wars series",
    "Best stand-up comedy specials",
    "How to start a YouTube channel",
    "Celebrity news",
    "Top-rated books to read",
    "BTS new album release",

    // Shopping & Deals
    "Best Amazon deals today",
    "Black Friday 2024 discounts",
    "Cheapest online stores",
    "Best deals on electronics",
    "Discount codes for Shein",
    "Sales on Nike sneakers",
    "Where to buy a cheap laptop",
    "Top-rated skincare products",
    "Best online shopping sites",
    "Discounted furniture",
    "Affordable beauty products",
    "Where to buy Apple products",
    "Cyber Monday 2024 deals",
    "Fashion sales and promotions",
    "Where to buy wireless earbuds",

    // Education & Career
    "How to learn coding",
    "Best online courses for marketing",
    "Top universities in the world",
    "Work from home job opportunities",
    "Interview tips for software engineers",
    "How to write a resume",
    "Top online MBA programs",
    "How to improve productivity",
    "Time management tips",
    "Online degrees in business",
    "How to become a graphic designer",
    "Project management certifications",
    "Study tips for college students",
    "Best career change options",
    "How to start a side hustle",

    // Home & Lifestyle
    "Home decoration ideas",
    "Gardening tips for beginners",
    "DIY home projects",
    "How to organize your closet",
    "Interior design trends 2025",
    "Best cleaning products",
    "Smart home gadgets",
    "Minimalist home decor",
    "Sustainable living tips",
    "How to get rid of pests",
    "Home improvement ideas",
    "Best vacuum cleaners",
    "Organizing kitchen cabinets",
    "Feng Shui home design",
    "Modern furniture for small spaces",

    // Sports & Outdoor
    "How to play tennis",
    "Best hiking trails in the USA",
    "Top soccer teams in Europe",
    "Best golf clubs for beginners",
    "Football news 2025",
    "Summer camping essentials",
    "Cycling tips for beginners",
    "Best running shoes for marathons",
    "Extreme sports experiences",
    "How to improve in basketball",
    "Fishing gear recommendations",
    "Winter sports clothing",
    "Sports nutrition tips",
    "CrossFit workout plan",
    "Surfing spots around the world",

    // Fashion & Beauty
    "Fashion trends 2025",
    "Best makeup brands",
    "How to style your hair",
    "Skincare routine for oily skin",
    "Street style fashion",
    "How to wear vintage clothes",
    "Best perfume for women",
    "Winter fashion outfits",
    "Summer wardrobe essentials",
    "Sustainable fashion brands",
    "Bridal makeup looks",
    "Affordable fashion tips",
    "How to accessorize",
    "Beauty tips for glowing skin",
    "DIY face masks for acne",

    // Science & Nature
    "Climate change facts",
    "Space exploration news",
    "Best documentaries about nature",
    "How do black holes form",
    "Latest physics discoveries",
    "What causes earthquakes",
    "Ocean conservation efforts",
    "How do plants photosynthesize",
    "Renewable energy sources",
    "Environmental conservation tips",
    "The human genome project",
    "Mars exploration missions",
    "Wildlife photography tips",
    "Extinct animal species",
    "Global warming and its effects",

    // Relationships & Lifestyle
    "Relationship advice for couples",
    "How to improve communication",
    "Dating tips for introverts",
    "Self-care routines for mental health",
    "How to deal with anxiety",
    "Parenting tips for new parents",
    "How to maintain a healthy relationship",
    "Tips for long-distance relationships",
    "How to build self-confidence",
    "Setting life goals",
    "Time management for busy people",
    "How to stay motivated",
    "Stress management techniques",
    "Building healthy habits",
    "How to deal with breakups"
];

function autocompleteMatch(input) {
    if (!input) return [];
    const reg = new RegExp(input, 'i');
    return searchTerms.filter(term => term.match(reg));
}

function showResults(val) {
    autocompleteList.innerHTML = "";
    currentFocus = -1;

    let terms = autocompleteMatch(val);

    // Limit the results to 10
    terms = terms.slice(0, 10);

    if (terms.length === 0) {
        autocompleteList.innerHTML = `
            <div class="row-muted">
                <span>No results found</span>
            </div>
        `;
    } else {
        terms.forEach(term => {
            const row = document.createElement("div");
            row.classList.add("row");
            row.innerHTML = `
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </div>
                <span>${term}</span>
            `;

            row.addEventListener("click", function () {
                searchInput.value = term;
                autocompleteList.innerHTML = "";
                showResults(term);
            });

            autocompleteList.appendChild(row);
        });
    }
}

function addActive(rows) {
    if (!rows || rows.length === 0) return;
    removeActive(rows);

    if (currentFocus >= rows.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = rows.length - 1;
    rows[currentFocus]?.classList.add("autocomplete-active");
}

function removeActive(rows) {
    Array.from(rows).forEach(row => row.classList.remove("autocomplete-active"));
}

function performSearch(value, searchEngine = "google") {
    if (!value.trim()) return;

    const searchUrl = getSearchUrl(value, searchEngine);
    if (searchUrl) window.location.href = searchUrl;
}

function getSearchUrl(value, searchEngine) {
    const query = encodeURIComponent(value);
    switch (searchEngine.toLowerCase()) {
        case "google": return `https://www.google.com/search?q=${query}`;
        case "bing": return `https://www.bing.com/search?q=${query}`;
        case "yahoo": return `https://search.yahoo.com/search?p=${query}`;
        case "duckduckgo": return `https://duckduckgo.com/?q=${query}`;
        default: console.error("Unsupported search engine");
        return null;
    }
}
