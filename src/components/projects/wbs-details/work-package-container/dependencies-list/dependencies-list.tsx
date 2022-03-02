/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */
import { WbsNumber } from 'utils';
import HorizontalList from '../../../../shared/horizontal-list/horizontal-list';
import Dependency from './dependency/dependency';
import './dependencies-list.module.css';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { FormContext } from '../work-package-container';
import { useContext, useState } from 'react';
import { validateWBS } from '../../../../../utils/src/validate-wbs';

interface DependenciesListProps {
  dependencies: WbsNumber[];
}

const DependenciesList: React.FC<DependenciesListProps> = ({ dependencies }) => {
  const { editMode } = useContext(FormContext);
  const [dependenciesState, setDependenciesState] = useState(dependencies);
  const [unvalidatedDependency, setUnvalidatedDependency] = useState('');

  const AddButton = (
    <InputGroup>
      <Form.Control
        type="text"
        placeholder="New WBS #"
        onChange={(e) => setUnvalidatedDependency(e.target.value)}
      ></Form.Control>
      <Button variant="success" onClick={handleAdd}>
        +
      </Button>
    </InputGroup>
  );

  function handleDelete(dependency: WbsNumber) {
    const index = dependenciesState.indexOf(dependency);
    if (index > -1) {
      setDependenciesState(dependenciesState.splice(index, 1));
    }
  }

  function handleAdd() {
    let validatedDependency;

    try {
      validatedDependency = validateWBS(unvalidatedDependency);
    } catch (error: any) {
      alert(error.message);
    }

    if (validatedDependency) {
      setDependenciesState([validatedDependency]);
    }
  }

  const items = dependenciesState.map((e) => <Dependency wbsNumber={e} />);

  return (
    <HorizontalList
      title={'Dependencies'}
      headerRight={<></>}
      items={editMode ? [...items, AddButton] : items}
    />
  );
};

export default DependenciesList;
