import * as React from 'react'
import Link from 'next/link'
import styled from '@xstyled/styled-components'
import { Cta } from '../types'
import { getPageLinkUrl } from '../utils/links'

interface CTAProps {
  cta: Cta
}

const Outer = styled.div`
  margin: 2 0;
`

const Wrapper = styled.a`
  padding: 3;
  border: 1px solid;
  color: inherit;
  display: inline;
  text-decoration: none;
`

export const CTA = ({ cta }: CTAProps) => {
  const { label, link } = cta
  if (!link?.document) return null
  const { as, href } = getPageLinkUrl(link.document) || {}
  if (!href) {
    console.warn('No link href created for link:', link)
    return null
  }
  return (
    <Outer>
      <Link as={as} href={href}>
        <Wrapper>{label}</Wrapper>
      </Link>
    </Outer>
  )
}
