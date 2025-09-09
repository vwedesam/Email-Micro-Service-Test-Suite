# Email Micro-service API Test Suite

The test suite is built using `Node.js`, `Typescript` and `Jest`.

## #Endpoints
> POST /send-email: Handles requests to queue an email for delivery.

Sample Payload:

```sh
{
  "to": "samvwede@QA.com",
  "subject": "Welcome!",
  "body": "Thanks for signing up."
}
```
Expected Responses:
- 202 Accepted - Job accepted into the queue.
- 422 Unprocessable Entity - Missing or invalid fields.
- 503 Service Unavailable - Queue is full.

## Project Structure
```sh
-- app.ts
-- test/
----- e2e.test.ts
-- readme.md
-- package.json
-- .
-- .
```

## Installation & Setup
Clone the repository:
```sh
git clone git@github.com:vwedesam/Email-Micro-Service-Test-Suite.git
cd /Email-Micro-Service-Test-Suite
```
Install dependencies:
```sh
npm install
```
## Run Sever & Test
Run app server:
```sh
npm run start
```
Run test:
```sh
npm run test
```
> Coverage is generated automatically whenever you run the test script
## #Test Cases
- A valid request returns `202`
- Missing `to` returns `400`
- Invalid email returns `400`
- Simulate queue full returns `503`
