/**
 * `AuthPayload` represents the data stored in an authentication token
 * (for example a JWT) and carried through request handling after
 * successful authentication. Use this type wherever the app reads
 * identity information from an authenticated request.
 */
export interface AuthPayload {
  /** Unique identifier for the user (e.g. UUID or database ID). */
  id: string;
  /** The user's email address. */
  email: string;
  /** The user's role used for authorization (e.g. 'admin', 'user'). */
  role: string;
}
