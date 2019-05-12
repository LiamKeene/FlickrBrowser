import { css } from "styled-components"

const sizes = {
  phone: 320,
  tablet: 768,
  desktop: 992,
  large: 1200,
}

// iterate through the sizes and create a media template
export const mediaMin = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})
