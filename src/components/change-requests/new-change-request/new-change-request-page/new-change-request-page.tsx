/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAllProjects } from '../../../../services/projects.hooks';
import { useAllWorkPackages } from '../../../../services/work-packages.hooks';
import { exampleAllUsers } from '../../../../test-support/test-data/users.stub';
import { exampleAllWorkPackages } from '../../../../test-support/test-data/work-packages.stub';
import PageBlock from '../../../shared/page-block/page-block';
import PageTitle from '../../../shared/page-title/page-title';
import { routes } from '../../../../shared/routes';
import CommonFormFields from './common-form-fields/common-form-fields';
import StandardFormFields from './standard-form-fields/standard-form-fields';
import ActivationFormFields from './activation-form-fields/activation-form-fields'
import StageGateFormFields from './stage-gate-form-fileds/stage-gate-form-fields'
import LoadingIndicator from '../../../shared/loading-indicator/loading-indicator';
import ErrorPage from '../../../shared/error-page/error-page';
import styles from './new-change-request-page.module.css';
import { wbsPipe } from '../../../../shared/pipes';
import { useCreateChangeRequest } from '../../../../services/change-requests.hooks';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../../services/auth.hooks';
import { NewActivationChangeRequestPayload, NewStageRequestChangeRequestPayload, NewStandardChangeRequestPayload } from 'utils';
import { ChangeRequestType, ChangeRequestReason, NewChangeRequestPayload } from 'utils';

interface FormData {
  projectWBS: number,
  workPackageWBS: number,
  type: ChangeRequestType,

  what: string,
  scopeImpact: string,
  timelineImpact: number,
  budgetImpact: number,
  estimation_error: boolean,
  school_work: boolean,
  manufacturing_issues: boolean,
  rules_compliance: boolean,
  other_project: boolean,
  other: boolean,
  design: boolean,
  other_project_explain: string,
  other_explain: string,

  projectLeadId: number,
  projectManagerId: number,
  startDate: Date,
  confirmDetails: boolean,

  leftoverBudget: number,
  confirmDone: boolean,
}

interface WhyResponse {
  type: ChangeRequestReason;
  explain: string;
}

const NewChangeRequestPage: React.FC = () => {
  const createChangeRequest = useCreateChangeRequest();
  const auth = useAuth();
  const history = useHistory();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { type, projectWBS, workPackageWBS } = formData;
    const wbsId = (workPackageWBS === -1) ? projectWBS : workPackageWBS;

    const { user } = auth;
    const { userId } = user!;

    let req: NewStandardChangeRequestPayload | NewStageRequestChangeRequestPayload | NewActivationChangeRequestPayload | undefined;

    if (type === ChangeRequestType.Activation) {
      req = { 
        projectLeadId: formData.projectLeadId,
        projectManagerId: formData.projectManagerId,
        startDate: formData.startDate.toJSON(),
        confirmDetails: formData.confirmDetails
      };
    }
    else if (type === ChangeRequestType.StageGate) {
      req = { leftoverBudget: formData.leftoverBudget, confirmDone: formData.confirmDone };
    }
    else {
      const { estimation_error, 
        school_work, 
        manufacturing_issues, 
        rules_compliance,
        other_project,
        other,
        other_project_explain,
        other_explain,
        design
      } = formData;

      const whyOpts: WhyResponse[] = [];

      if (estimation_error) whyOpts.push({'type': ChangeRequestReason.Estimation, explain: ""});
      if (school_work) whyOpts.push({'type': ChangeRequestReason.School, explain: ""});
      if (manufacturing_issues) whyOpts.push({'type': ChangeRequestReason.Manufacturing, explain: ""});
      if (rules_compliance) whyOpts.push({'type': ChangeRequestReason.Rules, explain: ""});
      if (other_project) whyOpts.push({'type': ChangeRequestReason.OtherProject, 'explain': other_project_explain});
      if (other) whyOpts.push({'type': ChangeRequestReason.Other, 'explain': other_explain});
      if (design) whyOpts.push({'type': ChangeRequestReason.Design, 'explain': ''});

      req = { 
        what: formData.what, 
        scopeImpact: formData.scopeImpact, 
        timelineImpact: formData.timelineImpact, 
        budgetImpact: formData.budgetImpact, 
        why: whyOpts
      };
    }

    const sendData: NewChangeRequestPayload = {
      submitterId: userId,
      wbsElementId: wbsId,
      type: formData.type,
      payload: req
    };
    
    const response: any = await createChangeRequest.mutateAsync(sendData);
    history.push(`${routes.CHANGE_REQUESTS}/${response.crId}`)
  };

  const handleStartDateChange = (d: Date) => {
    updateValue("startDate", d);
  }

  const handleChange = (e: any) => {
    if (e.target.type === 'number') {
      updateValue(e.target.name, parseInt(e.target.value));
      return;
    }
    else if (e.target.type === 'radio') {
      updateValue(e.target.name, e.target.value === 'true');
      return;
    }
    else if (e.target.type === 'checkbox') {
      updateValue(e.target.name, !formData[e.target.name as keyof FormData]);
      return;
    }
    updateValue(e.target.name, e.target.value.trim());
  };

  const updateValue = (name: string, value: any) => {
    updateFormData({
      ...formData,
      [name]: value
    });
  }

  const [formData, updateFormData] = useState<FormData>({
    projectWBS: 1,
    workPackageWBS: -1,
    type: "ISSUE",

    what: "",
    scopeImpact: "",
    timelineImpact: 0,
    budgetImpact: 0,
    estimation_error: false,
    school_work: false,
    manufacturing_issues: false,
    rules_compliance: false,
    other_project: false,
    other: false,
    design: false,
    other_project_explain: wbsPipe(exampleAllWorkPackages[0].wbsNum),
    other_explain: "",

    projectLeadId: exampleAllUsers[0].userId,
    projectManagerId: exampleAllUsers[0].userId,
    startDate: new Date(),
    confirmDetails: false,

    leftoverBudget: 0,
    confirmDone: false,
  });

  const [formType, setType] = useState<ChangeRequestType>(ChangeRequestType.Redefinition);

  const projectRes = useAllProjects((value) => {updateValue("projectWBS", value.data![0].id)});
  const workPkgsRes = useAllWorkPackages();

  if (projectRes.isLoading || workPkgsRes.isLoading) return <LoadingIndicator />;

  if (projectRes.isError || workPkgsRes.isError) {
    if (projectRes.isError !== workPkgsRes.isError) {
      const message = (projectRes.isError) ? projectRes.error?.message : workPkgsRes.error?.message;
      return <ErrorPage message={message} />;
    }

    if (projectRes.isError && workPkgsRes.isError) {
      let message = projectRes.error?.message;
      
      if (message && workPkgsRes.error) {
        message += "; " + workPkgsRes.error!.message;
      }
      else if (!message) {
        message = workPkgsRes.error?.message!;
      }
      
      return <ErrorPage message={message} />;
    }
  }

  return (
    <>
      <PageTitle title={'New Change Request'} />
      <PageBlock
        title={''}
        headerRight={<></>}
        body={
          <Form id="createChange" onSubmit={submitHandler}>
            <CommonFormFields setType={setType} 
              projects={projectRes.data!} 
              workPkgs={workPkgsRes.data!}
              handleChange={handleChange}
            />

            {formType === ChangeRequestType.StageGate && 
              <StageGateFormFields handleChange={handleChange} />}

            {formType !== ChangeRequestType.StageGate && formType !== ChangeRequestType.Activation && 
              <StandardFormFields handleChange={handleChange} />}
              
            {formType === ChangeRequestType.Activation && 
            <ActivationFormFields handleChange={handleChange} handleStartDateChange={handleStartDateChange}/>}

            <Button className={styles.submitButton} type="submit">
              Submit
            </Button>
          </Form>
        }
      />
    </>
  );
};

export default NewChangeRequestPage;
