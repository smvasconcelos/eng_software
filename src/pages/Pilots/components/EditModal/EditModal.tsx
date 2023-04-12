import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IEditModalProps } from './EditModal.types';
import uuid from 'react-uuid';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { IPlanes, planesApi } from 'api/planes/planes';
import { modelsApi } from 'api/models/models';

export function EditModal({
  setVisible,
  callback,
  visible,
  pilot
}: IEditModalProps): JSX.Element {
  const [planes, setPlanes] = useState<IPlanes[]>([]);
  const [models, setModels] = useState<IModels[]>([]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input, select');
    const [name, planes] = [...inputs].map((input: HTMLFormElement) => {
      if(input.name === 'planes') {
        return [...input.options].filter(option => option.selected).map(option => option.value);
      }
      return input.value;
    })

    if (!name || !planes) return toast.warning('Preencha todos os campos para presseguir');

    callback({
      id: pilot?.id || uuid(),
      name: name,
      password: pilot?.password || '',
      planes: planes
    })
    setVisible(false);
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
    const model = models.filter((item) => item.id === id)
    return model.length > 0 ? model[0].model : id;
  }


  return (
    <Modal show={visible} onHide={() => setVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editando Piloto - {pilot?.name}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control defaultValue={pilot?.name} type="text" placeholder="Alvaro Degas" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Segure shift para selecionar multiplas aeronaves</Form.Label>
            <Form.Select defaultValue={planes.filter((plane) => pilot?.planes.includes(plane.id)).map((item) => item.id)} name='planes' multiple aria-label="Selecione as aeronaves">
              {
                planes.length > 0 && planes.map((plane) =>
                  <option key={plane.id} value={plane.id}>{getPlane(plane.model)}</option>
                )
              }
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setVisible(false)} variant="secondary">Cancelar</Button>
          <Button type='submit' variant="primary">Salvar Alterações</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
