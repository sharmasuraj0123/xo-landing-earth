"use client";

import { useEffect, useState, useRef } from "react";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "Environment isolation",
    description: "Each unit of work runs in its own sandboxed environment.",
    image: "/images/isolated.jpg",
  },
  {
    icon: Lock,
    title: "Encrypted memory",
    description: "Data encrypted at rest and in transit.",
    image: "/images/encrypted.jpg",
  },
  {
    icon: Eye,
    title: "Full audit trails",
    description: "Every action logged and inspectable.",
    image: "/images/audit.jpg",
  },
  {
    icon: FileCheck,
    title: "Permission boundaries",
    description: "Principle of least privilege by design.",
    image: "/images/permissions.jpg",
  },
];

const certifications = ["SOC 2", "ISO 27001", "HIPAA", "GDPR"];

export function SecuritySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % securityFeatures.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="security" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      {/* Full-section background images */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {securityFeatures.map((feature, index) => (
          <div
            key={feature.image}
            className="absolute right-0 top-0 h-full w-[72%] transition-opacity duration-700"
            style={{ opacity: activeFeature === index ? 1 : 0 }}
          >
            <img
              src={feature.image}
              alt=""
              className="h-full w-full object-contain object-right grayscale-[0.55] contrast-[1.05] brightness-[0.96]"
            />
            {/* B&W film tint — light, translucent */}
            <div className="absolute inset-0 bg-[#0a0a0a]/8 mix-blend-multiply" />
            <div className="absolute inset-0 bg-white/[0.03] mix-blend-soft-light" />
          </div>
        ))}
      </div>

      {/* Section gradient — strong on the left, apparent fade to images on the right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, var(--background) 0%, var(--background) 28%, color-mix(in oklch, var(--background) 72%, transparent) 42%, color-mix(in oklch, var(--background) 38%, transparent) 54%, color-mix(in oklch, var(--background) 14%, transparent) 66%, transparent 78%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <span className="w-12 h-px bg-foreground/20" />
            Security
          </span>
          
          {/* Title — full width */}
          <h2 className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Verifiable,
            <br />
            <span className="text-muted-foreground">& Secure.</span>
          </h2>
          
          {/* Description — below title */}
          <div className={`transition-all duration-1000 delay-100 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              RBAC, budget caps, full record before settlement.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Large visual card */}
          <div className={`lg:col-span-7 relative p-8 lg:p-12 border border-foreground/10 bg-background/15 backdrop-blur-[2px] min-h-[400px] overflow-hidden transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <div className="relative z-10">
              <span className="font-mono text-sm text-muted-foreground">Active protection</span>
              <div className="mt-8">
                <span className="text-7xl lg:text-8xl font-display">0</span>
                <span className="block text-muted-foreground mt-2">Security incidents this year</span>
              </div>
            </div>
            
            {/* Certification badges */}
            <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-2">
              {certifications.map((cert, index) => (
                <span
                  key={cert}
                  className={`px-3 py-1 border border-foreground/10 text-xs font-mono text-muted-foreground transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 100 + 300}ms` }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Feature cards stack */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {securityFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 border transition-all duration-500 cursor-default backdrop-blur-[2px] ${
                  activeFeature === index 
                    ? "border-foreground/30 bg-background/25" 
                    : "border-foreground/10 bg-background/10"
                } ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
                style={{ transitionDelay: `${index * 80}ms` }}
                onClick={() => setActiveFeature(index)}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-10 h-10 flex items-center justify-center border transition-colors ${
                    activeFeature === index 
                      ? "border-foreground bg-foreground text-background" 
                      : "border-foreground/20"
                  }`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
