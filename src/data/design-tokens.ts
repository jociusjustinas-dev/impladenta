/**
 * Design tokens — Parkinsans from Bobolobo™ (https://bobolobo.webflow.io/)
 */

export const fonts = {
  family: 'Parkinsans, Arial, sans-serif',
  body: 'Parkinsans, Arial, sans-serif',
  heading: 'Parkinsans, Arial, sans-serif',
  label: 'Parkinsans, Arial, sans-serif',
  button: 'Parkinsans, Arial, sans-serif',
  weightBody: 400,
  weightHeading: 600,
  weightButton: 500,
  buttonSize: '15px',
} as const

/** @deprecated Use `fonts` */
export const baseframeFonts = fonts

export const baseframeColors = {
  light100: '#eee9e1',
  dark100: '#27241f',
  accent: '#fed007',
  accentPrimary: '#4c3e5e',
  liftLight: '#e6e0d6',
  liftLight2: '#dbd4c9',
  liftDark: '#33302b',
  backgroundBase: '#f6f3f0',
  success: '#4eab52',
  error: '#a63f3a',
  warning: '#c28a00',
} as const

export const baseframeBreakpoints = {
  tablet: 991,
  mobile: 767,
  mobileSm: 479,
} as const

export const baseframeContainers = {
  sm: 912,
  md: 1440,
  lg: 1800,
} as const
