import NextAuth from 'next-auth'
import { authOptions } from '../../../../lib/auth'

// Ensure this route is always treated as dynamic (no static optimization)
export const dynamic = 'force-dynamic'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 