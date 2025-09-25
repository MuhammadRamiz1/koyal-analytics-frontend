"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { HiMusicNote, HiPlay, HiSpeakerphone } from "react-icons/hi";

export default function LoginPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    const icons = Array.from(el.querySelectorAll<HTMLElement>("[data-float]"));
    const phases = icons.map((_, i) => Math.random() * Math.PI * 2);
    const baseY = icons.map((icon) => icon.offsetTop);
    const animate = (t: number) => {
      icons.forEach((icon, i) => {
        const y = Math.sin(t / 900 + phases[i]) * 8;
        const x = Math.cos(t / 1300 + phases[i]) * 6;
        icon.style.transform = `translate(${x}px, ${y}px)`;
      });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <main className="relative min-h-screen grid place-items-center bg-black text-pink-100 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div ref={containerRef} className="absolute inset-0">
          <FloatIcon className="top-10 left-8" Icon={HiMusicNote} />
          <FloatIcon className="top-28 right-10" Icon={HiPlay} />
          <FloatIcon className="bottom-24 left-16" Icon={HiSpeakerphone} />
          <FloatIcon className="bottom-10 right-20" Icon={HiMusicNote} />
        </div>
        <div
          className="absolute -top-24 -left-24 h-[360px] w-[360px] rounded-full blur-3xl opacity-20"
          style={{ background: "var(--pink)" }}
        />
        <div
          className="absolute -bottom-24 -right-24 h-[360px] w-[360px] rounded-full blur-3xl opacity-20"
          style={{ background: "var(--pink)" }}
        />
      </div>

      <div className="relative w-[92%] max-w-md panel p-6 overflow-hidden backdrop-blur shadow-[0_10px_40px_rgba(236,41,123,0.15)]">
        <div className="text-left">
          <div className="h-10 w-10 rounded-full accent-bg ring-2 ring-white/10" />
          <h1 className="mt-4 text-2xl font-semibold heading">Welcome back</h1>
          <p className="mt-1 text-sm subtle">Sign in to your Koyal account</p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs subtle mb-1">Email</label>
            <input
              type="email"
              placeholder="you@koyal.app"
              className="w-full input px-3 py-2 placeholder-pink-300/40 focus:outline-none focus:ring-2"
              required
            />
            <p className="mt-1 text-[11px] text-pink-300">
              Use the email you registered with.
            </p>
          </div>
          <div>
            <label className="block text-xs subtle mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full input px-3 py-2 placeholder-pink-300/40 focus:outline-none focus:ring-2"
              required
            />
            <div className="mt-1 text-[11px] text-pink-300">
              Minimum 8 characters.
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-pink-300">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="accent-bg" />
              <span>Remember me</span>
            </label>
            <a href="#" className="underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full h-10 btn-primary text-white font-medium hover:opacity-90 transition mt-1"
          >
            Sign in
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-pink-300">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}

function FloatIcon({ className, Icon }: { className?: string; Icon: any }) {
  return (
    <div
      data-float
      className={`absolute text-[40px] ${className || ""}`}
      style={{ color: "var(--pink)" }}
    >
      <Icon />
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="panel p-3 text-center">
      <div className="text-xs subtle">{label}</div>
      <div className="text-pink-100 font-semibold">{value}</div>
    </div>
  );
}
