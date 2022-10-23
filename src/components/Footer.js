const Footer = () => {
    const today = new Date();
    
    return (
        <footer className="Footer">
            Copyright © {today.getFullYear()}
        </footer>
    )
}

export default Footer