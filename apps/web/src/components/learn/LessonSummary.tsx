"use client";

import { motion } from "framer-motion";
import { Trophy, Star, ArrowRight, Home, RotateCcw } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface LessonSummaryProps {
    xpEarned: number;
    lessonTitle: string;
}

export default function LessonSummary({ xpEarned, lessonTitle }: LessonSummaryProps) {
    return (
        <div className="min-h-screen bg-white dark:bg-dark-bg flex flex-col items-center justify-center px-6 relative overflow-hidden">

            {/* 🎊 Background Decorative Glows */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-10 left-10 w-64 h-64 bg-zabbot-primary rounded-full blur-[100px]" />
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-yellow-400 rounded-full blur-[100px]" />
            </motion.div>

            {/* 🦜 Mascot Celebration Entry */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 100 }}
                className="relative w-48 h-48 mb-6"
            >
                <Image
                    src="/mascot.png"
                    alt="Zabbot Parrot"
                    fill
                    className="object-contain drop-shadow-2xl"
                />
            </motion.div>

            {/* Header Text - Using Yorùbá for immersion */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-10"
            >
                <h1 className="text-4xl font-black text-zabbot-heritage dark:text-white uppercase tracking-tight">
                    Ẹ kú iṣẹ́!
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mt-2">
                    Lesson Complete: <span className="text-zabbot-primary font-bold">{lessonTitle}</span>
                </p>
            </motion.div>

            {/* 📊 Stats Cards */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-12">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white dark:bg-dark-card border-2 border-slate-100 dark:border-dark-border p-6 rounded-3xl text-center shadow-sm"
                >
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 text-yellow-600 dark:text-yellow-400">
                        <Star fill="currentColor" size={24} />
                    </div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Total XP</p>
                    <p className="text-3xl font-black text-zabbot-heritage dark:text-white">+{xpEarned}</p>
                </motion.div>

                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white dark:bg-dark-card border-2 border-slate-100 dark:border-dark-border p-6 rounded-3xl text-center shadow-sm"
                >
                    <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 text-zabbot-primary">
                        <Trophy size={24} />
                    </div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Accuracy</p>
                    <p className="text-3xl font-black text-green-500">100%</p>
                </motion.div>
            </div>

            {/* 🚀 Action Buttons */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col gap-4 w-full max-w-sm"
            >
                <Link href="/dashboard">
                    <button className="group w-full py-5 bg-zabbot-primary hover:brightness-110 text-white rounded-zabbot font-black text-xl shadow-[0_6px_0_#1E3A8A] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-3 uppercase tracking-wider">
                        Continue
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </Link>

                <button
                    onClick={() => window.location.reload()}
                    className="w-full py-4 text-slate-400 hover:text-zabbot-heritage dark:hover:text-white font-bold transition-colors flex items-center justify-center gap-2"
                >
                    <RotateCcw size={18} />
                    Review Lesson
                </button>
            </motion.div>
        </div>
    );
}