const supertest = require("supertest");
const app = require("../app");

let studentId;

test("CREATE -> '/api/v1/student' should return status 201", async () => {
  const student = {
    firstName: "Jose",
    lastName: "Toro",
    birthday: "1998-02-10",
    program: "Programacion Web",
  };

  const res = await supertest(app).post("/api/v1/students").send(student);

  studentId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(student.firstName);
});

test("GET ALL -> '/api/v1/students', should return status 200, and to have length 1", async () => {
  const res = await supertest(app).get("/api/v1/students");

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("GET ONE -> `/api/v1/students/:id` should return status 200", async () => {
  const res = await supertest(app).get(`/api/v1/students/${studentId}`);

  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe("Jose");
});

test("UPDATE -> `/api/v1/students/:id` should return status 200", async () => {
  const student = {
    firstName: "Juan",
  };

  const res = await supertest(app)
    .put(`/api/v1/students/${studentId}`)
    .send(student);

  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(student.firstName);
});

test("DELETE -> `/api/v1/students/:id` should return status 204", async () => {
  const res = await supertest(app).delete(`/api/v1/students/${studentId}`);

  expect(res.status).toBe(204);
});
