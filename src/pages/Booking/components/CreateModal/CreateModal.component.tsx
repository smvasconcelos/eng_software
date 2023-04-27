import { IFlights, flightsApi } from 'api/flights/flights';
import { IPilots, pilotsApi } from 'api/pilots/pilots';
import { PlaneItem } from 'pages/Flights/Flights.styles';
import { useEffect, useMemo, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { ICreateModalProps } from './CreateModal.types';

export function CreateModal({
  setVisible,
  callback,
  visible
}: ICreateModalProps): JSX.Element {
  const [pilots, setPilots] = useState<IPilots[]>([]);

  const [flights, setFlights] = useState<IFlights[]>([]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input, select');
    const [flightNumber, pilot, date] = [...inputs].map((input: HTMLFormElement) => {
      return input.value;
    })

    if (!flightNumber || !pilot || !date) return toast.warning('Preencha todos os campos para presseguir');

    callback({
      flight: flights.filter(item => item.flightNumber === parseInt(flightNumber))[0],
      pilot: pilots.filter(item => item.id === pilot)[0],
      date: date + ".00Z",
    })
    setVisible(false);
  }



  const getData = async () => {
    const {data:pilot, status: pilotsStatus} = await pilotsApi.getPilots();
    if(!pilotsStatus) return;
    setPilots(pilot || []);
    const {data:flight, status: flightStatus} = await flightsApi.getflights();
    if(!flightStatus) return;
    setFlights(flight || []);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <Modal show={visible} onHide={() => setVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Criar Voo</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId='flight' >
            <Form.Label>Voo</Form.Label>
            <Form.Select>
              {
                flights.length > 0 && flights.map((flight) =>
                  <option key={`origin-${flight.flightNumber}`}  value={flight.flightNumber}>{flight.flightNumber}</option>
                )
              }
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId='pilot' >
            <Form.Label>Piloto</Form.Label>
            <Form.Select>
              {
                pilots.length > 0 && pilots.map((pilot) =>
                  <option key={`origin-${pilot.id}`}  value={pilot.id}>{pilot.name}</option>
                )
              }
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Dia e Hora</Form.Label>
            <Form.Control type="datetime-local" placeholder="2022-01-01T01:20:001Z" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setVisible(false)} variant="secondary">Cancelar</Button>
          <Button type='submit' variant="primary">Criar Voo</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
