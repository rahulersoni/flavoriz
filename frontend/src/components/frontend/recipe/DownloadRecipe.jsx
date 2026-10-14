
import { ArrowRight } from "lucide-react";
import Reveal from "../../Reveal";

const DownloadRecipe = ({ recipe }) => {
    if (!recipe) return null;

    return (
        <Reveal delay={0.08}>
            <div className="mt-8 flex flex-col gap-6 rounded-lg bg-muted p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                        Recipe by
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                        {recipe.authorImage && (
                            <img src={recipe.authorImage} alt={recipe.author || "Recipe author"}
                                className="size-12 rounded-full object-cover"
                            />
                        )}

                        <div>
                            <p className="font-bold">
                                {recipe.author || "Flavoriz Team"}
                            </p>
                            <p className="text-xs text-muted">
                                {recipe.date || ""}
                            </p>
                        </div>
                    </div>
                </div>

                {recipe.recipePdfUrl && (
                    <a
                        href={recipe.recipePdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-dark inline-flex items-center gap-2"
                    >
                        Download Recipe PDF
                        <ArrowRight size={16} />
                    </a>
                )}
            </div>
        </Reveal>
    );
};

export default DownloadRecipe;
