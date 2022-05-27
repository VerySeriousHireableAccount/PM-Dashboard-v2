/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useAuth } from '../../../services/auth.hooks';
import PageTitle from '../../layouts/page-title/page-title';
import PageBlock from '../../layouts/page-block/page-block';
import { Col, Container, Row } from 'react-bootstrap';

const Settings: React.FC = () => {
  const auth = useAuth();
  return (
    <>
      <PageTitle title="Settings" />
      <PageBlock
        title={'Organization Settings'}
        headerRight={<></>}
        body={
          <Container fluid>
            <Row>
              <Col md={6} lg={4}>
                <b>Name:</b> Northeastern Electric Racing
              </Col>
              <Col md={4} lg={2}>
                <b>Trickster Mode:</b> OFF
              </Col>
            </Row>
          </Container>
        }
      />
      <PageBlock
        title="User Settings"
        headerRight={<></>}
        body={
          <Container fluid>
            <Row>
              <Col md={4} lg={2}>
                <b>First Name:</b> {auth.user?.firstName}
              </Col>
              <Col md={4} lg={2}>
                <b>Last Name:</b> {auth.user?.lastName}
              </Col>
              <Col md={4} lg={3}>
                <b>Email: </b> {auth.user?.email}
              </Col>
              <Col md={4} lg={2}>
                <b>Email ID:</b> {auth.user?.emailId}
              </Col>
              <Col md={4} lg={2}>
                <b>Role: </b> {auth.user?.role}
              </Col>
            </Row>
          </Container>
        }
      />
    </>
  );
};

export default Settings;
