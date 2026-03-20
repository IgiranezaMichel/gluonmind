import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Synthesize a subtle crystalline chime using Web Audio API
async function playCompletionChime(): Promise<boolean> {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (ctx.state === "suspended") {
      await ctx.resume();
    }
    if (ctx.state === "suspended") {
      ctx.close();
      return false;
    }
    const now = ctx.currentTime;

    // Two layered tones for a rich chime
    const frequencies = [880, 1320]; // A5 + E6 (perfect fifth)
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      // Gentle attack, slow decay
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06 - i * 0.015, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2 + i * 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + 1.5 + i * 0.3);
    });

    // Subtle sub-bass thud for weight
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = "sine";
    sub.frequency.setValueAtTime(110, now);
    sub.frequency.exponentialRampToValueAtTime(55, now + 0.3);
    subGain.gain.setValueAtTime(0, now);
    subGain.gain.linearRampToValueAtTime(0.04, now + 0.02);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    sub.connect(subGain);
    subGain.connect(ctx.destination);
    sub.start(now);
    sub.stop(now + 0.6);

    // Cleanup
    setTimeout(() => ctx.close(), 2500);
    return true;
  } catch {
    // Silently fail if AudioContext unavailable
    return false;
  }
}

const Preloader = ({
  onComplete,
  autoHide = true,
}: {
  onComplete?: () => void;
  autoHide?: boolean;
}) => {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const chimePlayed = useRef(false);
  const chimeRequested = useRef(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 2600;
    let raf: number;
    const attemptChime = async () => {
      if (chimePlayed.current) return;
      try {
        // try to play, browser may block without user gesture
        const ok = await playCompletionChime();
        if (ok) {
          chimePlayed.current = true;
          setNeedsGesture(false);
        } else {
          setNeedsGesture(true);
        }
      } catch {
        setNeedsGesture(true);
      }
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / duration);
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      const prog = eased * 100;
      setProgress(prog);

      // Trigger completion effects at 100%
      if (prog >= 99.5 && !chimeRequested.current) {
        chimeRequested.current = true;
        setCompleted(true);
        attemptChime();
        // Haptic feedback if available
        if (navigator.vibrate) navigator.vibrate(30);
      }

      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    let timer: number | undefined;
    if (autoHide) {
      timer = window.setTimeout(() => {
        setShow(false);
        if (onComplete) setTimeout(onComplete, 700);
      }, 3200);
    }

    return () => {
      if (timer) clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [onComplete, autoHide]);

  useEffect(() => {
    if (!needsGesture) return;
    const onFirstGesture = () => {
      if (chimePlayed.current) return;
      playCompletionChime().then((ok) => {
        if (ok) {
          chimePlayed.current = true;
          setNeedsGesture(false);
        }
      });
    };
    window.addEventListener("pointerdown", onFirstGesture, { once: true });
    window.addEventListener("keydown", onFirstGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
    };
  }, [needsGesture]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Ambient glow orbs */}
          <motion.div
            className="absolute w-72 h-72 rounded-full blur-[100px]"
            style={{ background: "radial-gradient(circle, hsla(214, 82%, 55%, 0.15) 0%, transparent 70%)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.8, 1.4], opacity: [0, 0.6, 0.3] }}
            transition={{ duration: 2.5, ease: "easeOut" }}
          />
          <motion.div
            className="absolute w-48 h-48 rounded-full blur-[80px]"
            style={{ background: "radial-gradient(circle, hsla(195, 90%, 60%, 0.1) 0%, transparent 70%)" }}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 2, 1.6], opacity: [0, 0.4, 0.2] }}
            transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
          />

          {/* Main SVG */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <svg
              viewBox="0 0 240 100"
              className="w-72 md:w-96"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="gm-clip">
                  <text
                    x="120"
                    y="72"
                    textAnchor="middle"
                    fontFamily="Space Grotesk, sans-serif"
                    fontWeight="700"
                    fontSize="68"
                    letterSpacing="4"
                  >
                    GM
                  </text>
                </clipPath>

                {/* Water gradient */}
                <linearGradient id="water-main" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="hsl(214, 82%, 50%)" />
                  <stop offset="40%" stopColor="hsl(210, 85%, 55%)" />
                  <stop offset="100%" stopColor="hsl(195, 90%, 62%)" />
                </linearGradient>

                {/* Shimmer gradient */}
                <linearGradient id="water-shimmer" x1="0" y1="1" x2="0.3" y2="0">
                  <stop offset="0%" stopColor="hsl(214, 85%, 55%)" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="hsl(195, 100%, 72%)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(210, 90%, 60%)" stopOpacity="0.1" />
                </linearGradient>

                {/* Surface highlight */}
                <linearGradient id="surface-light" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(195, 100%, 80%)" stopOpacity="0.6" />
                  <stop offset="30%" stopColor="hsl(210, 90%, 65%)" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </linearGradient>

                {/* Glow filter */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Letter outline (subtle) */}
              <text
                x="120"
                y="72"
                textAnchor="middle"
                fontFamily="Space Grotesk, sans-serif"
                fontWeight="700"
                fontSize="68"
                letterSpacing="4"
                fill="none"
                stroke="hsl(213, 25%, 20%)"
                strokeWidth="0.8"
              />

              {/* Water fill clipped to letters */}
              <g clipPath="url(#gm-clip)">
                {/* Main water body */}
                <motion.rect
                  x="0"
                  y="0"
                  width="240"
                  height="100"
                  fill="url(#water-main)"
                  initial={{ y: 100 }}
                  animate={{ y: 100 - progress }}
                />

                {/* Primary wave */}
                <motion.path
                  d="M-60,0 Q-30,-10 0,0 Q30,10 60,0 Q90,-10 120,0 Q150,10 180,0 Q210,-10 240,0 Q270,10 300,0 Q330,-10 360,0 V100 H-60 Z"
                  fill="url(#water-shimmer)"
                  initial={{ y: 100 }}
                  animate={{
                    y: 100 - progress,
                    x: [0, -60, 0],
                  }}
                  transition={{
                    y: { duration: 0 },
                    x: { duration: 3, repeat: Infinity, ease: "linear" },
                  }}
                />

                {/* Secondary wave (offset, slower) */}
                <motion.path
                  d="M-80,0 Q-50,-6 -20,0 Q10,6 40,0 Q70,-6 100,0 Q130,6 160,0 Q190,-6 220,0 Q250,6 280,0 Q310,-6 340,0 V100 H-80 Z"
                  fill="hsla(200, 90%, 65%, 0.15)"
                  initial={{ y: 100 }}
                  animate={{
                    y: 98 - progress,
                    x: [0, -40, 0],
                  }}
                  transition={{
                    y: { duration: 0 },
                    x: { duration: 4, repeat: Infinity, ease: "linear" },
                  }}
                />

                {/* Surface highlight line */}
                <motion.rect
                  x="0"
                  width="240"
                  height="4"
                  fill="url(#surface-light)"
                  initial={{ y: 100 }}
                  animate={{ y: 97 - progress }}
                  transition={{ duration: 0 }}
                />
              </g>

              {/* Glowing outline that appears as fill completes */}
              <motion.text
                x="120"
                y="72"
                textAnchor="middle"
                fontFamily="Space Grotesk, sans-serif"
                fontWeight="700"
                fontSize="68"
                letterSpacing="4"
                fill="none"
                stroke="hsl(214, 82%, 55%)"
                strokeWidth="0.5"
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{ opacity: progress > 80 ? (progress - 80) / 20 : 0 }}
              />
            </svg>
          </motion.div>

          {/* Completion ripple burst */}
          <AnimatePresence>
            {completed && (
              <>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border border-primary/30"
                    initial={{ width: 40, height: 40, opacity: 0.6 }}
                    animate={{
                      width: 300 + i * 80,
                      height: 300 + i * 80,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.15,
                      ease: "easeOut",
                    }}
                  />
                ))}
                {/* Flash */}
                <motion.div
                  className="absolute w-4 h-4 rounded-full bg-primary"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{ filter: "blur(4px)" }}
                />
              </>
            )}
          </AnimatePresence>

          <motion.div
            className="mt-10 w-40 md:w-52 h-[2px] rounded-full overflow-hidden bg-border/30"
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, hsl(214, 82%, 55%), hsl(195, 90%, 65%))",
                boxShadow: "0 0 12px hsl(214, 82%, 55%, 0.5)",
              }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="mt-5 text-xs tracking-[0.3em] uppercase text-muted-foreground/50 font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Intelligence Engineered
          </motion.p>

          {needsGesture && (
            <button
              type="button"
              onClick={() => {
                playCompletionChime().then((ok) => {
                  if (ok) {
                    chimePlayed.current = true;
                    setNeedsGesture(false);
                  }
                });
              }}
              className="mt-4 text-xs uppercase tracking-[0.2em] text-primary border border-primary/40 rounded-full px-4 py-2 hover:bg-primary/10 transition-colors"
            >
              Tap to enable sound
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
