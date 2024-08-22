
1. 
a) Customized Version of tough-cookie 2.5.0 Which Is Not Vulnerable to CVE-2023-26136
To address the critical vulnerability CVE-2023-26136 in tough-cookie 2.5.0, I made modifications in the memstore.js file. This vulnerability, known as prototype pollution, allowed attackers to manipulate the prototypes of JavaScript objects by using malicious cookie domains such as __proto__. The changes ensure that this version of tough-cookie is secure against such attacks.

Finding the Solution:
The changes were identified by analyzing the differences between versions 4.1.2 and 4.1.3 of tough-cookie, where the vulnerability was addressed. By studying these differences, I was able to implement a similar solution in tough-cookie 2.5.0 to eliminate the risk of prototype pollution.

Changes in memstore.js:
Use of Object.create(null) for Secure Object Initialization:

In the original version of tough-cookie, cookie storage was initialized using plain JavaScript objects ({}). These objects inherit properties from Object.prototype, making them vulnerable to prototype pollution if a cookie with a domain like __proto__ was set.
To mitigate this risk, I replaced the initialization of all objects used for cookie storage with Object.create(null). This method creates an object with a null prototype, meaning it does not inherit any properties from Object.prototype, thus eliminating the risk of prototype pollution.
Specific changes:

Constructor Modification:
The this.idx object, which stores all cookies, is now initialized as Object.create(null) instead of {}.
Domain and Path Initialization:
Whenever a new domain or path is added to this.idx, it is now also created using Object.create(null).

b) For the actual test suite, it was observed that the test setGetCookieVows() in ietf_test.js did not pass. This failure was due to the fact that the URL used in the test did not correspond to an existing or reachable URL. Attempts to resolve this using Docker were unsuccessful.

c) In order to verify that the patch successfully mitigates the prototype pollution vulnerability, I added a unit test to the cookie_jar_test.js file. This test specifically targets the issue by attempting to exploit the vulnerability using the __proto__ domain.
Unit Test Details:

The unit test attempts to set a cookie with a domain of __proto__, which in the unpatched version would pollute the prototype of objects.
The test then checks if the pollution has occurred by verifying that a newly created object does not have unexpected properties.

Commands to run the tests:
1) Install Dependencies: 
Ensure you have the necessary dependencies installed: npm install

2) Run the Test Suite:
To run the full test suite, including the added prototype pollution test: npm test


The test output should confirm that all tests pass, indicating that the vulnerability has been effectively mitigated, except for the noted issue with setGetCookieVows() in ietf_test.js.


3)
The index.js script demonstrates the prototype pollution vulnerability (CVE-2023-26136) in tough-cookie 2.5.0 and verifies that the patched version prevents this exploit.

Prototype Pollution: The script attempts to exploit the vulnerability by setting a cookie with the domain __proto__, which can modify the global Object.prototype. This would affect all objects in the environment, potentially leading to severe security risks.

The script checks whether the exploit is successful by examining if an unexpected property appears on a new object. If the exploit works, the script outputs "EXPLOITED SUCCESSFULLY"; if the patch is effective, it outputs "EXPLOIT FAILED".

a) Original Version (tough-cookie@2.5.0): The prototype pollution exploit works, confirming the vulnerability, and results in "EXPLOITED SUCCESSFULLY".
b)Patched Version (tough-cookie-2.5.0-PATCHED.tgz): The exploit fails, confirming that the vulnerability has been patched, and results in "EXPLOIT FAILED".