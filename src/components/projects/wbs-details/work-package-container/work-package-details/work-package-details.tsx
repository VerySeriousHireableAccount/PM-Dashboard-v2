/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { WorkPackage } from 'utils/src';
import {
  weeksPipe,
  wbsPipe,
  endDatePipe,
  fullNamePipe,
  listPipe
} from '../../../../../shared/pipes';
import PageBlock from '../../../../shared/page-block/page-block';
import { Col, Container, Row } from 'react-bootstrap';
import './work-package-details.module.css';

interface WorkPackageDetailsProps {
  workPackage: WorkPackage;
}

const WorkPackageDetails: React.FC<WorkPackageDetailsProps> = ({ workPackage }) => {
  const detailsBody = (
    <Container fluid>
      <Row>
        <Col xs={12} md={6}>
          <b>Work Package Name:</b> {workPackage.name} <br />
          <b>WBS #:</b> {wbsPipe(workPackage.wbsNum)} <br />
          <b>Project Lead:</b> {listPipe(workPackage.projectLead, fullNamePipe)} <br />
          <b>Project Manager:</b> {fullNamePipe(workPackage.projectManager)} <br />
          <b>Duration:</b> {weeksPipe(workPackage.duration)} <br />
        </Col>
        <Col xs={6} md={4}>
          <b>Start Date:</b> {workPackage.startDate.toLocaleDateString()} <br />
          <b>End Date:</b> {endDatePipe(workPackage.startDate, workPackage.duration)} <br />
          <b>Progress:</b> {workPackage.progress}% <br />
          <b>Expected Progress:</b> <br />
          <b>Timeline Status:</b> <br />
        </Col>
      </Row>
    </Container>
  );

  return (
    <PageBlock
      title={'Work Package Details'}
      headerRight={<b>{workPackage.status}</b>}
      body={detailsBody}
    />
  );
};

export default WorkPackageDetails;
