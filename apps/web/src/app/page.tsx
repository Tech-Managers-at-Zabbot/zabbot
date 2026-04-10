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
      
      {/* 🌌 GLOBAL BACKGROUND (kept) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="zabbot-blob zabbot-blob-blue" />
        <div className="zabbot-blob zabbot-blob-purple opacity-20" />
      </div>

      {/* 📱 APP-LIKE STACK (NO MORE WEBSITE SPACING) */}
      <div className="relative z-10 flex flex-col gap-16 pb-32">

        {/* 1. HERO (HOOK) */}
        <section className="px-4 pt-6">
          <HeroSection />
        </section>

        {/* 2. COMPARISON (IMMEDIATE DIFFERENTIATION) ✅ */}
        <section className="px-4">
          <ComparisonSection />
        </section>

        {/* 3. PRODUCT IMMERSION */}
        <section className="px-4">
          <DashboardPeek />
        </section>

        {/* 4. FEATURES (NOW CONTEXTUAL) */}
        <section id="features" className="px-4">
          <FeaturesGrid />
        </section>

        {/* 5. SOCIAL PROOF */}
        <section className="px-4">
          <PartnerTicker />
        </section>

        {/* 6. PRICING (DECISION MOMENT) */}
        <section id="pricing" className="px-4">
          <PricingBento />
        </section>

        {/* 7. TRUST (LATE-STAGE ONLY) */}
        <section className="px-4">
          <TeamSection />
        </section>

        {/* 8. FINAL CTA */}
        <section className="px-4 pb-10">
          <FooterCTA />
        </section>
      </div>

      {/* 📱 MOBILE NAV (FLOATING APP CONTROL) */}
      <div className="block md:hidden">
        <MobileNav />
      </div>
    </main>
  );
}