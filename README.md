# Swetaranyam Sisters Website

  A modern, responsive website for the Swetaranyam Sisters - Dr. R Nithya & Dr. R Vidya, acclaimed Carnatic vocalists. Built with SvelteKit and optimized for Vercel deployment.

## Features

- **Modern Design**: Beautiful, responsive design with maroon and gold color scheme
- **Pagination**: Efficient pagination for performances, events, and media content
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Performance**: Optimized for fast loading with Vercel's edge network
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Mobile-First**: Responsive design that works on all devices

## Technology Stack

- **Framework**: SvelteKit
- **Styling**: Tailwind CSS
- **Icons**: Lucide Svelte
- **Deployment**: Vercel
- **Type Safety**: TypeScript

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── layout/          # Layout components (Header, Footer, Layout)
│   │   └── ui/              # UI components (Pagination, etc.)
│   ├── data/                # Static data and content
│   ├── stores/              # Svelte stores for state management
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── routes/
│   ├── performances/        # Performances page with pagination
│   ├── media/               # Media and albums page with pagination
│   ├── teaching/            # Teaching programs page
│   ├── research/            # Research works page
│   └── +page.svelte         # Home page
├── static/                  # Static assets
│   ├── images/              # Images
│   ├── audio/               # Audio files
│   └── videos/              # Video files
└── app.html                 # HTML template
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run TypeScript checks
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Deployment to Vercel

### Automatic Deployment

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the SvelteKit project
3. The build settings are already configured in `vercel.json`

### Manual Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Build and deploy:
```bash
npm run build
vercel --prod
```

### Environment Variables

Create a `.env` file in the root directory for local development:

```env
PUBLIC_SITE_URL=https://your-domain.com
PUBLIC_CONTACT_EMAIL=swetaranyamsisters@gmail.com
```

## Content Management

### Adding New Performances

Edit `src/lib/data/index.ts` and add new performance objects:

```typescript
export const performances: Performance[] = [
  {
    id: 'unique-id',
    title: 'Performance Title',
    date: '2024-12-18T19:00:00Z',
    venue: 'Venue Name',
    location: 'City, Country',
    description: 'Performance description',
    type: 'concert' | 'lecture-demo' | 'workshop' | 'festival',
    status: 'upcoming' | 'past' | 'cancelled',
    image: 'image-url',
    accompaniment: ['Violin', 'Mridangam'],
    tags: ['tag1', 'tag2']
  }
];
```

### Adding New Events

Similar to performances, add event objects to the `events` array in `src/lib/data/index.ts`.

### Adding New Media/Albums

Add album or media items to the respective arrays in `src/lib/data/index.ts`.

## Customization

### Colors

The color scheme is defined in `tailwind.config.js`. The main colors are:
- **Maroon**: Primary brand color
- **Gold**: Accent color
- **Amber**: Text colors

### Typography

Fonts are configured in `tailwind.config.js`:
- **Display**: Playfair Display (headings)
- **Body**: Inter (body text)

### Pagination

Pagination is handled automatically by the server-side load functions. Items per page can be configured in each `+page.server.ts` file.

## Performance Optimization

- **Image Optimization**: Use WebP format and proper sizing
- **Code Splitting**: Automatic with SvelteKit
- **Static Generation**: Pages are pre-rendered when possible
- **CDN**: Vercel's global CDN for fast delivery

## SEO Features

- Meta tags for each page
- Open Graph and Twitter Card support
- Structured data markup
- Semantic HTML
- Sitemap generation (can be added)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary to Swetaranyam Sisters.

## Support

For technical support or questions, contact the development team or create an issue in the repository.

---

Built with ❤️ for Swetaranyam Sisters
