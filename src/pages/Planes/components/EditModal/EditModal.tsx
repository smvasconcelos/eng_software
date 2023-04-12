import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IEditModalProps } from './EditModal.types';
import uuid from 'react-uuid';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { IModels, modelsApi } from 'api/models/models';

export function EditModal({
  setVisible,
  callback,
  visible,
  plane
}: IEditModalProps): JSX.Element {
  const [models, setModels] = useState<IModels[]>([]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input, select');
    const [registration, model, date] = [...inputs].map((input: HTMLInputElement) => {
      return input.value;
    })

    if (!model || !model || !date) return toast.warning('Preencha todos os campos para presseguir');

    callback({
      id: plane?.id || uuid(),
      registration: registration,
      date: date,
      model: model,
    })
    setVisible(false);
  }

  const getData = async () => {
    const data = await modelsApi.getModels();
    setModels(data);
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <Modal show={visible} onHide={() => setVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editando avião - {plane?.registration}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="registration">
            <Form.Label>Matricula</Form.Label>
            <Form.Control defaultValue={plane?.registration}  type="text" placeholder="GOL" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Modelo da Aeronave</Form.Label>
            <Form.Select defaultValue={plane?.model}  name='planes'>
              {
                models.length > 0 && models.map((model) =>
                  <option key={model.id} value={model.id}>{model.model}</option>
                )
              }
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Data de Fabricação</Form.Label>
            <Form.Control defaultValue={plane?.date} type="date" placeholder="09/12/1998" />
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
