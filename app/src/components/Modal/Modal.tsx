import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Heading } from '../Text'
import { useLockScroll } from '../LockScroll'
import { Background, ModalWrapper, Wrapper, CloseButton } from './styled'

const { useEffect } = React

interface ModalProps {
  children: React.ReactNode
  open: boolean
  title: string
  closeModal: () => void
}

export const Modal = ({ children, title, open, closeModal }: ModalProps) => {
  const { lockScroll, unlockScroll } = useLockScroll()

  const handleKeyup = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }

  useEffect(() => {
    if (open) {
      lockScroll()
      document.addEventListener('keyup', handleKeyup)
      return () => {
        document.removeEventListener('keyup', handleKeyup)
      }
    } else {
      unlockScroll()
    }
  }, [open])

  if (!open || typeof document === 'undefined') return null
  const modalRoot = document.getElementById('modal')
  if (!modalRoot) throw new Error('No modal root')

  return ReactDOM.createPortal(
    <Wrapper>
      <ModalWrapper>
        <Heading level={3}>{title}</Heading>
        <CloseButton onClick={closeModal} />
        {children}
      </ModalWrapper>
      <Background open={open} onClick={closeModal} />
    </Wrapper>,
    modalRoot,
  )
}
