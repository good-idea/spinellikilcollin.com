export const page = {
  title: 'Page',
  type: 'document',
  name: 'page',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'hero',
      type: 'hero',
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'string',
    },
    {
      name: 'slug',
      label: 'Page URL',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      label: 'Content',
      type: 'richText',
    },
  ],
}
