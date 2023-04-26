import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Table } from "react-bootstrap";
import { MutatingDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { CreateModal } from "./components/CreateModal/CreateModal.component";
import { EditModal } from "./components/EditModal/EditModal";
import { IFlights, flightsApi } from "api/flights/flights";
import { PlaneItem, Wrapper } from "./Flights.styles";
import { planesApi } from "api/planes/planes";
import { airportApi } from "api/airports/airports";

export function Flights(): JSX.Element {
  const [flights, setFlights] = useState<IFlights[]>([]);
  const [flight, setFlight] = useState<IFlights>();
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, seteditModal] = useState<boolean>(false);
  const [planes, setPlanes] = useState<IPlanes[]>([]);
  const [airports, setAirports] = useState<IAirports[]>([]);

  const getData = async () => {
    const {data, status} = await flightsApi.getflights();
    if(!status) return;
    setFlights(data || []);
  }

  useEffect(() => {
    getData();
  }, []);

  const addFlights = async (flight: IFlights) => {
    const {status, data} = await flightsApi.createFlights(flight);
    if (status) {
      setFlights((old) => [...old, {...flight, id: flight.flightNumber}]);
      return toast.success('Voo criado com sucesso')
    }
    toast.error('Erro ao criar Voo');
  }

  const deleteFlights = async (flights: IFlights) => {
    if (window.confirm(`Deseja deletar o Voo ${flights.flightNumber}?`)) {
      const {status} = await flightsApi.deleteFlights(flights.flightNumber || "");
      if (status) {
        setFlights((old) => old.filter((item) => item.flightNumber === flights.flightNumber ? undefined : item));
        return toast.success('Voo deletado com sucesso')
      }
      toast.error('Erro ao excluir voo');
    }
  }

  const updateFlights = async (flights: IFlights) => {
    const {status} = await flightsApi.updateFlights(flights.flightNumber || "", flights);
    if (status) {
      setFlights((old) => [...old.filter((item) => item.flightNumber === flights.flightNumber ? undefined : item), flights]);
      return toast.success('Voo editado com sucesso')
    }
    toast.error('Erro ao editar Voo');
  }

  const getData2 = async () => {
    const {data:plane, status: planeStatus} = await planesApi.getPlanes();
    if(!planeStatus) return;
    setPlanes(plane || []);
    const {data:airport, status: airportStatus} = await airportApi.getAirports();
    if(!airportStatus) return;
    setAirports(airport || []);
  }

  useEffect(() => {
    getData2();
  }, [])

  return (
    <Wrapper>
      <CreateModal visible={createModal} setVisible={setCreateModal} callback={addFlights} />
      <EditModal flights={flight ?? {
        daysOfWeek: [""],
        flightNumber: "",
        destination: {
          altitude: 100,
          name: "asd",
          location: [0, 1]
        },
        plane: {
          manufacturingDate: '',
          model: {
            description: "",
            manufacturer: "",
            id: ""
          },
          registration: ""
        },
        source: {
          altitude: 100,
          name: "asd",
          location: [0, 1]
        },
        tileLenght: "",
        times: [""],
      }} visible={editModal} setVisible={seteditModal} callback={updateFlights} />
      <Container fluid>
        <Row className="justify-content-md-center" md={6} style={{ gap: 10, alignItems:'center' }}>
          <Button style={{height: 'fit-content'}} onClick={() => setCreateModal(true)} variant="success">Adicionar Voo</Button>
          <Form.Group className="mb-3" controlId="filter-origin">
            <Form.Label>Avião</Form.Label>
            <Form.Select>
              {
                airports.length > 0 && airports.map((airport) =>
                  <option key={`origin-${airport.icao}`} value={airport.icao}>{airport.name}</option>
                )
              }
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="filter-destination">
            <Form.Label>Destino</Form.Label>
            <Form.Select>
              {
                airports.length > 0 && airports.map((airport) =>
                  <option key={`destination-${airport.icao}`} value={airport.icao}>{airport.name}</option>
                )
              }
            </Form.Select>
          </Form.Group>
          <Button style={{height: 'fit-content'}} onClick={async () => {
            const origin = document.querySelector<HTMLInputElement>("#filter-origin")?.value || "";
            const destination = document.querySelector<HTMLInputElement>("#filter-destination")?.value || "";
            if(origin === destination) return toast.warning("Destino e origem devem ser diferentes")
            const {data, status} = await flightsApi.getFlight("", origin, destination)
            console.log({data});
            if(status && !!data) setFlights(Array.isArray(data) ? data : [data]);
            else toast.warning("Nenhum voo com essas informações")
          }} variant="info">Filtrar</Button >
        </Row>
        <br />
        <Table striped bordered hover variant="dark" cellPadding={10}>
          <thead>
            <tr>
              <th>Numero de Voo</th>
              <th>Avião</th>
              <th>Destino</th>
              <th>Origem</th>
              <th>Horarios</th>
              <th>Dias da Semana</th>
              <th>...</th>
            </tr>
          </thead>
          <tbody>
            {
              flights.length > 0 ?
                flights.map((flight) => {
                  return (
                    <tr key={flight.flightNumber}>
                      <td>{flight.flightNumber}</td>
                      <td>{flight.plane.model.description}</td>
                      <td>{flight.destination.icao}</td>
                      <td>{flight.source.icao}</td>
                      <td>
                        {
                          flight.times && flight.times.map((flight) => <PlaneItem key={flight}>{flight}</PlaneItem>)
                        }
                      </td>
                      <td>
                        {
                          flight.daysOfWeek && flight.daysOfWeek.map((day) => <PlaneItem key={day}>{day}</PlaneItem>)
                        }
                      </td>
                      <td style={{ cursor: 'pointer', display: 'flex', gap: 10 }} >
                        <span onClick={() => deleteFlights(flight)}>Deletar</span>
                        <span onClick={() => {
                          setFlight(flight);
                          seteditModal(true);
                        }}>Editar</span>
                      </td>
                    </tr>
                  )
                })
                : <tr>
                  <td>
                    <MutatingDots
                      height="100"
                      width="100"
                      color="#B3CB39"
                      secondaryColor='#6D771F'
                      radius='12.5'
                      ariaLabel="mutating-dots-loading"
                      wrapperStyle={{ margin: '0 auto' }}
                      wrapperClass=""
                      visible={true}
                    />
                  </td>
                  <td>
                    <MutatingDots
                      height="100"
                      width="100"
                      color="#B3CB39"
                      secondaryColor='#6D771F'
                      radius='12.5'
                      ariaLabel="mutating-dots-loading"
                      wrapperStyle={{ margin: '0 auto' }}
                      wrapperClass=""
                      visible={true}
                    />
                  </td>
                  <td>
                    <MutatingDots
                      height="100"
                      width="100"
                      color="#B3CB39"
                      secondaryColor='#6D771F'
                      radius='12.5'
                      ariaLabel="mutating-dots-loading"
                      wrapperStyle={{ margin: '0 auto' }}
                      wrapperClass=""
                      visible={true}
                    />
                  </td>
                  <td>
                    <MutatingDots
                      height="100"
                      width="100"
                      color="#B3CB39"
                      secondaryColor='#6D771F'
                      radius='12.5'
                      ariaLabel="mutating-dots-loading"
                      wrapperStyle={{ margin: '0 auto' }}
                      wrapperClass=""
                      visible={true}
                    />
                  </td>
                </tr>

            }
          </tbody>
        </Table>
      </Container>

    </Wrapper >
  )
}
