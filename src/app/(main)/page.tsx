import React from "react";
import Hero from "./_components/Home/hero";
import Stats from "./_components/Home/stats";
import NewsletterSection from "./_components/Home/newsletter";
import PricingSection from "./_components/Home/pricings";
import ReviewsMarquee from "./_components/Home/reviews";
import StepsSection from "./_components/Home/steps";
import WhyChooseSection from "./_components/Home/whyChoose";

export default function Homepage() {
  return (
    <>
      <Hero />
      <Stats />
      <WhyChooseSection />
      <StepsSection />
      <ReviewsMarquee />
      <PricingSection />
      <NewsletterSection />
    </>
  );
}
