<script setup>
import { ref, computed, onMounted } from "vue"; // Add computed here
import { usePostsStore } from "@/stores/posts";
import { RouterLink } from "vue-router"; // Import RouterLink for navigation
import B_logo from "@/assets/images/book_logo.png";


// Book categories and carousel
const categories = ref([
  "Children’s Books",
  "Poetry",
  "Drama/Plays",
  "Science",
  "History",
]);
const currentIndex = ref(0); // To track the center category

// Computed to get the visible categories
const visibleCategories = computed(() => {
  const totalCategories = categories.value.length;
  const visible = [];

  // Use logic to get 5 categories, centered around the currentIndex
  for (let i = -2; i <= 2; i++) {
    const index = (currentIndex.value + i + totalCategories) % totalCategories;
    visible.push(categories.value[index]);
  }

  return visible;
});

// Methods for category navigation
const nextCategory = () => {
  currentIndex.value = (currentIndex.value + 1) % categories.value.length;
};

const prevCategory = () => {
  currentIndex.value =
    (currentIndex.value - 1 + categories.value.length) %
    categories.value.length;
};
</script>

<template>
  <main class="main_">
    <div class="hero">
      <div class="hero_cont">
        <div style="display: flex; align-items: baseline">
          <h1>Our</h1>
          <h4>Library</h4>
        </div>
        <p>
          A good online library includes features like book reservations, access
          to new articles, real-time book availability, and highlights for due
          books, ensuring a seamless and efficient user experience for readers
          and researchers.
        </p>
      </div>
      <div>
        <img :src="B_logo" alt="B logo" class="book_logo" />
      </div>
    </div>

    <div class="category-area" id="section2">
      <h1 class="category-area-title">Available Categories</h1>
      <p class="category-area-dec">
        Explore a diverse range of categories designed to fuel your curiosity
        and expand your knowledge.
      </p>

      <div class="category-carousel">
        <!-- Previous arrow -->
        <button class="arrow prev" @click="prevCategory">&#10094;</button>

        <!-- Categories display -->
        <div class="category-container">
          <div
            v-for="(category, index) in visibleCategories"
            :key="index"
            :class="{
              'category-item': true,
              middle: index === 2,
              corner: index === 0 || index === 4,
            }"
          >
            <p class="c_name">{{ category }}</p>
          </div>
        </div>

        <!-- Next arrow -->
        <button class="arrow next" @click="nextCategory">&#10095;</button>
      </div>
    </div>

    <div class="abouts-area" id="section3">
      <h1 class="about-area-title">About Our Library</h1>
      <p class="about-area-dec">
        Your gateway to knowledge, discovery, and inspiration.
      </p>

      <section class="dtails-section" style="margin-top:2%">
        <h2 class="dtails-section-title">Our Mission</h2>
        <p class="dtails-section-dec">
          Our library is dedicated to providing access to a vast collection of
          books, digital resources, and educational programs that inspire
          lifelong learning and enrich our community. Whether you're a student,
          a researcher, or a casual reader, we aim to offer a welcoming
          environment for everyone.
        </p>
      </section>

      <section class="dtails-section">
        <h2 class="dtails-section-title">History</h2>
        <p class="dtails-section-dec">
          Established in 2019, our library has been a cornerstone of the
          community for over 4 years. It started as a small collection of books
          and has grown into a modern institution offering not only physical
          books but also digital media, online databases, and community-focused
          events.
        </p>
      </section>

      <section class="dtails-section">
        <h2 class="dtails-section-title">What We Offer</h2>
        <ul class="dtails-section-dec-ul">
          <li>A wide range of books, magazines, and journals</li>
          <li>Digital resources, e-books, and audiobooks</li>
          <li>Research and reference materials</li>
          <li>Community programs and workshops</li>
          <li>Study spaces and free internet access</li>
        </ul>
      </section>
    </div>

    <div class="category-area" id="section4">
      <h1 class="category-area-title">Contact Us</h1>
      <p class="category-area-dec" style="margin-bottom: 30px;">
        We are here to help! Reach out to us for any inquiries, suggestions, or
        support.
      </p>

      <section class="contact-info-section">
        <h2>Librarian</h2>
        <div class="pp-image-cover">
          <div class="pp-image">
          </div>
        </div>
        <p><b>Pramukha Thenuwara</b></p>
        
      </section>

      <section class="contact-info-section">
        <h2>Information</h2>
        <p>
          <strong>Address:</strong> 123 Library Street, Knowledge City, 45678
          <br />
          <strong>Phone:</strong> (123) 456-7890 <br />
          <strong>Email:</strong> info@ourlibrary.com
        </p>
      </section>
    </div>
  </main>
</template>
