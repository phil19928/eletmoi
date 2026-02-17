import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Section({
    children,
    alt = false,
    id,
    className = "",
    curve = false,
    curveColor = "white",
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            id={id}
            className={`relative py-20 sm:py-24 lg:py-28 ${alt ? "bg-primary-very-light/50" : "bg-white"
                } ${className}`}
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                {children}
            </motion.div>

            {curve && (
                <div className="curve-divider">
                    <svg
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        fill={curveColor === "alt" ? "#EAF2FB80" : "#ffffff"}
                    >
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6.01,71.42-16.31,105.56-28.91C957,34.44,1031.36,12.75,1100,21.72c32.35,4.22,63.58,14.68,100,27.53V0Z" />
                    </svg>
                </div>
            )}
        </section>
    );
}
