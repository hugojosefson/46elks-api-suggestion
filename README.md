# Suggestion for a new version of the 46elks.com API

The [API for 46elks.com](http://www.46elks.com/docs) is very interesting and good in many ways. There are also ways it could improve to be more predictable, for example by adopting widely used standards and conventions.

These are some suggestions for how the 46elks.com API can be improved.

## Predictable version identifier in URI

Use `/v2` for the next version of the API, rather than `/a1`, `/a2` or `/b2`.

Reason: Many APIs use `/v1`, `/v2` etc in their URIs to denote the API version. It is a predictable format.

## Be consistent with JSON vs form POST

Always accept JSON as input, and always respond with JSON.

Reason: This makes it more predictable, and makes the developer not have to keep track of where JSON goes and where `x-www-form-urlencoded` goes.

## Predictable HTTP methods according to spec, conventions

Use `POST` only for non-idempotent creation of subordinate resources. Make sure to respond with appropriate status code,
and any `Location: ` header where applicable.

Use `PUT` for replacing a resource completely with what's in the request body, setting properties not included to `null`.
 
Use `PATCH` for replacing only the included properties of a resource.

*// TODO more details, examples*

References:

  * http://www.restapitutorial.com/lessons/httpmethods.html
  * http://restful-api-design.readthedocs.org/en/latest/methods.html#patch-vs-put
  
Reason: This makes it more predictable, in that HTTP methods are used in the same way as in many other API's, and according to widely-adopted conventions.

## Use `true`/`false` instead of `"yes"`/`"no"`

In JSON, use `true` and `false` instead of the strings `"yes"` and `"no"`.

Reason: This makes it more predictable, in that if the property sounds like a boolean flag, it is represented as one too.

Example in current API: http://www.46elks.com/docs#phone-numbers

## Use all lower-case in resource names

Instead of `/Numbers`, `/Calls` and `/SMS`, use `/numbers`, `/calls`, `/sms`.

Reason: Not having to think about whether the resource has an initial upper-case character or is in all-caps, or something else, makes it more predictable. The most common way to write identifiers is in all lower-case.
 
## Use the phone number as identifier, and relevant HTTP methods

For the `/numbers` resources, use the actual phone number as identifier, instead of a separate id.

Use relevant HTTP methods for requests, and HTTP status codes for responses.

Remove the `"active"` property. This is now represented by response status codes (`200` vs others), and the `DELETE` method.

Example, for the phone number `+4670000000`:

  * `POST /numbers` allocates a new number, returning `201 Created` with a `Location: https://api.46elks.com/v2/numbers/%2B4670000000` header pointing to the newly created resource.
  * `GET /numbers/%2B4670000000` retrieves information about the phone number. Response code `200 OK` allocated to current user, `404 Not found` if not allocated, `403 Forbidden` if allocated to someone else (or `404 Not Found` if there is a good reason why that fact should not be known to the public).
  * `PATCH /numbers/%2B4670000000` with some parameters in the body, reconfigures an allocated phone number.
  * `DELETE /numbers/%2B4670000000` de-allocates a phone number.