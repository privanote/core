import { describe, test, expect } from 'bun:test';
import {
  getCollaborators,
  getCollaboratorsResponseSchema,
  getCollaboratorsResponseInvalidSchema,
  type GetCollaboratorsResponse,
  type GetCollaboratorsProps,
} from './index';

describe('collaborators', () => {
  test('valid', async () => {
    try {
      const collaborator = (await getCollaborators({
        owner: 'privanote',
        repo: 'privanote',
        token: process.env.GITHUB_TOKEN_TEST as string,
      })) as GetCollaboratorsResponse[];

      if (Array.isArray(collaborator)) {
        const result = collaborator
          .map((c) => getCollaboratorsResponseSchema.safeParse(c).success)
          .includes(false);
        expect(result).toBe(false);
      } else {
        expect().fail(
          'This should not be reached: ' + JSON.stringify(collaborator),
        );
      }
    } catch (error) {
      const tokenIssue =
        error instanceof Error ? error.message.includes('token') : false;

      if (tokenIssue) {
        expect().fail('Invalid token provided');
      } else {
        expect().fail('This should not be reached: ' + error);
      }
    }
  });

  test('invalid repo or token', async () => {
    try {
      const collaborator = (await getCollaborators({
        owner: 'privanote',
        repo: 'asdfasfdasdfsadfsasdfasdf',
        token: process.env.GITHUB_TOKEN_TEST as string,
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
        expect().fail('This should not be reached: ' + error);
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
