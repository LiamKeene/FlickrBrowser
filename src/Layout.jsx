import styled from "styled-components"
import { mediaMin } from "./theme"

export const Container = styled.div`
  margin: 0 auto;
  padding: 1rem;
`

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
`

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  ${mediaMin.tablet`flex-direction: row;`}
`

export const SideBar = styled.div`
  display: flex;
  flex-direction: column;

  ${mediaMin.tablet`
    flex-basis: 35%;
    margin-right: 0.5rem;
  `}
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;

  ${mediaMin.tablet`
    flex-flow: row wrap;
    flex-basis: 65%;
    margin-left: 0.5rem;
  `}
`
