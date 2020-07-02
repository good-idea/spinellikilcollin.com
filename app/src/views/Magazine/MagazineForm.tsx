import * as React from 'react'
import styled, { css, Box } from '@xstyled/styled-components'
import { Form, Field } from '../../components/Forms'
import { Button } from '../../components/Button'
import { Heading } from '../../components/Text'

const { useState } = React

const FieldsWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    margin-top: 7;

    > * {
      width: 100%;
      margin-bottom: 3;

      &:nth-last-child(3) {
        width: 150px;
        margin-right: 3;
      }
      &:nth-last-child(2) {
        flex-grow: 1;
        width: calc(100% - 150px - ${theme.space[3]}px);
      }
    }
  `}
`

interface FormValues {
  firstName: string
  lastName: string
  emailAddress: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

const initialValues = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  postalCode: '90065',
  country: 'United States',
}

interface MagazineFormProps {
  successMessage: string
}

export const MagazineForm = ({ successMessage }: MagazineFormProps) => {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const handleSubmit = async (values: FormValues) => {
    setSubmitting(true)
    await fetch('/api/925signup', {
      method: 'POST',
      body: JSON.stringify(values),
    }).then((r) => r.json())
    setSuccess(true)
  }
  return (
    <>
      {success ? (
        <Box textAlign="center" my={4}>
          <Heading level={3}>{successMessage}</Heading>
        </Box>
      ) : (
        <Form<FormValues>
          disabled={submitting || success}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <FieldsWrapper>
            <Field name="firstName" placeholder="First Name" required />
            <Field name="lastName" placeholder="Last Name" required />
            <Field
              name="emailAddress"
              type="email"
              placeholder="email address"
              required
            />
            <Field
              name="address1"
              placeholder="Mailing Address Line 1"
              required
            />
            <Field name="address2" placeholder="Mailing Address Line 2" />
            <Field name="city" placeholder="City" required />
            <Field name="state" placeholder="State" required />
            <Field name="postalCode" placeholder="Postal Code" required />
            <Field
              name="country"
              type="countrySelector"
              placeholder="Country"
              required
            />
            <Button disabled={submitting || success} type="submit">
              Submit
            </Button>
          </FieldsWrapper>
        </Form>
      )}
    </>
  )
}
