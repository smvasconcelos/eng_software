import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { IEditModalProps } from './EditModal.types';
import { useEffect, useMemo } from 'react';

export function EditModal({
  setVisible,
  callback,
  visible,
  airport
}: IEditModalProps): JSX.Element {
  const onSubmit = (e: any) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input');
    const [name, icao, locations, height] = [...inputs].map((input: HTMLFormElement) => {
      return input.value;
    })

    if (!name || !locations || !height || !icao) return toast.warning('Preencha todos os campos para presseguir');

    callback({
      name: airport.name || name,
      icao: icao || airport.icao,
      altitude: height || airport.altitude,
      location: locations.split(',') || airport.location,
    })
    setVisible(false);
  }

  const locations = useMemo(() => {
    return airport.location.join(',').toString() || "";
  }, [airport])


  return (
    <Modal show={visible} onHide={() => setVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editando aeroporto - {airport?.name}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control disabled defaultValue={airport.name} type="text" placeholder="Congonhas Airport" />
          </Form.Group>
          <Form.Group  className="mb-3" controlId="icao">
            <Form.Label>ICAO</Form.Label>
            <Form.Control disabled defaultValue={airport.icao} type="text" placeholder="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="locations">
            <Form.Label>Localização</Form.Label>
            <Form.Control defaultValue={locations}  type="text" placeholder="13,13" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="height">
            <Form.Label>Altitude</Form.Label>
            <Form.Control defaultValue={airport.altitude}  type="text" placeholder="100.20" />
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
