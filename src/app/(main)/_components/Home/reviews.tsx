"use client";

import Marquee from "react-fast-marquee";
import { Star } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Marcus Reid",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/100?img=12",
    quote:
      "The whole process gave me so much confidence. I knew exactly what I was getting into — the most transparent rental experience ever.",
  },
  {
    name: "Elena Vasquez",
    role: "Product Manager",
    avatar: "https://i.pravatar.cc/100?img=5",
    quote:
      "I've moved three times in the last five years, and this was by far the easiest. The concierge service is a lifesaver!",
  },
  {
    name: "Sarah Jenkins",
    role: "UX Designer",
    avatar: "https://i.pravatar.cc/100?img=32",
    quote:
      "Finding an apartment in a new city used to be a nightmare. Person Name made it feel like I was just booking a hotel — seamless, transparent, and high quality.",
  },
  {
    name: "David Okafor",
    role: "Data Analyst",
    avatar: "https://i.pravatar.cc/100?img=51",
    quote:
      "Verification badges made all the difference. I never once worried about a listing being fake or misleading.",
  },
  {
    name: "Priya Nair",
    role: "Marketing Lead",
    avatar: "https://i.pravatar.cc/100?img=47",
    quote:
      "Customer support responded within minutes, every single time. That kind of reliability is rare these days.",
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-96 shrink-0 bg-white rounded-2xl shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] p-6 mx-3">
      <div className="flex items-center gap-3 mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-11 h-11 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-sm text-[#0b1c30]">
            {testimonial.name}
          </p>
          <p className="text-xs text-[#515f74]">{testimonial.role}</p>
        </div>
      </div>

      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className="fill-[#006c49] text-[#006c49]" />
        ))}
      </div>

      <p className="min-h-24 text-sm text-[#515f74] italic leading-relaxed">
        {`"${testimonial.quote}"`}
      </p>
    </div>
  );
}

export default function ReviewsMarquee() {
  return (
    <section className="w-full bg-[#eff4ff] py-16 mb-20">
      <div className="px-4 md:px-12 mb-10">
        <h2 className="font-bold text-2xl md:text-3xl text-[#0b1c30]">
          What Our Community Says
        </h2>
      </div>

      <Marquee pauseOnHover gradient={false} speed={40}>
        {testimonials.map((t) => (
          <TestimonialCard key={t.name} testimonial={t} />
        ))}
      </Marquee>
    </section>
  );
}