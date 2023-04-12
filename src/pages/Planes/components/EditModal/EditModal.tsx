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
  plane
}: IEditModalProps): JSX.Element {

  const onSubmit = (e: any) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input');
    const [model, manufacturer] = [...inputs].map((input: HTMLInputElement) => {
      return input.value;
    })

    if (!model || !manufacturer) return toast.warning('Preencha todos os campos para presseguir');

    callback({
      id: plane?.id || uuid(),
      manufacturer: manufacturer || (plane?.manufacturer || '') ,
      model: model || (plane?.model || ''),
    })
    setVisible(false);
  }

  return (
    <Modal show={visible} onHide={() => setVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editando avião - {plane?.model}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="model">
            <Form.Label>Modelo</Form.Label>
            <Form.Control defaultValue={plane?.model} type="text" placeholder="GOL 123" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="manufacturer">
            <Form.Label>Fabricante</Form.Label>
            <Form.Control defaultValue={plane?.manufacturer} type="text" placeholder="GOL 123" />
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
