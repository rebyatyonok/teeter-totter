export const shapes = ['circle', 'rectangle', 'triangle'] as const
export type Side = 'left' | 'right'

// need this two types to explicitly distinguish this values form a usual number
export type Meter = number
export type Degree = number


