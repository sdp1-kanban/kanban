const db = require("./db");
const Job = require("../app/models/job.model");
const express = require("../config/express");
const { get, post, put, delete: httpDelete } = require("./http");
const { it, expect } = require("@jest/globals");

const PORT = 3002;
const BASE_URL = `http://localhost:${PORT}`;

let app;
let httpServer;

beforeAll(async () => {
    await db.connect();

    app = express();
    httpServer = app.listen(PORT);
});

afterEach(async () => {
    await db.clear();   
});

afterAll(async () => {
    httpServer.close();
    await db.close();
});

const createJob = async (toolingNum = "TN-123") => {
    const result = await post(`${BASE_URL}/api/job`, {
        toolingNum,
        dueDate: new Date("2022-04-01"),
        customerName: "AMD",
        partNum: "PT-112233",
        revisionNum: 1,
        jobType: "ECO",
        jobShortDesc: "Short Description",
        assignedTo: "No one",
        column: "Engineering",
        isJobOpen: true,
        attachments: [],
        jobOpenDate: new Date("2022-04-01"),
        jobClosedDate: null,
    });

    expect(result.status).toBe(201);

    return await result.json();
};

const getJobs = async () => {
    const result = await get(`${BASE_URL}/api/jobs`);
    expect(result.status).toBe(200);

    return await result.json();
};

describe("job api test", () => {
    it("can create job", async () => {
        await createJob();

        const dbResult = await Job.findOne({ toolingNum: "TN-123" }).exec();
        expect(dbResult).not.toBeUndefined();
        expect(dbResult).not.toBeNull();
        expect(dbResult.customerName).toBe("AMD"); // Present in database
    });

    it("can list jobs when none exist", async () => {
        const data = await getJobs();
        expect(Array.isArray(data.data)).toBe(true);
        expect(data.data.length).toBe(0);
    });

    it("can list jobs after creating 1", async () => {
        await createJob();

        const data = await getJobs();
        expect(Array.isArray(data.data)).toBe(true);
        expect(data.data.length).toBe(1);
    });

    it("can list jobs after creating 5", async () => {
        for (let i = 0; i < 5; i++)
            await createJob(`TN-${i + 123}`);

        const data = await getJobs();
        expect(Array.isArray(data.data)).toBe(true);
        expect(data.data.length).toBe(5);
    });

    it("can update job", async () => {
        const { id } = await createJob();
        const jobsResult = await getJobs();

        await put(`${BASE_URL}/api/job/${id}`, {
            ...jobsResult.data[0],
            column: "CAM Engineering"
        });

        const dbResult = await Job.findOne({ toolingNum: "TN-123" }).exec();
        expect(dbResult.column).toBe("CAM Engineering"); // Updated in database
    });

    it("can delete job", async () => {
        const { id } = await createJob();
        expect((await Job.find({}).exec()).length).toBe(1);

        await httpDelete(`${BASE_URL}/api/job/${id}`);
        expect((await Job.find({}).exec()).length).toBe(0);
    });

    it("can close job", async () => {
        const { id } = await createJob();

        const result = await put(`${BASE_URL}/api/job/close/${id}`);
        expect(result.status).toBe(200);

        const dbResult = await Job.findOne({ toolingNum: "TN-123" }).exec();
        expect(dbResult.isJobOpen).toBe(false); // Updated in database
    });
});
