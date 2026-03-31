import { motion } from "framer-motion";

export default function PhoneMockup({ image, alt = "", className = "" }) {
    return (
        <div className={`relative mx-auto ${className}`} style={{ width: 280 }}>
            {/* Glow ring behind the phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[620px] rounded-[3rem] bg-gradient-to-br from-primary via-primary-light to-cyan-300 opacity-30 blur-2xl glow-pulse pointer-events-none" />

            {/* Phone frame */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="relative rounded-[2.5rem] border-[5px] border-slate-800 bg-slate-900 shadow-2xl shadow-slate-900/40 overflow-hidden"
            >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-800 rounded-b-2xl z-10" />

                {/* Status bar dots */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-20">
                    <div className="w-2 h-2 rounded-full bg-slate-600" />
                </div>

                {/* Screen */}
                <div className="relative aspect-[9/19.5] rounded-[2rem] overflow-hidden bg-gradient-to-br from-primary-very-light via-white to-primary-light/20">
                    {image ? (
                        <img
                            src={image}
                            alt={alt}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-8 p-8">
                            {/* Fake app UI elements */}
                            <div className="w-full space-y-3">
                                <div className="w-24 h-2.5 rounded-full bg-primary/20 mx-auto" />
                                <div className="w-16 h-2 rounded-full bg-primary/10 mx-auto" />
                            </div>

                            {/* Timer circle */}
                            <div className="relative">
                                <svg width="120" height="120" viewBox="0 0 120 120">
                                    <circle cx="60" cy="60" r="52" fill="none" stroke="#EAF2FB" strokeWidth="6" />
                                    <motion.circle
                                        cx="60" cy="60" r="52" fill="none" stroke="#6D98C2" strokeWidth="6"
                                        strokeLinecap="round"
                                        strokeDasharray="327"
                                        initial={{ strokeDashoffset: 327 }}
                                        animate={{ strokeDashoffset: 80 }}
                                        transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                                        style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold text-slate-800">20</span>
                                    <span className="text-xs text-slate-400">min</span>
                                </div>
                            </div>

                            {/* Fake buttons */}
                            <div className="w-full space-y-2.5 px-4">
                                <div className="h-10 rounded-2xl bg-primary/15 flex items-center gap-2.5 px-4">
                                    <div className="w-5 h-5 rounded-lg bg-primary/30" />
                                    <div className="w-20 h-2 rounded-full bg-primary/20" />
                                </div>
                                <div className="h-10 rounded-2xl bg-primary/10 flex items-center gap-2.5 px-4">
                                    <div className="w-5 h-5 rounded-lg bg-primary/20" />
                                    <div className="w-16 h-2 rounded-full bg-primary/15" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Reflection */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
