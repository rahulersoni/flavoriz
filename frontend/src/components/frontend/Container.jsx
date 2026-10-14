export default function Container({ children, className = "" }) {
    return (
        <div className={`container-site ${className}`}>
            {children}
        </div>
    );
}