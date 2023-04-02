import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IEditModalProps } from './EditModal.types';
import uuid from 'react-uuid';
import { toast } from 'react-toastify';

export function EditModal({
  setVisible,
  callback,
  visible,
  pilot
}: IEditModalProps): JSX.Element {

  const onSubmit = (e: any) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input');
    const [name, planes] = [...inputs].map((input: HTMLInputElement) => {
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
          {/* <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control defaultValue={pilot?.password} type="password" placeholder="Password" />
          </Form.Group> */}
          <Form.Group className="mb-3" controlId="planes">
            <Form.Label>Aeronaves</Form.Label>
            <Form.Control defaultValue={pilot?.planes} type="text" placeholder="GOL 123" />
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
