export const magazine = {
  type: 'document',
  name: 'magazine',
  title: '.925',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'richText',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Cover Image',
      name: 'coverImage',
      type: 'richImage',
      validation: (Rule) => Rule.required(),
    },
  ],
}
