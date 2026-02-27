<script setup lang="ts">
import { ref } from 'vue'
import { useJournals } from '@/../composables/useJournals'
import type { JournalEntry } from '@/../composables/useJournals'

const isJournalModalOpen = ref(false)
const { journals } = useJournals()

const selectedJournal = ref<JournalEntry | null>(null)
const isDetailsModalOpen = ref(false)

const openJournalModal = () => {
  isJournalModalOpen.value = true
}

const closeJournalModal = () => {
  isJournalModalOpen.value = false
}

const openJournalDetails = (entry: JournalEntry) => {
  selectedJournal.value = entry
  isDetailsModalOpen.value = true
}

const closeJournalDetails = () => {
  isDetailsModalOpen.value = false
  selectedJournal.value = null
}
</script>

<template>
  <!-- Height now follows the full natural height of cta_img (no h-screen) -->
  <section class="relative w-full overflow-hidden">
    <div class="relative w-full">
      <img
        src="/cta4.jpg"
        alt="Leafy background"
        class="w-full h-auto object-cover block"
      />
      <!-- Black overlay (no blur to maintain image sharpness) -->
      <div class="absolute inset-0 bg-black/50"></div>
      
      <!-- Top fade gradient (black to transparent) for smooth bridging -->
      <div class="absolute top-0 left-0 right-0 h-32 md:h-48 bg-linear-to-b from-black via-black/80 to-transparent z-10"></div>

      <!-- Foreground content -->
      <div
        class="absolute inset-0 z-10 flex items-center justify-center px-4 md:px-6 lg:px-10"
      >
        <div class="max-w-5xl w-full space-y-6 md:space-y-8">
          <!-- Main glass card (CTA) -->
          <div
            class="relative rounded-[32px] md:rounded-[40px] border border-white/25 bg-white/10 backdrop-blur-2xl shadow-2xl text-white px-6 py-8 md:px-10 md:py-10"
          >
            <!-- Floating circular button on the left -->
            <div
              class="hidden md:flex absolute -left-10 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/85 backdrop-blur-xl shadow-xl items-center justify-center z-20"
            >
              <div class="grid grid-cols-2 gap-1">
                <span class="w-3 h-3 rounded-md bg-emerald-700"></span>
                <span class="w-3 h-3 rounded-md bg-emerald-700"></span>
                <span class="w-3 h-3 rounded-md bg-emerald-700"></span>
                <span class="w-3 h-3 rounded-md bg-emerald-700"></span>
              </div>
            </div>

            <!-- Decorative floating soil (CTA-only) -->
            <div class="hidden lg:block absolute inset-0 pointer-events-none z-0">
              <div class="relative w-full h-full">
                <img
                  src="/floating_soil.png"
                  alt="Floating soil"
                  class="absolute -right-10 top-0 h-[80%] max-h-[360px] w-auto object-contain translate-y-6"
                />
              </div>
            </div>

            <!-- CTA Box -->
            <div class="relative space-y-6 flex flex-col md:space-y-8">
              <div>
                <h2
                  class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                >
                  It's Your Time <br />
                  Create Your Own Story
                </h2>
              </div>
              <p class="font-body text-sm md:text-base text-white/80 max-w-xl">
                Writing down your daily gardening activities helps you see your
                progress and stay consistent with your goals. <br />
                Each note you make becomes a small record of care, growth, and
                learning from nature. <br />
                By tracking what you plant and nurture, you’re not just organizing
                your routine—you’re actively contributing to a greener, healthier
                planet. <br />
                Your simple daily journal can inspire mindful gardening habits
                that create real impact for the world around you. 🌱
              </p>
              <button
                class="w-1/5 flex-end self-end items-center gap-2 rounded-full bg-emerald-500/90 hover:bg-emerald-400 text-white font-body text-xs md:text-sm font-semibold px-6 py-2 transition-colors"
                type="button"
                @click="openJournalModal"
              >
                Write
              </button>
            </div>
          </div>

          <!-- Blog-style journal list card component -->
          <JournalCard
            v-if="journals.length"
            :journals="journals"
            @add-new-entry="openJournalModal"
            @open-details="openJournalDetails"
          />
        </div>
      </div>
    </div>
    <!-- Journal modal -->
    <JournalModal :open="isJournalModalOpen" @close="closeJournalModal" />

    <!-- Journal details modal -->
    <JournalDetailsModal
      v-if="selectedJournal && isDetailsModalOpen"
      :entry="selectedJournal"
      @close="closeJournalDetails"
    />
  </section>
</template>
