# Anthony Sistilli's Link Site

Welcome to my personal link site! This project serves as a centralized hub for all my links, resources, and interesting things. You can view the live site at [https://links.sistilli.dev/](https://links.sistilli.dev/). It's built with Next.js and is designed to be easily customizable for anyone who wants to create their own link site.

Instagram WRONGFULLY blocked my Linktree, so I made my own.

## Features

- Responsive design with a modern UI
- Easy to customize links and social media profiles
- Built with Next.js for fast performance
- Customizable metadata for SEO optimization
- Progressive wave and cloud background patterns (honestly u should change it to something cooler tho for yourself)
- IP geolocation using ipapi
- Optional Redis-based rate limiting to prevent abuse

## Getting Started

Follow these steps to set up and customize the link site for your own use.

### Prerequisites

- Node.js and npm installed on your machine
- A GitHub account to fork the repository
- A Vercel account for deployment

### Installation

1. **Fork the Repository**

   Go to the [GitHub repository](https://github.com/AtotheY/your-repo-name) and click on the "Fork" button to create your own copy of the repository.

2. **Clone the Repository**

   Clone the forked repository to your local machine:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

3. **Install Dependencies**

   Install the necessary dependencies using npm:

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

To start the development server, run:


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
