import { IModels, modelsApi } from 'api/models/models';
import { useEffect, useMemo, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';
import { IEditModalProps } from './EditModal.types';

export function EditModal({
  setVisible,
  callback,
  visible,
  pilot
}: IEditModalProps): JSX.Element {
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

    const newModels =  models.filter((item) => planes.includes(item.id) ? item : null).length > 0 ? models.filter((item) => planes.includes(item.id) ? item : null) : pilot.abbleToFligh;

    callback({
      id: pilot?.id || '',
      name: name,
      abbleToFligh: newModels,
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
            <Form.Select name='planes' multiple aria-label="Selecione as aeronaves">
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
          <Button type='submit' variant="primary">Salvar Alterações</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
