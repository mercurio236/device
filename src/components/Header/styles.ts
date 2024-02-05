import styled from 'styled-components'

export const DivHeaderContainer = styled.div`
  background: ${(theme) => theme.theme['gray-900']};
  padding: 2.5rem 0 2.5rem;
`

export const DivHeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`
