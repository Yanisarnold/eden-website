import { defineField, defineType } from 'sanity'

export const location = defineType({
  name: 'nurseryLocation',
  title: 'Nursery photos',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Nursery',
      type: 'string',
      options: {
        list: [
          { title: 'Croydon', value: 'croydon' },
          { title: 'Streatham', value: 'streatham' },
          { title: 'Rochester', value: 'rochester' },
          { title: 'Holden Park', value: 'holden-park' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Photos (first one is the card cover)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
        },
      ],
    }),
  ],
  preview: { select: { title: 'slug', media: 'photos.0' } },
})