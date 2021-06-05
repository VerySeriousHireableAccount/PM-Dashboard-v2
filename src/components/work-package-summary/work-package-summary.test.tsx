/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { screen } from '@testing-library/react';
import { WorkPackage } from 'utils';
import { dollarsPipe, wbsPipe, listPipe, endDatePipe } from '../../shared/pipes';
import {
  exampleWorkPackage1,
  exampleWorkPackage2,
  exampleWorkPackage3
} from '../../test-support/test-data/work-packages.stub';
import { renderWithRouter } from '../../test-support/test-utils';
import WorkPackageSummary from './work-package-summary';

// Sets up the component under test with the desired values and renders it
const renderComponent = (wps: WorkPackage, path?: string, route?: string) => {
  renderWithRouter(<WorkPackageSummary workPackage={wps} />, { path, route });
};

describe('Rendering Work Packagae Summary Test', () => {
  it('renders all the fields, example 1', () => {
    const wp: WorkPackage = exampleWorkPackage1;
    renderComponent(wp);
    expect(screen.getByText(`${wp.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${wbsPipe(wp.wbsNum)}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.duration} weeks`)).toBeInTheDocument();

    expect(screen.getByText(`${wp.deliverable}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Dependencies:${listPipe(wp.dependencies, wbsPipe)}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`${listPipe(wp.rules, (str: string) => str)}`)).toBeInTheDocument();
    expect(screen.getByText(`${dollarsPipe(wp.budget)}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.startDate.toLocaleDateString()}`)).toBeInTheDocument();
    expect(screen.getByText(`${endDatePipe(wp.startDate, wp.duration)}`)).toBeInTheDocument();
  });

  it('renders all the fields, example 2', () => {
    const wp: WorkPackage = exampleWorkPackage2;
    renderComponent(wp);
    expect(screen.getByText(`${wp.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${wbsPipe(wp.wbsNum)}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.duration} weeks`)).toBeInTheDocument();

    expect(screen.getByText(`${wp.deliverable}`)).toBeInTheDocument();
    expect(screen.getByText(`${listPipe(wp.dependencies, wbsPipe)}`)).toBeInTheDocument();
    expect(screen.getByText(`${listPipe(wp.rules, (str: string) => str)}`)).toBeInTheDocument();
    expect(screen.getByText(`${dollarsPipe(wp.budget)}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.startDate.toLocaleDateString()}`)).toBeInTheDocument();
    expect(screen.getByText(`${endDatePipe(wp.startDate, wp.duration)}`)).toBeInTheDocument();
  });

  it('renders all the fields, example 3', () => {
    const wp: WorkPackage = exampleWorkPackage3;
    renderComponent(wp);
    expect(screen.getByText(`${wp.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${wbsPipe(wp.wbsNum)}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.duration} weeks`)).toBeInTheDocument();

    expect(screen.getByText(`${wp.deliverable}`)).toBeInTheDocument();
    expect(screen.getByText(`${listPipe(wp.dependencies, wbsPipe)}`)).toBeInTheDocument();
    expect(screen.getByText(`${listPipe(wp.rules, (str: string) => str)}`)).toBeInTheDocument();
    expect(screen.getByText(`${dollarsPipe(wp.budget)}`)).toBeInTheDocument();
    expect(screen.getByText(`${wp.startDate.toLocaleDateString()}`)).toBeInTheDocument();
    expect(screen.getByText(`${endDatePipe(wp.startDate, wp.duration)}`)).toBeInTheDocument();
  });
});
