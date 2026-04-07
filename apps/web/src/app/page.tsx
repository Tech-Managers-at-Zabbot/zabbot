"use client";

import React from "react";
import LandingHeader from "@/components/layout/LandingHeader";
import MobileNav from "@/components/layout/MobileNav";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import PartnerTicker from "@/components/landing/PartnerTicker";
import ComparisonSection from "@/components/landing/ComparisonSection";
import DashboardPeek from "@/components/landing/DashboardPeek";
import TeamSection from "@/components/landing/TeamSection";
import PricingBento from "@/components/landing/PricingBento";
import FooterCTA from "@/components/landing/FooterCTA";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-[#EFF6FF] selection:bg-[#24A5EE]/30">
      {/* 1. NAVIGATION LAYER */}
      <LandingHeader />
      <MobileNav />

      {/* 2. GLOBAL FLUID BACKGROUND */}
      <div className="fluid-bg-container fixed inset-0 pointer-events-none">
        <div 
          className="fluid-blob w-[500px] h-[500px] bg-[#24A5EE]/15 top-[-10%] left-[-10%]" 
          style={{ animationDelay: '0s' }}
        />
        <div 
          className="fluid-blob w-[600px] h-[600px] bg-[#162B6E]/5 top-[40%] left-[20%]" 
          style={{ animationDelay: '-10s' }}
        />
      </div>

      {/* 3. CONTENT STACK */}
      <div className="relative z-10">
        
        {/* THE HOOK: Hero Section */}
        <HeroSection />

        {/* THE VALUE: Core features grid */}
        <div id="features" className="relative z-20">
          <FeaturesGrid />
        </div>

        {/* 🚀 THE AUTHORITY: Partner Ticker 
            Placement here acts as a "Trust Bridge" between 
            explaining the features and comparing with competitors.
        */}
        <PartnerTicker />

        {/* THE CONTEXT: Why Zabbot is the better choice */}
        <ComparisonSection />

        {/* THE PROOF: A peek into the actual app dashboard */}
        <DashboardPeek />

        {/* THE PEOPLE: Meet the Custodians */}
        <TeamSection />

        {/* THE TRANSACTION: Pricing and Plans */}
        <div id="pricing" className="relative z-20">
          <PricingBento />
        </div>

        {/* THE FINAL PUSH: Footer CTA */}
        <FooterCTA />
        
      </div>
    </main>
  );
}