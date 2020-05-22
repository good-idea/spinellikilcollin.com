import * as React from 'react'
import { Contact, ContactLine as ContactLineType } from '../../types'
import { PageWrapper, Column } from '../../components/Layout'
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
      <Heading level={4}>{label}</Heading>
      <Heading level={3}>
        <a href={href}>{contact}</a>
      </Heading>
    </ContactLineWrapper>
  )
}

const Chat = () => {
  const launchChat = () => alert('todo')
  return (
    <div>
      <ChatBox />
      <Heading my={4} level={3}>
        Contact us directly, via Chat
      </Heading>
      <Button onClick={launchChat} width="100%" minWidth="300px">
        Launch Chat
      </Button>
    </div>
  )
}

interface ContactProps {
  contact: Contact
}

export const ContactView = ({ contact }: ContactProps) => {
  const { title, contactLines } = contact
  return (
    <PageWrapper>
      <Heading level={1} textAlign="center">
        {title || 'Contact'}
      </Heading>
      <Column columnWidth="wide">
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
      </Column>
    </PageWrapper>
  )
}
