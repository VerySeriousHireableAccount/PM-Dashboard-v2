/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useTheme } from '../../../services/theme.hooks';
import themes from '../../../shared/themes';
import { ThemeUtility } from '../../../shared/types';
import { render, routerWrapperBuilder, screen } from '../../../test-support/test-utils';
import NavTopBar from './nav-top-bar';

jest.mock('../../../services/theme.hooks');
const mockTheme = useTheme as jest.Mock<ThemeUtility>;

const mockHook = () => {
  mockTheme.mockReturnValue(themes[0]);
};

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = () => {
  const RouterWrapper = routerWrapperBuilder({});
  return render(
    <RouterWrapper>
      <NavTopBar />
    </RouterWrapper>
  );
};

describe('navigation top bar tests', () => {
  beforeEach(() => mockHook());

  it('renders site title', () => {
    renderComponent();
    expect(screen.getByText(/NER PM Dashboard/i)).toBeInTheDocument();
  });
});
