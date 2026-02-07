import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { findUserByUsername, updateUserLastLogin } from './queries/users';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Validate credentials
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const username = credentials.username as string;
        const password = credentials.password as string;

        // Find user by username
        const user = await findUserByUsername(username);

        // Check if user exists
        if (!user) {
          return null; // Generic error for security
        }

        // Check if account is disabled
        if (!user.is_active) {
          throw new Error('ACCOUNT_DISABLED');
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          return null; // Generic error for security
        }

        // Update last login timestamp
        await updateUserLastLogin(user.id);

        // Return user data for session
        return {
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add custom fields to JWT token on first sign in
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom fields to session from JWT
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // If url is relative (starts with /), allow it
      if (url.startsWith('/')) return `${baseUrl}${url}`;

      // If url starts with baseUrl (same domain), allow it
      if (url.startsWith(baseUrl)) return url;

      // Otherwise, default to base URL (prevents open redirect)
      return baseUrl;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  trustHost: true,
});

/**
 * Get the current session on the server side
 */
export async function getServerSession() {
  return auth();
}

/**
 * Check if user has required role
 */
export function hasRole(userRole: string, allowedRoles: string[]): boolean {
  return allowedRoles.includes(userRole);
}

/**
 * Role hierarchy for permission checks
 */
export const roleHierarchy = {
  SUPER_ADMIN: ['SUPER_ADMIN', 'ADMIN', 'PATIENT'],
  ADMIN: ['ADMIN', 'PATIENT'],
  PATIENT: ['PATIENT'],
};

/**
 * Check if user can perform action based on role hierarchy
 */
export function canPerformAction(userRole: string, requiredRole: string): boolean {
  const allowedRoles = roleHierarchy[userRole as keyof typeof roleHierarchy] || [];
  return allowedRoles.includes(requiredRole);
}
