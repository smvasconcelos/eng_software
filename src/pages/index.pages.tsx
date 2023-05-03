import { useState } from "react"
import { Pilots } from "./Pilots/Pilots.page"
import { Planes } from "./Planes/Planes.page"
import { Models } from "./Models/Models.page"
import { Button } from "react-bootstrap"
import { Airports } from "./Airports/Airports.page"
import { Flights } from "./Flights/Flights.page"
import { Booking } from "./Booking/Booking.page"
import { Passenger } from "./Passenger/Passenger.page"

type ActivePageType = "PILOTS" | "PLANES" | "MODELS" | "AIRPORTS" | "FLIGHTS" | "BOOKING" | "PASSENGER"

export function Pages(): JSX.Element {
  const [activePage, setActivePage] = useState<ActivePageType>("PILOTS")
  return (
    <>
      <div style={{position: 'absolute', top: 10, left: 10, display: 'flex', gap: 10}}>
        <Button onClick={() => setActivePage("PILOTS")} variant="success">Pilotos</Button>
        <Button onClick={() => setActivePage("PLANES")} variant="success">Aeronaves</Button>
        <Button onClick={() => setActivePage("MODELS")} variant="success">Modelos</Button>
        <Button onClick={() => setActivePage("AIRPORTS")} variant="success">Aeroportos</Button>
        <Button onClick={() => setActivePage("FLIGHTS")} variant="success">Voos</Button>
        <Button onClick={() => setActivePage("BOOKING")} variant="success">Agendamento</Button>
        <Button onClick={() => setActivePage("PASSENGER")} variant="success">Passageiros</Button>
      </div>
      {activePage === "PILOTS" && <Pilots/>}
      {activePage === "PLANES" && <Planes/>}
      {activePage === "MODELS" && <Models/>}
      {activePage === "AIRPORTS" && <Airports />}
      {activePage === "FLIGHTS" && <Flights />}
      {activePage === "BOOKING" && <Booking />}
      {activePage === "PASSENGER" && <Passenger />}
    </>
  )
}
