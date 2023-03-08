
const foo = 777;

try {
    const r = await foo;
    console.info(r);
} catch (e) {
    console.error("damn");
}

console.log("end");