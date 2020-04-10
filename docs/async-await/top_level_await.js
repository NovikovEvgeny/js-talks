/// [asyncAndPromise]
async function foo() {
    await new Promise((res) => {
        setTimeout(() => {
            res('hello from the future');
        }, 5000);
    });
}

foo()
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });
/// [asyncAndPromise]

/// [asynAndIIFE]
async function foo() {
    await new Promise((res) => {
        setTimeout(() => {
            res('hello from the future');
        }, 5000);
    });
}

(async function main() {
    try {
        const result = await foo();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
})();
/// [asynAndIIFE]