<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { JournalEntry } from '@/../composables/useJournals'

const props = defineProps<{
  journals: JournalEntry[]
}>()

const emit = defineEmits<{
  (e: 'add-new-entry'): void
  (e: 'open-details', entry: JournalEntry): void
}>()

const itemsPerPage = 3
const currentPage = ref(1)

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.journals.length / itemsPerPage))
)

const paginatedJournals = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return props.journals.slice(start, start + itemsPerPage)
})

watch(
  () => props.journals.length,
  () => {
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value
    }
  }
)

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

const handleCardClick = (entry: JournalEntry) => {
  emit('open-details', entry)
}

const handleAddNewClick = () => {
  emit('add-new-entry')
}
</script>

<template>
  <div
    v-if="journals.length"
    class="relative rounded-[28px] md:rounded-[32px] border border-white/25 bg-white/10 backdrop-blur-2xl shadow-2xl text-white px-6 py-6 md:px-8 md:py-7 mt-40"
  >
    <div
      class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6 mb-4 md:mb-6"
    >
      <div>
        <h3 class="font-heading text-xl md:text-2xl font-semibold text-white/90">
          Your recent garden stories
        </h3>
        <p class="font-body text-xs md:text-sm text-white/60 mt-1">
          A quick view of the journals you’ve logged so far.
        </p>
      </div>
      <button
        type="button"
        class="self-start rounded-full border border-emerald-400/60 bg-emerald-500/15 text-emerald-100 font-body text-xs md:text-sm px-4 py-1.5 hover:bg-emerald-500/25 transition-colors"
        @click="handleAddNewClick"
      >
        Add new entry
      </button>
    </div>

    <div class="space-y-4 md:space-y-5">
      <article
        v-for="entry in paginatedJournals"
        :key="entry.id"
        class="cursor-pointer rounded-2xl bg-white/5 border border-white/10 p-4 md:p-5 flex flex-col md:flex-row gap-4 md:gap-5 hover:bg-white/10 transition-colors"
        @click="handleCardClick(entry)"
      >
        <div
          v-if="entry.photoDataUrl"
          class="w-full md:w-40 h-32 md:h-32 rounded-xl overflow-hidden border border-white/10 bg-black/40 shrink-0"
        >
          <img
            :src="entry.photoDataUrl"
            alt="Journal photo"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="flex-1 space-y-2">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <h4 class="font-heading text-lg font-semibold">
              {{ entry.title }}
            </h4>
            <div class="text-xs font-body text-white/60 text-right">
              <p>
                {{ new Date(entry.date).toLocaleDateString() }}
              </p>
            </div>
          </div>
          <p
            class="font-body text-sm md:text-sm leading-relaxed text-white/80 whitespace-pre-line"
          >
            {{ entry.content }}
          </p>
        </div>
      </article>
    </div>

    <div
      v-if="totalPages > 1"
      class="mt-4 flex items-center justify-between gap-4 text-xs md:text-sm font-body text-white/70"
    >
      <span>
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="px-3 py-1 rounded-full border border-white/25 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          Prev
        </button>
        <button
          type="button"
          class="px-3 py-1 rounded-full border border-white/25 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

