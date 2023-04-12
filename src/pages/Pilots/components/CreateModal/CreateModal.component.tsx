import { InputHTMLAttributes, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ICreateModalProps } from './CreateModal.types';
import { toast } from "react-toastify";
import uuid from 'react-uuid';
import { IPlanes, planesApi } from 'api/planes/planes';
import { IModels, modelsApi } from 'api/models/models';

export function CreateModal({
  setVisible,
  callback,
  visible
}: ICreateModalProps): JSX.Element {

  const [models, setModels] = useState<IModels[]>([]);
  const [planes, setPlanes] = useState<IPlanes[]>([]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input, select');
    const [name, password, planes] = [...inputs].map((input: HTMLFormElement) => {
      if(input.name === 'planes') {
        return [...input.options].filter(option => option.selected).map(option => option.value);
      }
      return input.value;
    })

    if (!name || !password || !planes) return toast.warning('Preencha todos os campos para presseguir');
    callback({
      id: uuid(),
      name: name,
      password: password,
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
        <Modal.Title>Criar Piloto</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Alvaro Degas" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Segure shift para selecionar multiplas aeronaves</Form.Label>
            <Form.Select name='planes' multiple aria-label="Selecione as aeronaves">
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
          <Button type='submit' variant="primary">Criar Piloto</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
