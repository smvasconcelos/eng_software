import { IModels, modelsApi } from 'api/models/models';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { ICreateModalProps } from './CreateModal.types';

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

    console.log([registration, model, date]);
    if (!model || !registration || !date) return toast.warning('Preencha todos os campos para presseguir');

    callback({
      model: models.filter(item => item.id === model)[0],
      manufacturingDate: date,
      registration: registration,
    })
    setVisible(false);
  }

  const getData = async () => {
    const {data} = await modelsApi.getModels();
    const newData = data?.map((item) => {
      return {
        description: item.description,
        id: item.id,
        manufacturer: item.manufacturer,
      };
    })
    setModels(newData || []);
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
            <Form.Control type="text" placeholder="201720309" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="model">
            <Form.Label>Modelo da Aeronave</Form.Label>
            <Form.Select name='model'>
              {
                models.length > 0 && models.map((model) =>
                  <option key={model.id} value={model.id}>{model.description}</option>
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
