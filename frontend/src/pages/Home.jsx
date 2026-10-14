import { ArrowRight, ArrowUpRight, ChefHat, Heart, Play, Sparkles, UsersRound } from "lucide-react";
import { motion } from "motion/react";
import Reveal from "../components/Reveal";
import RecipeCard from "../components/frontend/RecipeCard";
import Container from "../components/frontend/Container";
import Section from "../components/frontend/Section";
import Button from "../components/frontend/Button";
import { recipes } from "../data/recipe";

const journal = [
  {
    tag: "STORY",
    title: "Global Culinary Adventures From Around the World",
    date: "09 May 2023",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80",
  },
  {
    tag: "TIPS",
    title: "How to Choose the Best Spices for Your Cooking",
    date: "21 February 2023",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80",
  },
  {
    tag: "STORY",
    title: "Global Culinary Adventures From Around the World",
    date: "09 May 2023",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80",
  },
];

const benefits = [
  {
    icon: UsersRound,
    title: "User-Centered",
    text: "Fresh, approachable recipes designed around the way people actually cook.",
  },
  {
    icon: Sparkles,
    title: "Diverse Recipes",
    text: "Discover culinary traditions from around the world in one beautiful place.",
  },
  {
    icon: Heart,
    title: "Fun Community",
    text: "Save favorites, share ideas and find inspiration from fellow food lovers.",
  },
];

export default function Home() {
  return (
    <>
      {/* ======== HERO =========== */}
      <section className="container-site pt-8 md:pt-12">
        <div className="relative overflow-hidden rounded-[38px] bg-muted">
          <div className="grid min-h-[620px] lg:grid-cols-[0.9fr_1.1fr]">
            {/* Hero Content */}
            <div className="relative z-10 flex flex-col justify-center px-7 py-16 sm:px-12 lg:px-16">
              <Reveal>
                <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-border)] bg-surface px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] shadow-sm">
                  <Sparkles size={14} className="text-primary" />
                  Your daily recipe journal
                </span>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="max-w-[650px] font-bold">
                  Adventure of{" "}
                  <span className="text-primary">Delicacies</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-6 max-w-[500px] text-base leading-7 text-muted md:text-lg">
                  Unlock a world of culinary variety and unleash your inner chef with simple,
                  inspiring recipes from around the world.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="#recipes" variant="dark">
                    Explore Recipes
                    <ArrowUpRight size={17} />
                  </Button>

                  <Button href="#community" variant="light">
                    Get Our Mobile App
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={0.32}>
                <div className="mt-10 flex items-center gap-6 text-sm text-muted">
                  <div>
                    <strong className="block text-xl text-[var(--color-text)]">2.4K+</strong>
                    Recipes
                  </div>

                  <div className="h-9 w-px bg-[var(--color-border)]" />

                  <div>
                    <strong className="block text-xl text-[var(--color-text)]">85K+</strong>
                    Food lovers
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 1.04, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative min-h-[420px] lg:min-h-0"
            >
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1500&q=90"
                alt="Fresh colorful food"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-surface-muted)] via-transparent to-transparent lg:from-[var(--color-surface-muted)]/50" />

              {/* Floating Featured Card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-7 left-7 rounded-2xl border border-[var(--color-border)] bg-surface/95 p-4 shadow-xl backdrop-blur md:left-10"
              >
                <div className="flex items-center gap-3">
                  <div className="grid size-11 place-items-center rounded-xl bg-[var(--color-primary)] text-[#171717]">
                    <ChefHat size={21} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-muted">Featured today</p>
                    <p className="font-bold">Calisbury Steak & Asparagus</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ====== */}
      <Section>
        <Container>
          <Reveal>
            <div className="grid gap-5 md:grid-cols-3">
              {benefits.map(({ icon: Icon, title, text }) => (
                <motion.div
                  key={title}
                  whileHover={{ y: -4 }}
                  className="frontend-card p-7 transition-transform duration-200"
                >
                  <div className="mb-5 grid size-11 place-items-center rounded-2xl bg-[var(--color-accent)] text-[var(--color-primary-hover)]">
                    <Icon size={20} />
                  </div>

                  <h3 className="text-xl font-bold">{title}</h3>

                  <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ====== POPULAR RECIPES ===== */}
      <Section id="recipes" className="bg-muted">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <Reveal>
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">
                  Explore & cook
                </p>

                <h2>
                  Popular <span className="text-primary">Recipes</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <a href="#all-recipes" className="group inline-flex items-center gap-2 font-bold">
                See all recipes
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {recipes.slice(0, 3).map((recipe, index) => (
              <Reveal key={recipe.title} delay={index * 0.08}>
                <RecipeCard recipe={recipe} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ==== COOKING CTA ====== */}
      <Section id="community">
        <Container>
          <div className="relative overflow-hidden rounded-[38px] bg-[#191919] px-7 py-14 text-white sm:px-12 lg:px-16">
            <div className="absolute -right-20 -top-20 size-72 rounded-full bg-[var(--color-primary)]/20 blur-3xl" />
            <div className="absolute -bottom-24 left-1/3 size-80 rounded-full bg-white/10 blur-3xl" />

            <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_0.75fr]">
              <Reveal>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-primary)]">
                  Cook. Learn. Repeat.
                </p>

                <h2 className="max-w-[700px] text-white">
                  Become a true{" "}
                  <span className="text-[var(--color-primary)]">chef</span> with our recipes.
                </h2>

                <p className="mt-6 max-w-[560px] text-white/65">
                  Easy-to-follow recipes, practical cooking tips and a community that makes trying
                  something new feel effortless.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="#recipes">
                    Start Cooking
                    <ArrowRight size={17} />
                  </Button>

                  <Button href="#blog" variant="light">
                    Read the Journal
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={0.12} className="relative">
                <div className="relative mx-auto max-w-[430px] overflow-hidden rounded-[30px]">
                  <img
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=85"
                    alt="Chef cooking in a kitchen"
                    className="aspect-[4/5] w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                        Live now
                      </p>

                      <p className="mt-1 text-xl font-bold">Cook with Master Chefs</p>
                    </div>

                    <button
                      type="button"
                      aria-label="Play cooking video"
                      className="grid size-12 place-items-center rounded-full bg-[var(--color-primary)] text-black transition-transform hover:scale-105"
                    >
                      <Play size={18} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ===== JOURNAL ====== */}
      <Section id="blog" spacing={false} className="pb-[clamp(60px,6vw,130px)]">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-5">
            <Reveal>
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">
                  From the kitchen
                </p>

                <h2>
                  Our <span className="text-primary">Journal</span>
                </h2>
              </div>
            </Reveal>

            <a href="#articles" className="hidden items-center gap-2 text-sm font-bold sm:flex">
              See all articles
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
            {/* Featured Article */}
            {recipes.slice(1, 2).map((item, index) => (
              <Reveal>
                <article className="group article-card">
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt="Fresh ingredients and prepared dishes"
                      className="recipe-image aspect-[16/9] w-full object-cover"
                    />
                  </div>

                  <div className="p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                      FEATURED STORY
                    </p>

                    <h3 className="mt-3 max-w-[720px] text-2xl font-bold md:text-3xl">
                      {item.title}
                    </h3>

                    <div className="mt-5 flex items-center gap-3 text-sm text-muted">
                      <span>{item.author}</span>
                      <span>·</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}


            {/* Journal Articles */}
            <div className="grid gap-5">
              {recipes.slice(2, 5).map((item, index) => (
                <Reveal key={`${item.title}-${index}`} delay={0.08 * index}>
                  <article className="group flex gap-4 rounded-[26px] border border-[var(--color-border)] bg-surface p-4 transition-colors duration-200">
                    <div className="w-28 shrink-0 overflow-hidden rounded-2xl sm:w-36">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="recipe-image h-full min-h-28 w-full object-cover"
                      />
                    </div>

                    <div className="py-1">
                      <p className="text-[10px] font-bold tracking-[0.15em] text-primary">
                        {item.subcategory}
                      </p>

                      <h3 className="mt-2 text-base font-bold leading-5 tracking-[-0.02em]">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-xs text-soft">{item.date}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

    </>
  );
}