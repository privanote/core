import { describe, test, expect } from 'bun:test';
import {
  getCollaborators,
  getCollaboratorsResponseSchema,
  getCollaboratorsResponseInvalidSchema,
  type GetCollaboratorsResponse,
  type GetCollaboratorsProps,
} from './index';

describe('collaborators', () => {
  test('valid repo', async () => {
    try {
      const collaborator = (await getCollaborators({
        owner: 'privanote',
        repo: 'privanote',
        token: process.env.GITHUB_TOKEN_REPO as string,
      })) as GetCollaboratorsResponse[];

      const result = collaborator
        .map((c) => getCollaboratorsResponseSchema.safeParse(c).success)
        .includes(false);
      expect(result).toBe(false);
    } catch (error) {
      const tokenIssue =
        error instanceof Error ? error.message.includes('token') : false;

      if (tokenIssue) {
        expect().fail('Invalid token provided');
      } else {
        expect().fail('This should not be reached');
      }
    }
  });

  test('invalid repo', async () => {
    try {
      const collaborator = (await getCollaborators({
        owner: 'privanote',
        repo: 'asdfasfdasdfsadfsasdfasdf',
        token: process.env.GITHUB_TOKEN_REPO as string,
      })) as GetCollaboratorsResponse[];

      const result =
        getCollaboratorsResponseInvalidSchema.safeParse(collaborator).success;

      expect(result).toBe(true);
    } catch (error) {
      const tokenIssue =
        error instanceof Error ? error.message.includes('token') : false;

      if (tokenIssue) {
        expect().fail('Invalid token provided');
      } else {
        expect().fail('This should not be reached');
      }
    }
  });

  test('error', async () => {
    try {
      await getCollaborators({} as GetCollaboratorsProps);
    } catch (error) {
      const result = error instanceof Error;
      expect(result).toBe(true);
    }
  });
});
