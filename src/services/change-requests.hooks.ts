/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useMutation, useQuery } from 'react-query';
import {
  ChangeRequest,
  ReviewChangeRequestPayload,
  CreateStandardChangeRequestPayload,
  CreateActivationChangeRequestPayload,
  CreateStageGateChangeRequestPayload
} from 'utils';
import {
  createActivationChangeRequest,
  createStandardChangeRequest,
  createStageGateChangeRequest,
  getAllChangeRequests,
  getSingleChangeRequest,
  reviewChangeRequest
} from './change-requests.api';

/**
 * Custom React Hook to supply all change requests.
 */
export const useAllChangeRequests = (onSuccess?: (value: any) => void) => {
  return useQuery<ChangeRequest[], Error>('change requests', async () => {
    if (onSuccess) {
      const { data } = await getAllChangeRequests(onSuccess);
      return data;
    }
    const { data } = await getAllChangeRequests();
    return data;
  });
};

/**
 * Custom React Hook to supply a single change request.
 *
 * @param id Change request ID of the requested change request.
 */
export const useSingleChangeRequest = (id: number) => {
  return useQuery<ChangeRequest, Error>(['change request', id], async () => {
    const { data } = await getSingleChangeRequest(id);
    return data;
  });
};

/**
 * Custom React Hook to review a change request.
 */
export const useReviewChangeRequest = () => {
  return useMutation<{ message: string }, Error, ReviewChangeRequestPayload>(
    ['reviewCR'],
    async (reviewPayload: ReviewChangeRequestPayload) => {
      const { data } = await reviewChangeRequest(
        reviewPayload.reviewerId,
        reviewPayload.crId,
        reviewPayload.accepted,
        reviewPayload.reviewNotes
      );
      return data;
    }
  );
};

/**
 * Custom React Hook to create a standard change request.
 */
export const useCreateStandardChangeRequest = () => {
  return useMutation<{ message: string }, Error, CreateStandardChangeRequestPayload>(
    ['createStandardCR'],
    async (payload: CreateStandardChangeRequestPayload) => {
      const { data } = await createStandardChangeRequest(payload);
      return data;
    }
  );
};

/**
 * Custom React Hook to create an activation change request.
 */
export const useCreateActivationChangeRequest = () => {
  return useMutation<{ message: string }, Error, CreateActivationChangeRequestPayload>(
    ['createActivationCR'],
    async (payload: CreateActivationChangeRequestPayload) => {
      const { data } = await createActivationChangeRequest(
        payload.submitterId,
        payload.wbsNum,
        payload.projectLeadId,
        payload.projectManagerId,
        payload.startDate,
        payload.confirmDetails
      );
      return data;
    }
  );
};

/**
 * Custom React Hook to create a stage gate change request.
 */
export const useCreateStageGateChangeRequest = () => {
  return useMutation<{ message: string }, Error, CreateStageGateChangeRequestPayload>(
    ['createStageGateCR'],
    async (payload: CreateStageGateChangeRequestPayload) => {
      const { data } = await createStageGateChangeRequest(
        payload.submitterId,
        payload.wbsNum,
        payload.leftoverBudget,
        payload.confirmDone
      );
      return data;
    }
  );
};
