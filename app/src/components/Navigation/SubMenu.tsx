import * as React from 'react'
import styled, { css, DefaultTheme } from '@xstyled/styled-components'
import { SubMenu as SubMenuType } from '../../types'
import { useNavigation } from '../../providers/NavigationProvider'
import { Heading } from '../../components/Text'
import { PageLink } from '../../components/PageLink'
import { PlusMinus } from '../../components/PlusMinus'
import { definitely } from '../../utils'

const { useState, useEffect } = React

interface SubMenuProps {
  subMenu: SubMenuType
  closeMenu: () => void
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

export const SubMenu = ({ closeMenu, subMenu }: SubMenuProps) => {
  const { menuOpen } = useNavigation()
  const [open, setOpen] = useState(false)
  const { title, links } = subMenu
  const toggleOpen = () => setOpen(!open)

  useEffect(() => {
    if (!menuOpen) setOpen(false)
  }, [menuOpen])

  if (!title || !links || !links.length) return null
  return (
    <>
      <SubmenuTop>
        <SubmenuButton onClick={toggleOpen}>
          <Heading m={0} level={4}>
            {title.toUpperCase()}
          </Heading>
          <PlusMinus open={open} />
        </SubmenuButton>
      </SubmenuTop>
      <SubmenuInner open={open}>
        {definitely(links).map((link) => {
          switch (link.__typename) {
            case 'Cta':
              return (
                <div key={link._key || 'some-key'}>
                  <PageLink onClick={closeMenu} link={link.link}>
                    <Heading level={4} fontStyle="italic">
                      {link.label || ''}
                    </Heading>
                  </PageLink>
                </div>
              )
            case 'SubMenu':
              return (
                <SubMenu
                  closeMenu={closeMenu}
                  key={link._key || 'some-key'}
                  subMenu={link}
                />
              )
          }
        })}
      </SubmenuInner>
    </>
  )
}
