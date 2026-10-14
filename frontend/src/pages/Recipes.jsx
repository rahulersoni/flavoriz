import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChefHat, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Reveal from "../components/Reveal";
import RecipeFilter from "../components/frontend/RecipeFilter";
import RecipeGridCard from "../components/frontend/RecipeGridCard";
import Container from "../components/frontend/Container";
import Section from "../components/frontend/Section";
import Button from "../components/frontend/Button";
import { recipes } from "../data/recipe";

export default function Recipes() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get("search") || "");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const query = search.trim();

      if (query) {
        setSearchParams({ search: query });
      } else {
        setSearchParams({});
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, setSearchParams]);

  const filteredRecipes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return recipes.filter((recipe) => {
      const matchesFilter =
        activeFilter === "all" || recipe.category === activeFilter;

      const matchesSearch =
        !query ||
        recipe.title.toLowerCase().includes(query) ||
        (recipe.subcategory || "").toLowerCase().includes(query) ||
        (recipe.categoryLabel || "").toLowerCase().includes(query) ||
        (recipe.description || "").toLowerCase().includes(query) ||
        (recipe.tags || []).some((tag) =>
          tag.toLowerCase().includes(query)
        );

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  const clearFilters = () => {
    setActiveFilter("all");
    setSearch("");
    setSearchParams({});
  };

  console.log(activeFilter, search, filteredRecipes);
  return (
    <main>
      {/* HERO */}
      <section className="container-site pt-8 md:pt-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-[38px]">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1800&q=90"
              alt="Culinary ingredients"
              className="h-[380px] w-full object-cover md:h-[460px]"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-bg/95 via-bg/60 to-transparent" />

            <div className="absolute inset-0 flex items-center px-7 md:px-12 lg:px-16">
              <div className="max-w-[620px]">
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-muted"
                >
                  Discover & cook
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.7 }}
                  className="text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.95]"
                >
                  Explore{" "}
                  <span className="text-primary">Culinary</span> Insights
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mt-6 max-w-[500px] text-base leading-7 text-muted"
                >
                  Find recipes for every mood, discover new flavors and bring
                  something delicious to your table.
                </motion.p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FILTERS */}
      <Section className="pb-12">
        <Container>
          <Reveal>
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                Find your next favorite
              </p>

              <h2 className="mt-2 text-3xl md:text-4xl">
                What to <span className="text-primary">cook?</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-col items-center gap-5">
              <RecipeFilter
                activeFilter={activeFilter}
                onChange={setActiveFilter}
              />

              <div className="relative w-full max-w-[430px]">
                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-soft"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search recipes..."
                  className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-5 text-sm text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* RECIPE GRID */}
      <Section spacing={false} className="pb-24">
        <Container>
          <div className="mb-7 flex items-center justify-between gap-4">
            <p className="text-sm text-muted">
              Showing <strong className="text-text">{filteredRecipes.length}</strong>{" "}
              recipes
            </p>

            {activeFilter !== "all" || search ? (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-bold text-primary-hover"
              >
                Clear filters
              </button>
            ) : null}
          </div>

          <motion.div
            layout
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredRecipes.map((recipe) => (
                <RecipeGridCard key={recipe.id} recipe={recipe} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredRecipes.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg bg-muted px-6 py-16 text-center"
            >
              <ChefHat className="mx-auto text-primary" size={34} />

              <h3 className="mt-4 text-2xl font-bold">No recipes found</h3>

              <p className="mx-auto! text-center mt-2 max-w-105 text-sm leading-6 text-muted">
                Try another category or search term. There is always something
                delicious waiting to be discovered.
              </p>
            </motion.div>
          )}
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing={false} className="pb-20">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[34px] bg-secondary px-7 py-12 text-bg md:px-14">
              <div className="absolute -right-20 -top-20 size-64 rounded-full bg-primary/20 blur-3xl" />

              <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                    Cook something new
                  </p>

                  <h2 className="mt-2 text-3xl text-bg md:text-4xl">
                    Your next favorite recipe is waiting.
                  </h2>
                </div>

                <Button href="/about" className="shrink-0">
                  Meet Flavoriz
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}