<template>
  <section class="w-full relative overflow-hidden">
    <div class="relative w-full">
      <img 
        src="/fyi_square.png" 
        alt="Garden background" 
        class="w-full h-auto object-contain block"
      />

      <div class="absolute inset-0 bg-black/20"></div>

      <!-- Bottom fade gradient (transparent to black) -->
      <div class="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-linear-to-t from-black via-black/80 to-transparent z-10"></div>
      
      <!-- Content Section with Question and Info Boxes -->
      <div class="absolute inset-0 flex flex-col px-4 md:px-8 mt-64 z-20">
      <!-- Main Question -->
      <h2 class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-6 md:mb-8">
        Why should we plant?
      </h2>
      
      <!-- Three Info Boxes with Arrows -->
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative text-center mt-10">
        <!-- Left Box: Nutrition and Diet -->
        <div class="relative flex flex-col items-center -rotate-6 hover:rotate-0 transition delay-100 duration-300 ease-in-out">
          <div class="p-6 md:p-8 w-full">
            <h3 class="font-heading text-xl md:text-2xl font-bold text-white">
              Nutrition and Diet
            </h3>
            <p class="font-body text-base md:text-lg text-white/80 leading-relaxed">
              Growing your own fruits and vegetables leads to a healthier diet because you know exactly how your food is grown.
            </p>
          </div>
          <div class="flex justify-center">
            <svg
              class="w-10 h-16 md:w-12 md:h-20 text-white -rotate-45"
              viewBox="0 0 30 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="translate(0,-10) scale(1,1.3)">
                <path
                  d="M0 65.653c0 .525.207 1.041.596 1.424l22.656 22.346a2 2 0 0 0 2.809 0l22.655-22.346a2.01 2.01 0 0 0 .446-2.183A2.002 2.002 0 0 0 48.311 63H26.689C27.743 30.581 54.842 4 88 4a2 2 0 1 0 0-4C51.969 0 22.656 29.452 22.656 65.654a2 2 0 0 0 2 2h17.779L24.656 85.191 6.876 67.654h7.316a2 2 0 1 0 0-4H2a2.003 2.003 0 0 0-1.851 1.241A2.013 2.013 0 0 0 0 65.653Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </div>
        </div>
        
        <!-- Middle Box: Mental Well-being -->
        <div class="relative flex flex-col items-center rotate-2 hover:rotate-0 transition delay-100 duration-300 ease-in-out">
          <div class="p-6 md:p-8 w-full">
            <h3 class="font-heading text-xl md:text-2xl font-bold text-white">
              Mental Well-being
            </h3>
            <p class="font-body text-base md:text-lg text-white/80 leading-relaxed">
              The practice of planting is known to reduce stress, anxiety, and depression.
            </p>
          </div>
          <div class="flex justify-center">
            <svg
              class="w-10 h-20 md:w-12 md:h-12 text-white -rotate-12"
              viewBox="0 20 30 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="translate(0,-10) scale(1,1.3)">
                <path
                  d="M0 65.653c0 .525.207 1.041.596 1.424l22.656 22.346a2 2 0 0 0 2.809 0l22.655-22.346a2.01 2.01 0 0 0 .446-2.183A2.002 2.002 0 0 0 48.311 63H26.689C27.743 30.581 54.842 4 88 4a2 2 0 1 0 0-4C51.969 0 22.656 29.452 22.656 65.654a2 2 0 0 0 2 2h17.779L24.656 85.191 6.876 67.654h7.316a2 2 0 1 0 0-4H2a2.003 2.003 0 0 0-1.851 1.241A2.013 2.013 0 0 0 0 65.653Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </div>
        </div>
        
        <!-- Right Box: Physical Health -->
        <div class="relative flex flex-col items-center rotate-12 hover:rotate-0 transition delay-100 duration-300 ease-in-out">
          <div class="p-6 md:p-8 w-full">
            <h3 class="font-heading text-xl md:text-2xl font-bold text-white">
              Physical Health
            </h3>
            <p class="font-body text-base md:text-lg text-white/80 leading-relaxed">
              Planting as a form of "green exercise" can enhance cardiovascular health.
            </p>
          </div>
          <div class="flex justify-center w-full pr-4 md:pr-8">
            <svg
              class="w-10 h-16 md:w-12 md:h-20 text-white rotate-45"
              viewBox="0 0 90 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="scale(-1,1) translate(-90,0)">
                <path
                  d="M0 65.653c0 .525.207 1.041.596 1.424l22.656 22.346a2 2 0 0 0 2.809 0l22.655-22.346a2.01 2.01 0 0 0 .446-2.183A2.002 2.002 0 0 0 48.311 63H26.689C27.743 30.581 54.842 4 88 4a2 2 0 1 0 0-4C51.969 0 22.656 29.452 22.656 65.654a2 2 0 0 0 2 2h17.779L24.656 85.191 6.876 67.654h7.316a2 2 0 1 0 0-4H2a2.003 2.003 0 0 0-1.851 1.241A2.013 2.013 0 0 0 0 65.653Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
      </div>
    </div>
  </section>
</template>

