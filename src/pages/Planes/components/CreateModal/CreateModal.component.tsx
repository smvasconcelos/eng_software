import { InputHTMLAttributes, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ICreateModalProps } from './CreateModal.types';
import { toast } from "react-toastify";
import uuid from 'react-uuid';
import { IModels, modelsApi } from 'api/models/models';

export function CreateModal({
  setVisible,
  callback,
  visible
}: ICreateModalProps): JSX.Element {
  const [models, setModels] = useState<IModels[]>([]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input, select');
    const [registration, model, date] = [...inputs].map((input: HTMLInputElement) => {
      return input.value;
    })

    if (!model || !registration || !date) return toast.warning('Preencha todos os campos para presseguir');

    callback({
      id: uuid(),
      model: model,
      date: date,
      registration: registration,
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
        <Modal.Title>Criar Avião</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="registration">
            <Form.Label>Matricula</Form.Label>
            <Form.Control type="text" placeholder="GOL" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Modelo da Aeronave</Form.Label>
            <Form.Select name='planes'>
              {
                models.length > 0 && models.map((model) =>
                  <option key={model.id} value={model.id}>{model.model}</option>
                )
              }
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Data de Fabricação</Form.Label>
            <Form.Control type="date" placeholder="09/12/1998" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setVisible(false)} variant="secondary">Cancelar</Button>
          <Button type='submit' variant="primary">Criar Avião</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
