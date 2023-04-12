import { useEffect, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import { MutatingDots } from "react-loader-spinner";
import { CreateModal } from "./components/CreateModal/CreateModal.component";
import { Wrapper } from "./Planes.styles";
import { toast } from "react-toastify";
import { EditModal } from "./components/EditModal/EditModal";
import { IPlanes, planesApi } from "api/planes/planes";
import { useNavigate } from "react-router-dom";

export function Planes(): JSX.Element {
  const [planes, setPlanes] = useState<IPlanes[]>([]);
  const [plane, setPlane] = useState<IPlanes | undefined>();
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, seteditModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const getData = async () => {
    const data = await planesApi.getPlanes();
    setPlanes(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const addPlane = async (data: IPlanes) => {
    const response = await planesApi.createPlane(data);
    if (response) {
      setPlanes((old) => [...old, data]);
      return toast.success('Avião criado com sucesso')
    }
    toast.error('Erro ao criar avião');
  }

  const deletePlane = async (plane: IPlanes) => {
    if (window.confirm(`Deseja deletar o avião de modelo ${plane.model}?`)) {
      const response = await planesApi.deletePlane(plane.id);
      if (response) { }
      setPlanes((old) => old.filter((item) => item.id === plane.id ? undefined : item));
      return toast.success('avião deletado com sucesso')
    }
    toast.error('Erro ao deletar avião');
  }

  const updatePlane = async (plane: IPlanes) => {
    const response = await planesApi.updatePlane(plane.id, plane);
    if (response) {
      setPlanes((old) => [...old.filter((item) => item.id === plane.id ? undefined : item), plane]);
      return toast.success('avião editado com sucesso')
    }
    toast.error('Erro ao editar avião');
  }

  return (
    <Wrapper>
      <CreateModal visible={createModal} setVisible={setCreateModal} callback={addPlane} />
      <EditModal plane={plane} visible={editModal} setVisible={seteditModal} callback={updatePlane} />
      <Container fluid>
        <Row className="justify-content-md-center" md={6} style={{ gap: 10 }}>
          <Button onClick={() => setCreateModal(true)} variant="success">Adicionar avião</Button>
          <Button onClick={() => navigate("/pilots")} variant="success">Navegar para pilotos</Button>
        </Row>
        <br />
        <Table striped bordered hover variant="dark" cellPadding={10}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fabricante</th>
              <th>Modelo</th>
              <th>...</th>
            </tr>
          </thead>
          <tbody>
            {
              planes.length > 0 ?
                planes.map((plane) => {
                  return (
                    <tr key={plane.id}>
                      <td>{plane.id}</td>
                      <td>{plane.manufacturer}</td>
                      <td>{plane.model}</td>
                      <td style={{ cursor: 'pointer', display: 'flex', gap: 10 }} >
                        <span onClick={() => deletePlane(plane)}>Deletar</span>
                        <span onClick={() => {
                          setPlane(plane);
                          seteditModal(true);
                        }}>Editar</span>
                      </td>
                    </tr>
                  )
                })
                :
                  <tr>
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
