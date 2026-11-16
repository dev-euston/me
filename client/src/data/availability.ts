export interface AvailabilityStatus {
  available: boolean
  label: string
  since?: string
  currentlyBuilding?: { name: string; link?: string; since?: string }
}

export const AVAILABILITY_STATUS: AvailabilityStatus = {
  available: true,
  label: 'Open to opportunities',
}
