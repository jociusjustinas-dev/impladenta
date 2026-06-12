/** Entrance motion — visible state must not set transform/filter or child backdrop-filter breaks. */
export function entranceClass(visible: boolean, withBlur = false) {
  if (withBlur) {
    return `transition-[opacity,transform,filter] duration-700 ease-out ${
      visible ? 'opacity-100' : 'translate-y-[50px] opacity-0 blur-[12px]'
    }`
  }

  return `transition-[opacity,transform] duration-700 ease-out ${
    visible ? 'opacity-100' : 'translate-y-[50px] opacity-0'
  }`
}
