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
    const inputs = e.target.querySelectorAll('input, select');
    const [name, surname, cpf, password, country, passaport,miles] = [...inputs].map((input: HTMLFormElement) => {
      return input.value;
    })

    console.log({name, surname, cpf, password, country, passaport,miles});
    if (!name || !surname || !cpf || !password || !country || !passaport || !miles) return toast.warning('Preencha todos os campos para presseguir');

    callback({
      name: name,
      surname: surname,
      cpf: cpf,
      password: password,
      country: country,
      miles: miles,
      passaport: parseInt(passaport),
    })
    setVisible(false);
  }

  return (
    <Modal show={visible} onHide={() => setVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Criar Passageiro</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Alvaro" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="surname">
            <Form.Label>Sobrenome</Form.Label>
            <Form.Control type="text" placeholder="Degas" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cpf">
            <Form.Label>CPF</Form.Label>
            <Form.Control type="text" placeholder="07785302555" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>País</Form.Label>
            <Form.Control type="text" placeholder="Brasil" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="passaport">
            <Form.Label>Passaport</Form.Label>
            <Form.Control type="text" placeholder="07785302555" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="miles">
            <Form.Label>Milhas</Form.Label>
            <Form.Control type="text" placeholder="1" />
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
