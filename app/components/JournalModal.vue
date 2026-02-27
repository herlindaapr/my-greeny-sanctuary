<script setup lang="ts">
import { ref, watch } from 'vue'
import { useJournals } from '@/../composables/useJournals'
import type { StrapiJournalPayload } from '@/../utils/strapi'
import { createStrapiJournal } from '@/../utils/strapi'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { addJournal } = useJournals()

const title = ref('')
const content = ref('')
const date = ref<string>('')
const photoPreview = ref<string | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)
const today = new Date().toISOString().slice(0, 10)

const resetForm = () => {
  title.value = ''
  content.value = ''
  date.value = ''
  photoPreview.value = null
}

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) {
      resetForm()
    }
  }
)

const handlePhotoChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) {
    photoPreview.value = null
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    photoPreview.value = typeof reader.result === 'string' ? reader.result : null
  }
  reader.readAsDataURL(file)
}

const clearPhoto = () => {
  photoPreview.value = null
  const input = fileInputRef.value
  if (input) {
    input.value = ''
  }
}

const handleSubmit = async () => {
  if (!content.value.trim()) {
    return
  }

  const now = new Date().toISOString()
  const chosenDate =
    date.value && date.value <= today ? date.value : today

  const payload: StrapiJournalPayload = {
    title: title.value || 'Untitled entry',
    content: content.value,
    date: chosenDate,
    createdAt: now,
    photoDataUrl: photoPreview.value || undefined,
  }

  // Try to persist to Strapi (optional, will no-op if backend not ready)
  await createStrapiJournal(payload)

  // Always store locally so it appears immediately in the UI
  addJournal(payload)

  resetForm()
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
    >
      <div
        class="w-full max-w-2xl rounded-3xl bg-stone-900/95 border border-white/15 shadow-2xl backdrop-blur-2xl text-white p-6 md:p-8 relative"
      >
        <!-- Close button -->
        <button
          type="button"
          class="absolute right-4 top-4 text-white/60 hover:text-white transition-colors"
          @click="emit('close')"
        >
          ✕
        </button>

        <h2 class="font-heading text-2xl md:text-3xl font-semibold mb-4">
          Write your garden journal
        </h2>
        <p class="font-body text-sm md:text-base text-white/70 mb-6">
          Capture your gardening moments. You can backdate entries if you
          skipped a day.
        </p>

        <form class="space-y-5" @submit.prevent="handleSubmit">
          <!-- Title -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-white/80">
              Title (optional)
            </label>
            <input
              v-model="title"
              type="text"
              class="w-full rounded-xl bg-white/5 border border-white/20 px-3 py-2 text-sm md:text-base font-body placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
              placeholder="Morning watering, repotting day, new leaves..."
            />
          </div>

          <!-- Date -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-white/80">
              Journal date
            </label>
            <input
              v-model="date"
              type="date"
              :max="today"
              class="w-full md:w-1/2 rounded-xl bg-white/5 border border-white/20 px-3 py-2 text-sm md:text-base font-body text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
            />
            <p class="text-xs text-white/50">
              You can choose a different day if you forgot to write on time.
            </p>
          </div>

          <!-- Content -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-white/80">
              Your notes
            </label>
            <textarea
              v-model="content"
              rows="5"
              class="w-full rounded-2xl bg-white/5 border border-white/20 px-3 py-2 text-sm md:text-base font-body placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80 resize-none"
              placeholder="What did you notice today? New sprouts, yellow leaves, changed soil, or a small joy in your garden..."
            />
          </div>

          <!-- Photo -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-white/80">
              Photo (optional)
            </label>
            <div class="flex items-center gap-3">
              <input
                ref="fileInputRef"
                type="file"
                accept="image/*"
                class="block w-full text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-500/90 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-400/90"
                @change="handlePhotoChange"
              />
              <div
                v-if="photoPreview"
                class="relative h-14 w-14 rounded-xl overflow-hidden border border-white/20 bg-black/40 shrink-0"
              >
                <img
                  :src="photoPreview"
                  alt="Journal photo preview"
                  class="h-full w-full object-cover"
                />
                <button
                  type="button"
                  class="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-black/80 text-xs text-white flex items-center justify-center border border-white/30 hover:bg-black"
                  @click="clearPhoto"
                >
                  ✕
                </button>
              </div>
            </div>
            <p class="text-xs text-white/50">
              Add a snapshot of your plant, corner of your room, or anything
              that tells the story.
            </p>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              class="rounded-full px-4 py-2 text-sm font-body text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              @click="emit('close')"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="inline-flex items-center gap-2 rounded-full bg-emerald-500/90 hover:bg-emerald-400 text-white font-body text-sm md:text-base font-semibold px-6 py-2 transition-colors disabled:cursor-not-allowed disabled:bg-emerald-500/40"
              :disabled="!content.trim()"
            >
              Save entry
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

