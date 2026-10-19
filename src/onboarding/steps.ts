export const FLOW = [
  "/login",
  "/ownership",
  "/basics",
  "/contact",
  "/religion",
  "/community",
  "/location",
  "/education",
  "/family",
  "/about",
  "/photos",
  "/preferences",
] as const;

export const STEP_COUNT = FLOW.length;

export function nextStep(step: number) {
  return FLOW[step];
}

export function previousStep(step: number) {
  return FLOW[step - 2];
}
