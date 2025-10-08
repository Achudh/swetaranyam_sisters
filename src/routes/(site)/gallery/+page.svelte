<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import { onMount } from "svelte";

    // Gallery images from the /images/gallery directory
    const galleryImages = [
        {
            src: "/images/gallery/BGS.JPG",
            alt: "Performance at BGS",
            title: "Performance at BGS",
        },
        {
            src: "/images/gallery/BVB.png",
            alt: "Performance at BVB",
            title: "Performance at BVB",
        },
        {
            src: "/images/gallery/CIMG0140.JPG",
            alt: "Concert Performance",
            title: "Concert Performance",
        },
        {
            src: "/images/gallery/CIMG0141.JPG",
            alt: "Musical Performance",
            title: "Musical Performance",
        },
        {
            src: "/images/gallery/CIMG0158.JPG",
            alt: "Stage Performance",
            title: "Stage Performance",
        },
        {
            src: "/images/gallery/CIMG0884.JPG",
            alt: "Concert Stage",
            title: "Concert Stage",
        },
        {
            src: "/images/gallery/CIMG0955.JPG",
            alt: "Musical Event",
            title: "Musical Event",
        },
        {
            src: "/images/gallery/CIMG1951.JPG",
            alt: "Performance Moment",
            title: "Performance Moment",
        },
        {
            src: "/images/gallery/CIMG1952.JPG",
            alt: "Concert Performance",
            title: "Concert Performance",
        },
        {
            src: "/images/gallery/CIMG2047.JPG",
            alt: "Musical Performance",
            title: "Musical Performance",
        },
        {
            src: "/images/gallery/CIMG2177.JPG",
            alt: "Stage Performance",
            title: "Stage Performance",
        },
        {
            src: "/images/gallery/concert_image.jpeg",
            alt: "Concert Image",
            title: "Concert Image",
        },
        {
            src: "/images/gallery/DSC02765.jpg",
            alt: "Performance Photo",
            title: "Performance Photo",
        },
        {
            src: "/images/gallery/IMG_1418.jpg",
            alt: "Musical Event",
            title: "Musical Event",
        },
        {
            src: "/images/gallery/IMG_1419.jpg",
            alt: "Concert Performance",
            title: "Concert Performance",
        },
        {
            src: "/images/gallery/IMG_1435.jpg",
            alt: "Stage Performance",
            title: "Stage Performance",
        },
        {
            src: "/images/gallery/NFS.JPG",
            alt: "Performance at NFS",
            title: "Performance at NFS",
        },
    ];

    let selectedImage = null;
    let lightboxOpen = false;

    function openLightbox(image: any) {
        selectedImage = image;
        lightboxOpen = true;
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightboxOpen = false;
        selectedImage = null;
        document.body.style.overflow = "auto";
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape" && lightboxOpen) {
            closeLightbox();
        }
    }

    onMount(() => {
        document.addEventListener("keydown", handleKeydown);
        return () => {
            document.removeEventListener("keydown", handleKeydown);
        };
    });
</script>

<svelte:head>
    <title>Gallery | Swetaranyam Sisters</title>
    <meta
        name="description"
        content="Explore our photo gallery showcasing performances, concerts, and musical moments of Swetaranyam Sisters."
    />
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden">
    <!-- Background Image -->
    <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style="background-image: url('/images/AKF_0021.jpg'); background-position: center 35%;"
    ></div>
    <!-- Gradient Overlay -->
    <div
        class="absolute inset-0 bg-gradient-to-b from-maroon-600/20 via-maroon-700/90 via-maroon-900/80 to-maroon-900"
    ></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div class="text-center">
            <h1
                class="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-gold-200 mx-6"
                in:fade={{ delay: 200 }}
            >
                Photo Gallery
            </h1>
            <p
                class="text-xl text-amber-100/90 max-w-3xl mx-auto"
                in:fade={{ delay: 400 }}
            >
                Capturing moments of musical excellence, tradition, and artistic
                passion
            </p>
        </div>
    </div>
</section>

<!-- Gallery Section -->
<section class="py-16 bg-maroon-800/40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12" in:fade={{ delay: 200 }}>
            <h2 class="font-display text-3xl text-gold-200 mb-4">
                Performance Moments
            </h2>
            <p class="text-xl text-amber-100/90 max-w-3xl mx-auto">
                A visual journey through our musical performances, concerts, and
                special moments
            </p>
        </div>

        <!-- Gallery Grid -->
        <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            in:fade={{ delay: 400 }}
        >
            {#each galleryImages as image, index}
                <div
                    class="group relative overflow-hidden rounded-2xl border border-maroon-700 bg-maroon-900/60 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    on:click={() => openLightbox(image)}
                    on:keydown={(e) => e.key === "Enter" && openLightbox(image)}
                    role="button"
                    tabindex="0"
                    in:fly={{ delay: index * 50, duration: 500, y: 20 }}
                >
                    <div class="aspect-square relative overflow-hidden">
                        <img
                            src={image.src}
                            alt={image.alt}
                            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                        />
                        <!-- Overlay -->
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        ></div>
                        <!-- Hover Icon -->
                        <div
                            class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            <div
                                class="w-12 h-12 bg-gold-600 rounded-full flex items-center justify-center"
                            >
                                <svg
                                    class="w-6 h-6 text-maroon-900"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="p-4">
                        <h3
                            class="text-amber-100 font-semibold text-sm group-hover:text-gold-200 transition-colors"
                        >
                            {image.title}
                        </h3>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- Lightbox Modal -->
{#if lightboxOpen && selectedImage}
    <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        on:click={closeLightbox}
        on:keydown={(e) => e.key === "Escape" && closeLightbox()}
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
    >
        <div
            class="relative max-w-4xl max-h-[90vh] mx-4"
            on:click|stopPropagation
        >
            <button
                class="absolute -top-12 right-0 text-white hover:text-gold-300 transition-colors z-10"
                on:click={closeLightbox}
                aria-label="Close lightbox"
            >
                <svg
                    class="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    ></path>
                </svg>
            </button>
            <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            <div
                class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg"
            >
                <h3 class="text-white font-semibold text-lg">
                    {selectedImage.title}
                </h3>
            </div>
        </div>
    </div>
{/if}

<style>
    /* Custom scrollbar for better UX */
    :global(.gallery-scroll) {
        scrollbar-width: thin;
        scrollbar-color: #fbbf24 #4c1d1d;
    }

    :global(.gallery-scroll::-webkit-scrollbar) {
        width: 8px;
    }

    :global(.gallery-scroll::-webkit-scrollbar-track) {
        background: #4c1d1d;
        border-radius: 4px;
    }

    :global(.gallery-scroll::-webkit-scrollbar-thumb) {
        background: #fbbf24;
        border-radius: 4px;
    }

    :global(.gallery-scroll::-webkit-scrollbar-thumb:hover) {
        background: #f59e0b;
    }

    /* Smooth transitions */
    .transition-all {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Focus styles for accessibility */
    :global([role="button"]:focus) {
        outline: 2px solid #fbbf24;
        outline-offset: 2px;
    }
</style>
