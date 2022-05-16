/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import { WbsNumber } from 'utils';
import { useSingleProject } from '../../../../services/projects.hooks';
import ProjectViewContainer from './project-view-container/project-view-container';
import ProjectEditContainer from './project-edit-container/project-edit-container';
import LoadingIndicator from '../../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../../shared/error-page/error-page';

interface ProjectPageProps {
  wbsNum: WbsNumber;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ wbsNum }) => {
  const { isLoading, isError, data, error } = useSingleProject(wbsNum);
  const [editMode, setEditMode] = useState<boolean>(false);

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorPage message={error?.message} />;

  if (editMode) {
    return <ProjectEditContainer wbsNum={wbsNum} proj={data!} setEditMode={setEditMode} />;
  }
  return (
    <ProjectViewContainer wbsNum={wbsNum} proj={data!} enterEditMode={() => setEditMode(true)} />
  );
};

export default ProjectPage;
