"use client";

import Image from "next/image";

const testimonials = [
  {
    name: "James Chen",
    role: "Junior Developer @ Vercel",
    content: "Devspace turned my first week at Vercel from a nightmare into a breeze. I understood the data flow in hours instead of weeks.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  },
  {
    name: "Sarah Miller",
    role: "Software Engineer @ Stripe",
    content: "The AI doesn't just explain code; it explains intent. It's like having a senior engineer sitting right next to me 24/7.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  },
  {
    name: "Alex Rivera",
    role: "Frontend Lead @ Figma",
    content: "We use Devspace to onboard all our new hires now. It cut our ramp-up time by almost 60% across the board.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#0a0a0b]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-[#e5e2e3] sm:text-4xl">
            Trusted by developers <span className="text-[#ffb783]">everywhere</span>
          </h2>
          <p className="mt-4 text-[#908fa0]">
            See how Devspace is helping developers master complex codebases and accelerate their careers.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl border border-[#262626] bg-[#131314]/30 flex flex-col transition-all hover:bg-[#131314]/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-10 overflow-hidden rounded-full border border-[#262626]">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="h-full w-full object-cover grayscale"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#e5e2e3]">{testimonial.name}</h4>
                  <p className="text-xs text-[#908fa0]">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-[#908fa0] italic leading-relaxed">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
