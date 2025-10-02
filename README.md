# Task Manager Client

## Tech Stack
- React 18 + TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- React Router (navigation)
- React Hook Form (forms)
- Axios (HTTP client)
- Context API (state)

## Scripts
- `npm run dev` - Start dev server (port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Environment Variables
Create `.env`:
```bash
# API base URL for Axios calls
VITE_API_BASE=/api

# Dev-only: Vite proxy target (ignored in production)
VITE_API_PROXY=http://localhost:5000
```

## Development
- Dev server proxies `/api/*` to backend
- Hot reload enabled
- TypeScript strict mode
- ESLint + Prettier (if configured)

## Production Deployment

### Netlify (Recommended)
1. Connect GitHub repo
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Environment variables:
   - `VITE_API_BASE=https://your-backend.onrender.com/api`
4. Deploy

### Vercel
1. Import project
2. Framework preset: Vite
3. Environment variables:
   - `VITE_API_BASE=https://your-backend.onrender.com/api`
4. Deploy

### Self-hosted
1. Build: `npm run build`
2. Serve `dist/` with nginx/Apache
3. Configure reverse proxy for `/api/*`

## Production Scaling Tips

### Performance
- **Code Splitting**: Use React.lazy() for route-based splitting
- **Bundle Analysis**: `npm run build -- --analyze` to check bundle size
- **Tree Shaking**: Import only needed components from libraries
- **Image Optimization**: Use WebP, lazy loading, responsive images
- **Caching**: Set proper cache headers for static assets

### CDN & Assets
- **CDN**: Use Cloudflare/AWS CloudFront for global distribution
- **Asset Hashing**: Vite handles this automatically for cache busting
- **Compression**: Enable Brotli/Gzip on CDN
- **HTTP/2**: Use for better multiplexing

### State Management
- **Context Optimization**: Split contexts by domain (auth, tasks, UI)
- **Memoization**: Use React.memo, useMemo, useCallback for expensive operations
- **State Normalization**: For complex data structures
- **Persistence**: localStorage for user preferences, not sensitive data

### API Integration
- **Request Deduplication**: Prevent duplicate API calls
- **Optimistic Updates**: Update UI before API response
- **Error Boundaries**: Graceful error handling
- **Retry Logic**: Exponential backoff for failed requests
- **Offline Support**: Service workers for basic offline functionality

### Security
- **CSP Headers**: Content Security Policy for XSS protection
- **HTTPS Only**: Force HTTPS in production
- **Environment Variables**: Never expose secrets in client code
- **Input Validation**: Client-side validation + server validation
- **Dependency Scanning**: Regular security audits

### Monitoring & Analytics
- **Error Tracking**: Sentry for error monitoring
- **Performance**: Web Vitals monitoring
- **Analytics**: Google Analytics or similar
- **User Feedback**: Error reporting mechanisms

### Development Workflow
- **TypeScript**: Strict mode for better type safety
- **Testing**: Unit tests with Vitest, E2E with Playwright
- **CI/CD**: Automated testing and deployment
- **Code Quality**: ESLint, Prettier, Husky pre-commit hooks

### Advanced Optimizations
- **Service Workers**: For caching and offline support
- **Web Workers**: For CPU-intensive tasks
- **Virtual Scrolling**: For large lists
- **Infinite Scrolling**: For paginated data
- **Prefetching**: Preload critical routes and data


### Build Optimization
- **Minification**: Vite handles this automatically
- **Source Maps**: Disable in production for security
- **Bundle Splitting**: Automatic vendor/app splitting
- **Tree Shaking**: Remove unused code
- **Dead Code Elimination**: Remove unreachable code
