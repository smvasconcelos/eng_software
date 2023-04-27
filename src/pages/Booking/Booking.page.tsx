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

export function Booking(): JSX.Element {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [booking, setBooking] = useState<IBooking>();
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, seteditModal] = useState<boolean>(false);
  const [planes, setPlanes] = useState<IPlanes[]>([]);
  const [airports, setAirports] = useState<IAirports[]>([]);

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
      setBookings((old) => [...old, {...booking, id: data?.id || ""}]);
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
          <Form.Group className="mb-3" controlId="filter-origin">
            <Form.Label>Avião</Form.Label>
            <Form.Select>
              <option  value={""}>TODOS</option>
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
              <option  value={""}>TODOS</option>
              {
                airports.length > 0 && airports.map((airport) =>
                  <option key={`destination-${airport.icao}`} value={airport.icao}>{airport.name}</option>
                )
              }
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="filter-datetime">
            <Form.Label>Data</Form.Label>
            <Form.Control type="datetime-local" />
          </Form.Group>
          <Button style={{height: 'fit-content'}} onClick={async () => {
            const origin = document.querySelector<HTMLInputElement>("#filter-origin")?.value || "";
            const destination = document.querySelector<HTMLInputElement>("#filter-destination")?.value || "";
            const date = document.querySelector<HTMLInputElement>("#filter-datetime")?.value || "";
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
            const {data, status} = await bookingApi.getBooking("", "?"+custom);
            console.log(custom)
            if(status && !!data) setBookings(Array.isArray(data) ? data : [data]);
            else toast.warning("Nenhum voo com essas informações")
          }} variant="info">Filtrar</Button >
        </Row>
        <br />
        <Table striped bordered hover variant="dark" cellPadding={10}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Numero de Voo</th>
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
                      <td>{booking.date}</td>
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
                </tr>

            }
          </tbody>
        </Table>
      </Container>

    </Wrapper >
  )
}
