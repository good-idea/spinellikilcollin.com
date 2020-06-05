import * as React from 'react'
import styled, { css, DefaultTheme } from '@xstyled/styled-components'
import { SubMenu as SubMenuType } from '../../types'
import { Heading } from '../../components/Text'
import { PageLink } from '../../components/PageLink'
import { PlusMinus } from '../../components/PlusMinus'

const { useState } = React

interface SubMenuProps {
  subMenu: SubMenuType
}

const SubmenuButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SubmenuTop = styled.div`
  position: relative;
  button {
    width: 100%;
    text-align: left;
  }
`

interface SubmenuInnerProps {
  open: boolean
  theme: DefaultTheme
}

const SubmenuInner = styled.div`
  ${({ open }: SubmenuInnerProps) => css`
    display: ${open ? 'block' : 'none'};
    padding: 3 0 0 5;

    & div + div {
      margin-top: 3;
    }
  `}
`

export const SubMenu = ({ subMenu }: SubMenuProps) => {
  const [open, setOpen] = useState(false)
  const { title, links } = subMenu
  const toggleOpen = () => setOpen(!open)
  if (!title || !links || !links.length) return null
  return (
    <>
      <SubmenuTop>
        <SubmenuButton onClick={toggleOpen}>
          <Heading m={0} level={3}>
            {title.toUpperCase()}
          </Heading>
          <PlusMinus open={open} />
        </SubmenuButton>
      </SubmenuTop>
      <SubmenuInner open={open}>
        {links.map((cta) =>
          cta && cta.link && cta.label ? (
            <div key={cta._key || 'some-key'}>
              <PageLink link={cta.link}>
                <Heading level={3} fontStyle="italic">
                  {cta.label || ''}
                </Heading>
              </PageLink>
            </div>
          ) : null,
        )}
      </SubmenuInner>
    </>
  )
}
