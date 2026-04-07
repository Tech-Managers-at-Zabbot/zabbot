"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import Image from "next/image";

const team = [
  {
    name: "Bola Agbonile",
    role: "Founder & Product Lead",
    bio: "Visionary leader bridging heritage and future technology.",
    img: "https://res.cloudinary.com/dgotesgcy/image/upload/l2geidnazjmijfbsovzz.svg",
    linkedin: "https://linkedin.com/in/bolaagbonile/",
  },
  {
    name: "Erete Charles",
    role: "Software Engineer",
    bio: "Architecting high-performance systems and seamless integrations.",
    img: "https://res.cloudinary.com/dgotesgcy/image/upload/jlxuq2lx8nn3zqtlrtpx.jpg",
    linkedin: "https://linkedin.com/in/eretecharles/",
  },
  {
    name: "Kemi Sobande",
    role: "Cultural & Language Content Consultant",
    bio: "Ensuring cultural and tonal authenticity across experiences.",
    img: "https://res.cloudinary.com/dgotesgcy/image/upload/t39hjuirrhn3uocieib5.jpg",
    linkedin: "#",
  },
  {
    name: "Iniobong Ekpenyong",
    role: "UI/UX Lead",
    bio: "Designing immersive and emotionally resonant interfaces.",
    img: "https://res.cloudinary.com/dgotesgcy/image/upload/zmifkwsbiftruxoqrps6.svg",
    linkedin: "https://www.linkedin.com/in/iniobong-ekpenyong-b5234322b/",
  },
];

export default function TeamSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <p className="text-[#24A5EE] text-[10px] font-black uppercase tracking-[0.2em]">
            The Team
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#162B6E] mt-2">
            Meet the <span className="text-[#24A5EE]">Builders</span>
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative"
            >

              {/* IMAGE CARD */}
              <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-black">

                {/* IMAGE */}
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition duration-700"
                    unoptimized
                  />
                </motion.div>

                {/* TOP RIGHT LINKEDIN ICON */}
                <motion.a
                  href={member.linkedin}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-3 right-3 z-20 w-9 h-9 rounded-xl 
                  bg-white/20 backdrop-blur-md border border-white/30 
                  flex items-center justify-center text-white 
                  hover:bg-[#24A5EE] transition-all duration-300"
                >
                  <Linkedin size={16} />
                </motion.a>

                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#162B6E]/90 via-[#162B6E]/20 to-transparent" />

                {/* NAME + ROLE */}
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <h3 className="font-bold text-sm leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-white/70">
                    {member.role}
                  </p>
                </div>

                {/* HOVER PANEL */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-[#162B6E]/85 backdrop-blur-md flex flex-col justify-end p-4"
                >
                  <p className="text-xs text-white/80 leading-relaxed">
                    {member.bio}
                  </p>
                </motion.div>

                {/* GLOW */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[#24A5EE]/10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}