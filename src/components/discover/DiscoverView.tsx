import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Compass,
  MapPin,
  ExternalLink,
  Plus,
  Pin,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useStateContext } from '../../context/StateContext';
import { useNavigation } from '../../navigation/NavigationContext';
import {
  PageHeader,
  Section,
  Badge,
  SegmentedControl,
} from '../primitives';
import { transitions } from '../../theme/motion';

interface CulturalStudy {
  id: string;
  title: string;
  persianTitle: string;
  location: string;
  persianLocation: string;
  period: string;
  category: 'architecture' | 'textiles' | 'calligraphy' | 'nature';
  description: string;
  persianDescription: string;
  imageUrl: string;
  silhouetteApplication: string;
  colorHexes: string[];
}

const SEED_CULTURAL_STUDIES: CulturalStudy[] = [
  {
    id: 'study-1',
    title: 'Isfahan Sheikh Lotfollah Dome',
    persianTitle: 'گنبد مسجد شیخ لطف‌الله اصفهان',
    location: 'Isfahan, Iran',
    persianLocation: 'اصفهان',
    period: 'Safavid Era (1619 CE)',
    category: 'architecture',
    description: 'Golden spiral peacock ceiling geometry with transitioning natural sunlight, inspiring concentric circular bias cuts and pleating matrices.',
    persianDescription: 'هندسه حلزونی و پر طاووسی سقف گنبد با نورپردازی طبیعی متغیر.',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    silhouetteApplication: 'Radial sunray micro-pleats with subtle golden organza layering',
    colorHexes: ['#DFC065', '#2A4B56', '#FAF5EE', '#C97D60'],
  },
  {
    id: 'study-2',
    title: 'Yazd Windcatchers & Desert Courtyards',
    persianTitle: 'بادگیرها و حیاط‌های کویری یزد',
    location: 'Yazd, Iran',
    persianLocation: 'یزد',
    period: 'Vernacular Earth Architecture',
    category: 'architecture',
    description: 'Passive thermodynamic airflow shafts and sun-baked clay textures; direct inspiration for ventilated boxy jackets and breathable double-gauze outerwear.',
    persianDescription: 'کانال‌های تهویه طبیعی و بافت خشت خام کویری.',
    imageUrl: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=1200&q=80',
    silhouetteApplication: 'Voluminous linen outerwear with open-slotted breathable back vents',
    colorHexes: ['#C4A482', '#A67B5B', '#FAF8F5', '#3E2723'],
  },
  {
    id: 'study-3',
    title: 'Nomadic Qashqai Wool Dyeing & Weaves',
    persianTitle: 'رنگرزی گیاهی و دستبافته‌های قشقایی',
    location: 'Fars Province',
    persianLocation: 'فارس',
    period: 'Tribal Artisanal Tradition',
    category: 'textiles',
    description: 'Natural madder root terracotta, walnut husk charcoal, and pomegranate rind pigments hand-spun on drop spindles.',
    persianDescription: 'رنگرزی طبیعی با روناس، پوست گردو و پوست انار بر روی پشم دست‌ریس.',
    imageUrl: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80',
    silhouetteApplication: 'Raw selvage hem draping with vegetable-dyed terracotta accents',
    colorHexes: ['#C97D60', '#5C6F59', '#1E1B18', '#D4AF37'],
  },
  {
    id: 'study-4',
    title: 'Persian Miniature Flow & Nastaliq Curves',
    persianTitle: 'پیچش نگارگری و خط نستعلیق',
    location: 'Tabriz School',
    persianLocation: 'تبریز',
    period: 'Timurid & Safavid Calligraphy',
    category: 'calligraphy',
    description: 'Fluid continuous stroke curvature mirroring dynamic kimono-sleeve drapes and asymmetrical silk scarves.',
    persianDescription: 'انحنای سیال خط و نگارگری در جریان آستین‌های کیمونو و شال‌های ابریشمی.',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    silhouetteApplication: 'Continuous fluid seamlines flowing from neckline down to hem',
    colorHexes: ['#1E1B18', '#FAF5EE', '#5C6F59'],
  },
];

export const DiscoverView: React.FC = () => {
  const { navigateToDomain } = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'architecture' | 'textiles' | 'calligraphy'>('all');

  const filtered = SEED_CULTURAL_STUDIES.filter(
    (s) => selectedFilter === 'all' || s.category === selectedFilter
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={transitions.easeAtmospheric}
      className="space-y-6 text-left"
    >
      {/* 1. Header */}
      <PageHeader
        eyebrow="Discovery • Heritage Research"
        persianEyebrow="پژوهش و کاوش میراث"
        title="Cultural & Architectural Studies"
        persianTitle="مطالعات معماری و هویت ایرانی"
        description="Deep archival research connecting Iranian architectural geometries with contemporary fashion silhouettes."
        actions={
          <SegmentedControl
            items={[
              { id: 'all', label: 'All Studies' },
              { id: 'architecture', label: 'Architecture' },
              { id: 'textiles', label: 'Textiles' },
              { id: 'calligraphy', label: 'Calligraphy' },
            ]}
            activeId={selectedFilter}
            onChange={setSelectedFilter}
          />
        }
      />

      {/* 2. Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((study) => (
          <div
            key={study.id}
            className="rounded-xl border border-[var(--safa-border-subtle)] bg-[var(--safa-bg-surface)] overflow-hidden flex flex-col hover:border-[var(--safa-border-default)] transition-colors"
          >
            {/* Image Banner */}
            <div className="h-48 sm:h-52 w-full overflow-hidden relative bg-[var(--safa-bg-surface-subtle)]">
              <img
                src={study.imageUrl}
                alt={study.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="primary" size="xs">
                  {study.period}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Badge variant="default" size="xs">
                  <MapPin size={10} />
                  {study.location}
                </Badge>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-[16px] font-semibold text-[var(--safa-content-primary)]">
                    {study.title}
                  </h3>
                  <span className="font-persian text-[13px] text-[var(--safa-content-tertiary)]" dir="rtl">
                    {study.persianTitle}
                  </span>
                </div>

                <p className="text-[13px] text-[var(--safa-content-secondary)] leading-relaxed">
                  {study.description}
                </p>

                <div className="p-2.5 rounded-lg bg-[var(--safa-bg-surface-subtle)] text-[12px] text-[var(--safa-content-primary)] space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--safa-accent-primary)] block">
                    Silhoutte Translation
                  </span>
                  <p>{study.silhouetteApplication}</p>
                </div>
              </div>

              {/* Color Matrix + Action */}
              <div className="flex items-center justify-between pt-2 border-t border-[var(--safa-border-subtle)]">
                <div className="flex items-center gap-1.5">
                  {study.colorHexes.map((hex, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full border border-[var(--safa-border-subtle)]"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                </div>

                <button
                  onClick={() => navigateToDomain('create')}
                  className="text-[12px] text-[var(--safa-accent-primary)] font-medium flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Use in Atelier</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
