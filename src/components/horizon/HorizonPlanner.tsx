import React from 'react';
import { motion } from 'motion/react';
import { Target, Calendar, CheckCircle2, Circle, Plus, Sparkles, ArrowRight } from 'lucide-react';
import { useStateContext } from '../../context/StateContext';
import { SafaBadge } from '../ui/SafaBadge';
import { SafaButton } from '../ui/SafaButton';
import { transitions } from '../../theme/motion';

export const HorizonPlanner: React.FC = () => {
  const { lifeMilestones } = useStateContext();

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
            Horizon Intentions & Future Milestones
          </span>
          <span className="text-[13px] text-[#9E968D] font-persian">افق آینده و اهداف بلندمدت</span>
        </div>
        <h1 className="text-3xl font-editorial font-normal text-[#1E1B18]">
          Life Horizons & Academic Milestones
        </h1>
        <p className="text-[14px] text-[#635E59] mt-1 leading-relaxed">
          Tracking graduation defense, studio showroom preparation, and long-term creative trajectory.
        </p>
      </div>

      {/* Milestones List */}
      <div className="space-y-4">
        {lifeMilestones.map((milestone) => (
          <div
            key={milestone.id}
            className="p-6 rounded-[20px] bg-white border border-[#EAE4DC] shadow-[0_1px_3px_rgba(30,27,24,0.03),0_4px_14px_rgba(30,27,24,0.04)] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C97D60]">
                    {milestone.category}
                  </span>
                  <SafaBadge variant="active" size="sm">
                    Target: {milestone.targetDate}
                  </SafaBadge>
                </div>
                <h3 className="text-[19px] font-semibold text-[#1E1B18] tracking-tight">
                  {milestone.title}
                </h3>
                {milestone.persianTitle && (
                  <span className="text-[13px] text-[#7D756C] font-persian block" dir="rtl">
                    {milestone.persianTitle}
                  </span>
                )}
              </div>

              <div className="text-right">
                <span className="text-2xl font-mono font-semibold text-[#C97D60]">
                  {milestone.progress}%
                </span>
                <span className="text-[11px] text-[#9E968D] block">Completion</span>
              </div>
            </div>

            {/* Progress Gauge */}
            <div className="w-full h-2 bg-[#FAF8F5] border border-[#EAE4DC] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C97D60] rounded-full transition-all duration-700"
                style={{ width: `${milestone.progress}%` }}
              />
            </div>

            <p className="text-[13px] text-[#635E59] leading-relaxed">
              {milestone.notes}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
