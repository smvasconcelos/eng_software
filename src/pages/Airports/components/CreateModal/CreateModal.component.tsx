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

  const onSubmit = (e: any) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input');
    const [name, icao, locations, height] = [...inputs].map((input: HTMLFormElement) => {
      return input.value;
    })

    if (!name || !locations || !height || !icao) return toast.warning('Preencha todos os campos para presseguir');

    callback({
      name: name,
      icao: icao,
      altitude: height,
      location: locations.split(','),
    })
    setVisible(false);
  }

  return (
    <Modal show={visible} onHide={() => setVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Criar Aeroporto</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Congonhas Airport" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="icao">
            <Form.Label>ICAO</Form.Label>
            <Form.Control type="text" placeholder="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="locations">
            <Form.Label>Localização</Form.Label>
            <Form.Control type="text" placeholder="13,13" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="height">
            <Form.Label>Altitude</Form.Label>
            <Form.Control type="text" placeholder="100.20" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setVisible(false)} variant="secondary">Cancelar</Button>
          <Button type='submit' variant="primary">Criar Aeroporto</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
