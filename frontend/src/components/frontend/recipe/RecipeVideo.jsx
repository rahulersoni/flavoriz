
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play } from "lucide-react";

function getVideoSource(url = "") {
    try {
        const parsed = new URL(url);
        const host = parsed.hostname.toLowerCase().replace(/^www\./, "");

        const isYouTube = host === "youtube.com" || host.endsWith(".youtube.com");

        if (host === "youtu.be" || isYouTube) {
            let id = "";

            if (host === "youtu.be") {
                id = parsed.pathname.split("/").filter(Boolean)[0] || "";
            } else if (parsed.pathname === "/watch") {
                id = parsed.searchParams.get("v") || "";
            } else {
                id =
                    parsed.pathname.match(
                        /^\/(?:embed|shorts|live)\/([^/?]+)/
                    )?.[1] || "";
            }

            return id
                ? {
                    type: "youtube",
                    src: `https://www.youtube.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`,
                }
                : null;
        }

        if (host === "vimeo.com" || host.endsWith(".vimeo.com")) {
            const match = parsed.pathname.match(/\/(?:video\/)?(\d+)/);
            const id = match?.[1];

            return id
                ? {
                    type: "vimeo",
                    src: `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0`,
                }
                : null;
        }

        if (/\.(mp4|webm|ogg|ogv|m4v)(?:$)/i.test(parsed.pathname)) {
            const extension = parsed.pathname.split(".").pop().toLowerCase();

            return {
                type: "file",
                src: url,
                mime:
                    extension === "mp4" || extension === "m4v"
                        ? "video/mp4"
                        : extension === "webm"
                            ? "video/webm"
                            : extension === "ogv"
                                ? "video/ogg"
                                : "video/ogg",
            };
        }

        return null;
    } catch {
        return null;
    }
}

export default function RecipeVideo({
    url,
    poster,
    title = "Recipe video",
}) {
    const videoRef = useRef(null);
    const [started, setStarted] = useState(false);
    const source = getVideoSource(url);

    useEffect(() => {
        if (started && source?.type === "file" && videoRef.current) {
            videoRef.current.play().catch((error) => {
                console.warn("Video playback could not start:", error);
                setStarted(false);
            });
        }
    }, [started, source?.type, source?.src]);

    if (!source) return null;

    return (
        <section className="overflow-hidden rounded-[30px] bg-black">
            <div className="relative aspect-video w-full">
                {source.type === "file" && (
                    <video
                        ref={videoRef}
                        src={source.src}
                        poster={poster}
                        controls={started}
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 h-full w-full object-contain"
                        onEnded={() => setStarted(false)}
                    >
                        Your browser does not support video playback.
                    </video>
                )}

                {source.type !== "file" && started && (
                    <iframe
                        src={source.src}
                        title={title}
                        className="absolute inset-0 h-full w-full"
                        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                    />
                )}

                <AnimatePresence>
                    {!started && (
                        <motion.button
                            type="button"
                            onClick={() => setStarted(true)}
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.45 }}
                            className="absolute inset-0 z-10 flex items-center justify-center bg-black/25 text-white"
                            aria-label={`Play ${title}`}
                        >
                            {poster && (
                                <img
                                    src={poster}
                                    alt=""
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            )}

                            <span className="absolute inset-0 bg-black/20" />

                            <span className="relative z-10 grid size-16 place-items-center rounded-full bg-primary text-black shadow-2xl transition-transform hover:scale-110">
                                <Play size={24} fill="currentColor" />
                            </span>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
