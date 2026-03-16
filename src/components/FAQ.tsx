import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sectionStagger, sectionChild } from "@/lib/motion";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/data/brand";

function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="border-b last:border-b-0"
      style={{ borderColor: "var(--border)" }}
    >
      <button
        className="flex items-center justify-between w-full py-5 text-left cursor-pointer"
        onClick={onToggle}
      >
        <span
          className="text-sm sm:text-base font-medium pr-4"
          style={{ color: "var(--foreground)" }}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="h-4 w-4" style={{ color: "var(--foreground-muted)" }} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p
              className="pb-5 text-sm leading-relaxed pr-8"
              style={{ color: "var(--foreground-muted)" }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.section className="mb-12 sm:mb-16 md:mb-24 lg:mb-32" {...sectionStagger}>
      <motion.div {...sectionChild}>
        <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--primary)" }}>
          // FAQ
        </p>
        <h2 className="mb-8 text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
          Questions investors ask
        </h2>
      </motion.div>

      <motion.div
        {...sectionChild}
        className="rounded-xl border px-4 sm:px-6"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--bg-card)",
        }}
      >
        {faqItems.map((item, i) => (
          <FAQItem
            key={i}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </motion.div>
    </motion.section>
  );
}
