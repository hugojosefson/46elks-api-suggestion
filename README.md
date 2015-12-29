# Suggestion for a new version of the 46elks.com API

The [API for 46elks.com](http://www.46elks.com/docs) is very interesting and good in many ways. There are also ways it could improve to be more predictable, for example by adopting widely used standards and conventions.

These are some suggestions for how the 46elks.com API can be improved.

## Status of this document

This is work in progress. Not even a draft yet.

In this git repo, I'm also implementing an example API proxy which conforms to REST with [hal+json](http://phlyrestfully.readthedocs.org/en/latest/halprimer.html).

[![Build Status](https://travis-ci.org/hugojosefson/46elks-api-suggestion.svg?branch=master)](https://travis-ci.org/hugojosefson/46elks-api-suggestion)

Written by Hugo Josefson <hugo@josefson.org>.

If you have further suggestions, or like to discuss any change here, feel free to make a [Pull Request](https://github.com/hugojosefson/46elks-api-suggestion/pulls) or file an [Issue](https://github.com/hugojosefson/46elks-api-suggestion/issues) on this repo!

### TODO

  * Implement suggested API as an API proxy.
    * ~~Go through existing API docs, and implement everything as I go along, except callbacks.~~
    * ~~Refactor.~~
    * Implement proxying callbacks. ~~Find all occurrences of it in the current API docs.~~
      * `POST,GET,PATCH /v2/me/numbers`
        * `sms_uri`
        * `mms_uri`
        * `voice_start_uri`
          * `next` recursively
          * `record`
          * `record_call`
          * `play`
             * prefix `sound/*` to make them proper uris
             * prefix `local/*` to make them proper uris
      * `POST,GET /v2/me/sms`
        * `delivery_report_uri`
      * `POST,GET /v2/me/calls`
        * `voice_start_uri`
        * `voice_end_uri`
    * Add IP addresses endpoint.
      * Calculate outgoing IP address of current server by bouncing off of [https://api.ipify.org/](https://api.ipify.org/).
      * Get current outgoing IP address of 46elks by sending an SMS to `+46700000000` with `delivery_report_uri` pointing back to us with a temporary random code.
    * Implement client for this API.
  * Structure this document / repo.

## The suggested changes

### Predictable version identifier in URI

Use `/v2` for the next version of the API, rather than `/a1`, `/a2` or `/b2`.

Reason: Many APIs use `/v1`, `/v2` etc in their URIs to denote the API version. It is a predictable format.

### Be consistent with JSON vs form POST

Always accept JSON as input, and always respond with JSON.

Reason: This makes it more predictable, and makes the developer not have to keep track of where JSON goes and where `x-www-form-urlencoded` goes.

### Predictable HTTP methods according to spec, conventions

Use `POST` only for non-idempotent creation of subordinate resources. Make sure to respond with appropriate status code,
and any `Location: ` header where applicable.

Use `PUT` for replacing a resource completely with what's in the request body, setting properties not included to `null`.

Use `PATCH` for replacing only the included properties of a resource.

*// TODO more details, examples*

References:

  * http://www.restapitutorial.com/lessons/httpmethods.html
  * http://restful-api-design.readthedocs.org/en/latest/methods.html#patch-vs-put

Reason: This makes it more predictable, in that HTTP methods are used in the same way as in many other API's, and according to widely-adopted conventions.

### Use `true`/`false` instead of `"yes"`/`"no"`

In JSON, use `true` and `false` instead of the strings `"yes"` and `"no"`.

Reason: This makes it more predictable, in that if the property sounds like a boolean flag, it is represented as one too.

Example in current API: http://www.46elks.com/docs#phone-numbers

### Use all lower-case in resource names

Instead of `/Numbers`, `/Calls` and `/SMS`, use `/numbers`, `/calls`, `/sms`.

Reason: Not having to think about whether the resource has an initial upper-case character or is in all-caps, or something else, makes it more predictable. The most common way to write identifiers is in all lower-case.

### Use phone number as identifier, and relevant HTTP methods

For the `/numbers` resources, use the actual phone number as identifier, instead of a separate id.

Use relevant HTTP methods for requests, and HTTP status codes for responses.

Remove the `"active"` property. This is now represented by response status codes (`200` vs others), and the `DELETE` method.

Example, for the phone number `+4670000000`:

  * `POST /numbers` allocates a new number, returning `201 Created` with a `Location: https://api.46elks.com/v2/numbers/%2B4670000000` header pointing to the newly created resource.
  * `GET /numbers/%2B4670000000` retrieves information about the phone number. Response code `200 OK` allocated to current user, `404 Not found` if not allocated, `403 Forbidden` if allocated to someone else (or `404 Not Found` if there is a good reason why that fact should not be known to the public).
  * `PATCH /numbers/%2B4670000000` with some parameters in the body, reconfigures an allocated phone number.
  * `DELETE /numbers/%2B4670000000` de-allocates a phone number.

### Tentative: Use `uri` instead of `url`

*// TODO think about this some more. Also consider predictability; if it needs to be `uri` in one place, maybe better to go with `uri` everywhere.*

References:

  * http://www.w3.org/TR/uri-clarification/
  * http://stackoverflow.com/questions/176264/what-is-the-difference-between-a-uri-a-url-and-a-urn
  * https://danielmiessler.com/study/url_vs_uri/
  * http://webmasters.stackexchange.com/questions/19101/what-is-the-difference-between-a-uri-and-a-url

### Use `application/hal+json`

Supply links to related resources, from any resource where it is applicable.

Let the client use provided links, so they don't need to build the URI's themselves to each resource, and you don't need to document or set in stone the actual URI structures.

Provide a common way of representing a resource, and any relevant embedded other resources.

Do all this using the HAL standard, because it is easier for both developers and users of an API to refer to an existing standard, rather that rolling their own.

References:

  * http://stateless.co/hal_specification.html
  * http://phlyrestfully.readthedocs.org/en/latest/halprimer.html

#### `GET /v2`

##### Response status

`200 OK`

##### Response body

```json
{
    "_links": {
        "_self": "https://api.46elks.com/v2",
        "numbers": "https://api.46elks.com/v2/numbers",
        "sms": "https://api.46elks.com/v2/sms",
        "calls": "https://api.46elks.com/v2/calls"
    }
}
```
