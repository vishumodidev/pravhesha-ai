import type { Memory, MemoryCategory } from '../types';

export class MemoryManager {
  private static memories: Map<string, Memory> = new Map();

  static saveMemory(memory: Memory): void {
    this.memories.set(memory.id, {
      ...memory,
      updatedAt: new Date().toISOString(),
    });
  }

  static updateMemory(id: string, updates: Partial<Memory>): void {
    const existing = this.memories.get(id);
    if (existing) {
      this.memories.set(id, {
        ...existing,
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    }
  }

  static deleteMemory(id: string): boolean {
    return this.memories.delete(id);
  }

  static retrieveMemory(id: string): Memory | undefined {
    return this.memories.get(id);
  }

  static retrieveMemories(userId: string, category?: MemoryCategory): Memory[] {
    const list = Array.from(this.memories.values()).filter((m) => m.userId === userId);
    if (category) {
      return list.filter((m) => m.category === category);
    }
    return list;
  }

  static clear(): void {
    this.memories.clear();
  }
}
