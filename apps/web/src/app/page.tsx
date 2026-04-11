"use client";

import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import PartnerTicker from "@/components/landing/PartnerTicker";
import ComparisonSection from "@/components/landing/ComparisonSection";
import DashboardPeek from "@/components/landing/DashboardPeek";
import TeamSection from "@/components/landing/TeamSection";
import PricingBento from "@/components/landing/PricingBento";
import FooterCTA from "@/components/landing/FooterCTA";
import MobileNav from "@/components/layout/MobileNav";

export default function LandingPage() {
  return (
    <main className="relative selection:bg-zabbot-primary/30 overflow-x-hidden">
      
      {/* 🌌 GLOBAL BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="zabbot-blob zabbot-blob-blue" />
        <div className="zabbot-blob zabbot-blob-purple opacity-20" />
      </div>

      {/* 📱 APP-LIKE FLOW */}
      <div className="relative z-10 flex flex-col pb-32">

        {/* 1. HERO (FLUSH TO TOP) */}
        <HeroSection />

        {/* 2. CONTENT FLOW */}
        <div className="flex flex-col gap-24 mt-16">

          {/* 🔥 DIFFERENTIATION */}
          <section className="px-4">
            <ComparisonSection />
          </section>

          {/* 🧠 PRODUCT IMMERSION */}
          <section className="px-4">
            <DashboardPeek />
          </section>

          {/* ⚡ FEATURES */}
          <section id="features" className="px-4">
            <FeaturesGrid />
          </section>

          {/* 🌍 SOCIAL PROOF */}
          <section className="px-4">
            <PartnerTicker />
          </section>

          {/* 💰 PRICING */}
          <section id="pricing" className="px-4">
            <PricingBento />
          </section>

          {/* 👥 TEAM / TRUST */}
          <section className="px-4">
            <TeamSection />
          </section>

          {/* 🚀 FINAL CTA */}
          <section className="px-4 pb-10">
            <FooterCTA />
          </section>

        </div>
      </div>

      {/* 📱 MOBILE NAV */}
      <div className="block md:hidden">
        <MobileNav />
      </div>
    </main>
  );
}