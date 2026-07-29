"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewsletterSection() {
  return (
    <section className="w-full bg-[#f8f9ff] px-4 md:px-12 py-12">
      <div className="max-w-225 mx-auto bg-[#dcf3ec] rounded-3xl px-6 md:px-16 py-12 text-center">
        <h2 className="font-bold text-3xl md:text-4xl text-[#0b1c30] mb-3">
          Stay Updated
        </h2>
        <p className="text-sm md:text-base text-[#515f74] max-w-md mx-auto mb-8">
          Subscribe to our newsletter to receive curated property collections
          and exclusive rental guides.
        </p>

        <form
          className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="h-auto py-3 px-4 rounded-full border-transparent bg-white focus-visible:ring-4 focus-visible:ring-[#10b981]/20"
          />
          <Button
            type="submit"
            className="w-full sm:w-auto bg-[#006c49] hover:bg-[#006c49]/90 text-white font-semibold px-6 py-3 h-auto rounded-full whitespace-nowrap cursor-pointer"
          >
            Subscribe
          </Button>
        </form>

        <p className="text-xs text-[#515f74] mt-4">
          No spam. Only curated content. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}