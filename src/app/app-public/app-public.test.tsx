/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../test-support/test-utils';
import { routes } from '../../shared/routes';
import AppPublic from './app-public';

jest.mock('../app-authenticated/app-authenticated', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>app-authenticated</div>;
    }
  };
});

// Sets up the component under test with the desired values and renders it
const renderComponent = (path?: string, route?: string) => {
  renderWithRouter(<AppPublic />, { path, route });
};

describe('app public section', () => {
  it('renders login page', () => {
    renderComponent(routes.LOGIN, routes.LOGIN);

    expect(screen.getByText('NER PM Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Login Required')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByLabelText('name')).toBeInTheDocument();
  });

  it('renders app authenticated', () => {
    renderComponent(routes.PROJECTS, routes.PROJECTS);

    expect(screen.getByText('app-authenticated')).toBeInTheDocument();
  });
});
