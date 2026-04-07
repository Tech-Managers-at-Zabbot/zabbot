"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Zap, Star, Lock } from 'lucide-react';

const FEATURED_ITEMS = [
    {
        id: 1,
        title: "Yoruba for Business",
        description: "Master formal greetings, negotiations, and corporate etiquette in Lagos.",
        price: "500 XP",
        type: "XP Unlock",
        icon: <Zap className="w-6 h-6 text-xp" />,
        tag: "Popular"
    },
    {
        id: 2,
        title: "The Orisha Chronicles",
        description: "Deep dive into Yoruba mythology, history, and spiritual heritage.",
        price: "$4.99",
        type: "Premium Pack",
        icon: <Star className="w-6 h-6 text-heritage-learning" />,
        tag: "New"
    },
    {
        id: 3,
        title: "Lagos Street Slang",
        description: "Understand the local 'Yoruba-English' blend used in daily life.",
        price: "300 XP",
        type: "XP Unlock",
        icon: <ShoppingBag className="w-6 h-6 text-success" />,
        tag: "Trending"
    }
];

export const MarketplacePreview = () => {
    return (
        <section className="py-24 bg-white/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-4xl font-extrabold text-heritage-blue mb-4">
                            Trending in the Marketplace
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl">
                            Use your earned XP to unlock specialized learning paths or upgrade
                            to premium cultural guides.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 text-heritage-learning font-bold hover:underline">
                        View all items <ShoppingBag className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {FEATURED_ITEMS.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 flex flex-col h-full hover:border-heritage-learning/40 transition-colors cursor-pointer group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-heritage-soft rounded-2xl group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <span className="bg-white/50 px-3 py-1 rounded-full text-xs font-bold text-heritage-blue border border-white/20">
                                    {item.tag}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-heritage-blue mb-2">{item.title}</h3>
                            <p className="text-slate-500 mb-8 flex-grow leading-relaxed">{item.description}</p>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                <div>
                                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{item.type}</p>
                                    <p className="text-lg font-extrabold text-heritage-blue">{item.price}</p>
                                </div>
                                <button className="p-2 bg-heritage-soft rounded-lg text-heritage-blue hover:bg-heritage-blue hover:text-white transition-colors">
                                    <Lock className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};