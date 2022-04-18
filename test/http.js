const fetch = require("node-fetch-commonjs").default;

exports.get = async (url, options = {}) =>
    await fetch(url, options);

exports.post = async (url, body = undefined, options = {}) =>
    await fetch(url, {
        ...options,
        method: "POST",
        body: body !== undefined ? JSON.stringify(body) : undefined,
        headers: {
            ...options?.headers ?? {},
            "Content-Type": "application/json",
        },
    });

exports.put = async (url, body = undefined, options = {}) =>
    await fetch(url, {
        ...options,
        method: "PUT",
        body: body !== undefined ? JSON.stringify(body) : undefined,
        headers: {
            ...options?.headers ?? {},
            "Content-Type": "application/json",
        },
    });

exports.delete = async (url, options = {}) =>
    await fetch(url, {
        ...options,
        method: "DELETE",
    });
