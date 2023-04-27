import { IModels, modelsApi } from 'api/models/models';
import { IPlanes, planesApi } from 'api/planes/planes';
import { useEffect, useMemo, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { IEditModalProps } from './EditModal.types';
import { IAirports, airportApi } from 'api/airports/airports';
import { PlaneItem } from 'pages/Flights/Flights.styles';

export function EditModal({
  setVisible,
  callback,
  visible,
  flights
}: IEditModalProps): JSX.Element {
  const [planes, setPlanes] = useState<IPlanes[]>([]);
  const [timesInput, setTimesInput] = useState<string[]>(flights.times || []);
  const daysOfWeek = useMemo(() => {
    return ["Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sabado", "Domingo"]
  }, [])
  const [airports, setAirports] = useState<IAirports[]>([]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input, select');
    const [flightNumber, plane, destination, origin, daysOfWeek, times] = [...inputs].map((input: HTMLFormElement) => {
      if(input.id === 'days') {
        return [...input.options].filter(option => option.selected).map(option => option.value);
      }
      return input.value;
    })

    if (!flightNumber || !plane ||  !origin ||  !destination ||  !daysOfWeek ||  !timesInput ) return toast.warning('Preencha todos os campos para presseguir');

    if(origin === destination) return toast.warning('O destino deve ser diferente da origem');


    callback({
      flightNumber: parseInt(flightNumber),
      plane: planes.filter(item => item.registration === plane)[0],
      source: airports.filter((item) => item.icao === origin)[0],
      destination: airports.filter((item) => item.icao === destination)[0],
      daysOfWeek,
      times: timesInput,
      tileLenght: flights.tileLenght,
    })
    setVisible(false);
  }



  const getData = async () => {
    const {data:plane, status: planeStatus} = await planesApi.getPlanes();
    if(!planeStatus) return;
    setPlanes(plane || []);
    const {data:airport, status: airportStatus} = await airportApi.getAirports();
    if(!airportStatus) return;
    setAirports(airport || []);
  }

  useEffect(() => {
    getData();
    setTimesInput(flights.times);
  }, [flights])

  return (
    <Modal show={visible} onHide={() => setVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editando Voo - ${flights.flightNumber}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="flightNumber">
            <Form.Label>Número de Voo</Form.Label>
            <Form.Control  defaultValue={flights.flightNumber} disabled type="number" placeholder="123123123123" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="plane">
            <Form.Label>Avião</Form.Label>
            <Form.Select defaultValue={flights.plane.registration}>
              {
                planes.length > 0 && planes.map((plane) =>
                  <option key={`destination-${plane.registration}`} value={plane.registration}>{plane.model.description}</option>
                )
              }
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="destination">
            <Form.Label>Destino</Form.Label>
            <Form.Select defaultValue={flights.destination.icao}>
              {
                airports.length > 0 && airports.map((airport) =>
                  <option key={`destination-${airport.icao}`} value={airport.icao}>{airport.name}</option>
                )
              }
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId='origin' >
            <Form.Label>Origem</Form.Label>
            <Form.Select defaultValue={flights.source.icao}>
              {
                airports.length > 0 && airports.map((airport) =>
                  <option key={`origin-${airport.icao}`}  value={airport.icao}>{airport.name}</option>
                )
              }
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId='days' >
            <Form.Label>Dias</Form.Label>
            <Form.Select defaultValue={flights.daysOfWeek} multiple>
              {
                daysOfWeek.length > 0 && daysOfWeek.map((day) =>
                  <option key={`origin-${day}`}  value={day}>{day}</option>
                )
              }
            </Form.Select>
          </Form.Group>
          <Form.Group  className="mb-3" controlId="times">
            <Form.Label>Horários - Clique em um item para remover o tempo</Form.Label>
            <Form.Control type="time" placeholder="10:30" />
            <br/>
            <PlaneItem onClick={() => {
              const value = document.querySelector<HTMLInputElement>("#times")?.value || "";
              if(timesInput.includes(value)) return toast.warning("Horário já cadastrado");
              setTimesInput((prev) => [...prev, value]);
            }} style={{color: 'white', cursor: 'pointer'}}>Salvar Tempo</PlaneItem>
          </Form.Group>
          {
            timesInput.length > 0 && timesInput.map((item, idx) => {
              return(
                <PlaneItem style={{color: 'white', cursor: 'pointer'}} onClick={() => {
                  setTimesInput((prev) => prev.filter((prevItem) => prevItem !== item))
                }} key={idx}>{item}</PlaneItem>
              )
            })
          }
          <br/>
          <br/>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setVisible(false)} variant="secondary">Cancelar</Button>
          <Button type='submit' variant="primary">Editar Voo</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
