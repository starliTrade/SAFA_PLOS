import React from 'react';
import { motion } from 'motion/react';
import { useStateContext } from '../../context/StateContext';
import { SafaBadge } from '../ui/SafaBadge';
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
      <div className="border-b border-[#EAE4DC] dark:border-[rgba(250,245,238,0.08)] pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C97D60] dark:text-[#E59B81] bg-[#F7EDE8] dark:bg-[rgba(217,136,108,0.18)] px-2.5 py-0.5 rounded-full border border-[#F0D5C9] dark:border-[rgba(217,136,108,0.3)]">
            Horizon Intentions & Future Milestones
          </span>
          <span className="text-[13px] text-[#9E968D] dark:text-[#7D756C] font-persian">افق آینده و اهداف بلندمدت</span>
        </div>
        <h1 className="text-3xl font-editorial font-normal text-[#1E1B18] dark:text-[#FAF5EE]">
          Life Horizons & Academic Milestones
        </h1>
        <p className="text-[14px] text-[#635E59] dark:text-[#D0C7BC] mt-1 leading-relaxed">
          Tracking graduation defense, studio showroom preparation, and long-term creative trajectory.
        </p>
      </div>

      {/* Milestones List */}
      <div className="space-y-4">
        {lifeMilestones.map((milestone) => (
          <div
            key={milestone.id}
            className="p-6 rounded-[20px] bg-white dark:bg-[#191614] border border-[#EAE4DC] dark:border-[rgba(250,245,238,0.1)] shadow-[0_1px_3px_rgba(30,27,24,0.03),0_4px_14px_rgba(30,27,24,0.04)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.5)] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C97D60] dark:text-[#E59B81]">
                    {milestone.category}
                  </span>
                  <SafaBadge variant="active" size="sm">
                    Target: {milestone.targetDate}
                  </SafaBadge>
                </div>
                <h3 className="text-[19px] font-semibold text-[#1E1B18] dark:text-[#FAF5EE] tracking-tight">
                  {milestone.title}
                </h3>
                {milestone.persianTitle && (
                  <span className="text-[13px] text-[#7D756C] dark:text-[#9E968D] font-persian block" dir="rtl">
                    {milestone.persianTitle}
                  </span>
                )}
              </div>

              <div className="text-right">
                <span className="text-2xl font-mono font-semibold text-[#C97D60] dark:text-[#D9886C]">
                  {milestone.progress}%
                </span>
                <span className="text-[11px] text-[#9E968D] dark:text-[#7D756C] block">Completion</span>
              </div>
            </div>

            {/* Progress Gauge */}
            <div className="w-full h-2 bg-[#FAF8F5] dark:bg-[#23201C] border border-[#EAE4DC] dark:border-[rgba(250,245,238,0.08)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C97D60] dark:bg-[#D9886C] rounded-full transition-all duration-700"
                style={{ width: `${milestone.progress}%` }}
              />
            </div>

            <p className="text-[13px] text-[#635E59] dark:text-[#D0C7BC] leading-relaxed">
              {milestone.notes}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
