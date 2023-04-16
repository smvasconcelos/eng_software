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
  model
}: IEditModalProps): JSX.Element {

  const onSubmit = (e: any) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input');
    const [modelInput, manufacturer] = [...inputs].map((input: HTMLInputElement) => {
      return input.value;
    })

    if (!modelInput || !manufacturer) return toast.warning('Preencha todos os campos para presseguir');

    callback({
      id: model?.id || uuid(),
      manufacturer: manufacturer || (model?.manufacturer || '') ,
      description: modelInput || (model?.description || ''),
    })
    setVisible(false);
  }

  return (
    <Modal show={visible} onHide={() => setVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editando modelo - {model?.description}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="model">
            <Form.Label>Modelo</Form.Label>
            <Form.Control defaultValue={model?.description} type="text" placeholder="GOL 123" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="manufacturer">
            <Form.Label>Fabricante</Form.Label>
            <Form.Control defaultValue={model?.manufacturer} type="text" placeholder="GOL 123" />
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
