


export default function Header({view, toggleView}) {
  // Today's Date
  const date = new Date()
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'long' }).slice(0, 3)
  const year = date.getFullYear()

  return(
    <nav className="header">
      <p className="header__name">Habit Tracker Garden</p>
      <p className="header__date">{`${day} ${month} ${year}`}</p>
      <button className="header__view-toggle" onClick={() => toggleView()}>{view}</button>
    </nav>
  )
}