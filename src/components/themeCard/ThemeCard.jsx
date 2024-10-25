import "./ThemeCard.css"

function ThemeCard({themeName, description, openDate, closingDate}) {

    return (
        <div className="open-theme-card">
            <h3>{themeName}</h3>
            <p>{description}</p>
            <p>Opens: {openDate}</p>
            <p>Closes: {closingDate}</p>
        </div>
    );
}

export default ThemeCard;