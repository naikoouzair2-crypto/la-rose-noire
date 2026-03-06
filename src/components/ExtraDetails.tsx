"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ExtraDetails() {
    return (
        <section className="relative bg-[#0A0A0A] flex flex-col items-center justify-start text-center px-4 md:px-20 pt-24 pb-32 z-40 overflow-hidden">

            {/* Subtle top border to blend with sticky canvas ending */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

            <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="font-serif text-3xl md:text-5xl text-white mb-16 tracking-widest drop-shadow-lg relative z-20"
            >
                A MASTERPIECE IN MOTION
            </motion.h2>

            {/* Animated grid for images matching the Rolls Royce luxury aesthetic */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mb-20 relative z-20 pointer-events-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="relative aspect-[16/9] md:aspect-square lg:aspect-[4/3] w-full overflow-hidden border border-white/5 bg-[#111]"
                >
                    <Image
                        src="/images/extra-1.png"
                        alt="Extra Detail 1"
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-1000 ease-out"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        quality={100}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative aspect-[16/9] md:aspect-square lg:aspect-[4/3] w-full overflow-hidden border border-white/5 bg-[#111]"
                >
                    <Image
                        src="/images/extra-2.png"
                        alt="Extra Detail 2"
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-1000 ease-out"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        quality={100}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="relative aspect-[16/9] md:aspect-square lg:aspect-[4/3] w-full overflow-hidden border border-white/5 bg-[#111]"
                >
                    <Image
                        src="/images/extra-3.png"
                        alt="Extra Detail 3"
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-1000 ease-out"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        quality={100}
                    />
                </motion.div>
            </div>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="max-w-3xl font-mono text-sm md:text-base leading-loose text-white/70 relative z-20"
            >
                The Rolls-Royce La Rose Noire Droptail is a romantic and glamorous expression of luxury, featuring an intricately curved silhouette, a complex parquetry interior, and a bespoke Audemars Piguet timepiece tailored exclusively for its clients.
            </motion.p>

            {/* Developer Info strongly visible without the excessive glow wash-out */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mt-32 flex flex-col items-center justify-center w-full max-w-4xl relative z-50 pointer-events-auto cursor-auto"
            >
                <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-crimson to-transparent mb-10"></div>

                <p className="font-mono text-xs md:text-sm tracking-[0.5em] text-white/50 uppercase mb-6">
                    Designed & Developed By
                </p>

                <h3 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white tracking-widest mb-10 font-bold">
                    Uzair Farooq Naikoo
                </h3>

                <div className="flex flex-col md:flex-row items-center gap-6 mt-2 relative z-50">
                    <a
                        href="mailto:naikoouzair2@gmail.com"
                        className="group font-mono text-sm tracking-[0.2em] text-white flex items-center gap-4 px-8 py-4 border border-white/30 hover:border-crimson bg-[#0a0a0a] hover:bg-crimson/20 transition-all duration-500 cursor-pointer pointer-events-auto shadow-[0_0_30px_rgba(220,20,60,0.15)] hover:shadow-[0_0_50px_rgba(220,20,60,0.4)]"
                    >
                        <span className="w-2.5 h-2.5 rounded-full bg-crimson shadow-[0_0_10px_#dc143c] animate-pulse"></span>
                        naikoouzair2@gmail.com
                    </a>
                </div>
            </motion.div>

        </section>
    );
}
