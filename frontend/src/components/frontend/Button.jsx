import { Link } from "react-router-dom";

export default function Button({ children, variant = "primary", to, href, type = "button", className = "", ...props }) {
    const classes = `${getVariantClass(variant)} ${className}`;

    if (to) {
        return (
            <Link to={to} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} className={classes} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button type={type} className={classes} {...props}>
            {children}
        </button>
    );
}

function getVariantClass(variant) {
    const variants = {
        primary: "btn-primary",
        dark: "btn-dark",
        light: "btn-light",
        icon: "btn-icon",
    };

    return variants[variant] || variants.primary;
}