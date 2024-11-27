

export default function TagIcon(props) {

    const { color } = props

    return (
        <div style={{ height: "12px", width: "12px", border: `2px solid ${color}` }} className="rounded-circle ms-2 me-2"></div>

    )

}