# NextJS & Supabase Custom LinkTree

A modern, customizable link-in-bio solution built with Next.js and Supabase.

[![Live Demo](https://img.shields.io/badge/demo-live-green?style=for-the-badge)](https://links.sistilli.dev/)
[![GitHub Repo](https://img.shields.io/badge/github-repo-blue?style=for-the-badge)](https://github.com/AtotheY/Linktree-nextjs-supabase-template)

<p align="center">
  <img src="https://i.imgur.com/lCwM28R.png" alt="Linktree Preview" width="300"/>
  <img src="https://i.imgur.com/JG8Orin.png" alt="Dashboard Preview" width="450"/>
</p>

## 🚀 Features

- 🎨 Responsive design with a modern UI
- 🔗 Easy to customize links and social media profiles
- ⚡ Built with Next.js for fast performance
- 📊 Analytics dashboard for tracking link clicks
- 🌍 IP geolocation using ipapi
- 🛡️ Optional Redis-based rate limiting

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Rate Limiting**: Redis (optional)

## 🚦 Quick Start

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Set up your Supabase project and environment variables
4. Run the development server: `npm run dev`

For detailed setup instructions, see the [Getting Started](#-getting-started) section below.

## 📖 Table of Contents

- [Getting Started](#-getting-started)
- [Customization](#customization)
- [Accessing the Dashboard](#accessing-the-dashboard)
- [Deployment](#deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)
- [Contact](#-contact)

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- GitHub account
- Vercel account (for deployment)

### Installation

1. Fork the [GitHub repository](https://github.com/AtotheY/Linktree-nextjs-supabase-template)
2. Clone your forked repository:
   ```bash
   git clone https://github.com/your-username/Linktree-nextjs-supabase-template.git
   cd Linktree-nextjs-supabase-template
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Customization

1. **Update Metadata**

   Open `app/layout.tsx` and update the `metadata` object with your own information:

   ```typescript
   export const metadata: Metadata = {
     title: "Your Name's Links",
     description: "All my links, resources, and interesting things all in one place.",
     author: "Your Name",
     keywords: "Your Name, portfolio, projects, links, web development",
     viewport: "width=device-width, initial-scale=1",
   };
   ```

2. **Customize Links**

   Open `constants/links.ts` and update the `socialLinks` and `items` arrays with your own links and resources:

   ```typescript
   export const socialLinks = [
     { platform: "LinkedIn", url: "https://www.linkedin.com/in/your-profile/" },
     { platform: "Twitter", url: "https://twitter.com/your-profile" },
     // Add more social links as needed
   ];

   export const items: LinkItem[] = [
     {
       type: "link",
       title: "Your Project",
       url: "https://yourproject.com",
     },
     // Add more items as needed
   ];
   ```

3. **Add Your Profile Image**

   Replace the `pfp.png` file in the `public` directory with your own profile image. Ensure the image is named `pfp.png` to match the existing code.

### IP Geolocation with ipapi

This project uses ipapi to gather geolocation data for analytics purposes. The `checkIPReputation.ts` file contains the logic for making requests to the ipapi service. Make sure to set up your ipapi API key in the environment variables.

### Redis-based Rate Limiting (Optional)

To prevent abuse and limit requests from potential bad actors, this project includes an optional Redis-based rate limiting system. To enable it:

1. Set up a Redis instance (you can use services like Upstash for serverless Redis).
2. Add your Redis connection details to the environment variables.
3. Ensure the `SKIP_RATE_LIMIT` environment variable is set to `false`.

You can adjust the rate limiting parameters in the `rateLimit.ts` file to suit your needs.

### Running the Project

To start the development server, run: `npm run dev`

## Accessing the Dashboard

To set up and access the dashboard for analytics, follow these steps:

1. **Create a new email user in Supabase**
   - Make sure email is enabled as a provider in your Supabase project settings.
   - Here's how the authentication settings should look:
     ![Supabase Auth Settings](https://i.imgur.com/iTjvNqw.png)

2. **Set up Supabase environment variables**
   - Ensure that your Supabase environment variables are correctly set up in your `.env.local` file and in your deployment environment.

3. **Run SQL commands for analytics**
   - In the `utils/sql` folder, you'll find two SQL files: `rpc.sql` and `table.sql`.
   - Run both SQL commands in your Supabase SQL editor:
     - `rpc.sql` creates the RPC function for analytics.
     - `table.sql` creates the necessary table in the database.

4. **Enable Row Level Security (RLS) on the table**
   - After creating the table, enable RLS on it.
   - Set up RLS policies to ensure:
     1. All users can update the table (for recording link clicks).
     2. Only authenticated users (you) can read from the table (for viewing analytics).
     - Note: they have pre-made policies you can choose from in the Supabase dashboard's under Authentication > Policies > the table > create policy

Once you've completed these steps, you should be able to access the dashboard at `/dashboard` after logging into `/login` by logging in with the email user you created in Supabase. The dashboard will display analytics for your link site.

### Deployment

This project is set up for easy deployment on Vercel. To deploy your link site:

1. **Push Your Changes**
   
   Ensure all your changes are committed and pushed to your GitHub repository.

2. **Connect to Vercel**
   
   - Go to [Vercel](https://vercel.com/) and sign in or create an account.
   - Click on "Add New..." and select "Project" from the dropdown.
   - Choose "Import Git Repository" and select your GitHub repository.

3. **Configure Project**
   
   - Vercel will automatically detect that it's a Next.js project.
   - Configure your project name and framework preset (should be auto-detected as Next.js).

4. **Environment Variables**
   
   - In the Vercel deployment interface, go to the "Environment Variables" section.
   - Add the following environment variables from your `.env.local` file:
     - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

   - You may need to add additional variables depending on your configuration:
     - `REDIS_TOKEN`: Your Redis connection token (if using rate limiting)
     - `SKIP_RATE_LIMIT`: Set to "true" if not using Redis
     - `IPAPI_API_KEY`: If you're using the ipapi service for IP geolocation (1000 free requests without an api key)

   Basic example with rate limiting:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   REDIS_TOKEN=your-redis-token
   ```

   Basic example without:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SKIP_RATE_LIMIT=true
   ```

   Note: Never commit your `.env.local` file to version control. The values provided here are just examples.

5. **Deploy**
   
   - Click "Deploy" and wait for Vercel to build and deploy your project.
   - Vercel will provide you with a deployment URL once it's complete.

6. **Custom Domain (Optional)**
   
   - In your Vercel project dashboard, go to "Settings" > "Domains".
   - Add your custom domain and follow Vercel's instructions to configure your DNS settings.

7. **Automatic Deployments**
   
   - Vercel automatically sets up a GitHub integration.
   - Any future pushes to your main branch will trigger automatic deployments.

With Vercel, you get automatic HTTPS, continuous deployment, and excellent performance out of the box. Your link site will be live and accessible via the Vercel-provided URL or your custom domain if configured.

This is all designed to run within the free tier of Vercel and Upstash for small-scale personal use. If you expect high traffic or need more advanced features, consider upgrading your Vercel plan or using additional services.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/AtotheY/your-repo-name/issues) if you want to contribute.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 💖 Support

If you find this project helpful and want to support its development, you can buy me a coffee:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow?style=for-the-badge&logo=buy-me-a-coffee)](http://buymeacoffee.com/anthonysistilli)

Your support is greatly appreciated and helps keep this project going!

## 📬 Contact

Anthony Sistilli - [@SistilliAnthony](https://twitter.com/SistilliAnthony)

## ⭐️ Show your support

If this project helped you, please consider giving it a ⭐️!