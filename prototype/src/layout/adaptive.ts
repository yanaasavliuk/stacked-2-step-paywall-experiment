export type Orientation = 'portrait' | 'landscape'
export type DeviceClass = 'phone' | 'tablet'
export type SizeClass = 'small' | 'medium' | 'large'

export interface AdaptiveContext {
  width: number
  height: number
  orientation: Orientation
  deviceClass: DeviceClass
  sizeClass: SizeClass
}

function inferDeviceClass(width: number, height: number): DeviceClass {
  const shortestSide = Math.min(width, height)
  return shortestSide >= 768 ? 'tablet' : 'phone'
}

function inferSizeClass(deviceClass: DeviceClass, width: number): SizeClass {
  if (deviceClass === 'tablet') {
    if (width < 900) {
      return 'small'
    }
    if (width < 1200) {
      return 'medium'
    }
    return 'large'
  }

  if (width < 360) {
    return 'small'
  }
  if (width < 430) {
    return 'medium'
  }
  return 'large'
}

export function getAdaptiveContext(width: number, height: number): AdaptiveContext {
  const orientation: Orientation = width >= height ? 'landscape' : 'portrait'
  const deviceClass = inferDeviceClass(width, height)
  const sizeClass = inferSizeClass(deviceClass, width)

  return {
    width,
    height,
    orientation,
    deviceClass,
    sizeClass,
  }
}
