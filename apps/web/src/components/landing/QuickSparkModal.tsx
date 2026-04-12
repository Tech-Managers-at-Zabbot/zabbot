"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/GlassCard";
import { X, CheckCircle2, Trophy, ArrowRight, Sparkles } from "lucide-react";

interface QuickSparkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUIZ_QUESTIONS = [
  {
    question: "How do you say 'Hello' (General Greeting) in Yorùbá?",
    options: ["Pẹ̀lẹ́ o", "Báwo ni", "Ẹ kú àárọ̀"],
    correct: 0,
    context: "'Pẹ̀lẹ́ o' is a versatile, respectful way to say hello."
  },
  {
    question: "Which tone mark indicates a 'High' pitch in Yorùbá?",
    options: ["À (Àmì òkè)", "Á (Àmì fúyẹ́)", "A (Standard)"],
    correct: 1,
    context: "The acute accent (´) represents the High tone."
  },
  {
    question: "What is the Yorùbá word for 'Mother'?",
    options: ["Bàbá", "Ìyá", "Ọmọ"],
    correct: 1,
    context: "'Ìyá' means mother; 'Bàbá' means father."
  }
];

export const QuickSparkModal = ({ isOpen, onClose }: QuickSparkModalProps) => {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    setSelectedOption(index);

    if (index === QUIZ_QUESTIONS[step].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelectedOption(null);
      setStep(step + 1);
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#162B6E]/20 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg"
          >
            <GlassCard className="rounded-t-[32px] md:rounded-[32px] border-white/60 min-h-[500px] flex flex-col">
              
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#24A5EE]/10 flex items-center justify-center text-[#24A5EE]">
                    <Sparkles size={16} />
                  </div>
                  <span className="text-[#162B6E] font-bold text-sm tracking-tight">
                    Quick Spark
                  </span>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 hover:bg-black/5 rounded-full transition-colors"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              {/* Quiz Content */}
              <div className="flex-1 flex flex-col justify-center">
                {step < QUIZ_QUESTIONS.length ? (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    <div className="space-y-2 text-center md:text-left">
                      <p className="text-[#24A5EE] font-bold text-xs uppercase tracking-[0.2em]">
                        Challenge {step + 1} of 3
                      </p>
                      <h3 className="text-2xl font-bold text-[#162B6E]">
                        {QUIZ_QUESTIONS[step].question}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {QUIZ_QUESTIONS[step].options.map((option, i) => (
                        <button
                          key={i}
                          onClick={() => handleAnswer(i)}
                          disabled={selectedOption !== null}
                          className={`w-full p-5 text-left rounded-2xl border-2 transition-all font-medium flex justify-between items-center
                            ${
                              selectedOption === i
                                ? i === QUIZ_QUESTIONS[step].correct
                                  ? "border-green-500 bg-green-50 text-green-700"
                                  : "border-red-500 bg-red-50 text-red-700"
                                : "border-white/80 bg-white/60 hover:border-[#24A5EE] text-[#162B6E] shadow-sm"
                            }`}
                        >
                          {option}

                          {selectedOption === i &&
                            i === QUIZ_QUESTIONS[step].correct && (
                              <CheckCircle2 size={20} />
                            )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  /* RESULT & LEAD CAPTURE */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6"
                  >
                    <div className="inline-block p-4 rounded-full bg-yellow-100 text-yellow-600 mb-2">
                      <Trophy size={40} />
                    </div>

                    <h3 className="text-3xl font-bold text-[#162B6E]">
                      Heritage Score: {Math.round((score / 3) * 100)}%
                    </h3>

                    <p className="text-slate-500">
                      You have a natural ear for Yorùbá! Save your progress and
                      start your 7-day free trial to unlock your full Mastery Path.
                    </p>

                    <div className="space-y-3 pt-4">
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full p-5 rounded-2xl border border-white/80 bg-white/80 focus:ring-2 focus:ring-[#24A5EE] outline-none transition-all"
                      />

                      <button
                        onClick={() => {
                          onClose();
                          router.push("/login");
                        }}
                        className="w-full py-5 bg-[#24A5EE] text-white rounded-2xl font-bold shadow-lg shadow-blue-400/30 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                      >
                        Claim My 7-Day Free Trial <ArrowRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};