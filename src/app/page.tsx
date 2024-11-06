'use client'
import * as motion from "framer-motion/client"
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const sectionHeight = window.innerHeight;
      const currentScroll = container.scrollTop;

      if (event.key === "ArrowDown") {
        container.scrollTo({
          top: currentScroll + sectionHeight,
          behavior: "smooth",
        });
      } else if (event.key === "ArrowUp") {
        container.scrollTo({
          top: currentScroll - sectionHeight,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="scroll-container snap-y snap-mandatory h-screen overflow-y-scroll">
      <motion.div
        id="session-one"
        className="h-screen snap-start flex"
        initial="hidden"
        animate="visible"
        variants={scrollVariants}
      >
        <h1 className="text-3xl">Sessão 1</h1>
        <Link href="#session-two">session two</Link>
      </motion.div>
      <motion.div
        id="session-two"
        className="h-screen snap-start flex"
        initial="hidden"
        animate="visible"
        variants={scrollVariants}
      >
        <h1 className="text-3xl">Sessão 2</h1>
      </motion.div>
      <motion.div
        id="session-three"
        className="h-screen snap-start flex"
        initial="hidden"
        animate="visible"
        variants={scrollVariants}
      >
        <h1 className="text-3xl">Sessão 3</h1>
      </motion.div>
    </div>
  );
}
