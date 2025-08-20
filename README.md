# SEO Content Writer

A Next.js application that generates SEO-optimized prompts for AI models to create blog posts and product descriptions.

## Features

- Generate prompts for two types of content:
  - Blog posts
  - Product descriptions
- Simple 3-step process for each content type
- Copy generated prompts to clipboard
- Responsive design that works on all devices

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd seo-content-writer
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Running the Application

To start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

To start the production server:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

## Usage

1. Select the type of content you want to create (Blog Post or Product Description)
2. Fill in the required information:
   - For Blog Posts: Enter the topic and keywords
   - For Product Descriptions: Enter the product title, description, and keywords
3. View the generated prompts and copy them to use with your preferred AI model

## Prompt Templates

This project includes a collection of prompt templates that have been tested and refined through experimentation. You can find these templates in the [docs/prompt-templates.md](docs/prompt-templates.md) file, which includes:

- Multiple versions of blog post prompts, from basic to highly refined
- Results from experiments comparing different AI models
- Insights on how prompt modifications affect performance across different model types

## Technologies Used

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Reusable component library
- [Lucide React](https://lucide.dev/) - Icon library
- [Geist Font](https://vercel.com/font) - Font family

## Project Structure

```
.
├── app/                 # Next.js app directory
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main page
├── components/          # UI components
│   ├── ui/              # shadcn/ui components
│   └── theme-provider.tsx
├── docs/                # Documentation and prompt templates
├── hooks/               # Custom hooks
├── lib/                 # Utility functions
├── public/              # Static assets
└── styles/              # Global styles
```

## Deployment

This application can be deployed to any platform that supports Next.js, such as:

- [Vercel](https://vercel.com/) (recommended)
- [Netlify](https://netlify.com/)
- [Railway](https://railway.app/)

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Tests and Results

You can find results of experiments and prompts in "tests and results" folder.
