const STORAGE_KEY_SAVED_INSPIRATION = 'sr_events_saved_inspiration_ids';
const STORAGE_EVENT = 'sr_events_inspiration_changed';

export const storageService = {
  getSavedInspirations(): string[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SAVED_INSPIRATION);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn('Could not read saved inspirations from localStorage', e);
      return [];
    }
  },

  isSaved(id: string): boolean {
    const list = this.getSavedInspirations();
    return list.includes(id);
  },

  toggleSavedInspiration(id: string): string[] {
    const list = this.getSavedInspirations();
    let updated: string[];
    if (list.includes(id)) {
      updated = list.filter((item) => item !== id);
    } else {
      updated = [...list, id];
    }

    try {
      localStorage.setItem(STORAGE_KEY_SAVED_INSPIRATION, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: updated }));
    } catch (e) {
      console.warn('Could not save inspirations to localStorage', e);
    }

    return updated;
  },

  clearSavedInspirations(): void {
    try {
      localStorage.removeItem(STORAGE_KEY_SAVED_INSPIRATION);
      window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: [] }));
    } catch (e) {
      console.warn('Could not clear inspirations from localStorage', e);
    }
  },

  subscribe(callback: (savedIds: string[]) => void): () => void {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<string[]>;
      callback(customEvent.detail || []);
    };
    window.addEventListener(STORAGE_EVENT, handler);
    return () => window.removeEventListener(STORAGE_EVENT, handler);
  },
};
