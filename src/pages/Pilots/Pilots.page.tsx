import { useEffect, useState } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { MutatingDots } from "react-loader-spinner";
import { IPilots, pilotsApi } from "../../api/pilots/pilots";

export function Pilots(): JSX.Element {
  const [pilots, setPilots] = useState<IPilots[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await pilotsApi.getPilots();
      setPilots(data);
    }

    getData();
  }, []);

  return <Container fluid>
    <Table striped bordered hover variant="dark" cellPadding={10}>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Planes</th>
        </tr>
      </thead>
      <tbody>
        {
          !!pilots ?
            pilots.map((pilot) => {
              return (
                <tr>
                  <td>{pilot.id}</td>
                  <td>{pilot.name}</td>
                  <td>{pilot.planes}</td>
                </tr>
              )
            })
            : <MutatingDots
              height="100"
              width="100"
              color="#B3CB39"
              secondaryColor='#6D771F'
              radius='12.5'
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{ margin: '0 auto' }}
              wrapperClass=""
              visible={true}
            />
        }
      </tbody>
    </Table>
  </Container>
}
