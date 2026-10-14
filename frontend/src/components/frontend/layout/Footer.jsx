import Container from '../Container'

const Footer = () => {
    return (
        <footer id="contact" className="border-t border-[var(--color-border)] py-10">
            <Container className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                    <div className="text-xl font-extrabold tracking-[-0.05em]">
                        FLAV<span className="text-primary">O</span>RIZ
                    </div>

                    <p className="mt-1 text-sm text-muted">Good food starts with a good idea.</p>
                </div>

                <p className="text-sm text-soft">© 2026 Flavoriz. All rights reserved.</p>
            </Container>
        </footer>
    )
}

export default Footer