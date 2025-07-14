# CVmaker.ai - AI Resume Builder

A modern, secure authentication system for CVmaker.ai built with Next.js, NextAuth.js, and Supabase.

## 🚀 Features

- ✅ **Email/Password Authentication** - Secure signup and login
- ✅ **Google OAuth** - Social login with Google
- ✅ **Session Management** - Persistent login sessions
- ✅ **Password Security** - Bcrypt password hashing
- ✅ **Input Validation** - Zod schema validation
- ✅ **Beautiful UI** - Tailwind CSS with teal theme
- ✅ **Protected Routes** - Dashboard with authentication
- ✅ **Loading States** - Smooth user experience
- ✅ **Error Handling** - Comprehensive error messages

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: Supabase (PostgreSQL)
- **Validation**: Zod + React Hook Form
- **Styling**: Tailwind CSS with custom teal theme

## 📋 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup (Supabase)

1. Go to [Supabase](https://supabase.com) and create a new project
2. Once created, get your project URL and API keys from Settings → API
3. Create a `users` table with the following SQL:

```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);
```

### 3. Environment Variables

Create a `.env.local` file in your project root:

```bash
# Copy from env.example
cp env.example .env.local
```

Update `.env.local` with your actual values:

```env
# NextAuth configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Supabase configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4. Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

### 5. Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Copy the result to your `NEXTAUTH_SECRET` in `.env.local`

### 6. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application!

## 🔐 Authentication Flow

1. **Homepage** (`/`) - Landing page with login/signup buttons
2. **Sign Up** (`/signup`) - Create new account with email/password or Google
3. **Sign In** (`/login`) - Login with existing credentials
4. **Dashboard** (`/dashboard`) - Protected route for authenticated users
5. **Auto-redirect** - Users are automatically redirected based on auth state

## 📁 Project Structure

```
├── app/
│   ├── api/auth/
│   │   ├── [...nextauth]/route.ts    # NextAuth configuration
│   │   └── signup/route.ts           # User registration endpoint
│   ├── dashboard/page.tsx            # Protected dashboard
│   ├── login/page.tsx               # Login page
│   ├── signup/page.tsx              # Signup page
│   ├── layout.tsx                   # Root layout with AuthProvider
│   ├── globals.css                  # Global styles
│   └── page.tsx                     # Homepage
├── components/
│   └── AuthProvider.tsx             # NextAuth session provider
├── lib/
│   └── auth.ts                      # NextAuth configuration
└── env.example                      # Environment variables template
```

## 🎨 Styling

The application uses a custom teal color scheme that matches the original CVmaker.ai design:

- **Primary Teal**: `#39cccc`
- **Gradient Backgrounds**: Various teal gradients
- **Animations**: Shimmer effects and smooth transitions
- **Responsive Design**: Mobile-first approach

## 🔒 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **Session Security**: JWT tokens with NextAuth
- **Input Validation**: Zod schemas for all forms
- **CSRF Protection**: Built-in NextAuth protection
- **Secure Cookies**: HttpOnly and Secure flags

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Update `NEXTAUTH_URL` to your production domain
4. Deploy!

### Other Platforms

Make sure to:
1. Set all environment variables
2. Update `NEXTAUTH_URL` to production domain
3. Configure Google OAuth redirect URIs for production

## 📝 Next Steps

- [ ] Add email verification
- [ ] Implement password reset
- [ ] Add user profile management
- [ ] Integrate with CV creation flow
- [ ] Add payment integration
- [ ] Implement user analytics

## 🐛 Troubleshooting

### Common Issues

1. **"Module not found" errors**: Run `npm install` to ensure all dependencies are installed
2. **Database connection issues**: Check your Supabase credentials and ensure the users table exists
3. **Google OAuth not working**: Verify redirect URIs and credentials
4. **Environment variables not loading**: Ensure `.env.local` is in project root and not committed to git

### Development Tips

- Use `npm run dev` for development with hot reload
- Check browser console for authentication errors
- Use Supabase dashboard to monitor database activity
- Test authentication flows in incognito mode

## 📞 Support

For support, please check the documentation or create an issue in the repository.

---

**Built with ❤️ for CVmaker.ai**
