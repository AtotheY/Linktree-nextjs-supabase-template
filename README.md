# Anthony Sistilli's Link Site

Welcome to my personal link site! This project serves as a centralized hub for all my links, resources, and interesting things. You can view the live site at [https://links.sistilli.dev/](https://links.sistilli.dev/). It's built with Next.js and is designed to be easily customizable for anyone who wants to create their own link site.

Instagram WRONGFULLY blocked my Linktree, so I made my own.

## Features

- Responsive design with a modern UI
- Easy to customize links and social media profiles
- Built with Next.js for fast performance
- Customizable metadata for SEO optimization
- Progressive wave and cloud background patterns (honestly u should change it to something cooler tho for yourself)

## Getting Started

Follow these steps to set up and customize the link site for your own use.

### Prerequisites

- Node.js and npm installed on your machine
- A GitHub account to fork the repository

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

### Running the Project

To start the development server, run:


### Deployment

To deploy your link site using GitHub Pages, follow these steps:

1. **Enable GitHub Pages**

   - Go to your GitHub repository's settings.
   - Navigate to the "Pages" section.
   - Under "Source", select "GitHub Actions" as the deployment method.

2. **Configure GitHub Actions**

   The repository is already set up with the necessary GitHub Actions workflow in `.github/workflows/deploy.yml`. This workflow will automatically build and deploy your site whenever you push changes to the `main` branch.

3. **Custom Domain (Optional)**

   If you want to use a custom domain:
   - In the "Pages" section of your repository settings, enter your custom domain in the "Custom domain" field.
   - Update your DNS settings to point to GitHub Pages. Refer to [GitHub's documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) for detailed instructions.

4. **Automatic Deployment**

   With GitHub Actions and Pages set up, your site will automatically deploy on every push to the `main` branch. The deployment process typically takes a few minutes.

5. **Access Your Site**

   Once deployed, your link site will be accessible at:
   - `https://your-username.github.io/your-repo-name` (if using GitHub's default domain)
   - Your custom domain (if configured)

Note: The `next.config.mjs` file has already been configured to work with GitHub Pages, so you don't need to make any additional changes for deployment to work correctly.


Now, every time you push changes to your main branch, GitHub Actions will automatically build and deploy your site to GitHub Pages. Your link site will be accessible at `https://your-username.github.io/your-repo-name`.
