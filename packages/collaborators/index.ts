import { z } from 'zod';

const getCollaboratorsPropsSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  token: z.string(),
});

export const getCollaboratorsResponseSchema = z.object({
  login: z.string(),
  id: z.number(),
  node_id: z.string(),
  avatar_url: z.string(),
  gravatar_id: z.string(),
  url: z.string(),
  html_url: z.string(),
  followers_url: z.string(),
  following_url: z.string(),
  gists_url: z.string(),
  starred_url: z.string(),
  subscriptions_url: z.string(),
  organizations_url: z.string(),
  repos_url: z.string(),
  events_url: z.string(),
  received_events_url: z.string(),
  type: z.string(),
  site_admin: z.boolean(),
  permissions: z.object({
    admin: z.boolean(),
    maintain: z.boolean().optional(),
    push: z.boolean(),
    triage: z.boolean().optional(),
    pull: z.boolean(),
  }),
  role_name: z.string(),
});

export const getCollaboratorsResponseInvalidSchema = z.object({
  message: z.string(),
  documentation_url: z.string(),
});

export type GetCollaboratorsResponse = z.infer<
  typeof getCollaboratorsResponseSchema
>;
export type GetCollaboratorsResponseInvalid = z.infer<
  typeof getCollaboratorsResponseInvalidSchema
>;
export type GetCollaboratorsProps = z.infer<typeof getCollaboratorsPropsSchema>;

/**
 * Get the list of collaborators for a repository
 * @param owner - The owner of the repository
 * @param repo - The name of the repository
 * @param token - The GitHub token
 * @returns The list of collaborators for the repository
 */
export const getCollaborators = async ({
  owner,
  repo,
  token,
}: GetCollaboratorsProps) => {
  try {
    getCollaboratorsPropsSchema.parse({ owner, repo, token });

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/collaborators`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return data as GetCollaboratorsResponseInvalid;
    } else {
      return data as GetCollaboratorsResponse[];
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
