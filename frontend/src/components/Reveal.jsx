import { motion } from "motion/react";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  duration = 0.65,
  once = true,
  trigger = "view",
}) {
  const animationProps =
    trigger === "mount"
      ? {
        initial: { opacity: 0, y },
        animate: { opacity: 1, y: 0 },
      }
      : {
        initial: { opacity: 0, y },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once, amount: 0.18 },
      };

  return (
    <motion.div
      className={className}
      {...animationProps}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}