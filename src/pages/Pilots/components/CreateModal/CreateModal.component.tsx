import { IModels, modelsApi } from 'api/models/models';
import { IPlanes, planesApi } from 'api/planes/planes';
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
    const [name, password, modelsInput] = [...inputs].map((input: HTMLFormElement) => {
      if(input.name === 'models') {
        return [...input.options].filter(option => option.selected).map(option => option.value);
      }
      return input.value;
    })

    if (!name || !password || !modelsInput) return toast.warning('Preencha todos os campos para presseguir');

    callback({
      name: name,
      password: password,
      abbleToFligh:  models.filter((item) => modelsInput.includes(item.id) ? item : null)
    })
    setVisible(false);
  }

  useEffect(() => {
    const getModels = async () => {
      setModels((await modelsApi.getModels()).data || []);
    }

    getModels();
  }, [])


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
            <Form.Select name='models' multiple aria-label="Selecione as aeronaves">
              {
                models.length > 0 && models.map((model) =>
                  <option key={model.id} value={model.id}>{model.description}</option>
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
