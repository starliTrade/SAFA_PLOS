import React from 'react';
import { motion } from 'motion/react';
import { Bookmark, MapPin, Calendar, Volume2, Sparkles, Quote, Tag } from 'lucide-react';
import { useStateContext } from '../../context/StateContext';
import { SafaBadge } from '../ui/SafaBadge';
import { transitions } from '../../theme/motion';

export const MemoryArchive: React.FC = () => {
  const { resurfacedMemory } = useStateContext();

  const memories = [
    resurfacedMemory,
    {
      id: 'mem_isfahan_dome',
      title: 'Afternoon Light inside Sheikh Lotfollah Mosque',
      persianTitle: 'نور بعدازظهر در گنبد مسجد شیخ لطف‌الله',
      date: 'April 12, 2025',
      location: 'Naqsh-e Jahan, Isfahan',
      persianLocation: 'میدان نقش جهان، اصفهان',
      imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
      quote: '“The golden spiral does not simply terminate; it dissolves into the infinite light of the apex.”',
      persianQuote: '«مارپیچ طلایی مقرنس‌ها پایان نمی‌پذیرد؛ در روشنایی آسمان حل می‌شود.»',
      audioDuration: '2m 10s',
      tags: ['Isfahan', 'Geometry', 'Architecture', 'Sufi'],
    },
    {
      id: 'mem_grand_bazaar_tea',
      title: 'Tea with Master Reza at Silk Passage',
      persianTitle: 'استکان چای با حاج رضا در راسته ابریشم‌فروشان',
      date: 'June 04, 2026',
      location: 'Grand Bazaar, Tehran',
      persianLocation: 'بازار بزرگ، تهران',
      imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      quote: '“A real silk fabric whispers when you fold it against the warp.”',
      persianQuote: '«ابریشم اصل وقتی روی تار و پودش تا می‌خورد، نجوا می‌کند.»',
      audioDuration: '0m 54s',
      tags: ['TehranBazaar', 'Textiles', 'Silk', 'Mentorship'],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={transitions.easeAtmospheric}
      className="space-y-6 pb-28 max-w-4xl mx-auto text-left"
    >
      {/* Header */}
      <div className="border-b border-[#EAE4DC] pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C97D60] bg-[#F7EDE8] px-2.5 py-0.5 rounded-full border border-[#F0D5C9]">
            Emotional Sanctuary
          </span>
          <span className="text-[13px] text-[#9E968D] font-persian">آرشیو خاطرات و لحظه‌ها</span>
        </div>
        <h1 className="text-3xl font-editorial font-normal text-[#1E1B18]">
          Memory Archive & Resurfaced Moments
        </h1>
        <p className="text-[14px] text-[#635E59] mt-1 leading-relaxed">
          Preserving sensorial journeys, nostalgic atmospheric light, and artistic epiphanies.
        </p>
      </div>

      {/* Memory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {memories.filter(Boolean).map((mem) => (
          <motion.div
            key={mem!.id}
            whileHover={{ y: -3 }}
            transition={transitions.springTactile}
            className="group rounded-[20px] bg-white border border-[#EAE4DC] hover:border-[#DFD8CE] shadow-2xs overflow-hidden flex flex-col justify-between"
          >
            {/* Image */}
            <div className="relative aspect-[16/10] bg-[#FAF8F5] overflow-hidden">
              <img
                src={mem!.imageUrl}
                alt={mem!.title}
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-600 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute top-3 left-3">
                <SafaBadge variant="default" size="sm">
                  {mem!.date}
                </SafaBadge>
              </div>

              {mem!.audioDuration && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono border border-white/20">
                  <Volume2 size={12} />
                  <span>{mem!.audioDuration}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between text-left">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] text-[#C97D60]">
                  <MapPin size={12} />
                  <span>{mem!.location}</span>
                </div>

                <h3 className="text-[17px] font-semibold text-[#1E1B18] tracking-tight group-hover:text-[#C97D60] transition-colors">
                  {mem!.title}
                </h3>

                {mem!.persianTitle && (
                  <span className="text-[13px] text-[#7D756C] font-persian block -mt-0.5" dir="rtl">
                    {mem!.persianTitle}
                  </span>
                )}
              </div>

              {/* Quote block */}
              {mem!.quote && (
                <div className="p-3 rounded-[12px] bg-[#FAF8F5] border border-[#EAE4DC] space-y-1">
                  <p className="text-[12px] text-[#635E59] italic leading-relaxed">
                    {mem!.quote}
                  </p>
                  {mem!.persianQuote && (
                    <p className="text-[11px] text-[#7D756C] font-persian leading-normal" dir="rtl">
                      {mem!.persianQuote}
                    </p>
                  )}
                </div>
              )}

              {/* Tags */}
              <div className="pt-2 border-t border-[#EAE4DC]/60 flex items-center gap-1.5 flex-wrap">
                {mem!.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] text-[#9E968D] bg-[#F6F3EE] px-2 py-0.5 rounded-full border border-[#EAE4DC]"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
