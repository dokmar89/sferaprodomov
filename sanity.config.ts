'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { csCZLocale } from '@sanity/locale-cs-cz'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'SFERA PRO DOMOV',
  basePath: '/studio',
  projectId,
  dataset,
  apiVersion,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  document: {
    newDocumentOptions: (prev) =>
      prev.filter((item) => item.templateId !== 'referencePageSettings'),
  },
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool(),
    csCZLocale(),
  ],
})
