const collisions = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 31075, 31075, 31075, 31075, 31075, 31075, 0, 31075,
  31075, 0, 31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075,
  31075, 31075, 31075, 0, 0, 0, 0, 31075, 31075, 31075, 0, 31075, 31075, 31075,
  31075, 31075, 0, 31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075,
  31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  31075, 0, 0, 31075, 31075, 31075, 0, 0, 31075, 0, 31075, 31075, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 31075, 31075, 31075, 31075, 0, 0, 0, 31075, 0, 0, 0, 0, 0,
  31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0,
  31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0,
  0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  31075, 0, 0, 31075, 31075, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  31075, 0, 0, 31075, 31075, 31075, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 31075, 31075, 0, 0, 31075, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 31075, 31075, 0, 0, 31075,
  0, 0, 0, 0, 0, 0, 31075, 31075, 31075, 31075, 0, 31075, 0, 0, 0, 0, 0, 31075,
  0, 0, 31075, 31075, 31075, 31075, 31075, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 31075, 31075, 31075,
  31075, 31075, 31075, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  31075, 0, 31075, 31075, 31075, 31075, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 31075, 31075, 31075, 31075,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 31075, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 31075,
  31075, 31075, 31075, 31075, 31075, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 31075,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 31075, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 31075, 0, 31075, 31075, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 31075, 31075, 31075, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 31075, 31075, 31075, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 31075, 31075, 31075, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 31075, 31075, 31075, 31075, 31075, 31075,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 31075, 31075, 31075, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 31075, 31075, 0, 0, 31075,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 31075, 31075, 0, 0, 0, 0, 31075, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 31075, 31075, 31075,
  31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 31075, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  31075, 31075, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 31075, 0, 0, 31075, 31075, 31075, 31075,
  0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 31075, 31075, 31075, 31075,
  31075, 31075, 31075, 31075, 0, 0, 31075, 31075, 0, 0, 31075, 31075, 31075,
  31075, 31075, 31075, 31075, 31075, 31075, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  31075, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 31075, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 31075, 31075, 31075, 31075, 0, 31075, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0,
  31075, 31075, 31075, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075,
  31075, 0, 0, 0, 0, 31075, 31075, 31075, 0, 0, 31075, 31075, 0, 0, 0, 0, 0,
  31075, 31075, 0, 31075, 31075, 31075, 31075, 31075, 0, 31075, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 31075, 31075, 0, 0, 0, 0, 0, 0, 0, 31075, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 31075, 31075, 0, 0, 0, 0, 0, 0, 0, 31075, 31075, 0, 0, 0, 31075, 31075,
  31075, 0, 31075, 31075, 31075, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075,
  31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075,
  31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075,
  31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075, 31075,
  31075, 31075, 31075, 31075, 31075, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
];
