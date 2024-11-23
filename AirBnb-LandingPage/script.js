// data for categories
const categories = [
  {
    name: "Villa in Theog",
    image:
      "https://a0.muscache.com/im/pictures/a5e44a7b-4134-4531-ab5f-839c0a2f67cc.jpg?im_w=320",
    location: "Leeladhar TranquilIty, Luxury Stone Villa",
  },
  {
    name: "Cabin in Bengaluru",
    image:
      "https://a0.muscache.com/im/pictures/miso/Hosting-1143869922174900939/original/c6e5a2f5-44ba-4460-ab26-8ced278aecfb.jpeg?im_w=320",
    location: "ahu - A1 Sarjapur",
  },
  {
    name: "Villa in Ithalar",
    image:
      "https://a0.muscache.com/im/pictures/miso/Hosting-997828649510525029/original/d63b9afd-eb6c-4c91-b2ba-153b00fe39ea.jpeg?im_w=320",
    location: "Villa Camellia Balacola, Ooty",
  },
  {
    name: "Farm stay in Bir",
    image:
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTMzMDM3NzY%3D/original/5c2e321a-6d55-4e1c-837d-453081013e7d.jpeg?im_w=320",
    location: "Stone Farm House-Sukoon Baag",
  },
];

// data for listings
const listings = [
  {
    title: "1965's The Rustic Chalet Cottage Manali",
    location: " Manali, India",
    price: 841,
    rating: 4.9,
    image: "https://a0.muscache.com/im/pictures/hosting/Hosting-1238296944406976682/original/48fc129e-37e2-45c9-afb2-7c578ebdae06.jpeg?im_w=1200",
  },
  {
    title: "Fiddle leaf by Wular: Cozy 1BHK Retreat",
    location: "New Delhi, India",
    price: 2427,
    rating: 4.8,
    image: "https://a0.muscache.com/im/pictures/hosting/Hosting-1247123105661241030/original/9a476df3-3b82-44c2-a7f3-e6ad737b7ae3.jpeg?im_w=1200",
  },
  {
    title: "Cozy Homestay near Fr. Mullers Hospital/Valencia",
    location: "Mangaluru, India",
    price: 2250,
    rating: 4.95,
    image: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NzY2NDM5MDk5NDU2NjU5NzE5/original/8eaa1193-4e64-4939-8f03-5954ea2e61f7.jpeg?im_w=1200",
  },
];

// render categories
function renderCategories() {
  const categoryGrid = document.getElementById("categoryGrid");
  categories.forEach((category) => {
    const categoryCard = document.createElement("div");
    categoryCard.className = "category-card";
    categoryCard.innerHTML = `
            <img src="${category.image}" alt="${category.name}">
            <h3>${category.name}</h3>
            <p>${category.location}</p>
        `;
    categoryGrid.appendChild(categoryCard);
  });
}

// render listings
function renderListings() {
  const listingsGrid = document.getElementById("listingsGrid");
  listings.forEach((listing) => {
    const listingCard = document.createElement("div");
    listingCard.className = "listing-card";
    listingCard.innerHTML = `
            <img src="${listing.image}" alt="${listing.title}">
            <div class="listing-info">
                <div class="listing-header">
                    <h3>${listing.title}</h3>
                    <span class="rating">★ ${listing.rating}</span>
                </div>
                <p>${listing.location}</p>
                <p class="price"><strong>₹${listing.price}</strong> / night</p>
            </div>
        `;
    listingsGrid.appendChild(listingCard);
  });
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderListings();
});
