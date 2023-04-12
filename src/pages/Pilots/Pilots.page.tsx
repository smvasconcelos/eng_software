import { useEffect, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import { MutatingDots } from "react-loader-spinner";
import { IPilots, pilotsApi } from "api/pilots/pilots";
import { CreateModal } from "./components/CreateModal/CreateModal.component";
import { PlaneItem, Wrapper } from "./Pilots.styles";
import { toast } from "react-toastify";
import { EditModal } from "./components/EditModal/EditModal";
import { useNavigate } from "react-router-dom";
import { IPlanes, planesApi } from "api/planes/planes";
import { IModels, modelsApi } from "api/models/models";

export function Pilots(): JSX.Element {
  const [pilots, setPilots] = useState<IPilots[]>([]);
  const [pilot, setPilot] = useState<IPilots>();
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, seteditModal] = useState<boolean>(false);
  const [planes, setPlanes] = useState<IPlanes[]>([]);
  const [models, setModels] = useState<IModels[]>([]);
  const navigate = useNavigate();

  const getData = async () => {
    const data = await pilotsApi.getPilots();
    setPilots(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const addPilot = async (data: IPilots) => {
    const response = await pilotsApi.createPilot(data);
    if (response) {
      setPilots((old) => [...old, data]);
      return toast.success('Piloto criado com sucesso')
    }
    toast.error('Erro ao criar piloto');
  }

  const deletePilot = async (pilot: IPilots) => {
    if (window.confirm(`Deseja deletar o piloto ${pilot.name}?`)) {
      const response = await pilotsApi.deletePilot(pilot.id);
      if (response) {
        setPilots((old) => old.filter((item) => item.id === pilot.id ? undefined : item));
        return toast.success('Piloto deletado com sucesso')
      }
      toast.error('Erro ao deletar piloto');
    }
  }

  const updatePilot = async (pilot: IPilots) => {
    const response = await pilotsApi.updatePilot(pilot.id, pilot);
    if (response) {
      setPilots((old) => [...old.filter((item) => item.id === pilot.id ? undefined : item), pilot]);
      return toast.success('Piloto editado com sucesso')
    }
    toast.error('Erro ao editar piloto');
  }

  useEffect(() => {
    const getPlanes = async () => {
      setPlanes(await planesApi.getPlanes());
    }
    const getModels = async () => {
      setModels(await modelsApi.getModels());
    }

    getPlanes();
    getModels();
  }, [])

  const getPlane = (id:string) => {
    const pln = planes.filter((item) => item.id === id);
    if(pln.length == 0) return id;
    const model = models.filter((item) => item.id == pln[0].model)
    return model.length > 0 ? model[0].model : "Modelo deletado";
  }

  return (
    <Wrapper>
      <CreateModal visible={createModal} setVisible={setCreateModal} callback={addPilot} />
      <EditModal pilot={pilot} visible={editModal} setVisible={seteditModal} callback={updatePilot} />
      <Container fluid>
        <Row className="justify-content-md-center" md={6} style={{ gap: 10 }}>
          <Button onClick={() => setCreateModal(true)} variant="success">Adicionar Piloto</Button>
        </Row>
        <br />
        <Table striped bordered hover variant="dark" cellPadding={10}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Aeronaves</th>
              <th>...</th>
            </tr>
          </thead>
          <tbody>
            {
              pilots.length > 0 ?
                pilots.map((pilot) => {
                  return (
                    <tr key={pilot.id}>
                      <td>{pilot.id}</td>
                      <td>{pilot.name}</td>
                      <td>
                        {
                          pilot.planes.map((plane) => <PlaneItem key={plane}>{getPlane(plane)}</PlaneItem>)
                        }
                      </td>
                      <td style={{ cursor: 'pointer', display: 'flex', gap: 10 }} >
                        <span onClick={() => deletePilot(pilot)}>Deletar</span>
                        <span onClick={() => {
                          setPilot(pilot);
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
