"use client";

import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const FRAME_COUNT = 200;

export default function CarScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map progress to frames only over the first 0 to 60% of scroll
    const frameIndex = useTransform(scrollYProgress, [0, 0.6], [0, FRAME_COUNT - 1]);

    useEffect(() => {
        // Prevent scrolling while loading
        if (loading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [loading]);

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            let loadedCount = 0;

            for (let i = 1; i <= FRAME_COUNT; i++) {
                const img = new window.Image();
                const paddedIndex = i.toString().padStart(3, "0");
                img.src = `/frames/frame-${paddedIndex}.jpg`;

                await new Promise<void>((resolve) => {
                    img.onload = () => {
                        loadedCount++;
                        setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
                        loadedImages.push(img);
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Failed to load frame ${i}`);
                        loadedImages.push(img); // Push empty/broken img to maintain index
                        resolve();
                    };
                });
            }

            setImages(loadedImages);
            setLoading(false);
        };

        loadImages();
    }, []);

    const drawFrame = (index: number) => {
        if (!canvasRef.current || images.length === 0) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Standardize index bound
        const imgIndex = Math.min(Math.floor(index), FRAME_COUNT - 1);
        const img = images[imgIndex];

        if (!img || !img.width) return;

        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let renderWidth, renderHeight, offsetX = 0, offsetY = 0;

        if (canvasRatio > imgRatio) {
            renderWidth = canvas.width;
            renderHeight = canvas.width / imgRatio;
            offsetY = (canvas.height - renderHeight) / 2;
        } else {
            renderWidth = canvas.height * imgRatio;
            renderHeight = canvas.height;
            offsetX = (canvas.width - renderWidth) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Dark bg fill to match assets
        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    };

    useEffect(() => {
        const resizeCanvas = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                if (!loading) drawFrame(frameIndex.get());
            }
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        return () => window.removeEventListener("resize", resizeCanvas);
    }, [loading, images]);

    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (!loading) drawFrame(latest);
    });

    return (
        // Increase height to 800vh to ensure frames scroll slightly faster, 
        // and give space at the bottom for the extra images and developer credits.
        <div ref={containerRef} className="relative h-[800vh] bg-[#0a0a0a]">

            {/* Header Button linking to official Rolls-Royce */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="fixed top-0 left-0 right-0 z-[60] flex justify-between items-center px-6 md:px-12 py-6 pointer-events-none mix-blend-exclusion"
            >
                <div className="w-12 h-12">
                    {/* Minimal Double R placeholder logo */}
                    <svg viewBox="0 0 100 100" fill="white" className="w-full h-full opacity-80">
                        <text x="50" y="55" fontFamily="serif" fontSize="60" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">RR</text>
                    </svg>
                </div>
                <a
                    href="https://www.rolls-roycemotorcars.com/en_US/bespoke/coachbuild/la-rose-noire-droptail.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs md:text-sm tracking-widest text-white border border-white/30 px-6 py-3 hover:bg-white hover:text-black transition-all duration-300 pointer-events-auto cursor-pointer"
                >
                    OFFICIAL SITE
                </a>
            </motion.div>

            {/* Preloader */}
            {loading && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] text-white">
                    <div className="relative flex items-center justify-center w-24 h-24 mb-8">
                        <div className="absolute inset-0 border-t-2 border-crimson rounded-full animate-spin"></div>
                        <div className="absolute inset-2 border-r-2 border-white/20 rounded-full animate-spin animation-delay-150"></div>
                    </div>
                    <p className="font-mono text-sm tracking-[0.3em] text-white/70">
                        ASSEMBLING
                    </p>
                    <p className="mt-2 font-mono text-xs text-crimson">
                        {progress}%
                    </p>
                </div>
            )}

            {/* Sticky Canvas & Overlays */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a]">
                <canvas ref={canvasRef} className="w-full h-full" />
                {/* Shadow vignette to feather hard edges of images */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(10,10,10,1)]"></div>
                <TextOverlays progress={scrollYProgress} />
            </div>
        </div>
    );
}

function TextOverlays({ progress }: { progress: any }) {
    // Hero: "LA ROSE NOIRE"
    const heroOpacity = useTransform(progress, [0, 0.1], [1, 0]);
    const heroY = useTransform(progress, [0, 0.1], [0, -50]);
    const heroScale = useTransform(progress, [0, 0.1], [1, 1.05]);

    // Specs: "6.75L V12 SYMPHONY"
    const specsOpacity = useTransform(progress, [0.15, 0.25, 0.45, 0.55], [0, 1, 1, 0]);
    const specsY = useTransform(progress, [0.15, 0.25], [30, 0]);

    // Final statement on disassembly: "THE ANATOMY OF BESPOKE LUXURY"
    const anatomyOpacity = useTransform(progress, [0.6, 0.65, 0.75, 0.8], [0, 1, 1, 0]);
    const anatomyY = useTransform(progress, [0.6, 0.65], [30, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none">

            {/* 0% Hero */}
            <motion.div
                style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
                <p className="font-mono text-sm tracking-[0.5em] text-crimson mb-6 uppercase">
                    Rolls-Royce Motor Cars
                </p>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-wider text-white">
                    LA ROSE<br />NOIRE
                </h1>
                <p className="font-mono text-xs tracking-widest text-white/50 mt-12">
                    SCROLL TO EXPLORE
                </p>
                <div className="w-[1px] h-12 bg-crimson/50 mt-6 animate-pulse"></div>
            </motion.div>

            {/* 20% Specs */}
            <motion.div
                style={{ opacity: specsOpacity, y: specsY }}
                className="absolute left-[10%] top-[40%] md:top-[30%] max-w-sm"
            >
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                    6.75L V12 SYMPHONY
                </h2>
                <div className="h-[1px] w-12 bg-crimson mb-4"></div>
                <ul className="font-mono text-sm text-white/70 space-y-3">
                    <li className="flex justify-between border-b border-white/10 pb-2">
                        <span>POWER</span> <span className="text-white">593 BHP</span>
                    </li>
                    <li className="flex justify-between border-b border-white/10 pb-2">
                        <span>TORQUE</span> <span className="text-white">840 NM</span>
                    </li>
                    <li className="flex justify-between border-b border-white/10 pb-2">
                        <span>0-60 MPH</span> <span className="text-white">4.9 SEC</span>
                    </li>
                </ul>
            </motion.div>

            {/* 65% Anatomy text */}
            <motion.div
                style={{ opacity: anatomyOpacity, y: anatomyY }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
                <h2 className="font-serif text-4xl md:text-6xl tracking-wide text-white drop-shadow-2xl">
                    THE ANATOMY OF<br />
                    <span className="text-crimson">BESPOKE LUXURY</span>
                </h2>
            </motion.div>
        </div>
    );
}
