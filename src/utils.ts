export function unreachable() {
  return new Error("Entered unreachable code");
}

export function unimplemented() {
  return new Error("Not yet implemented");
}
