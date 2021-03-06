import * as React from 'react'
import { groupBy, prop } from 'ramda'
import { IoIosListBox } from 'react-icons/io'
import { BlockPreview } from '../components/BlockPreview'
import { getReferencedDocument, getShopifyThumbnail } from '../utils'

const getPreviewValues = async (values) => {
  const { link, label } = values
  if (!link || !link.document || !link.document._ref)
    return { title: 'Missing Link' }
  const linkedDoc = await getReferencedDocument(link.document._ref)

  const shopifyThumbnail =
    linkedDoc &&
    (linkedDoc._type === 'shopifyProduct' ||
      linkedDoc._type === 'shopifyCollection')
      ? getShopifyThumbnail(linkedDoc)
      : undefined

  const subtitles = [
    linkedDoc ? `🔗${linkedDoc.title}` : null,
    linkedDoc && linkedDoc.archived === true
      ? `🛑 This collection is archived and will not be displayed on the site.`
      : undefined,
  ].filter(Boolean)

  return {
    title: label || linkedDoc.title,
    subtitles,
    src: shopifyThumbnail,
  }
}

export const MenuLink = {
  name: 'menuLink',
  type: 'object',
  title: 'Link',
  fields: [
    {
      title: 'Label',
      name: 'label',
      type: 'string',
    },
    {
      title: 'Link',
      name: 'link',
      type: 'internalLink',
      options: {
        required: true,
      },
    },
  ],
  preview: {
    select: {
      link: 'link',
      label: 'label',
    },
    prepare: (val) => val,
    component: (props) => (
      <BlockPreview {...props} getPreviewValues={getPreviewValues} />
    ),
  },
}

export const subMenu = {
  title: 'Submenu',
  name: 'subMenu',
  type: 'object',
  icon: IoIosListBox,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Links & Submenus',
      name: 'links',
      type: 'array',
      of: [{ type: 'cta' }, { type: 'subMenu' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      links: 'links',
    },
    prepare: ({ title, links }) => {
      const byType = groupBy(prop('_type'), links || {})

      const { richPageLink: richPageLinks, linkGroup: linkGroups } = byType

      const subtitle = [
        richPageLinks && richPageLinks.length
          ? `${richPageLinks.length} Page Link${
              richPageLinks.length === 1 ? '' : 's'
            }`
          : undefined,
        linkGroups && linkGroups.length
          ? `${linkGroups.length} Link Group${
              linkGroups.length === 1 ? '' : 's'
            }`
          : undefined,
      ]
        .filter(Boolean)
        .join(' | ')
      return {
        title,
        subtitle,
      }
    },
  },
}
