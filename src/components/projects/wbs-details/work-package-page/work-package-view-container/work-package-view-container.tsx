/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { WbsElementStatus, WorkPackage } from 'utils';
import { EditMode } from '../work-package-page';
import { wbsPipe } from '../../../../../shared/pipes';
import DescriptionList from '../../../../shared/description-list/description-list';
import HorizontalList from '../../../../shared/horizontal-list/horizontal-list';
import PageTitle from '../../../../shared/page-title/page-title';
import ChangesList from '../../../../shared/changes-list/changes-list';
import WorkPackageDetails from './work-package-details/work-package-details';

interface WorkPackageViewContainerProps {
  workPackage: WorkPackage;
  edit: EditMode;
  allowEdit: boolean;
  allowActivate: boolean;
  allowStageGate: boolean;
}

const WorkPackageViewContainer: React.FC<WorkPackageViewContainerProps> = ({
  workPackage,
  edit,
  allowEdit,
  allowActivate,
  allowStageGate
}) => {
  const editBtn = (
    <Dropdown.Item as={Button} onClick={() => edit.setEditMode(true)} disabled={!allowEdit}>
      Edit
    </Dropdown.Item>
  );
  const activateBtn = (
    <Dropdown.Item as={Button} onClick={() => console.log('Activate WP')} disabled={!allowActivate}>
      Activate
    </Dropdown.Item>
  );
  const stageGateBtn = (
    <Dropdown.Item
      as={Button}
      onClick={() => console.log('Stage Gate WP')}
      disabled={!allowStageGate}
    >
      Stage Gate
    </Dropdown.Item>
  );
  const projectActionsDropdown = (
    <DropdownButton id="work-package-actions-dropdown" title="Actions">
      {!edit.editMode ? editBtn : ''}
      {workPackage.status === WbsElementStatus.Inactive ? activateBtn : ''}
      {workPackage.status === WbsElementStatus.Active ? stageGateBtn : ''}
    </DropdownButton>
  );

  return (
    <div className="mb-5">
      <PageTitle
        title={`${wbsPipe(workPackage.wbsNum)} - ${workPackage.name}`}
        actionButton={projectActionsDropdown}
      />
      <WorkPackageDetails workPackage={workPackage} />
      <HorizontalList
        title={'Dependencies'}
        headerRight={<></>}
        items={workPackage.dependencies.map((dep) => (
          <strong>{wbsPipe(dep)}</strong>
        ))}
      />
      <DescriptionList title={'Expected Activities'} items={workPackage.expectedActivities} />
      <DescriptionList title={'Deliverables'} items={workPackage.deliverables} />
      <ChangesList changes={workPackage.changes} />
    </div>
  );
};

export default WorkPackageViewContainer;
