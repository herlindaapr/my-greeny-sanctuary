<template>
    <div class="w-full min-h-screen relative overflow-hidden">
    <div class="absolute inset-0 bg-[url('/bokchoy.png')] bg-cover bg-center"></div>
    <div class="absolute inset-0 bg-black/50"></div>
    
    <div class="relative h-screen flex flex-col">
      <div class="relative h-full w-5/6 self-center flex-1 mx-4 my-4 md:mx-8 md:my-8 rounded-3xl backdrop-blur-xl bg-white/20 shadow-2xl border border-white/30 overflow-hidden flex flex-col">
        <!-- Header Section -->
        <header class="flex items-center justify-between px-6 md:px-12 pt-6 md:pt-8 shrink-0">
          <!-- Logo -->
          <div class="font-heading text-base md:text-lg font-bold text-gray-900">
            Greeny Sanctuary
          </div>
          
          <!-- Navigation -->
          <nav class="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="#" class="font-body text-gray-900 hover:text-gray-700 transition-colors text-sm lg:text-base">Plant Shop</a>
            <a href="#" class="font-body text-gray-900 hover:text-gray-700 transition-colors text-sm lg:text-base">Inspirations</a>
            <a href="#" class="font-body text-gray-900 hover:text-gray-700 transition-colors text-sm lg:text-base">About PlantFashion</a>
            <a href="#" class="font-body text-gray-900 hover:text-gray-700 transition-colors text-sm lg:text-base">Contact</a>
          </nav>
        </header>
        
        <!-- Hero Content -->
        <div class="flex-1 flex pl-6 md:pl-12 pr-6 md:pr-12">
          <div class="flex flex-col items-center justify-center max-w-2xl">
            <!-- Headline -->
            <h1 class="font-heading self-start text-4xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Let Your Garden <br/> Tell Its Story
            </h1>
            
            <!-- Sub-headline -->
            <p class="font-body text-base md:text-2xl text-gray-800 mb-8">
              A gentle place to record your plants, your thoughts,
              and every little moment of growth along the way <br/>
              <span class="font-body font-semibold text-base md:text-2xl text-gray-800 mb-8 text-start">
                Write Your First Entry!🍃
              </span>
            </p>
          </div>
        </div>
      </div>
      
      <!-- Decorative Plant Element  -->
      <div class="hidden lg:block absolute inset-0 pointer-events-none z-10">
        <div class="relative w-full h-full">
          <img 
            src="/hand_rmv.png" 
            alt="Decorative plant" 
            class="absolute top-[20%] right-0 h-[60%] max-h-[500px] w-auto object-contain object-bottom-right translate-x-[10%]"
          />
        </div>
      </div>
    </div>
  </div>
</template>