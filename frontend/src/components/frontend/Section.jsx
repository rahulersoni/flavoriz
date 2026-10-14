export default function Section({ children, className = "", spacing = true, id = "" }) {

    const classes = [spacing && "section-space", className].filter(Boolean).join(" ");

    return (
        <section id={id} className={classes}>
            {children}
        </section>
    );
}