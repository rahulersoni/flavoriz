import { useEffect, useRef, useState } from "react";
import {
    ArrowRight,
    ArrowUpRight,
    Check,
    ChefHat,
    Heart,
    Play,
    Sparkles,
    UsersRound,
} from "lucide-react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import Reveal from "../components/Reveal";
import Container from "../components/frontend/Container";
import Section from "../components/frontend/Section";

const stats = [
    { value: "1 Million+", label: "Registered Flavoriz Users" },
    { value: "5,000+", label: "Verified Chefs in Community" },
    { value: "98%", label: "User Satisfaction Rate" },
    { value: "10,000+", label: "Officially Published Recipes" },
];

const values = [
    {
        number: "01",
        title: "User-Centered",
        text: "We make cooking approachable, practical and enjoyable for everyone, from first-time cooks to experienced home chefs.",
        icon: UsersRound,
    },
    {
        number: "02",
        title: "Diverse Recipes",
        text: "We celebrate food cultures from around the world and bring different traditions into one welcoming culinary space.",
        icon: Sparkles,
    },
    {
        number: "03",
        title: "Fun Community",
        text: "We believe food is better together. Share recipes, learn from others and find inspiration every day.",
        icon: Heart,
    },
];

const timeline = [
    {
        year: "2021",
        title: "Flavoriz begins",
        text: "A simple idea: make discovering and cooking great food easier for everyone.",
    },
    {
        year: "2022",
        title: "Our community grows",
        text: "Home cooks and culinary creators begin sharing their favorite recipes and techniques.",
    },
    {
        year: "2023",
        title: "10,000+ recipes",
        text: "Flavoriz becomes a growing destination for recipes, stories and everyday cooking inspiration.",
    },
];

function Counter({ value, label }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.6 });
    const numeric = Number(value.replace(/\D/g, "")) || 0;
    const suffix = value.includes("%") ? "%" : value.includes("+") ? "+" : "";

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { stiffness: 90, damping: 20 });
    const rounded = useTransform(springValue, (latest) => Math.round(latest).toLocaleString());

    useEffect(() => {
        if (isInView) motionValue.set(numeric);
    }, [isInView, motionValue, numeric]);

    return (
        <div ref={ref}>
            <div className="text-3xl font-bold tracking-[-0.04em] text-primary md:text-4xl">
                {value.includes("Million") ? (
                    <>
                        <motion.span>{rounded}</motion.span>
                        <span> Million+</span>
                    </>
                ) : (
                    <>
                        <motion.span>{rounded}</motion.span>
                        <span>{suffix}</span>
                    </>
                )}
            </div>

            <p className="mt-2 max-w-[180px] text-xs leading-5 text-muted">{label}</p>
        </div>
    );
}

export default function About() {
    const [videoOpen, setVideoOpen] = useState(false);

    return (
        <main>
            {/* ABOUT HERO */}
            <section className="container-site pt-8 md:pt-12">
                <Reveal>
                    <div className="relative overflow-hidden rounded-[38px] bg-muted">
                        <div className="relative min-h-[430px] md:min-h-[520px]">
                            <img
                                src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1800&q=90"
                                alt="Fresh pasta and ingredients"
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-r from-bg/95 via-bg/60 to-transparent" />

                            <div className="relative flex min-h-[430px] items-center px-7 py-16 md:min-h-[520px] md:px-12 lg:px-16">
                                <div className="max-w-[640px]">
                                    <motion.p
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1, duration: 0.55 }}
                                        className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-muted"
                                    >
                                        Our story
                                    </motion.p>

                                    <motion.h1
                                        initial={{ opacity: 0, y: 28 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                        className="text-[clamp(3rem,6vw,6.2rem)] font-bold leading-[0.94]"
                                    >
                                        About Our{" "}
                                        <span className="text-primary">Culinary</span> Stories
                                    </motion.h1>

                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                        className="mt-6 max-w-[560px] text-base leading-7 text-muted md:text-lg"
                                    >
                                        We bring recipes, culinary stories and passionate people
                                        together to make cooking feel more inspiring, accessible
                                        and fun.
                                    </motion.p>
                                </div>
                            </div>

                            <motion.button
                                type="button"
                                whileHover={{ y: -3 }}
                                whileTap={{ scale: 0.96 }}
                                className="absolute bottom-5 right-5 rounded-full bg-secondary px-5 py-3 text-xs font-bold text-bg shadow-xl"
                            >
                                Our History <ArrowUpRight size={14} className="ml-1 inline" />
                            </motion.button>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* MISSION */}
            <Section>
                <Container>
                    <div className="grid items-center gap-10 lg:grid-cols-[0.65fr_1.35fr]">
                        <Reveal>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="relative overflow-hidden rounded-[30px]"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=90"
                                    alt="Chef preparing food"
                                    className="aspect-[4/5] w-full object-cover"
                                />

                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-6 pt-28 text-white">
                                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">
                                        Live
                                    </p>

                                    <h3 className="mt-1 text-2xl font-bold text-white">
                                        Cook with Master Chefs
                                    </h3>
                                </div>

                                <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#171717]">
                                    150+
                                </span>
                            </motion.div>
                        </Reveal>

                        <div>
                            <Reveal>
                                <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                                    Why Flavoriz?
                                </p>

                                <h2 className="mt-3 max-w-[780px]">
                                    We believe in the{" "}
                                    <span className="text-primary">transformative</span> power of
                                    cooking and good food.
                                </h2>

                                <p className="mt-6 max-w-[760px] text-base leading-7 text-muted">
                                    We are a home to a variety of recipes worldwide for you to
                                    learn, cook and enjoy. Our platform is a celebration of
                                    culinary diversity, bringing together home cooks and food
                                    enthusiasts around the joy of making something delicious.
                                </p>
                            </Reveal>

                            <div className="mt-9 grid gap-3 sm:grid-cols-2">
                                {[
                                    ["Achievement", "Cook 2 foods today"],
                                    ["Live Now", "Chef Mark Johnson"],
                                    ["Today's Recipe", "Spaghetti Bolognese"],
                                    ["Get Started", "Share your recipe"],
                                ].map(([title, text], index) => (
                                    <Reveal key={title} delay={index * 0.06}>
                                        <motion.div
                                            whileHover={{ x: 4 }}
                                            className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4"
                                        >
                                            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-primary-hover">
                                                {index === 0 && <Sparkles size={18} />}
                                                {index === 1 && <ChefHat size={18} />}
                                                {index === 2 && <Heart size={18} />}
                                                {index === 3 && <UsersRound size={18} />}
                                            </div>

                                            <div>
                                                <p className="text-xs font-bold">{title}</p>
                                                <p className="mt-1 text-xs text-muted">{text}</p>
                                            </div>
                                        </motion.div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* QUOTE + SIDE IMAGE */}
                    <div className="mt-10 grid gap-5 md:grid-cols-[1fr_0.8fr]">
                        <Reveal>
                            <motion.div
                                whileHover={{ y: -4 }}
                                className="relative min-h-[360px] overflow-hidden rounded-[30px] bg-primary p-8 md:p-12"
                            >
                                <Heart className="absolute right-8 top-8 text-black/30" size={30} />

                                <div className="flex h-full flex-col justify-between">
                                    <div>
                                        <p className="text-sm font-bold uppercase tracking-[0.15em] text-black/60">
                                            From our community
                                        </p>

                                        <p className="mt-8 max-w-[650px] text-[clamp(2rem,4vw,3.7rem)] font-bold leading-[1.02] tracking-[-0.045em]">
                                            “Flavoriz has always helped me make cooking feel
                                            simple, creative and exciting.”
                                        </p>
                                    </div>

                                    <div className="mt-8 flex items-center gap-3">
                                        <img
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                                            alt="Flavoriz community member"
                                            className="size-11 rounded-full object-cover"
                                        />

                                        <div>
                                            <p className="text-sm font-bold">Alyssa Tan</p>
                                            <p className="text-xs text-black/60">
                                                Master Chef · 2022
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Reveal>

                        <Reveal delay={0.08}>
                            <div className="relative overflow-hidden rounded-[30px]">
                                <img
                                    src="https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1000&q=90"
                                    alt="Cooking ingredients"
                                    className="h-full min-h-[360px] w-full object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                                <div className="absolute bottom-7 left-7 right-7 text-white">
                                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">
                                        Our philosophy
                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold text-white">
                                        Easy to follow. Fun to make.
                                    </h3>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </Container>
            </Section>

            {/* STATS */}
            <section className="border-y border-border bg-surface">
                <Container>
                    <div className="grid gap-0 py-8 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <Reveal key={stat.label} delay={index * 0.06}>
                                <div className="border-border px-5 py-5 text-center sm:text-left lg:border-r last:lg:border-r-0">
                                    <Counter {...stat} />
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </Container>
            </section>

            {/* VALUES */}
            <Section>
                <Container>
                    <div className="max-w-[720px]">
                        <Reveal>
                            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                                What shapes us
                            </p>

                            <h2 className="mt-3">
                                Values That <span className="text-primary">Shape Flavoriz</span>
                            </h2>
                        </Reveal>
                    </div>

                    <div className="mt-12 grid gap-5 lg:grid-cols-3">
                        {values.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <Reveal key={item.number} delay={index * 0.08}>
                                    <motion.article
                                        whileHover={{ y: -8 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                        className="group relative min-h-[300px] overflow-hidden rounded-[30px] border border-border bg-surface p-7 shadow-sm"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold text-primary">
                                                {item.number}
                                            </span>

                                            <div className="grid size-11 place-items-center rounded-full bg-accent transition-transform group-hover:rotate-6">
                                                <Icon size={19} />
                                            </div>
                                        </div>

                                        <h3 className="mt-14 text-2xl font-bold">{item.title}</h3>

                                        <p className="mt-4 text-sm leading-6 text-muted">
                                            {item.text}
                                        </p>

                                        <ArrowUpRight
                                            size={21}
                                            className="absolute bottom-7 right-7 text-soft transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary"
                                        />
                                    </motion.article>
                                </Reveal>
                            );
                        })}
                    </div>
                </Container>
            </Section>

            {/* VIDEO / COMMUNITY */}
            <Section spacing={false} className="bg-muted">
                <Container>
                    <Reveal>
                        <div className="relative overflow-hidden rounded-[38px]">
                            <img
                                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=90"
                                alt="Professional chefs cooking together"
                                className="min-h-[450px] w-full object-cover md:min-h-[570px]"
                            />

                            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />

                            <div className="absolute inset-0 flex items-center px-7 md:px-14 lg:px-20">
                                <div className="max-w-[650px] text-white">
                                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                                        Better together
                                    </p>

                                    <h2 className="mt-4 text-white">
                                        Food brings people{" "}
                                        <span className="text-primary">together.</span>
                                    </h2>

                                    <p className="mt-6 max-w-[560px] text-base leading-7 text-white/75">
                                        From a family dinner to a recipe shared across the world,
                                        Flavoriz is built around the idea that every good meal has
                                        a story worth sharing.
                                    </p>

                                    <div className="mt-8 flex flex-wrap gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setVideoOpen(true)}
                                            className="btn-primary"
                                        >
                                            <Play size={16} fill="currentColor" />
                                            Watch Our Story
                                        </button>

                                        <a href="#community" className="btn-light">
                                            Meet the Community <ArrowRight size={16} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </Container>
            </Section>

            {/* TIMELINE */}
            <Section>
                <Container>
                    <div className="grid gap-12 lg:grid-cols-[0.6fr_1.4fr]">
                        <Reveal>
                            <div className="lg:sticky lg:top-24 lg:self-start">
                                <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                                    Our journey
                                </p>

                                <h2 className="mt-3">
                                    From one recipe to a culinary community.
                                </h2>

                                <p className="mt-5 text-sm leading-6 text-muted">
                                    We continue to grow with every recipe, creator and home cook
                                    who joins Flavoriz.
                                </p>
                            </div>
                        </Reveal>

                        <div className="relative">
                            <div className="absolute bottom-0 left-[17px] top-0 w-px bg-border" />

                            <div className="space-y-10">
                                {timeline.map((item, index) => (
                                    <Reveal key={item.year} delay={index * 0.08}>
                                        <motion.article
                                            whileHover={{ x: 5 }}
                                            className="relative pl-12"
                                        >
                                            <div className="absolute left-0 top-1 grid size-[35px] place-items-center rounded-full border-4 border-bg bg-primary text-[10px] font-bold">
                                                {index + 1}
                                            </div>

                                            <p className="text-sm font-bold text-primary">
                                                {item.year}
                                            </p>

                                            <h3 className="mt-2 text-2xl font-bold">
                                                {item.title}
                                            </h3>

                                            <p className="mt-3 max-w-[600px] text-sm leading-6 text-muted">
                                                {item.text}
                                            </p>
                                        </motion.article>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* CTA */}
            <section className="container-site pb-16">
                <Reveal>
                    <div className="overflow-hidden rounded-[36px] bg-secondary px-7 py-14 text-bg md:px-14 lg:px-20">
                        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                            <div>
                                <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                                    Your next meal starts here
                                </p>

                                <h2 className="mt-3 max-w-[700px] text-bg">
                                    Explore, create and savor something delicious.
                                </h2>

                                <p className="mt-5 max-w-[620px] text-sm leading-6 text-white/60">
                                    Join Flavoriz and discover recipes made for real kitchens,
                                    real people and real cravings.
                                </p>
                            </div>

                            <motion.a
                                whileHover={{ y: -3 }}
                                href="#recipes"
                                className="btn-primary"
                            >
                                Explore Recipes <ArrowRight size={17} />
                            </motion.a>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* VIDEO MODAL */}
            {videoOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-5 backdrop-blur-sm"
                    onClick={() => setVideoOpen(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        onClick={(event) => event.stopPropagation()}
                        className="w-full max-w-4xl overflow-hidden rounded-lg bg-black shadow-2xl"
                    >
                        <div className="relative aspect-video">
                            <img
                                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=90"
                                alt="Flavoriz story"
                                className="absolute inset-0 h-full w-full object-cover opacity-80"
                            />

                            <button
                                type="button"
                                onClick={() => setVideoOpen(false)}
                                className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white text-black"
                                aria-label="Close"
                            >
                                <Check size={18} />
                            </button>

                            <div className="absolute inset-0 grid place-items-center">
                                <div className="grid size-16 place-items-center rounded-full bg-primary text-black">
                                    <Play size={22} fill="currentColor" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </main>
    );
}