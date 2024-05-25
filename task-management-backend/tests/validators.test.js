const { validateTask } = require("../utils/validators");
const httpMocks = require("node-mocks-http");

describe("Task Validation Middleware", () => {
  it("should pass validation for valid task data", () => {
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/api/tasks",
      body: {
        title: "Valid Title",
        description: "Valid Description",
        status: "to_do",
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    validateTask(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should fail validation for missing title", () => {
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/api/tasks",
      body: {
        description: "Valid Description",
        status: "to_do",
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    validateTask(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(400);
  });

  it("should fail validation for invalid status", () => {
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/api/tasks",
      body: {
        title: "Valid Title",
        description: "Valid Description",
        status: "invalid_status",
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    validateTask(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(400);
  });
});
