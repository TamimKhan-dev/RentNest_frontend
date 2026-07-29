import React from 'react'
import Hero from './_components/Home/hero'
import Stats from './_components/Home/stats'
import NewsletterSection from './_components/Home/newsletter'
import PricingSection from './_components/Home/pricings'

export default function Homepage() {
  return (
    <>
    <Hero/>
    <Stats />
    <PricingSection />
    <NewsletterSection />
    </>
  )
}
