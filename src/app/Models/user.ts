export interface User {
  id: number;
  username: string;
  token: string; // JWT token for authenticated requests
}