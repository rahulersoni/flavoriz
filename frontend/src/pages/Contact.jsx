import { useState } from "react";
import { Check, Clock3, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import Reveal from "../components/Reveal";
import Container from "../components/frontend/Container";
import Section from "../components/frontend/Section";

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        setSubmitted(true);
        event.currentTarget.reset();
    }

    const contactInfo = [
        { icon: Phone, label: "Phone", value: "(+555) 555-1234" },
        { icon: Mail, label: "Email Address", value: "info@flavoriz.com" },
        { icon: MapPin, label: "Location", value: "123 Culinary Street, Foodieville, CO 12345" },
        { icon: Clock3, label: "Office Hours", value: "Mon–Fri · 9:00 AM – 5:00 PM" },
    ];

    return (
        <main>
            {/* HERO */}
            <section className="container-site pt-8 md:pt-12">
                <Reveal>
                    <div className="relative overflow-hidden rounded-[38px]">
                        <img
                            src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1800&q=90"
                            alt="Fresh food"
                            className="h-[380px] w-full object-cover md:h-[460px]"
                        />

                        <div className="absolute inset-0 bg-gradient-to-r from-bg/95 via-bg/60 to-transparent" />

                        <div className="absolute inset-0 flex items-center px-7 md:px-12 lg:px-16">
                            <div className="max-w-[600px]">
                                <motion.p
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-muted"
                                >
                                    We would love to hear from you
                                </motion.p>

                                <motion.h1
                                    initial={{ opacity: 0, y: 25 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1, duration: 0.7 }}
                                    className="text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.95]"
                                >
                                    Get in Touch{" "}
                                    <span className="text-primary">with</span> Us
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-6 max-w-[500px] text-base leading-7 text-muted"
                                >
                                    Have a recipe question, a collaboration idea or simply want
                                    to say hello? Our food-loving team is only a message away.
                                </motion.p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* CONTACT INFORMATION + FORM */}
            <Section>
                <Container>
                    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                        <div>
                            <Reveal>
                                <div className="relative overflow-hidden rounded-[30px]">
                                    <img
                                        src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1100&q=90"
                                        alt="Cooking together"
                                        className="aspect-[4/3] w-full object-cover"
                                    />

                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-7 pt-24 text-white">
                                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">
                                            Contact information
                                        </p>

                                        <h2 className="mt-2 text-3xl text-white">
                                            Let's talk food.
                                        </h2>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={0.08}>
                                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                    {contactInfo.map(({ icon: Icon, label, value }) => (
                                        <motion.div
                                            key={label}
                                            whileHover={{ y: -4 }}
                                            className="rounded-[22px] border border-border bg-surface p-5"
                                        >
                                            <div className="grid size-10 place-items-center rounded-xl bg-accent text-primary-hover">
                                                <Icon size={18} />
                                            </div>

                                            <p className="mt-4 text-xs text-soft">{label}</p>
                                            <p className="mt-1 text-sm font-bold leading-6">
                                                {value}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>

                        <Reveal delay={0.1}>
                            <div className="rounded-[30px] border border-border bg-surface p-6 shadow-sm md:p-9">
                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
                                    Send a message
                                </p>

                                <h2 className="mt-2 text-3xl font-bold">
                                    How can we help?
                                </h2>

                                <p className="mt-3 text-sm leading-6 text-muted">
                                    Fill out the form and our team will get back to you as soon as
                                    possible.
                                </p>

                                <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <label>
                                            <span className="mb-2 block text-sm font-semibold">
                                                Name
                                            </span>

                                            <input
                                                name="name"
                                                required
                                                placeholder="Your name"
                                                className="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-text outline-none transition placeholder:text-soft focus:border-primary focus:ring-4 focus:ring-primary/10"
                                            />
                                        </label>

                                        <label>
                                            <span className="mb-2 block text-sm font-semibold">
                                                Email
                                            </span>

                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                placeholder="you@example.com"
                                                className="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-text outline-none transition placeholder:text-soft focus:border-primary focus:ring-4 focus:ring-primary/10"
                                            />
                                        </label>
                                    </div>

                                    <label className="block">
                                        <span className="mb-2 block text-sm font-semibold">
                                            Subject
                                        </span>

                                        <input
                                            name="subject"
                                            required
                                            placeholder="What can we help with?"
                                            className="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-text outline-none transition placeholder:text-soft focus:border-primary focus:ring-4 focus:ring-primary/10"
                                        />
                                    </label>

                                    <label className="block">
                                        <span className="mb-2 block text-sm font-semibold">
                                            Message
                                        </span>

                                        <textarea
                                            name="message"
                                            required
                                            rows="6"
                                            placeholder="Tell us a little more..."
                                            className="w-full resize-none rounded-2xl border border-border bg-bg px-4 py-3 text-text outline-none transition placeholder:text-soft focus:border-primary focus:ring-4 focus:ring-primary/10"
                                        />
                                    </label>

                                    <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                                        <p className="text-xs leading-5 text-soft">
                                            We respect your privacy and will only use your
                                            information to respond.
                                        </p>

                                        <button type="submit" className="btn-dark shrink-0">
                                            Send Message <Send size={16} />
                                        </button>
                                    </div>

                                    {submitted && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2 rounded-2xl bg-accent px-4 py-3 text-sm font-semibold"
                                        >
                                            <Check size={17} className="text-primary-hover" />
                                            Thanks! Your message has been submitted.
                                        </motion.div>
                                    )}
                                </form>
                            </div>
                        </Reveal>
                    </div>

                    {/* MAP */}
                    <Reveal delay={0.12}>
                        <div className="relative mt-8 overflow-hidden rounded-[30px] border border-border">
                            <img
                                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1800&q=85"
                                alt="Map illustration"
                                className="h-[380px] w-full object-cover grayscale-[15%]"
                            />

                            <div className="absolute inset-0 bg-black/5 dark:bg-black/20" />

                            <div className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary shadow-2xl">
                                <MapPin size={23} fill="currentColor" />
                            </div>

                            <div className="absolute bottom-5 left-5 rounded-2xl bg-surface/95 px-5 py-3 shadow-xl backdrop-blur">
                                <p className="text-xs text-soft">Find us at</p>

                                <p className="mt-1 text-sm font-bold">
                                    123 Culinary Street, Foodieville
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </Container>
            </Section>

            {/* FAQ / CTA */}
            <section className="container-site pb-20">
                <Reveal>
                    <div className="rounded-[34px] bg-muted p-7 md:p-12">
                        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
                                    Still curious?
                                </p>

                                <h2 className="mt-2 text-3xl md:text-4xl">
                                    Explore the Flavoriz community.
                                </h2>

                                <p className="mt-4 max-w-[650px] text-sm leading-6 text-muted">
                                    Browse recipes, meet fellow food lovers and discover stories
                                    from kitchens around the world.
                                </p>
                            </div>

                            <a href="/recipes" className="btn-primary">
                                Explore Recipes <Send size={16} />
                            </a>
                        </div>
                    </div>
                </Reveal>
            </section>
        </main>
    );
}