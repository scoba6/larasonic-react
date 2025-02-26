import { createInertiaApp } from '@inertiajs/react'
// import './bootstrap'

import { createHead, UnheadProvider } from '@unhead/react/client'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

import { createRoot } from 'react-dom/client'
import '../css/app.css'

const appName = import.meta.env.VITE_APP_NAME || 'GMR SAAS'

// Create a global head instance with Capo plugin
const head = createHead()

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx'),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el)
    root.render(
      <>
        <UnheadProvider head={head}>
          <App {...props} />
        </UnheadProvider>
      </>,
    )
  },
  progress: {
    color: '#4B5563',
  },
})
