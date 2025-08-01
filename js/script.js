if (document.getElementById("my-work-link")) {
  document.getElementById("my-work-link").addEventListener("click", () => {
    document
      .getElementById("my-work-section")
      .scrollIntoView({ behavior: "smooth" });
  });
}

// Image Slideshow Functionality
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".portfolio-header-image");
  let currentImageIndex = 0;
  const slideInterval = 4000; // Change image every 4 seconds
  let slideshowTimer;
  let isTransitioning = false;

  // Initialize slideshow
  function initSlideshow() {
    if (images.length <= 1) return;

    // Set all images to absolute positioning
    images.forEach((img, index) => {
      img.style.position = "absolute";
      img.style.top = "0";
      img.style.left = "0";

      if (index === 0) {
        img.classList.add("active");
      }
    });

    // Set container height based on first image
    const firstImage = images[0];
    const slideshow = document.querySelector(".image-slideshow");

    // Wait for image to load to get proper dimensions
    if (firstImage.complete) {
      slideshow.style.height = firstImage.offsetHeight + "px";
    } else {
      firstImage.addEventListener("load", () => {
        slideshow.style.height = firstImage.offsetHeight + "px";
      });
    }
  }

  function showNextImage() {
    if (images.length <= 1 || isTransitioning) return;

    isTransitioning = true;

    const currentImage = images[currentImageIndex];
    const nextIndex = (currentImageIndex + 1) % images.length;
    const nextImage = images[nextIndex];

    // Start sliding current image out to the left
    currentImage.classList.add("slide-out");
    currentImage.classList.remove("active");

    // Start sliding next image in from the right
    nextImage.classList.add("active");
    nextImage.classList.remove("slide-out");

    // Update index
    currentImageIndex = nextIndex;

    // Reset transition flag and clean up after animation completes
    setTimeout(() => {
      isTransitioning = false;

      // Clean up non-active images without visible movement
      images.forEach((img) => {
        if (!img.classList.contains("active")) {
          // Disable transitions temporarily
          img.style.transition = "none";
          // Remove slide-out class and reset position
          img.classList.remove("slide-out");
          // Force reflow to ensure the transition:none takes effect
          img.offsetHeight;
          // Re-enable transitions
          img.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        }
      });
    }, 800); // Match the CSS transition duration
  }

  function startSlideshow() {
    if (images.length > 1) {
      slideshowTimer = setInterval(showNextImage, slideInterval);
    }
  }

  function stopSlideshow() {
    clearInterval(slideshowTimer);
  }

  // Initialize and start slideshow
  initSlideshow();
  startSlideshow();

  // Optional: Pause slideshow on hover
  const slideshowContainer = document.querySelector(".image-slideshow");
  if (slideshowContainer) {
    slideshowContainer.addEventListener("mouseenter", stopSlideshow);
    slideshowContainer.addEventListener("mouseleave", startSlideshow);
  }
});
