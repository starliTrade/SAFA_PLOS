import React from 'react';
import { motion } from 'motion/react';
import {
  Moon,
  Bookmark,
  Volume2,
  MapPin,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import { useStateContext } from '../../context/StateContext';
import { SafaCard } from '../../components/ui/SafaCard';
import {
  tapPhysics,
  completionFeedback,
  experienceVariants,
} from '../../theme/interactions';

export const ReflectionExperience: React.FC = () => {
  const { resurfacedMemory, rituals, toggleRitual, dailyIntentions } = useStateContext();
  const eveningRituals = rituals.filter((r) => r.timeOfDay === 'evening');
  const completedIntentionsCount = dailyIntentions.filter((i) => i.completed).length;

  const memories = [
    resurfacedMemory,
    {
      id: 'mem_isfahan_dome',
      title: 'Afternoon Light inside Sheikh Lotfollah Mosque',
      persianTitle: 'نور بعدازظهر در گنبد مسجد شیخ لطف‌الله',
      date: 'April 12, 2025',
      location: 'Naqsh-e Jahan, Isfahan',
      imageUrl:
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
      quote:
        '“The golden spiral does not simply terminate; it dissolves into the infinite light of the apex.”',
      persianQuote: '«مارپیچ طلایی مقرنس‌ها پایان نمی‌پذیرد؛ در روشنایی آسمان حل می‌شود.»',
      audioDuration: '2m 10s',
      tags: ['Isfahan', 'Geometry', 'Architecture'],
    },
    {
      id: 'mem_grand_bazaar_tea',
      title: 'Tea with Master Reza at Silk Passage',
      persianTitle: 'استکان چای با حاج رضا در راسته ابریشم‌فروشان',
      date: 'June 04, 2026',
      location: 'Grand Bazaar, Tehran',
      imageUrl:
        'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      quote: '“A real silk fabric whispers when you fold it against the warp.”',
      persianQuote: '«ابریشم اصل وقتی روی تار و پودش تا می‌خورد، نجوا می‌کند.»',
      audioDuration: '0m 54s',
      tags: ['TehranBazaar', 'Textiles', 'Mentorship'],
    },
  ];

  return (
    <motion.div
      variants={experienceVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6 pb-28 max-w-4xl mx-auto text-left"
    >
      {/* Editorial Evening Header */}
      <div className="space-y-2 border-b border-[#EAE4DC] dark:border-[rgba(250,245,238,0.08)] pb-5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C97D60] dark:text-[#E59B81] bg-[#F7EDE8] dark:bg-[rgba(217,136,108,0.18)] px-2.5 py-0.5 rounded-full border border-[#F0D5C9] dark:border-[rgba(217,136,108,0.3)] inline-flex items-center gap-1.5">
            <Moon size={12} className="text-[#C97D60] dark:text-[#E59B81]" />
            Evening Sanctuary • تامل شبانگاهی
          </span>
          <span className="text-[12px] text-[#9E968D] dark:text-[#7D756C] font-mono">
            09:45 PM
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-editorial font-normal text-[#1E1B18] dark:text-[#FAF5EE] tracking-tight">
          Stillness & Evening Reflection
        </h1>

        <p className="text-[14px] text-[#635E59] dark:text-[#D0C7BC] leading-relaxed max-w-xl">
          Closing the studio day, reviewing your accomplishments, and resting the creative spirit.
        </p>

        <span className="text-[13px] text-[#7D756C] dark:text-[#9E968D] font-persian block" dir="rtl">
          «شب هنگام، زمان بازنگری دستاوردها و آرامش بخشیدن به روح خلاق است.»
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Memory Archive Cards (Left 2 cols) */}
        <div className="md:col-span-2 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-semibold text-[#1E1B18] dark:text-[#FAF5EE] flex items-center gap-2">
              <Bookmark size={15} className="text-[#C97D60] dark:text-[#D9886C]" />
              Resurfaced Sensorial Archive
            </h3>
            <span className="text-[12px] text-[#9E968D] dark:text-[#7D756C]">
              {memories.length} Memories
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {memories.filter(Boolean).map((mem) => (
              <SafaCard
                key={mem!.id}
                variant="elevated"
                isInteractive
                className="overflow-hidden p-0! rounded-[20px] flex flex-col sm:flex-row"
              >
                <div className="sm:w-2/5 relative aspect-[16/10] sm:aspect-auto bg-[#FAF8F5] dark:bg-[#13110F] overflow-hidden shrink-0">
                  <img
                    src={mem!.imageUrl}
                    alt={mem!.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  {mem!.audioDuration && (
                    <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono border border-white/20">
                      <Volume2 size={11} />
                      <span>{mem!.audioDuration}</span>
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 space-y-2.5 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-[#C97D60] dark:text-[#D9886C]">
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {mem!.location}
                      </span>
                      <span className="text-[#9E968D] dark:text-[#7D756C]">{mem!.date}</span>
                    </div>

                    <h4 className="text-[15px] font-semibold text-[#1E1B18] dark:text-[#FAF5EE] leading-snug">
                      {mem!.title}
                    </h4>

                    {mem!.persianTitle && (
                      <span className="text-[12px] text-[#7D756C] dark:text-[#9E968D] font-persian block" dir="rtl">
                        {mem!.persianTitle}
                      </span>
                    )}
                  </div>

                  {mem!.quote && (
                    <p className="text-[12px] text-[#635E59] dark:text-[#D0C7BC] italic bg-[#FAF8F5] dark:bg-[#23201C] p-2.5 rounded-[10px] border border-[#EAE4DC] dark:border-[rgba(250,245,238,0.1)] leading-relaxed">
                      {mem!.quote}
                    </p>
                  )}
                </div>
              </SafaCard>
            ))}
          </div>
        </div>

        {/* Right 1 Column: Daily Synthesis & Evening Rituals */}
        <div className="space-y-5">
          {/* Daily Accomplishment Synthesis */}
          <SafaCard variant="elevated" className="space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9E968D] dark:text-[#7D756C]">
              Day's Studio Harvest
            </span>

            <div className="p-4 rounded-[14px] bg-[#FAF8F5] dark:bg-[#23201C] border border-[#EAE4DC] dark:border-[rgba(250,245,238,0.1)] space-y-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[#635E59] dark:text-[#D0C7BC]">Intentions Completed</span>
                <span className="font-mono font-semibold text-[#5C6F59] dark:text-[#72896E]">
                  {completedIntentionsCount}/{dailyIntentions.length}
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#EAE4DC] dark:bg-[#2C2723] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#5C6F59] dark:bg-[#72896E] rounded-full"
                  style={{
                    width: `${Math.round(
                      (completedIntentionsCount / (dailyIntentions.length || 1)) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>

            <p className="text-[12px] text-[#635E59] dark:text-[#D0C7BC] leading-relaxed">
              Every fold and intention recorded today builds directly into the final thesis defense.
            </p>
          </SafaCard>

          {/* Evening Centering Ritual */}
          <SafaCard variant="elevated" className="space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9E968D] dark:text-[#7D756C] flex items-center gap-1.5">
              <Moon size={13} className="text-[#C97D60] dark:text-[#D9886C]" />
              Evening Centering Rituals
            </span>

            <div className="space-y-2">
              {eveningRituals.map((ritual) => (
                <motion.div
                  key={ritual.id}
                  whileTap={tapPhysics.subtle}
                  onClick={() => toggleRitual(ritual.id)}
                  className={`p-3 rounded-[13px] border flex items-center justify-between transition-colors cursor-pointer select-none ${
                    ritual.completed
                      ? 'bg-[#EEF3EE]/60 dark:bg-[rgba(114,137,110,0.18)] border-[#CDE0CC] dark:border-[rgba(114,137,110,0.3)]'
                      : 'bg-[#FAF8F5] dark:bg-[#23201C] border-[#EAE4DC] dark:border-[rgba(250,245,238,0.1)] hover:border-[#D5CDC2] dark:hover:border-[rgba(250,245,238,0.2)]'
                  }`}
                >
                  <div>
                    <h5
                      className={`text-[12px] font-medium leading-snug ${
                        ritual.completed ? 'line-through text-[#635E59] dark:text-[#7D756C]' : 'text-[#1E1B18] dark:text-[#FAF5EE]'
                      }`}
                    >
                      {ritual.title}
                    </h5>
                    <span className="text-[10px] text-[#7D756C] dark:text-[#9E968D] font-persian block" dir="rtl">
                      {ritual.persianTitle}
                    </span>
                  </div>

                  <motion.button
                    animate={ritual.completed ? completionFeedback.checkmark : { scale: 1 }}
                    className={ritual.completed ? 'text-[#5C6F59] dark:text-[#72896E]' : 'text-[#9E968D] dark:text-[#7D756C]'}
                  >
                    {ritual.completed ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </SafaCard>
        </div>
      </div>
    </motion.div>
  );
};
