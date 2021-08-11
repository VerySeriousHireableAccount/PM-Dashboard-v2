/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { exampleAllUsers } from 'utils';
import './login-dev.module.css';

interface LoginDevProps {
  devSetRole: (role: string) => void;
  devFormSubmit: (e: any) => any;
}

/**
 * Page for unauthenticated users to do login.
 */
const LoginDev: React.FC<LoginDevProps> = ({ devSetRole, devFormSubmit }) => {
  return (
    <Form className="pt-3" onSubmit={devFormSubmit}>
      <InputGroup>
        <InputGroup.Append>
          <InputGroup.Text id="user-select">Select User</InputGroup.Text>
        </InputGroup.Append>
        <FormControl
          onChange={(e: any) => devSetRole(e.target.value)}
          aria-describedby="user-select"
          as="select"
        >
          {exampleAllUsers.map((user) => (
            <option key={user.role}>{user.role}</option>
          ))}
        </FormControl>
        <InputGroup.Append>
          <Button variant="primary" type="submit">
            Log In
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

export default LoginDev;
