/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AxiosResponse } from 'axios';
import { WorkPackage } from 'utils';
import { mockPromiseAxiosResponse } from '../../../test-support/test-data/test-utils.stub';
import {
  exampleAllWorkPackages,
  exampleWorkPackage1
} from '../../../test-support/test-data/work-packages.stub';
import { exampleWbsWorkPackage1 } from '../../../test-support/test-data/wbs-numbers.stub';
import { getAllWorkPackages, getSingleWorkPackage } from '../../apis/work-packages.api';
import { useAllWorkPackages, useSingleWorkPackage } from '../work-packages.hooks';

jest.mock('../../apis/work-packages.api');

let queryClient: QueryClient;
let wrapper: any;

describe('work package hooks', () => {
  beforeEach(() => {
    queryClient = new QueryClient();
    wrapper = ({ children }: any) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  });

  it('handles getting a list of work packages', async () => {
    const mockedGetAllWorkPackages = getAllWorkPackages as jest.Mock<
      Promise<AxiosResponse<WorkPackage[]>>
    >;
    mockedGetAllWorkPackages.mockReturnValue(
      mockPromiseAxiosResponse<WorkPackage[]>(exampleAllWorkPackages)
    );

    const { result, waitFor } = renderHook(() => useAllWorkPackages(), { wrapper });
    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toEqual(exampleAllWorkPackages);
  });

  it('handles getting a single work package', async () => {
    const mockedGetSingleWorkPackage = getSingleWorkPackage as jest.Mock<
      Promise<AxiosResponse<WorkPackage>>
    >;
    mockedGetSingleWorkPackage.mockReturnValue(
      mockPromiseAxiosResponse<WorkPackage>(exampleWorkPackage1)
    );

    const { result, waitFor } = renderHook(() => useSingleWorkPackage(exampleWbsWorkPackage1), {
      wrapper
    });
    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toEqual(exampleWorkPackage1);
  });
});
