import { useEffect, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import { MutatingDots } from "react-loader-spinner";
import { CreateModal } from "./components/CreateModal/CreateModal.component";
import { Wrapper } from "./Planes.styles";
import { toast } from "react-toastify";
import { EditModal } from "./components/EditModal/EditModal";
import { IPlanes, planesApi } from "api/planes/planes";
import { useNavigate } from "react-router-dom";
import { IModels, modelsApi } from "api/models/models";

export function Planes(): JSX.Element {
  const [planes, setPlanes] = useState<IPlanes[]>([]);
  const [plane, setPlane] = useState<IPlanes | undefined>();
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, seteditModal] = useState<boolean>(false);

  const getData = async () => {
    const {data, status} = await planesApi.getPlanes();
    if(!status) return;
    setPlanes(data || []);
  }

  useEffect(() => {
    getData();
  }, []);

  const addPlane = async (plane: IPlanes) => {
    const { status }  = await planesApi.createPlane(plane);
    if (status) {
      setPlanes((old) => [...old, plane]);
      return toast.success('Avião criado com sucesso')
    }
    toast.error('Erro ao criar avião');
  }

  const deletePlane = async (plane: IPlanes) => {
    if (window.confirm(`Deseja deletar o avião de matricula ${plane.registration}?`)) {
      const {status} = await planesApi.deletePlane(plane.registration || "");
      if (status) {
        setPlanes((old) => old.filter((item) => item.registration === plane.registration ? undefined : item));
        return toast.success('avião deletado com sucesso')
      }
      toast.error('Erro ao deletar avião');
    }
  }

  const updatePlane = async (plane: IPlanes) => {
    const { status } = await planesApi.updatePlane(plane.registration || "", plane);
    if (status) {
      setPlanes((old) => [...old.filter((item) => item.registration === plane.registration ? undefined : item), plane]);
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
        </Row>
        <br />
        <Table striped bordered hover variant="dark" cellPadding={10}>
          <thead>
            <tr>
              <th>Matricula</th>
              <th>Data</th>
              <th>Modelo</th>
              <th>...</th>
            </tr>
          </thead>
          <tbody>
            {
              planes.length > 0 ?
                planes.map((plane) => {
                  return (
                    <tr key={plane.registration}>
                      <td>{plane.registration}</td>
                      <td>
                        {plane.manufacturingDate.replace('.00Z', '').replace("T", " ").replaceAll("-", "/")}</td>
                      <td>{plane.model.description}</td>
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
