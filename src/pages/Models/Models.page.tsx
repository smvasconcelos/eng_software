import { IModels, modelsApi } from "api/models/models";
import { useEffect, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import { MutatingDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { Wrapper } from "./Planes.styles";
import { CreateModal } from "./components/CreateModal/CreateModal.component";
import { EditModal } from "./components/EditModal/EditModal";

export function Models(): JSX.Element {
  const [models, setModels] = useState<IModels[]>([]);
  const [model, setModel] = useState<IModels | undefined>();
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, seteditModal] = useState<boolean>(false);

  const getData = async () => {
    const {data, status} = await modelsApi.getModels();
    if(!status) return
    setModels(data || []);
  }

  useEffect(() => {
    getData();
  }, []);

  const addModel = async (data: IModels) => {
    const {status, data: model} = await modelsApi.createModel(data);
    if (status) {
      setModels((old) => [...old, {...data, id: model?.id}]);
      return toast.success('Modelo criado com sucesso')
    }
    toast.error('Erro ao criar Modelo');
  }

  const deleteModel = async (model: IModels) => {
    if (window.confirm(`Deseja deletar o Modelo de modelo ${model.description}?`)) {
      const {status} = await modelsApi.deleteModel(model.id || "");
      if (status) {
        setModels((old) => old.filter((item) => item.id === model.id ? undefined : item));
        return toast.success('Modelo deletado com sucesso')
      }else{
        toast.error(`O modelo ${model.description} está em uso em uma aeronave ou piloto`);
      }
    }
  }

  const updateModel = async (model: IModels) => {
    const {status} = await modelsApi.updateModel(model.id || "", model);
    if (status) {
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
                      <td>{model.description}</td>
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
