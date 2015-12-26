# Suggestion for a new version of the 46elks.com API

The [API for 46elks.com](http://www.46elks.com/docs) is very interesting and good in many ways. There are also ways it could improve to be more predictable, for example by adopting widely used standards and conventions.

These are some suggestions for how the 46elks.com API can be improved.

## `/v1`, `/v2` and so on for API version

Use `/v2` for the next version of the API, rather than `/a1`, `/a2` or `/b2`.

Reason: Many APIs use `/v1`, `/v2` etc in their URIs to denote the API version. It is a predictable format.

## Be consistent with JSON vs form POST

Always accept JSON as input, and always respond with JSON.

Reason: This makes it more predictable, and makes the developer not have to keep track of where JSON goes and where `x-www-form-urlencoded` goes.

## Use HTTP methods according to spec


