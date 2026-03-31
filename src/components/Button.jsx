import { motion } from "framer-motion";

const variants = {
    primary:
        "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
    secondary:
        "bg-white text-slate-700 border-2 border-slate-200 hover:border-primary hover:text-primary shadow-sm hover:shadow-md",
    "outline-white":
        "bg-transparent text-white border-2 border-white/60 hover:bg-white/10 hover:border-white shadow-sm",
};

export default function Button({
    children,
    variant = "primary",
    href,
    icon,
    className = "",
    ...props
}) {
    const base =
        "inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer";

    const Tag = href ? motion.a : motion.button;
    const linkProps = href
        ? {
            href,
            target: href.startsWith("http") ? "_blank" : undefined,
            rel: href.startsWith("http") ? "noopener noreferrer" : undefined,
        }
        : {};

    return (
        <Tag
            className={`${base} ${variants[variant]} ${className}`}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            {...linkProps}
            {...props}
        >
            {icon && <span className="w-5 h-5 flex-shrink-0">{icon}</span>}
            {children}
        </Tag>
    );
}
