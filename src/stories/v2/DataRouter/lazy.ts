function sleep(n = 500) {
  return new Promise((r) => setTimeout(r, n));
}

export async function getCount() {
  return sleep(100).then(() => ({ count: 42 }));
}
