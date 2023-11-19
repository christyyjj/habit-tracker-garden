export default function Emoji({ label, symbol, onClick }) {
    return (
        <span
            className="garden__grid-plant"
            role="img"
            aria-label={label ? label : ""}
            aria-hidden={label ? "false" : "true"}
            onClick={onClick}
        >
            {symbol}
        </span>
    )
}