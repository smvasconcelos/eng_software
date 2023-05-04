import { useEffect, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import { MutatingDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { PlaneItem, Wrapper } from "./Passenger.styles";
import { CreateModal } from "./components/CreateModal/CreateModal.component";
import { EditModal } from "./components/EditModal/EditModal";
import { IPassenger, passengersApi } from "api/passenger/passenger";

export function Passenger(): JSX.Element {
  const [passengers, setPassengers] = useState<IPassenger[]>([]);
  const [passenger, setPassenger] = useState<IPassenger>();
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, seteditModal] = useState<boolean>(false);

  const getData = async () => {
    const {data, status} = await passengersApi.getPassengers();
    if(!status) return;
    setPassengers(data || []);
  }

  useEffect(() => {
    getData();
  }, []);

  const addPassenger = async (passenger: IPassenger) => {
    const {status, data} = await passengersApi.createPassenger(passenger);
    if (status) {
      setPassengers((old) => [...old, {...passenger , id: 'Não Retornado'}]);
      return toast.success('Piloto criado com sucesso')
    }
    toast.error('Erro ao criar passageiro');
  }

  const deletePassenger = async (passenger: IPassenger) => {
    if (window.confirm(`Deseja deletar o passageiro ${passenger.name}?`)) {
      const {status} = await passengersApi.deletePassenger(passenger.id || "");
      if (status) {
        setPassengers((old) => old.filter((item) => item.id === passenger.id ? undefined : item));
        return toast.success('Piloto deletado com sucesso')
      }
      toast.error('Erro ao deletar passageiro');
    }
  }

  const updatePassenger = async (passenger: IPassenger) => {
    console.log({passenger});
    const {status} = await passengersApi.updatePassenger(passenger.id || "", passenger);
    if (status) {
      setPassengers((old) => [...old.filter((item) => item.id === passenger.id ? undefined : item), passenger]);
      return toast.success('Piloto editado com sucesso')
    }
    toast.error('Erro ao editar passageiro');
  }

  return (
    <Wrapper>
      <CreateModal visible={createModal} setVisible={setCreateModal} callback={addPassenger} />
      <EditModal passenger={passenger || {
        country: '',
        cpf: '',
        id: '',
        miles: 2,
        name: '',
        passaport: '',
        password: '',
        surname: '',
      }} visible={editModal} setVisible={seteditModal} callback={updatePassenger} />
      <Container fluid>
        <Row className="justify-content-md-center" md={6} style={{ gap: 10 }}>
          <Button onClick={() => setCreateModal(true)} variant="success">Adicionar Passageiro</Button>
        </Row>
        <br />
        <Table striped bordered hover variant="dark" cellPadding={10}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>País</th>
              <th>CPF</th>
              <th>...</th>
            </tr>
          </thead>
          <tbody>
            {
              passengers.length > 0 ?
                passengers.map((passenger) => {
                  return (
                    <tr key={passenger.id}>
                      <td>{passenger.id}</td>
                      <td>{passenger.name + " " + passenger.surname}</td>
                      <td>{passenger.country}</td>
                      <td>{passenger.cpf}</td>
                      <td style={{ cursor: 'pointer', display: 'flex', gap: 10 }} >
                        <span onClick={() => deletePassenger(passenger)}>Deletar</span>
                        <span onClick={() => {
                          setPassenger(passenger);
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
