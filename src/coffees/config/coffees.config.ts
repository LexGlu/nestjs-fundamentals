import { registerAs } from "@nestjs/config";

export default registerAs('coffees', () => ({
    foo: 'bar',
})); // registerAs() returns a function that returns an object and is used to register a configuration namespace.
