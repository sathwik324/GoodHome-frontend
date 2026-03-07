async function probe() {
    const loginRes = await fetch("https://goodhome-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test2@example.com", password: "password123" }),
    });
    const { token } = await loginRes.json();
    const h = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    const gets = [
        "/api/groups/my",
        "/api/groups",
    ];
    for (const p of gets) {
        const r = await fetch(`https://goodhome-backend.onrender.com${p}`, { headers: h });
        console.log(`\n=== GET ${p} === STATUS: ${r.status}`);
        if (r.ok) console.log(JSON.stringify(await r.json(), null, 2).substring(0, 800));
        else console.log(await r.text().then(t => t.substring(0, 200)));
    }

    console.log("\n=== POST /api/groups/create ===");
    const cr = await fetch("https://goodhome-backend.onrender.com/api/groups/create", {
        method: "POST", headers: h,
        body: JSON.stringify({ name: "Test Family", description: "A test group" }),
    });
    console.log(`STATUS: ${cr.status}`);
    const crData = await cr.json().catch(() => ({}));
    console.log(JSON.stringify(crData, null, 2).substring(0, 500));

    const groupId = crData._id || crData.group?._id || crData.data?._id;
    if (groupId) {
        const subs = [
            `/api/groups/${groupId}`,
            `/api/groups/${groupId}/channels`,
            `/api/groups/${groupId}/members`,
            `/api/groups/${groupId}/events`,
            `/api/groups/${groupId}/media`,
        ];
        for (const p of subs) {
            const r = await fetch(`https://goodhome-backend.onrender.com${p}`, { headers: h });
            console.log(`\n=== GET ${p} === STATUS: ${r.status}`);
            if (r.ok) console.log(JSON.stringify(await r.json(), null, 2).substring(0, 500));
            else console.log(await r.text().then(t => t.substring(0, 200)));
        }
    } else {
        console.log("No groupId from create response, skipping sub-route tests.");
    }
}
probe();
