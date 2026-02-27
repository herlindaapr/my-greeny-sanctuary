import { useState } from '#app'

export interface JournalEntry {
  id: number
  title: string
  content: string
  date: string
  createdAt: string
  photoDataUrl?: string
}

export const useJournals = () => {
  const journals = useState<JournalEntry[]>('journals', () => [])

  const addJournal = (entry: Omit<JournalEntry, 'id'>) => {
    const id = Date.now()
    const newEntry: JournalEntry = { id, ...entry }
    journals.value = [newEntry, ...journals.value]
  }

  const updateJournal = (
    id: number,
    updates: Partial<Omit<JournalEntry, 'id' | 'createdAt'>>
  ) => {
    journals.value = journals.value.map((entry) =>
      entry.id === id ? { ...entry, ...updates } : entry
    )
  }

  const deleteJournal = (id: number) => {
    journals.value = journals.value.filter((entry) => entry.id !== id)
  }

  return {
    journals,
    addJournal,
    updateJournal,
    deleteJournal,
  }
}

