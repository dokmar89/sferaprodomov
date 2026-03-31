import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'referencePageSettings',
  title: 'Nastavení stránky Reference',
  type: 'document',
  fields: [
    defineField({
      name: 'videoWebm',
      title: 'Video WebM (AV1)',
      type: 'file',
      options: { accept: 'video/webm' },
      description: 'Menší soubor, moderní prohlížeče. Konverze na convert.mezamii.com/web/',
    }),
    defineField({
      name: 'videoMp4',
      title: 'Video MP4 (H.264)',
      type: 'file',
      options: { accept: 'video/mp4' },
      description: 'Univerzální fallback, funguje všude.',
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster (první frame videa)',
      type: 'image',
      options: { hotspot: true },
      description: 'Zobrazí se okamžitě, než se video načte.',
    }),
    defineField({
      name: 'videoOpacity',
      title: 'Průhlednost videa (0-100)',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 20,
      description: 'Průhlednost videa přes gradient pozadí. Výchozí: 20%.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Nastavení stránky Reference' }
    },
  },
})
