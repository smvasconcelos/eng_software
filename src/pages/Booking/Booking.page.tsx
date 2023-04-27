import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Table } from "react-bootstrap";
import { MutatingDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { CreateModal } from "./components/CreateModal/CreateModal.component";
import { EditModal } from "./components/EditModal/EditModal";
import { PlaneItem, Wrapper } from "./Booking.styles";
import { IPlanes, planesApi } from "api/planes/planes";
import { IAirports, airportApi } from "api/airports/airports";
import { IBooking, bookingApi } from "api/booking/booking";
import { IPilots, pilotsApi } from "api/pilots/pilots";
import { IModels, modelsApi } from "api/models/models";

export function Booking(): JSX.Element {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [booking, setBooking] = useState<IBooking>();
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, seteditModal] = useState<boolean>(false);
  const [planes, setPlanes] = useState<IPlanes[]>([]);
  const [airports, setAirports] = useState<IAirports[]>([]);
  const [models, setModels] = useState<IModels[]>([]);
  const [pilots, setPilots] = useState<IPilots[]>([]);

  const getData = async () => {
    const {data, status} = await bookingApi.getBookings();
    if(!status) return;
    setBookings(data || []);
  }

  useEffect(() => {
    getData();
  }, []);

  const addBooking = async (booking: IBooking) => {
    const {status, data} = await bookingApi.createBooking(booking);
    if (status) {
      setBookings((old) => Array.isArray(old) ? [ ...old, {...booking, id: booking.id}] : [{...booking, id: booking.id}]);
      return toast.success('Voo criado com sucesso')
    }
    toast.error('Erro ao criar Voo');
  }

  const deleteFlights = async (bookings: IBooking) => {
    if (window.confirm(`Deseja deletar o Voo ${bookings.id}?`)) {
      const {status} = await bookingApi.deleteBooking(bookings.id || "");
      if (status) {
        setBookings((old) => old.filter((item) => item.id === bookings.id ? undefined : item));
        return toast.success('Voo deletado com sucesso')
      }
      toast.error('Erro ao excluir voo');
    }
  }

  const updateFlights = async (bookings: IBooking) => {
    const {status} = await bookingApi.updateBooking(bookings.id || "", bookings);
    if (status) {
      setBookings((old) => [...old.filter((item) => item.id === bookings.id ? undefined : item), bookings]);
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
    const {data:pilot, status: PilotStatus} = await pilotsApi.getPilots();
    if(!PilotStatus) return;
    setPilots(pilot || []);
    const {data:model, status: ModelStatus} = await modelsApi.getModels();
    if(!ModelStatus) return;
    setModels(model || []);
  }

  useEffect(() => {
    getData2();
  }, [])

  return (
    <Wrapper>
      <CreateModal visible={createModal} setVisible={setCreateModal} callback={addBooking} />
      <EditModal bookings={booking ?? {
        date: '',
        id: "",
        flight: {
          daysOfWeek: [""],
          flightNumber: 0,
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
        },
        pilot: {
          abbleToFligh: [],
          name: "",
          id: "",
          password: ""
        }
      }} visible={editModal} setVisible={seteditModal} callback={updateFlights} />
      <Container fluid>
        <Row className="justify-content-md-center" md={6} style={{ gap: 10, alignItems:'center' }}>
          <Button style={{height: 'fit-content'}} onClick={() => setCreateModal(true)} variant="success">Adicionar Agendamento</Button>
          <Form.Group className="mb-3" controlId="filter-plane">
            <Form.Label style={{color: "#fff"}}>Avião</Form.Label>
            <Form.Select>
              <option  value={""}>TODOS</option>
              {
                planes.length > 0 && planes.map((plane) =>
                  <option key={`origin-${plane.registration}`} value={plane.registration}>{plane.registration}</option>
                )
              }
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="filter-destination">
            <Form.Label style={{color: "#fff"}}>Destino</Form.Label>
            <Form.Select>
              <option  value={""}>TODOS</option>
              {
                airports.length > 0 && airports.map((airport) =>
                  <option key={`destination-${airport.icao}`} value={airport.icao}>{airport.name}</option>
                )
              }
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="filter-origin">
            <Form.Label style={{color: "#fff"}}>Origem</Form.Label>
            <Form.Select>
              <option  value={""}>TODOS</option>
              {
                airports.length > 0 && airports.map((airport) =>
                  <option key={`destination-${airport.icao}`} value={airport.icao}>{airport.name}</option>
                )
              }
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="filter-model">
            <Form.Label style={{color: "#fff"}}>Modelo</Form.Label>
            <Form.Select>
              <option  value={""}>TODOS</option>
              {
                models.length > 0 && models.map((models) =>
                  <option key={`destination-${models.id}`} value={models.description}>{models.description}</option>
                )
              }
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="filter-pilot">
            <Form.Label style={{color: "#fff"}}>Pilotos</Form.Label>
            <Form.Select>
              <option  value={""}>TODOS</option>
              {
                pilots.length > 0 && pilots.map((pilot) =>
                  <option key={`destination-${pilot.id}`} value={pilot.id}>{pilot.name}</option>
                )
              }
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="filter-datetime">
            <Form.Label style={{color: "#fff"}}>Data</Form.Label>
            <Form.Control type="datetime-local" />
          </Form.Group>
          <Button style={{height: 'fit-content'}} onClick={async () => {
            const origin = document.querySelector<HTMLInputElement>("#filter-origin")?.value || "";
            const destination = document.querySelector<HTMLInputElement>("#filter-destination")?.value || "";
            const date = document.querySelector<HTMLInputElement>("#filter-datetime")?.value || "";
            const pilot = document.querySelector<HTMLInputElement>("#filter-pilot")?.value || "";
            const plane = document.querySelector<HTMLInputElement>("#filter-plane")?.value || "";
            const model = document.querySelector<HTMLInputElement>("#filter-model")?.value || "";
            if((origin === destination) && !(origin !== 'TODOS' && destination !== "TODOS")) return toast.warning("Destino e origem devem ser diferentes")
            var custom = "";
            if(origin !== 'TODOS' && origin !== ''){
              custom += `&source=${origin}`
            }
            if(destination !== 'TODOS'  && destination !== ''){
              custom += `&destination=${destination}`
            }
            if(date !== ''){
              custom += `&date=${date + ".00Z"}`
            }
            if(pilot !== ''){
              custom += `&pilot=${pilot}`
            }
            if(plane !== ''){
              custom += `&plane=${plane}`
            }
            if(model !== ''){
              custom += `&model=${model}`
            }
            const {data, status} = await bookingApi.getBooking("",custom);
            if(status && data) setBookings(Array.isArray(data) ? data : bookings);
            else toast.warning("Nenhum voo com essas informações")
          }} variant="info">Filtrar</Button >
        </Row>
        <br />
        <Table striped bordered hover variant="dark" cellPadding={10}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Numero de Voo</th>
              <th>Modelo</th>
              <th>Data</th>
              <th>Piloto</th>
              <th>...</th>
            </tr>
          </thead>
          <tbody>
            {
              bookings.length > 0 ?
                bookings.map((booking) => {
                  return (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.flight.flightNumber}</td>
                      <td>{booking.flight.plane.model.description}</td>
                      <td>{new Date(Date.apply(booking.date)).toLocaleDateString() +  " " + new Date(Date.apply(booking.date)).toLocaleTimeString()}</td>
                      <td>{booking.pilot.name}  </td>
                      <td style={{ cursor: 'pointer', display: 'flex', gap: 10 }} >
                        <span onClick={() => deleteFlights(booking)}>Deletar</span>
                        <span onClick={() => {
                          setBooking(booking);
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
