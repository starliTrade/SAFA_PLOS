import {
  FashionProject,
  InspirationItem,
  Design,
  Memory,
  LifeMilestone,
  RitualMoment,
} from '../types';
import { SearchResultItem } from './searchTypes';

export interface SearchableDataSources {
  fashionProjects: FashionProject[];
  inspirationItems: InspirationItem[];
  designs: Design[];
  resurfacedMemory?: Memory | null;
  lifeMilestones: LifeMilestone[];
  rituals: RitualMoment[];
}

export function performGlobalSearch(
  query: string,
  sources: SearchableDataSources
): SearchResultItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResultItem[] = [];

  // 1. Projects
  sources.fashionProjects.forEach((p) => {
    let score = 0;
    if (p.title.toLowerCase().includes(q)) score += 10;
    if (p.persianTitle?.includes(q)) score += 10;
    if (p.concept.toLowerCase().includes(q)) score += 5;
    if (p.season.toLowerCase().includes(q)) score += 4;
    if (p.notes.toLowerCase().includes(q)) score += 3;

    if (score > 0) {
      results.push({
        id: p.id,
        type: 'project',
        title: p.title,
        persianTitle: p.persianTitle,
        subtitle: `Collection Capsule • ${p.season} (${p.status})`,
        description: p.concept,
        domain: 'atelier',
        experience: 'creative',
        projectId: p.id,
        score,
      });
    }
  });

  // 2. Inspiration Items
  sources.inspirationItems.forEach((item) => {
    let score = 0;
    if (item.title.toLowerCase().includes(q)) score += 10;
    if (item.persianTitle?.includes(q)) score += 10;
    if (item.notes.toLowerCase().includes(q)) score += 5;
    if (item.category.toLowerCase().includes(q)) score += 5;
    if (item.source.toLowerCase().includes(q)) score += 4;
    item.tags?.forEach((t: string) => {
      if (t.toLowerCase().includes(q)) score += 6;
    });

    if (score > 0) {
      results.push({
        id: item.id,
        type: 'inspiration',
        title: item.title,
        persianTitle: item.persianTitle,
        subtitle: `Inspiration • ${item.category} (${item.source || 'Sensorial'})`,
        description: item.notes,
        category: item.category,
        domain: 'discovery',
        experience: 'discovery',
        score,
      });
    }
  });

  // 3. Designs / Lookbook Silhouettes
  sources.designs.forEach((d) => {
    let score = 0;
    if (d.title.toLowerCase().includes(q)) score += 10;
    if (d.persianTitle?.includes(q)) score += 10;
    if (d.description.toLowerCase().includes(q)) score += 5;
    if (d.silhouetteType.toLowerCase().includes(q)) score += 6;
    if (d.notes.toLowerCase().includes(q)) score += 4;

    if (score > 0) {
      results.push({
        id: d.id,
        type: 'design',
        title: d.title,
        persianTitle: d.persianTitle,
        subtitle: `Design Look • ${d.silhouetteType} (${d.status})`,
        description: d.description,
        domain: 'atelier',
        experience: 'creative',
        projectId: d.projectId,
        designId: d.id,
        score,
      });
    }
  });

  // 4. Resurfaced Memory
  if (sources.resurfacedMemory) {
    const mem = sources.resurfacedMemory;
    let score = 0;
    if (mem.title.toLowerCase().includes(q)) score += 10;
    if (mem.persianTitle?.includes(q)) score += 10;
    if (mem.location.toLowerCase().includes(q)) score += 6;
    if (mem.quote?.toLowerCase().includes(q)) score += 4;
    mem.tags?.forEach((t: string) => {
      if (t.toLowerCase().includes(q)) score += 6;
    });

    if (score > 0) {
      results.push({
        id: mem.id,
        type: 'memory',
        title: mem.title,
        persianTitle: mem.persianTitle,
        subtitle: `Memory Archive • ${mem.location}`,
        description: mem.quote,
        domain: 'memory',
        experience: 'reflection',
        score,
      });
    }
  }

  // 5. Life Milestones / Horizons
  sources.lifeMilestones.forEach((m) => {
    let score = 0;
    if (m.title.toLowerCase().includes(q)) score += 10;
    if (m.persianTitle?.includes(q)) score += 10;
    if (m.category.toLowerCase().includes(q)) score += 5;
    if (m.notes?.toLowerCase().includes(q)) score += 3;

    if (score > 0) {
      results.push({
        id: m.id,
        type: 'goal',
        title: m.title,
        persianTitle: m.persianTitle,
        subtitle: `Horizon Milestone • Target: ${m.targetDate} (${m.progress}%)`,
        domain: 'horizon',
        experience: 'morning',
        score,
      });
    }
  });

  // 6. Rituals
  sources.rituals.forEach((r) => {
    let score = 0;
    if (r.title.toLowerCase().includes(q)) score += 10;
    if (r.persianTitle?.includes(q)) score += 10;
    if (r.timeOfDay.toLowerCase().includes(q)) score += 4;

    if (score > 0) {
      results.push({
        id: r.id,
        type: 'ritual',
        title: r.title,
        persianTitle: r.persianTitle,
        subtitle: `Sanctuary Ritual • ${r.timeOfDay}`,
        domain: r.timeOfDay === 'morning' ? 'sanctuary' : 'memory',
        experience: r.timeOfDay === 'morning' ? 'morning' : 'reflection',
        score,
      });
    }
  });

  return results.sort((a, b) => b.score - a.score);
}
