// Create a new company
// POST /api/createCompany
// with json:
// {"name": ...,
//  "description": ...,
//  "headquarters": ...,
//  "industry: ...,"}
// employees automatically done by creating a new employee
//
// Create a new employee
// POST /api/createEmployee
// with json:
// {"firstName": ...,
//  "lastName": ...,
//  "company": ...,
//  "startDate": ...,
//  "headquarters": ...,
//  "jobTitle": ...,
//  "salary: ...,"}
//
// Get a company by id
// GET /api/getCompany?id=...
//
// Get an employee by id
// GET /api/getEmployee?id=...
//
// Update a company by id
// POST /api/updateCompany?id=...
// with json containing fields to be modified
// employees will be automatically mofidied by updating an employee
//
// Update an employee by id
// POST /api/updateEmployee?id=...
// with json containing fields to be modified
//
// Delete a company by id
// DELETE /api/deleteCompany?id=...
//
// Delete an employee by id
// DELETE /api/deleteEmployee?id=...
//
// Get all companies
// GET /api/getAllCompanies
//
// Get all employees
// GET /api/getAllEmployees
//
// Get all employees of a company
// GET /api/getAllEmployeesInCompany?id=...
//
// .env file used for this server:
// MONGODB_URI="mongodb://127.0.0.1:27017/test"

const http = require("http");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const url = require("url");
require("dotenv").config();

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });

const { Company, Employee } = require("./schema");

const server = http.createServer(async (req, res) => {
    if (req.method === "GET" && req.url.startsWith("/api/getCompany")) {
        try {
            const urlParsed = new URL("http://localhost:3000" + req.url);
            const ID = urlParsed.searchParams.get("id");
            if (ID === null) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify({ error: "Parameter needed not provided" })
                );
                return;
            }
            const company = await Company.findById(ID);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(company));
        } catch (err) {
            console.log(err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal Server Error" }));
        }
    } else if (req.method === "GET" && req.url.startsWith("/api/getEmployee")) {
        try {
            const urlParsed = new URL("http://localhost:3000" + req.url);
            const ID = urlParsed.searchParams.get("id");
            if (ID === null) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify({ error: "Parameter needed not provided" })
                );
                return;
            }
            const employee = await Employee.findById(ID);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(employee));
        } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal Server Error" }));
        }
    } else if (req.method === "GET" && req.url === "/api/getAllCompanies") {
        try {
            const companies = await Company.find();

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(companies));
        } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal Server Error" }));
        }
    } else if (req.method === "GET" && req.url === "/api/getAllEmployees") {
        try {
            const employees = await Employee.find();

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(employees));
        } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal Server Error" }));
        }
    } else if (
        req.method === "GET" &&
        req.url.startsWith("/api/getAllEmployeesInCompany")
    ) {
        try {
            const urlParsed = new URL("http://localhost:3000" + req.url);
            const ID = urlParsed.searchParams.get("id");
            if (ID === null) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify({ error: "Parameter needed not provided" })
                );
                return;
            }
            const employees = await Employee.find({
                company: ID,
                resigned: false,
            });

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(employees));
        } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal Server Error" }));
        }
    } else if (req.method === "POST" && req.url === "/api/createCompany") {
        try {
            const body = [];
            req.on("data", (chunk) => {
                body.push(chunk);
            });
            req.on("end", async () => {
                const parsedBody = JSON.parse(Buffer.concat(body).toString());
                const company = new Company({
                    name: parsedBody.name,
                    description: parsedBody.description,
                    headquarters: parsedBody.headquarters,
                    industry: parsedBody.industry,
                    employees: parsedBody.employees,
                });
                await company.save();
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(company));
            });
        } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal Server Error" }));
        }
    } else if (req.method === "POST" && req.url === "/api/createEmployee") {
        try {
            const body = [];
            req.on("data", (chunk) => {
                body.push(chunk);
            });
            req.on("end", async () => {
                const parsedBody = JSON.parse(Buffer.concat(body).toString());
                const employee = new Employee({
                    firstName: parsedBody.firstName,
                    lastName: parsedBody.lastName,
                    company: parsedBody.company,
                    startDate: parsedBody.startDate,
                    jobTitle: parsedBody.jobTitle,
                    resigned: parsedBody.resigned,
                    salary: parsedBody.salary,
                });
                if ("manager" in parsedBody) {
                    employee.manager = parsedBody.manager;
                }
                await employee.save();
                // Add this employee to company
                const company = await Company.findById(parsedBody.company);
                company.employees.push(employee);
                await company.save();
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(employee));
            });
        } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal Server Error" }));
        }
    } else if (
        req.method === "POST" &&
        req.url.startsWith("/api/updateCompany")
    ) {
        try {
            const urlParsed = new URL("http://localhost:3000" + req.url);
            const ID = urlParsed.searchParams.get("id");
            if (ID === null) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify({ error: "Parameter needed not provided" })
                );
                return;
            }

            const body = [];
            req.on("data", (chunk) => {
                body.push(chunk);
            });
            req.on("end", async () => {
                const parsedBody = JSON.parse(Buffer.concat(body).toString());
                const company = await Company.findByIdAndUpdate(ID, parsedBody);

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(company));
            });
        } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal Server Error" }));
        }
    } else if (
        req.method === "POST" &&
        req.url.startsWith("/api/updateEmployee")
    ) {
        try {
            const urlParsed = new URL("http://localhost:3000" + req.url);
            const ID = urlParsed.searchParams.get("id");
            if (ID === null) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify({ error: "Parameter needed not provided" })
                );
                return;
            }

            const body = [];
            req.on("data", (chunk) => {
                body.push(chunk);
            });
            req.on("end", async () => {
                const parsedBody = JSON.parse(Buffer.concat(body).toString());
                let oldCompanyId;
                Employee.findById(ID).then((result) => {
                    oldCompanyId = result.company;
                });
                const employee = await Employee.findByIdAndUpdate(
                    ID,
                    parsedBody,
                    { new: true }
                );
                // Modify company if the employee changed company field
                if ("company" in parsedBody) {
                    const oldCompany = await Company.findByIdAndUpdate(
                        oldCompanyId,
                        {
                            $pull: { employees: new ObjectId(ID) },
                        }
                    );
                    const newCompany = await Company.findByIdAndUpdate(
                        employee.company,
                        {
                            $push: { employees: new ObjectId(ID) },
                        }
                    );
                }

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(employee));
            });
        } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal Server Error" }));
        }
    } else if (
        req.method === "DELETE" &&
        req.url.startsWith("/api/deleteCompany")
    ) {
        try {
            const urlParsed = new URL("http://localhost:3000" + req.url);
            const ID = urlParsed.searchParams.get("id");
            if (ID === null) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify({ error: "Parameter needed not provided" })
                );
                return;
            }
            // After deleting, setting all employees in the compnay as resigned: true
            Company.findByIdAndDelete(ID).then((company) => {
                company.employees.forEach(async (id) => {
                    const employee = await Employee.findByIdAndUpdate(id, {
                        resigned: true,
                    });
                });
            });

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ info: `Company ${ID} deleted` }));
        } catch (err) {
            console.log(err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal Server Error" }));
        }
    } else if (
        req.method === "DELETE" &&
        req.url.startsWith("/api/deleteEmployee")
    ) {
        try {
            const urlParsed = new URL("http://localhost:3000" + req.url);
            const ID = urlParsed.searchParams.get("id");
            if (ID === null) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify({ error: "Parameter needed not provided" })
                );
                return;
            }
            let employee = await Employee.findById(ID);
            // Delete from company
            const companyId = employee.company;
            const company = Company.findByIdAndUpdate(companyId, {
                employees: { $pull: { employees: new ObjectId(ID) } },
            });
            employee = await Employee.findByIdAndDelete(ID);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ info: `Employee ${ID} deleted` }));
        } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal Server Error" }));
        }
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Not Found" }));
    }
});

server.listen(3000, () => console.log("Server is listening on port 3000"));
