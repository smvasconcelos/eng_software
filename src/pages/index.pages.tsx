import { useState } from "react"
import { Pilots } from "./Pilots/Pilots.page"
import { Planes } from "./Planes/Planes.page"
import { Models } from "./Models/Models.page"
import { Button } from "react-bootstrap"

type ActivePageType = "PILOTS" | "PLANES" | "MODELS"

export function Pages(): JSX.Element {
  const [activePage, setActivePage] = useState<ActivePageType>("PILOTS")
  return (
    <>
      <div style={{position: 'absolute', top: 10, left: 10, display: 'flex', gap: 10}}>
        <Button onClick={() => setActivePage("PILOTS")} variant="success">Pilotos</Button>
        <Button onClick={() => setActivePage("PLANES")} variant="success">Aeronaves</Button>
        <Button onClick={() => setActivePage("MODELS")} variant="success">Modelos</Button>
      </div>
      {activePage === "PILOTS" && <Pilots/>}
      {activePage === "PLANES" && <Planes/>}
      {activePage === "MODELS" && <Models/>}
    </>
  )
}
