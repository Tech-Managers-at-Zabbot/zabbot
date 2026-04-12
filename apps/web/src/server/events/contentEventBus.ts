type ProgressEvent = {
  stage: string;
  progress: number;
  message?: string;
};

type Listener = (event: ProgressEvent) => void;

class ContentEventBus {
  private listeners: Set<Listener> = new Set();

  emit(event: ProgressEvent) {
    for (const listener of this.listeners) {
      listener(event);
    }
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);

    return () => this.listeners.delete(listener);
  }
}

export const contentEventBus = new ContentEventBus();