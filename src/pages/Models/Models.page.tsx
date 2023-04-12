import { useEffect, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import { MutatingDots } from "react-loader-spinner";
import { CreateModal } from "./components/CreateModal/CreateModal.component";
import { Wrapper } from "./Planes.styles";
import { toast } from "react-toastify";
import { EditModal } from "./components/EditModal/EditModal";
import { IModels, modelsApi } from "api/models/models";
import { useNavigate } from "react-router-dom";

export function Models(): JSX.Element {
  const [models, setModels] = useState<IModels[]>([]);
  const [model, setModel] = useState<IModels | undefined>();
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, seteditModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const getData = async () => {
    const data = await modelsApi.getModels();
    setModels(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const addModel = async (data: IModels) => {
    const response = await modelsApi.createModel(data);
    if (response) {
      setModels((old) => [...old, data]);
      return toast.success('Modelo criado com sucesso')
    }
    toast.error('Erro ao criar Modelo');
  }

  const deleteModel = async (model: IModels) => {
    if (window.confirm(`Deseja deletar o Modelo de modelo ${model.model}?`)) {
      const response = await modelsApi.deleteModel(model.id);
      if (response) { }
      setModels((old) => old.filter((item) => item.id === model.id ? undefined : item));
      return toast.success('Modelo deletado com sucesso')
    }
    toast.error('Erro ao deletar Modelo');
  }

  const updateModel = async (model: IModels) => {
    const response = await modelsApi.updateModel(model.id, model);
    if (response) {
      setModels((old) => [...old.filter((item) => item.id === model.id ? undefined : item), model]);
      return toast.success('Modelo editado com sucesso')
    }
    toast.error('Erro ao editar Modelo');
  }

  return (
    <Wrapper>
      <CreateModal visible={createModal} setVisible={setCreateModal} callback={addModel} />
      <EditModal model={model} visible={editModal} setVisible={seteditModal} callback={updateModel} />
      <Container fluid>
        <Row className="justify-content-md-center" md={6} style={{ gap: 10 }}>
          <Button onClick={() => setCreateModal(true)} variant="success">Adicionar Modelo</Button>
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
              models.length > 0 ?
                models.map((model) => {
                  return (
                    <tr key={model.id}>
                      <td>{model.id}</td>
                      <td>{model.manufacturer}</td>
                      <td>{model.model}</td>
                      <td style={{ cursor: 'pointer', display: 'flex', gap: 10 }} >
                        <span onClick={() => deleteModel(model)}>Deletar</span>
                        <span onClick={() => {
                          setModel(model);
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
