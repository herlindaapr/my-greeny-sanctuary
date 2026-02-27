<script setup lang="ts">
import { ref, watch } from 'vue'
import { useJournals } from '@/../composables/useJournals'
import type { JournalEntry } from '@/../composables/useJournals'

const props = defineProps<{
  entry: JournalEntry
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { updateJournal, deleteJournal } = useJournals()

const title = ref(props.entry.title)
const content = ref(props.entry.content)
const date = ref(props.entry.date)
const photoPreview = ref<string | null>(props.entry.photoDataUrl || null)
const fileInputRef = ref<HTMLInputElement | null>(null)
const isReplacingPhoto = ref(false)

const today = new Date().toISOString().slice(0, 10)

watch(
  () => props.entry,
  (newEntry) => {
    title.value = newEntry.title
    content.value = newEntry.content
    date.value = newEntry.date
    photoPreview.value = newEntry.photoDataUrl || null
    isReplacingPhoto.value = false
  },
  { immediate: true }
)

const handleClose = () => {
  emit('close')
}

const handleSave = () => {
  if (!content.value.trim()) return

  const safeDate = date.value && date.value <= today ? date.value : today

  updateJournal(props.entry.id, {
    title: title.value || 'Untitled entry',
    content: content.value,
    date: safeDate,
    photoDataUrl: photoPreview.value || undefined,
  })

  emit('close')
}

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this journal entry?')) {
    deleteJournal(props.entry.id)
    emit('close')
  }
}

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
  isReplacingPhoto.value = true
}
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
    >
      <div
        class="w-1/2 h-max rounded-3xl bg-stone-900/95 border border-white/15 shadow-2xl backdrop-blur-2xl text-white p-6 md:p-8 relative flex flex-col"
      >
        <!-- Close button -->
        <button
          type="button"
          class="absolute right-4 top-4 text-white/60 hover:text-white transition-colors"
          @click="handleClose"
        >
          ✕
        </button>

        <h2 class="font-heading text-2xl md:text-3xl font-semibold mb-4">
          Journal details
        </h2>
        <p class="font-body text-sm md:text-base text-white/70 mb-6">
          Review, edit, or delete this entry.
        </p>

        <ScrollArea class="flex-1 -mx-2 px-2">
          <form class="space-y-5 pb-4" @submit.prevent="handleSave">
          <!-- Title -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-white/80">
              Title
            </label>
            <input
              v-model="title"
              type="text"
              class="w-full rounded-xl bg-white/5 border border-white/20 px-3 py-2 text-sm md:text-base font-body placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80"
              placeholder="Untitled entry"
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
          </div>

          <!-- Content -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-white/80">
              Your notes
            </label>
            <textarea
              v-model="content"
              rows="6"
              class="w-full rounded-2xl bg-white/5 border border-white/20 px-3 py-2 text-sm md:text-base font-body placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-emerald-400/80 resize-none"
            />
          </div>

          <!-- Photo section -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-white/80">
              Photo (optional)
            </label>

            <!-- Show current image (large) until user decides to replace/delete -->
            <div
              v-if="photoPreview && !isReplacingPhoto"
              class="relative rounded-2xl overflow-hidden border border-white/15 bg-black/40 max-h-64"
            >
              <img
                :src="photoPreview"
                alt="Journal photo"
                class="w-full h-full object-cover"
              />
              <button
                type="button"
                class="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-red-500/80 text-xs text-white flex items-center justify-center border border-white/30 hover:bg-black"
                @click="clearPhoto"
              >
                🗑
              </button>
            </div>

            <!-- After bin is clicked, allow choosing a new file with small preview -->
            <div v-else class="space-y-2">
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
                    alt="New journal photo preview"
                    class="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    class="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500/80 text-xs text-white flex items-center justify-center border border-white/30 hover:bg-black"
                    @click="clearPhoto"
                  >
                    🗑
                  </button>
                </div>
              </div>
              <p class="text-xs text-white/50">
                Choose a new photo for this entry, or leave it empty to save without an image.
              </p>
            </div>
          </div>

            <!-- Actions -->
            <div
              class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-4"
            >
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-full border border-red-400/70 bg-red-500/10 hover:bg-red-500/25 text-red-200 font-body text-sm md:text-base font-semibold px-5 py-2 transition-colors"
                @click="handleDelete"
              >
                Delete entry
              </button>

              <div class="flex items-center justify-end gap-3">
                <button
                  type="button"
                  class="rounded-full px-4 py-2 text-sm font-body text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  @click="handleClose"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="inline-flex items-center gap-2 rounded-full bg-emerald-500/90 hover:bg-emerald-400 text-white font-body text-sm md:text-base font-semibold px-6 py-2 transition-colors disabled:cursor-not-allowed disabled:bg-emerald-500/40"
                  :disabled="!content.trim()"
                >
                  Save changes
                </button>
              </div>
            </div>
          </form>
        </ScrollArea>
      </div>
    </div>
  </Teleport>
</template>

