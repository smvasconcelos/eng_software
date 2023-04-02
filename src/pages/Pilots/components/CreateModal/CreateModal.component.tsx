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
    const [name, password, planes] = [...inputs].map((input: HTMLInputElement) => {
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
          <Form.Group className="mb-3" controlId="planes">
            <Form.Label>Aeronaves</Form.Label>
            <Form.Control type="text" placeholder="GOL 123" />
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
