import { InputHTMLAttributes } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ICreateModalProps } from './CreateModal.types';
import { toast } from "react-toastify";
import uuid from 'react-uuid';

export function CreateModal({
  setVisible,
  callback,
  visible
}: ICreateModalProps): JSX.Element {

  const onSubmit = (e: any) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input');
    const [manufacturer, model] = [...inputs].map((input: HTMLInputElement) => {
      return input.value;
    })

    if (!model || !manufacturer) return toast.warning('Preencha todos os campos para presseguir');

    callback({
      id: uuid(),
      model: model,
      manufacturer: manufacturer,
    })
    setVisible(false);
  }

  return (
    <Modal show={visible} onHide={() => setVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Criar Piloto</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="manufacturer">
            <Form.Label>Fabricante</Form.Label>
            <Form.Control type="text" placeholder="GOL" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="model">
            <Form.Label>Modelo</Form.Label>
            <Form.Control type="text" placeholder="GOL 747" />
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
