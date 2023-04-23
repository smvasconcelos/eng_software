import { useEffect, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import { MutatingDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { PlaneItem, Wrapper } from "./Airports.styles";
import { CreateModal } from "./components/CreateModal/CreateModal.component";
import { EditModal } from "./components/EditModal/EditModal";
import { IAirports, airportApi } from "api/airports/airports";

export function Airports(): JSX.Element {
  const [airports, setAirports] = useState<IAirports[]>([]);
  const [airport, setAirport] = useState<IAirports>();
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, seteditModal] = useState<boolean>(false);

  const getData = async () => {
    const {data, status} = await airportApi.getAirports();
    if(!status) return;
    setAirports(data || []);
  }

  useEffect(() => {
    getData();
  }, []);

  const addAirports = async (airport: IAirports) => {
    const {status, data} = await airportApi.createAirport(airport);
    if (status) {
      setAirports((old) => [...old, {...airport, id: data?.id}]);
      return toast.success('Aeroporto criado com sucesso')
    }
    toast.error('Erro ao criar Aeroporto');
  }

  const deleteAirport = async (airport: IAirports) => {
    if (window.confirm(`Deseja deletar o Aeroporto ${airport.name}?`)) {
      const {status} = await airportApi.deleteAirport(airport.id || "");
      if (status) {
        setAirports((old) => old.filter((item) => item.id === airport.id ? undefined : item));
        return toast.success('Aeroporto deletado com sucesso')
      }
      toast.error('Erro ao deletar Aeroporto');
    }
  }

  const updateAirport = async (airport: IAirports) => {
    console.log({airport});
    const {status} = await airportApi.updateAirport(airport.id || "", airport);
    if (status) {
      setAirports((old) => [...old.filter((item) => item.id === airport.id ? undefined : item), airport]);
      return toast.success('Aeroporto editado com sucesso')
    }
    toast.error('Erro ao editar Aeroporto');
  }

  return (
    <Wrapper>
      <CreateModal visible={createModal} setVisible={setCreateModal} callback={addAirports} />
      <EditModal airport={airport || {
        height: 100,
        name: "asd",
        locations: [0, 1]
      }} visible={editModal} setVisible={seteditModal} callback={updateAirport} />
      <Container fluid>
        <Row className="justify-content-md-center" md={6} style={{ gap: 10 }}>
          <Button onClick={() => setCreateModal(true)} variant="success">Adicionar Aeroporto</Button>
        </Row>
        <br />
        <Table striped bordered hover variant="dark" cellPadding={10}>
          <thead>
            <tr>
              <th>ID</th>
              <th>ICAO</th>
              <th>Name</th>
              <th>...</th>
            </tr>
          </thead>
          <tbody>
            {
              airports.length > 0 ?
                airports.map((airport) => {
                  return (
                    <tr key={airport.id}>
                      <td>{airport.id}</td>
                      <td>{airport.icao}</td>
                      <td>{airport.name}</td>
                      <td style={{ cursor: 'pointer', display: 'flex', gap: 10 }} >
                        <span onClick={() => deleteAirport(airport)}>Deletar</span>
                        <span onClick={() => {
                          setAirport(airport);
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
