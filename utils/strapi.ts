export interface StrapiJournalPayload {
  title: string
  content: string
  date: string
  createdAt: string
  photoDataUrl?: string
}

const STRAPI_BASE_URL =
  (globalThis as any).process?.env?.STRAPI_BASE_URL || 'http://localhost:1337/api'

export async function createStrapiJournal(
  payload: StrapiJournalPayload
): Promise<void> {
  try {
    await fetch(`${STRAPI_BASE_URL}/journals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: payload }),
    })
  } catch (error) {
    // Silent fail when Strapi is not configured yet
    console.warn(
      '[Strapi] Failed to create journal. Configure STRAPI_BASE_URL and your content type when backend is ready.',
      error
    )
  }
}

