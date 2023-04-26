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
  flights
}: IEditModalProps): JSX.Element {
  const onSubmit = (e: any) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input');
    const [name, icao, locations, height] = [...inputs].map((input: HTMLFormElement) => {
      return input.value;
    })

    if (!name || !locations || !height || !icao) return toast.warning('Preencha todos os campos para presseguir');

    // callback({
    //   name: flights.name || name,
    //   icao: icao || flights.icao,
    //   altitude: height || flights.altitude,
    //   location: locations.split(',') || flights.location,
    // })
    setVisible(false);
  }


  return (
    <Modal show={visible} onHide={() => setVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editando aeroporto - {flights.source.name}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          {/* <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control disabled defaultValue={flights.name} type="text" placeholder="Congonhas flights" />
          </Form.Group>
          <Form.Group  className="mb-3" controlId="icao">
            <Form.Label>ICAO</Form.Label>
            <Form.Control disabled defaultValue={flights.icao} type="text" placeholder="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="locations">
            <Form.Label>Localização</Form.Label>
            <Form.Control defaultValue={locations}  type="text" placeholder="13,13" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="height">
            <Form.Label>Altitude</Form.Label>
            <Form.Control defaultValue={flights.altitude}  type="text" placeholder="100.20" />
          </Form.Group> */}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setVisible(false)} variant="secondary">Cancelar</Button>
          <Button type='submit' variant="primary">Salvar Alterações</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
