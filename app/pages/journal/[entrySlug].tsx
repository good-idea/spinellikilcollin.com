import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps, GetStaticPaths } from 'next'
import { JournalEntry as JournalEntryType } from '../../src/types'
import { NotFound } from '../../src/views/NotFound'
import { JournalEntryPage } from '../../src/views/JournalEntryPage'
import { request } from '../../src/graphql'
import { definitely } from '../../src/utils'

const journalEntryQuery = gql`
  query JournalEntryQuery($slug: String) {
    allJournalEntry(where: { slug: { current: { eq: $slug } } }) {
      _id
      _type
      publishDate
      title
      subtitle
      slug {
        current
      }
      tags
      bodyRaw
    }
  }
`

interface JournalEntryProps {
  entry?: JournalEntryType
}

const JournalEntry = ({ entry }: JournalEntryProps) => {
  if (!entry) return <NotFound />
  return <JournalEntryPage entry={entry} />
}

interface Response {
  allJournalEntry: JournalEntryType[]
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx
  if (!params) return { props: { entry: undefined } }
  const variables = { slug: params.entrySlug }
  const response = await request<Response>(journalEntryQuery, variables)
  const entries = response?.allJournalEntry

  const entry = entries && entries.length ? entries[0] : null
  return { props: { entry } }
}

/**
 * Static Paths
 */
const pageHandlesQuery = gql`
  query JournalEntriesHandlesQuery {
    allJournalEntry {
      _id
      slug {
        current
      }
    }
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await request<Response>(pageHandlesQuery)
  const entries = definitely(result?.allJournalEntry)
  const paths = entries.map((entry) => ({
    params: { entrySlug: entry?.slug?.current ?? undefined },
  }))

  return {
    paths,
    fallback: true,
  }
}

export default JournalEntry
