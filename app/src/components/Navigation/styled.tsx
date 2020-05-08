import styled, { css, DefaultTheme } from '@xstyled/styled-components'

export const Wrapper = styled.nav`
  display: block;
  position: relative;
  z-index: nav;
  font-family: serif;
  position: fixed;
  top: 0px;
  margin-top: 3;
  left: 0;
  right: 0;
  width: 100vw;
`

export const Inner = styled.div`
  ${({ theme }) => css`
    height: ${theme.navHeight};
    display: grid;
    border-bottom: 1px solid;
    grid-template-columns: 1fr 220px 1fr;
    align-items: center;
    padding: 2 0;
    margin: 0 auto;
    max-width: calc(100% - ${theme.space[6]}px);
    width: 100%;
  `}
`

interface WithReady {
  theme: DefaultTheme
  ready: boolean
  align?: string
}

export const NavSection = styled.div`
  ${({ ready, align }: WithReady) => css`
    transition: 0.3s;
    flex-grow: 1;
    display: flex;
    justify-content: ${align === 'right' ? 'flex-end' : 'flex-start'};
    align-items: stretch;
    height: 100%;
    opacity: ${ready ? '1' : '0'};

    &:last-child {
      justify-content: flex-end;
    }
  `}
`

export const Logo = styled.img`
  width: 220px;
`

interface WithActive {
  theme: DefaultTheme
  active?: boolean
}

export const NavHeader = styled.button`
  ${({ active }: WithActive) => css`
    font-size: 5;
    border-top: 2px solid transparent;
    border-bottom: 2px solid ${active ? 'black' : 'transparent'};
    color: inherit;
    text-decoration: none;
    transition: 0.2s;
  `}
`

export const NavHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  margin: 0 1em;

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }

  &:focus ${NavHeader}, &:hover > ${NavHeader} {
    border-bottom-color: black;
  }
`

interface WithOpen {
  theme: DefaultTheme
  open: boolean
}

interface WithVisible {
  theme: DefaultTheme
  active: boolean
}

interface ModalBackgroundProps {
  open: boolean
}

export const ModalBackground = styled.div`
  ${({ open }: ModalBackgroundProps) => css`
    height: 100vh;
    position: fixed;
    background: #0000004d;
    width: 100vw;
    top: 0;
    cursor: pointer;
    display: ${open ? 'block' : 'none'};
  `}
`

interface LoadingProps {
  theme: DefaultTheme
  isLoading?: boolean
}

export const CartButtonWrapper = styled.button`
  ${({ isLoading }: LoadingProps) => css`
    opacity: ${isLoading ? '0.5' : '1'};
    position: relative;
    transition: 250ms ease;
    display: flex;
    align-items: center;
    justify-self: end;
    svg {
      display: inline-block;
    }
  `}
`

export const CartBadge = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -10px;
  left: -10px;
  width: 20px;
  height: 20px;
  background-color: body.8;
  color: body.0;
  border-radius: 20px;
`

interface SideNavigation {
  theme: DefaultTheme
  open?: boolean
}

export const SideNavigation = styled.div`
  ${({ open }: SideNavigation) => css`
    transform: ${open ? 'translateX(0px)' : 'translateX(-500px)'};
    width: 500px;
    background-color: white;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    transition: 250ms ease;
  `};
`

interface Hamburger {
  theme: DefaultTheme
  open?: boolean
}

export const Hamburger = styled.div`
  ${({ open }: Hamburger) => css`
    cursor: pointer;
    transition: 250ms ease;
    position: relative;
    z-index: 3;
    &:hover {
      opacity: 0.5;
    }

    span {
      width: 30px;
      height: 1px;
      background-color: black;
      display: block;
      margin: 9px;
      transition: 50ms ease;
    }

    span:nth-child(1) {
      transform: ${open
        ? 'rotate(45deg) translateY(1px) translateX(10px)'
        : 'rotate(0) translateY(0px)'};
    }
    span:nth-child(3) {
      transform: ${open
        ? 'rotate(-45deg) translateY(3px) translateX(6px)'
        : 'rotate(0) translateY(0px)'};
    }
    span:nth-child(2) {
      display: ${open ? 'none' : 'block'};
    }
  `}
`

export const NavInner = styled.div`
  padding: 7;
  height: 100vh;
  border-right: 1px solid black;
  > div {
    margin: 6 0;
  }
  ul {
    list-style: none;
    padding: 0;
    li {
      font-family: serif;
      margin: 3 0;
      padding: 5 0 3;
      border-top: 1px solid black;
      text-transform: uppercase;
      font-size: 5;
    }
  }
`
export const NavItemWrapper = styled.div`
  display: block;
  padding: 3 0;

  & + & {
    border-top: 1px solid black;
  }
`