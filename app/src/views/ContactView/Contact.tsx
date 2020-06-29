import * as React from 'react'
import { Box } from '@xstyled/styled-components'
import { Contact, ContactLine as ContactLineType } from '../../types'
import { PageWrapper } from '../../components/Layout'
import { Heading } from '../../components/Text'
import { Button } from '../../components/Button'
import {
  Wrapper,
  ContactLines,
  ContactLineWrapper,
  ChatWrapper,
} from './styled'
import { definitely } from '../../utils'
import ChatBox from '../../svg/ChatBox.svg'

interface ContactLineProps {
  contactLine: ContactLineType
}

const ContactLine = ({ contactLine }: ContactLineProps) => {
  const { label, contact } = contactLine
  if (!label || !contact) return null
  const href = /@/.test(contact)
    ? `mailto:${contact}`
    : `tel:${contact.replace(/[^0-9\.]+/g, '')}`
  return (
    <ContactLineWrapper>
      <Heading level={3}>{label}</Heading>
      <Heading level={2}>
        <a href={href}>{contact}</a>
      </Heading>
    </ContactLineWrapper>
  )
}

const Chat = () => {
  const launchChat = () => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.Intercom) {
      // @ts-ignore
      window.Intercom('show')
    }
  }
  return (
    <Box width={{ xs: '100%', md: 'auto' }}>
      <ChatBox />
      <Heading my={4} level={2}>
        Contact us directly, via Chat
      </Heading>
      <Button onClick={launchChat} width="100%" minWidth="220px">
        Launch Chat
      </Button>
    </Box>
  )
}

interface ContactProps {
  contact: Contact
}

export const ContactView = ({ contact }: ContactProps) => {
  const { title, contactLines } = contact
  return (
    <PageWrapper>
      <Heading level={0} textAlign="center">
        {title || 'Contact'}
      </Heading>
      <Wrapper>
        <ContactLines>
          {definitely(contactLines).map((cl) => (
            <ContactLine key={cl._key || 'some-key'} contactLine={cl} />
          ))}
        </ContactLines>

        <ChatWrapper>
          <Chat />
        </ChatWrapper>
      </Wrapper>
    </PageWrapper>
  )
}
