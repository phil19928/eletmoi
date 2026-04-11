import { motion } from "framer-motion";

const nodes = [
    { cx: 200, cy: 50, label: "Apprendre", icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25", color: "#7A9E88" },
    { cx: 60, cy: 280, label: "Gagner", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z", color: "#F59E0B" },
    { cx: 340, cy: 280, label: "Jouer", icon: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z", color: "#6D98C2" },
];

// Curved paths connecting the nodes
const paths = [
    "M 170 80 C 100 150, 50 200, 80 250", // Apprendre -> Gagner
    "M 110 300 C 170 340, 270 340, 320 300", // Gagner -> Jouer
    "M 360 250 C 370 200, 310 150, 230 80", // Jouer -> Apprendre
];

export default function SmartloopDiagram() {
    return (
        <div className="relative w-full max-w-[420px] mx-auto">
            <svg viewBox="0 0 400 360" className="w-full h-auto">
                {/* Connecting paths */}
                {paths.map((d, i) => (
                    <g key={i}>
                        <motion.path
                            d={d}
                            fill="none"
                            stroke="#7A9E88"
                            strokeWidth="2"
                            strokeOpacity="0.2"
                            strokeDasharray="6 4"
                        />
                        <motion.path
                            d={d}
                            fill="none"
                            stroke="#7A9E88"
                            strokeWidth="2.5"
                            strokeOpacity="0.6"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                                duration: 1.5,
                                delay: 0.5 + i * 0.4,
                                ease: "easeInOut",
                            }}
                        />
                    </g>
                ))}

                {/* Arrow heads */}
                <defs>
                    <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#7A9E88" fillOpacity="0.5" />
                    </marker>
                </defs>
                {paths.map((d, i) => (
                    <motion.path
                        key={`arrow-${i}`}
                        d={d}
                        fill="none"
                        stroke="transparent"
                        markerEnd="url(#arrowhead)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 + i * 0.4 }}
                    />
                ))}

                {/* Traveling dot */}
                <motion.circle
                    r="5"
                    fill="#7A9E88"
                    filter="drop-shadow(0 0 6px rgba(122,158,136,0.6))"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 1, 0] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 2.5 }}
                >
                    <animateMotion
                        dur="6s"
                        repeatCount="indefinite"
                        begin="2.5s"
                        path="M 200 50 C 170 80, 100 150, 60 280 C 110 300, 270 340, 340 280 C 360 250, 310 150, 200 50"
                    />
                </motion.circle>

                {/* Nodes */}
                {nodes.map((node, i) => (
                    <motion.g
                        key={node.label}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.2, type: "spring" }}
                    >
                        {/* Glow */}
                        <circle cx={node.cx} cy={node.cy} r="38" fill={node.color} fillOpacity="0.08" />
                        {/* Circle bg */}
                        <circle cx={node.cx} cy={node.cy} r="30" fill="white" stroke={node.color} strokeWidth="2.5" />
                        {/* Icon */}
                        <g transform={`translate(${node.cx - 12}, ${node.cy - 12})`}>
                            <path d={node.icon} fill="none" stroke={node.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        {/* Label */}
                        <text
                            x={node.cx}
                            y={node.cy + 50}
                            textAnchor="middle"
                            className="text-sm font-semibold"
                            fill="#1e293b"
                            style={{ fontFamily: "Space Grotesk, Inter, system-ui, sans-serif", fontSize: "14px", fontWeight: 600 }}
                        >
                            {node.label}
                        </text>
                    </motion.g>
                ))}
            </svg>
        </div>
    );
}
