'use client';

export default function Hero() {
  function handleVerColeccion() {
    const el = document.querySelector('#products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <section
      className="
        relative flex items-center
        h-[calc(100vh-100px)]
        bg-cover bg-center bg-no-repeat
        p-8
        font-urbanist
        [background-image:url('/assets/images/hero-banner-small.webp')]
        sm:[background-image:url('/assets/images/hero-banner-mobile.webp')]
        md:[background-image:url('/assets/images/hero-banner.webp')]
      "
      aria-label="Special seasonal offer"
    >
      <div
        className="
          max-w-[1200px] mx-auto
          text-white
          [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]
          will-change-[transform,opacity]
          animate-fade-in-up
        "
      >
        <h2
          className="
            text-[clamp(2rem,5vw,4rem)]
            mb-6
          "
        >
          Summer 2025!
        </h2>
        <p
          className="
            text-[clamp(1.2rem,2.5vw,1.8rem)]
            mb-8
            max-w-[600px]
          "
        >
          UP TO 30% OFF ON SELECTED COLLECTION
        </p>
        <button
          onClick={handleVerColeccion}
          className="
            bg-secondary text-white
            px-10 py-4
            border-none rounded-[50px]
            text-[1.1rem]
            cursor-pointer
            relative overflow-hidden
            transition-transform duration-300
            hover:-translate-y-0.5
            hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)]
          "
          aria-label="View collection offers"
        >
          View Collection
        </button>
      </div>
    </section>
  );
}
