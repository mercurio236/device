import styled from "styled-components";

export const DivContainer = styled.div`
    display: flex;
    margin: 2.5rem;
    background:${(theme) => theme.theme['gray-900']};
    border-radius: 5px;
    padding: 2rem;
    flex-direction: column;
 
`

export const DeviceContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
`

export const Input = styled.input`
    height: 30px;
    padding: 5px;
    border-radius: 5px;
    border-width: 1px;
`

export const ButtonSearch = styled.button``