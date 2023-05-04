import { IModels, modelsApi } from 'api/models/models';
import { IPlanes, planesApi } from 'api/planes/planes';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { IEditModalProps } from './EditModal.types';

export function EditModal({
  setVisible,
  callback,
  visible,
  passenger
}: IEditModalProps): JSX.Element {

  const onSubmit = (e: any) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input, select');
    const [name, surname, cpf,country, passaport,miles] = [...inputs].map((input: HTMLFormElement) => {
      return input.value;
    })

    if (!name || !surname || !cpf || !country || !passaport || !miles) return toast.warning('Preencha todos os campos para presseguir');

    callback({
      id: passenger.id,
      name: name,
      surname: surname,
      cpf: cpf,
      country: country,
      miles: miles,
      passaport: parseInt(passaport),
    })
    setVisible(false);
  }


  return (
    <Modal show={visible} onHide={() => setVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Passageiro - {passenger.name + ' ' + passenger.surname}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control defaultValue={passenger.name} type="text" placeholder="Alvaro" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="surname">
            <Form.Label>Sobrenome</Form.Label>
            <Form.Control defaultValue={passenger.surname} type="text" placeholder="Degas" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cpf">
            <Form.Label>CPF</Form.Label>
            <Form.Control defaultValue={passenger.cpf} type="text" placeholder="07785302555" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>País</Form.Label>
            <Form.Control  defaultValue={passenger.country} type="text" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="passaport">
            <Form.Label>Passaport</Form.Label>
            <Form.Control  defaultValue={passenger.passaport} type="text" placeholder="12312312312312" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="miles">
            <Form.Label>Milhas</Form.Label>
            <Form.Control defaultValue={passenger.miles}  type="text" placeholder="1" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setVisible(false)} variant="secondary">Cancelar</Button>
          <Button type='submit' variant="primary">Editar Passageiro</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
