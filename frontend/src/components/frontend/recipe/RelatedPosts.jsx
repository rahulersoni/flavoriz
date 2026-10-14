import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Reveal from "../../Reveal";

export default function RelatedPosts({ posts = [], title = "You May Also Like" }) {
    if (!posts.length) return null;

    return (
        <section className="border-t border-border pt-12">
            <Reveal>
                <div className="mb-7 flex items-end justify-between gap-5">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                            More from Flavoriz
                        </p>

                        <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em]">{title}</h2>
                    </div>

                    <Link to="/recipes"
                        className="hidden items-center gap-2 text-sm font-bold text-text transition-colors hover:text-primary sm:inline-flex">
                        View All
                        <ArrowUpRight size={16} />
                    </Link>
                </div>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, index) => (
                    <Reveal key={post.id || post.slug || index} delay={index * 0.08}>
                        <motion.article
                            whileHover={{ y: -6 }}
                            transition={{ type: "spring", stiffness: 320, damping: 24 }}
                            className="article-card group h-full"
                        >
                            <Link to={`/recipe/${post.slug}`} className="block">
                                <div className="overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        loading="lazy"
                                        className="recipe-image aspect-[1.35] w-full object-cover"
                                    />
                                </div>

                                <div className="p-5">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                                        {post.category}
                                    </p>

                                    <h3 className="mt-2 text-xl font-bold leading-[1.15] tracking-[-0.035em] transition-colors group-hover:text-primary">
                                        {post.title}
                                    </h3>

                                    {(post.excerpt || post.description) && (
                                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">
                                            {post.excerpt || post.description}
                                        </p>
                                    )}

                                    {/* {post.excerpt && (
                                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">
                                            {post.excerpt}
                                        </p>
                                    )} */}

                                    <div className="mt-4 flex items-center justify-between text-xs font-semibold text-muted">
                                        <span>{post.date}</span>

                                        <span className="inline-flex items-center gap-1 text-text transition-colors group-hover:text-primary">
                                            Read More
                                            <ArrowUpRight size={13} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}