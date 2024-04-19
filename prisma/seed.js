"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Seeding started🚀");
var client_1 = require("@prisma/client");
var bcrypt = require("bcrypt");
var prisma = new client_1.PrismaClient();
// user seed
var userSeeder = function () { return __awaiter(void 0, void 0, void 0, function () {
    var user, hash, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = {
                    email: "zenta@seeder.com",
                    password: process.env.SEEDER_PASSWORD || "",
                    name: "Zenta Seeder",
                    role: "ADMIN",
                };
                console.log("Seeding user: ".concat(user.email, " \uD83C\uDF31"));
                return [4 /*yield*/, bcrypt.hash(user.password, parseInt(process.env.SALT_ROUNDS || "10"))];
            case 1:
                hash = _a.sent();
                return [4 /*yield*/, prisma.user.upsert({
                        where: {
                            email: user.email,
                        },
                        update: {
                            email: user.email,
                            password: hash,
                            name: user.name,
                            role: "ADMIN",
                        },
                        create: {
                            email: user.email,
                            password: hash,
                            name: user.name,
                            role: "ADMIN",
                        },
                    })];
            case 2:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
var techs = [
    // java founder
    {
        founder: [
            {
                name: "James Gosling",
                url: "https://en.wikipedia.org/wiki/James_Gosling",
                photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/James_Gosling_2008.jpg/330px-James_Gosling_2008.jpg",
            },
        ],
        details: {
            name: "Java",
            description: "Java is a class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/131px-Java_programming_language_logo.svg.png",
            url: "https://en.wikipedia.org/wiki/Java_(programming_language)",
            homepage: "https://www.java.com/",
        },
        versions: [
            {
                version: 8,
                description: "Java 8 was released on March 18, 2014.",
                url: "https://en.wikipedia.org/wiki/Java_version_history#Java_8",
                whatNews: "Lambda expressions, Method references, Optional class, Stream API, Date and Time API, Nashorn JavaScript Engine, Base64 Encode Decode, Default Methods, Type Annotations, etc.",
                hash: "java8",
            },
            {
                version: 11,
                description: "Java 11 was released on September 25, 2018.",
                url: "https://en.wikipedia.org/wiki/Java_version_history#Java_11",
                whatNews: "Nest-Based Access Control, Dynamic Class-File Constants, Epsilon: A No-Op Garbage Collector, ZGC: A Scalable Low-Latency Garbage Collector, Local-Variable Syntax for Lambda Parameters, HTTP Client (Standard), Flight Recorder, Launch Single-File Source-Code Programs, etc.",
                hash: "java11",
            },
            {
                version: 17,
                description: "Java 17 was released on September 14, 2021.",
                url: "https://en.wikipedia.org/wiki/Java_version_history#Java_17",
                whatNews: "Sealed classes, Pattern matching for switch, Records, Text blocks, Local-Variable Type Inference, Epsilon: A No-Op Garbage Collector, ZGC: A Scalable Low-Latency Garbage Collector, Local-Variable Syntax for Lambda Parameters, HTTP Client (Standard), Flight Recorder, Launch Single-File Source-Code Programs, etc.",
                hash: "java17",
            },
        ],
    },
    // python founder
    {
        founder: [
            {
                name: "Guido van Rossum",
                url: "https://en.wikipedia.org/wiki/Guido_van_Rossum",
                photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Guido_van_Rossum_OSCON_2006.jpg/330px-Guido_van_Rossum_OSCON_2006.jpg",
            },
        ],
        details: {
            name: "Python",
            description: "Python is an interpreted, high-level and general-purpose programming language.",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/131px-Python-logo-notext.svg.png",
            url: "https://en.wikipedia.org/wiki/Python_(programming_language)",
            homepage: "https://www.python.org/",
        },
        versions: [
            {
                version: 2,
                description: "Python 2.0 was released on October 16, 2000.",
                url: "https://en.wikipedia.org/wiki/Python_2",
                whatNews: "List comprehensions, sys.platform, __future__ module, etc.",
                hash: "python2",
            },
            {
                version: 3,
                description: "Python 3.0 was released on December 3, 2008.",
                url: "https://en.wikipedia.org/wiki/Python_3",
                whatNews: "Print function, Integer division, Unicode, etc.",
                hash: "python3",
            },
            {
                version: 3.9,
                description: "Python 3.9 was released on October 5, 2020.",
                url: "https://en.wikipedia.org/wiki/Python_3.9",
                whatNews: "New parser, New syntax features, New library modules, New built-in features, etc.",
                hash: "python39",
            },
        ],
    },
    // javascript founder
    {
        founder: [
            {
                name: "Brendan Eich",
                url: "https://en.wikipedia.org/wiki/Brendan_Eich",
                photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Brendan_Eich_Mozilla_Foundation_official_photo.jpg/330px-Brendan_Eich_Mozilla_Foundation_official_photo.jpg",
            },
        ],
        details: {
            name: "JavaScript",
            description: "JavaScript is a text-based programming language used both on the client-side and server-side that allows you to make web pages interactive.",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/131px-JavaScript-logo.png",
            url: "https://en.wikipedia.org/wiki/JavaScript",
            homepage: "https://www.javascript.com/",
        },
        versions: [
            {
                version: 6,
                description: "ECMAScript 6 was released on June 17, 2015.",
                url: "https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_-_ECMAScript_2015",
                whatNews: "Arrow functions, Classes, Enhanced object literals, Template literals, Destructuring, Default + Rest + Spread, Let + Const, Iterators + For..Of, Generators, Unicode, Modules, Module Loaders, Map + Set + WeakMap + WeakSet, Proxies, Symbols, Subclassable Built-ins, Promises, Math + Number + String + Array + Object APIs, Binary and Octal Literals, Reflect API, Tail Calls, Decorators, etc.",
                hash: "es6",
            },
            {
                version: 7,
                description: "ECMAScript 7 was released on June 14, 2016.",
                url: "https://en.wikipedia.org/wiki/ECMAScript#7th_Edition_-_ECMAScript_2016",
                whatNews: "Array.prototype.includes, Exponentiation operator, etc.",
                hash: "es7",
            },
            {
                version: 8,
                description: "ECMAScript 8 was released on June 26, 2017.",
                url: "https://en.wikipedia.org/wiki/ECMAScript#8th_Edition_-_ECMAScript_2017",
                whatNews: "Async Functions, Shared Memory and Atomics, Object.values/Object.entries, String padding, Object.getOwnPropertyDescriptors, Trailing commas in function parameter lists and calls, etc.",
                hash: "es8",
            },
        ],
    },
    // typescript founder
    {
        founder: [
            {
                name: "Microsoft",
                url: "https://en.wikipedia.org/wiki/TypeScript",
                photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/375px-Microsoft_logo_%282012%29.svg.png",
                type: client_1.TechFounderType.COMPANY,
            },
        ],
        details: {
            name: "TypeScript",
            description: "TypeScript is a strict syntactical superset of JavaScript that adds optional static typing to the language.",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/131px-Typescript_logo_2020.svg.png",
            url: "https://en.wikipedia.org/wiki/TypeScript",
            homepage: "https://www.typescriptlang.org/",
        },
        versions: [
            {
                version: 1,
                description: "TypeScript 1.0 was released on July 28, 2014.",
                url: "https://en.wikipedia.org/wiki/TypeScript#History",
                whatNews: "TypeScript 1.0 introduces the ability to use classes and modules in your code.",
                hash: "ts1",
            },
            {
                version: 4,
                description: "TypeScript 4.0 was released on August 20, 2020.",
                url: "https://en.wikipedia.org/wiki/TypeScript#History",
                whatNews: "Variadic Tuple Types, Labeled Tuple Elements, Class Property Inference from Constructors, Short-Circuiting Assignment Operators, Custom JSX Factories, etc.",
                hash: "ts4",
            },
            {
                version: 4.4,
                description: "TypeScript 4.4 was released on August 26, 2021.",
                url: "https://en.wikipedia.org/wiki/TypeScript#History",
                whatNews: "Control Flow Analysis of Aliased Conditions, Symbol and Template String Pattern Index Signatures, etc.",
                hash: "ts44",
            },
        ],
    },
    // c founder
    {
        founder: [
            {
                name: "Dennis Ritchie",
                url: "https://en.wikipedia.org/wiki/Dennis_Ritchie",
                photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Dennis_Ritchie_2011.jpg/330px-Dennis_Ritchie_2011.jpg",
            },
        ],
        details: {
            name: "C",
            description: "C is a general-purpose, procedural computer programming language supporting structured programming, lexical variable scope, and recursion, with a static type system.",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/C_Logo.png/131px-C_Logo.png",
            url: "https://en.wikipedia.org/wiki/C_(programming_language)",
            homepage: "https://en.wikipedia.org/wiki/C_(programming_language)",
        },
        versions: [
            {
                version: 89,
                description: "C89 was published in 1989.",
                url: "https://en.wikipedia.org/wiki/C89_(C_version)",
                whatNews: "C89 was the first standard for C programming language.",
                hash: "c89",
            },
            {
                version: 99,
                description: "C99 was published in 1999.",
                url: "https://en.wikipedia.org/wiki/C99",
                whatNews: "C99 added several new features to the C language, such as inline functions, several new data types, variable length arrays, flexible array members, and improved support for IEEE 754 floating point.",
                hash: "c99",
            },
            {
                version: 11,
                description: "C11 was published in 2011.",
                url: "https://en.wikipedia.org/wiki/C11_(C_standard_revision)",
                whatNews: "C11 added a standard Boolean data type, _Generic keyword, and improved Unicode support.",
                hash: "c11",
            },
        ],
    },
    // c++ founder
    {
        founder: [
            {
                name: "Bjarne Stroustrup",
                url: "https://en.wikipedia.org/wiki/Bjarne_Stroustrup",
                photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bjarne-stroustrup_%28cropped%29.jpg/330px-Bjarne-stroustrup_%28cropped%29.jpg",
            },
        ],
        details: {
            name: "C++",
            description: 'C++ is a general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language, or "C with Classes".',
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/131px-ISO_C%2B%2B_Logo.svg.png",
            url: "https://en.wikipedia.org/wiki/C%2B%2B",
            homepage: "https://isocpp.org/",
        },
        versions: [
            {
                version: 98,
                description: "C++98 was published in 1998.",
                url: "https://en.wikipedia.org/wiki/C%2B%2B98",
                whatNews: "C++98 was the first standard for C++ programming language.",
                hash: "cpp98",
            },
            {
                version: 11,
                description: "C++11 was published in 2011.",
                url: "https://en.wikipedia.org/wiki/C%2B%2B11",
                whatNews: "C++11 added several new features to the C++ language, such as auto keyword, nullptr, range-based for loop, lambda expressions, etc.",
                hash: "cpp11",
            },
            {
                version: 17,
                description: "C++17 was published in 2017.",
                url: "https://en.wikipedia.org/wiki/C%2B%2B17",
                whatNews: "C++17 added several new features to the C++ language, such as inline variables, fold expressions, constexpr if, etc.",
                hash: "cpp17",
            },
        ],
    },
    // kotlin founder
    {
        founder: [
            {
                name: "JetBrains",
                url: "https://en.wikipedia.org/wiki/JetBrains",
                photo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/08/JetBrains_beam_logo.svg/330px-JetBrains_beam_logo.svg.png",
                type: client_1.TechFounderType.COMPANY,
            },
        ],
        details: {
            name: "Kotlin",
            description: "Kotlin is a cross-platform, statically typed, general-purpose programming language with type inference.",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Kotlin_logo_2021.svg/270px-Kotlin_logo_2021.svg.png",
            url: "https://en.wikipedia.org/wiki/Kotlin_(programming_language)",
            homepage: "https://kotlinlang.org/",
        },
        versions: [
            {
                version: 1.0,
                description: "Kotlin 1.0 was released on February 15, 2016.",
                url: "https://en.wikipedia.org/wiki/Kotlin_(programming_language)#History",
                whatNews: "Kotlin 1.0 was the first stable version of Kotlin programming language.",
                hash: "kotlin1",
            },
            {
                version: 1.4,
                description: "Kotlin 1.4 was released on August 12, 2020.",
                url: "https://en.wikipedia.org/wiki/Kotlin_(programming_language)#History",
                whatNews: "Kotlin 1.4 added several new features to the Kotlin language, such as SAM conversions for Kotlin interfaces, JVM records, etc.",
                hash: "kotlin4",
            },
            {
                version: 1.5,
                description: "Kotlin 1.5 was released on May 25, 2021.",
                url: "https://en.wikipedia.org/wiki/Kotlin_(programming_language)#History",
                whatNews: "Kotlin 1.5 added several new features to the Kotlin language, such as JVM IR backend, Inline classes, etc.",
                hash: "kotlin5",
            },
        ],
    },
    // dart founder
    {
        founder: [
            {
                name: "Google",
                url: "https://en.wikipedia.org/wiki/Google",
                photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/330px-Google_2015_logo.svg.png",
                type: client_1.TechFounderType.COMPANY,
            },
        ],
        details: {
            name: "Dart",
            description: "Dart is a client-optimized programming language for fast apps on any platform.",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Dart-logo.png/131px-Dart-logo.png",
            url: "https://en.wikipedia.org/wiki/Dart_(programming_language)",
            homepage: "https://dart.dev/",
        },
        versions: [
            {
                version: 1.0,
                description: "Dart 1.0 was released on November 14, 2013.",
                url: "https://en.wikipedia.org/wiki/Dart_(programming_language)#History",
                whatNews: "Dart 1.0 was the first stable version of Dart programming language.",
                hash: "dart1",
            },
            {
                version: 2.0,
                description: "Dart 2.0 was released on August 7, 2018.",
                url: "https://en.wikipedia.org/wiki/Dart_(programming_language)#History",
                whatNews: "Dart 2.0 added several new features to the Dart language, such as Strong mode, Dart DevTools, etc.",
                hash: "dart2",
            },
            {
                version: 2.14,
                description: "Dart 2.14 was released on August 18, 2021.",
                url: "https://en.wikipedia.org/wiki/Dart_(programming_language)#History",
                whatNews: "Dart 2.14 added several new features to the Dart language, such as Null safety, etc.",
                hash: "dart14",
            },
        ],
    },
    // go founder
    {
        founder: [
            {
                name: "Google",
                url: "https://en.wikipedia.org/wiki/Google",
                photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/330px-Google_2015_logo.svg.png",
                type: client_1.TechFounderType.COMPANY,
            },
        ],
        details: {
            name: "Go",
            description: "Go is a statically typed, compiled programming language designed at Google.",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Go_Logo_Blue.svg/131px-Go_Logo_Blue.svg.png",
            url: "https://en.wikipedia.org/wiki/Go_(programming_language)",
            homepage: "https://golang.org/",
        },
        versions: [
            {
                version: 1,
                description: "Go 1.0 was released on March 28, 2012.",
                url: "https://en.wikipedia.org/wiki/Go_(programming_language)#History",
                whatNews: "Go 1.0 was the first stable version of Go programming language.",
                hash: "go1",
            },
            {
                version: 1.13,
                description: "Go 1.13 was released on August 26, 2019.",
                url: "https://en.wikipedia.org/wiki/Go_(programming_language)#History",
                whatNews: "Go 1.13 added several new features to the Go language, such as Error wrapping, Number literal syntax, etc.",
                hash: "go13",
            },
            {
                version: 1.17,
                description: "Go 1.17 was released on August 16, 2021.",
                url: "https://en.wikipedia.org/wiki/Go_(programming_language)#History",
                whatNews: "Go 1.17 added several new features to the Go language, such as Generics, Error values, Embedding of interfaces, etc.",
                hash: "go17",
            },
        ],
    },
    // rust founder
    {
        founder: [
            {
                name: "Graydon Hoare",
                url: "https://en.wikipedia.org/wiki/Graydon_Hoare",
                photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/182px-Rust_programming_language_black_logo.svg.png",
            },
        ],
        details: {
            name: "Rust",
            description: "Rust is a multi-paradigm systems programming language focused on safety, especially safe concurrency.",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/131px-Rust_programming_language_black_logo.svg.png",
            url: "https://en.wikipedia.org/wiki/Rust_(programming_language)",
            homepage: "https://www.rust-lang.org/",
        },
        versions: [
            {
                version: 1,
                description: "Rust 1.0 was released on May 15, 2015.",
                url: "https://en.wikipedia.org/wiki/Rust_(programming_language)#History",
                whatNews: "Rust 1.0 was the first stable version of Rust programming language.",
                hash: "rust1",
            },
            {
                version: 1.5,
                description: "Rust 1.50 was released on March 25, 2021.",
                url: "https://en.wikipedia.org/wiki/Rust_(programming_language)#History",
                whatNews: "Rust 1.50 added several new features to the Rust language, such as const generics, etc.",
                hash: "rust50",
            },
            {
                version: 1.55,
                description: "Rust 1.55 was released on August 26, 2021.",
                url: "https://en.wikipedia.org/wiki/Rust_(programming_language)#History",
                whatNews: "Rust 1.55 added several new features to the Rust language, such as const generics, etc.",
                hash: "rust55",
            },
        ],
    },
    // php founder
    {
        founder: [
            {
                name: "Rasmus Lerdorf",
                url: "https://en.wikipedia.org/wiki/Rasmus_Lerdorf",
                photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Rasmus_Lerdorf_August_2014_%28cropped%29.JPG/330px-Rasmus_Lerdorf_August_2014_%28cropped%29.JPG",
            },
        ],
        details: {
            name: "PHP",
            description: "PHP is a general-purpose scripting language especially suited to web development.",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/131px-PHP-logo.svg.png",
            url: "https://en.wikipedia.org/wiki/PHP",
            homepage: "https://www.php.net/",
        },
        versions: [
            {
                version: 3,
                description: "PHP 3 was released on June 6, 1998.",
                url: "https://en.wikipedia.org/wiki/PHP#History",
                whatNews: "PHP 3 was the first stable version of PHP programming language.",
                hash: "php3",
            },
            {
                version: 5,
                description: "PHP 5 was released on July 13, 2004.",
                url: "https://en.wikipedia.org/wiki/PHP#History",
                whatNews: "PHP 5 added several new features to the PHP language, such as Object-oriented programming, etc.",
                hash: "php5",
            },
            {
                version: 8,
                description: "PHP 8 was released on November 26, 2020.",
                url: "https://en.wikipedia.org/wiki/PHP#History",
                whatNews: "PHP 8 added several new features to the PHP language, such as Union Types, Named Arguments, Match Expressions, Attributes, Constructor Property Promotion, etc.",
                hash: "php8",
            },
        ],
    },
    // ruby founder
];
// tech seed
var techSeeder = function () { return __awaiter(void 0, void 0, void 0, function () {
    var admin, _i, techs_1, tech, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userSeeder()];
            case 1:
                admin = _a.sent();
                _i = 0, techs_1 = techs;
                _a.label = 2;
            case 2:
                if (!(_i < techs_1.length)) return [3 /*break*/, 5];
                tech = techs_1[_i];
                console.log("Seeding tech: ".concat(tech.details.name, " \uD83C\uDF31"));
                return [4 /*yield*/, prisma.tech.upsert({
                        where: {
                            name: tech.details.name,
                        },
                        update: {
                            updatedBy: {
                                connect: {
                                    email: admin.email || "",
                                },
                            },
                            updatedAt: new Date(),
                            name: tech.details.name,
                            description: tech.details.description,
                            logo: tech.details.logo,
                            url: tech.details.url,
                            homepage: tech.details.homepage,
                            founders: {
                                connectOrCreate: tech.founder.map(function (founder) { return ({
                                    where: {
                                        name: founder.name,
                                    },
                                    create: {
                                        name: founder.name,
                                        url: founder.url,
                                        photo: founder.photo,
                                        type: founder.type,
                                        createdBy: {
                                            connect: {
                                                email: admin.email || "",
                                            },
                                        },
                                    },
                                }); }),
                            },
                            versions: {
                                connectOrCreate: tech.versions.map(function (version) { return ({
                                    where: {
                                        hash: version.hash,
                                    },
                                    create: {
                                        version: version.version,
                                        description: version.description,
                                        url: version.url,
                                        hash: version.hash,
                                        whatNews: version.whatNews,
                                    },
                                }); }),
                            },
                        },
                        create: {
                            createdBy: {
                                connect: {
                                    id: admin.id,
                                },
                            },
                            name: tech.details.name,
                            description: tech.details.description,
                            logo: tech.details.logo,
                            url: tech.details.url,
                            homepage: tech.details.homepage || null,
                            founders: {
                                connectOrCreate: tech.founder.map(function (founder) { return ({
                                    where: {
                                        name: founder.name,
                                    },
                                    create: {
                                        name: founder.name,
                                        url: founder.url,
                                        photo: founder.photo,
                                        type: founder.type,
                                        createdBy: {
                                            connect: {
                                                email: admin.email || "",
                                            },
                                        },
                                    },
                                }); }),
                            },
                            versions: {
                                connectOrCreate: tech.versions.map(function (version) { return ({
                                    where: {
                                        hash: version.hash,
                                    },
                                    create: {
                                        version: version.version,
                                        description: version.description,
                                        url: version.url,
                                        whatNews: version.whatNews,
                                        hash: version.hash,
                                    },
                                }); }),
                            },
                        },
                    })];
            case 3:
                res = _a.sent();
                console.log("Seeded tech: ".concat(tech.details.name, " \uD83C\uDF31"));
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/];
        }
    });
}); };
var tags = [
    {
        name: "Machine Learning",
        description: "Machine learning is a method of data analysis that automates analytical model building. It is a branch of artificial intelligence based on the idea that systems can learn from data, identify patterns and make decisions with minimal human intervention.",
        photo: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFjaGluZSUyMGxlYXJuaW5nfGVufDB8fDB8fHww",
    },
    {
        name: "Web Development",
        description: "Web development is the work involved in developing a website for the Internet or an intranet. Web development can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services.",
        photo: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Data Science",
        description: "Data science is an inter-disciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from many structural and unstructured data. Data science is related to data mining, machine learning and big data.",
        photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Mobile Development",
        description: "Mobile app development is the act or process by which a mobile app is developed for mobile devices, such as personal digital assistants, enterprise digital assistants or mobile phones.",
        photo: "https://saigontechnology.com/assets/media/Blog/typical-process-for-a-successful-mobile-development.jpeg",
    },
    {
        name: "Cloud Computing",
        description: "Cloud computing is the on-demand availability of computer system resources, especially data storage and computing power, without direct active management by the user. The term is generally used to describe data centers available to many users over the Internet.",
        photo: "https://media.istockphoto.com/id/1310129219/id/foto/komputasi-awan-pusat-data-rak-server-koneksi-dalam-jaringan-saraf-teknologi.jpg?s=612x612&w=0&k=20&c=DY2KY0odTFlnHcFROTlNI46BAesQ-5VyUH0alKeCFZ8=",
    },
    {
        name: "Cyber Security",
        description: "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These attacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes.",
        photo: "https://media.istockphoto.com/id/1412282189/id/foto/kunci-konsep-teknologi-jaringan.jpg?s=612x612&w=0&k=20&c=Pa3vJHisjpY-g_n69UJqnfciZKSVHk-2ZYERHAWdBrE=",
    },
    {
        name: "DevOps",
        description: "DevOps is a set of practices that combines software development and IT operations. It aims to shorten the systems development life cycle and provide continuous delivery with high software quality.",
        photo: "https://media.istockphoto.com/id/1309642115/id/foto/konsep-devops.jpg?s=612x612&w=0&k=20&c=TFxYmsEVtXJcsACyYRISngw2dAcqk8HLqgcmjnkHnwk=",
    },
    {
        name: "Artificial Intelligence",
        description: "Artificial intelligence is intelligence demonstrated by machines, unlike the natural intelligence displayed by humans and animals, which involves consciousness and emotionality.",
        photo: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?q=80&w=2157&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];
var tagSeeder = function () { return __awaiter(void 0, void 0, void 0, function () {
    var u, _i, tags_1, tag, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.user.findUnique({
                    where: {
                        email: "zenta@seeder.com",
                    },
                })];
            case 1:
                u = _a.sent();
                _i = 0, tags_1 = tags;
                _a.label = 2;
            case 2:
                if (!(_i < tags_1.length)) return [3 /*break*/, 5];
                tag = tags_1[_i];
                console.log("Seeding tag: ".concat(tag.name, " \uD83C\uDF31"));
                return [4 /*yield*/, prisma.tag.upsert({
                        where: {
                            name: tag.name,
                        },
                        update: {
                            name: tag.name,
                            description: tag.description,
                            photo: tag.photo,
                            createBy: {
                                connect: {
                                    email: (u === null || u === void 0 ? void 0 : u.email) || "",
                                },
                            },
                        },
                        create: {
                            name: tag.name,
                            description: tag.description,
                            photo: tag.photo,
                            createBy: {
                                connect: {
                                    email: (u === null || u === void 0 ? void 0 : u.email) || "",
                                },
                            },
                        },
                    })];
            case 3:
                res = _a.sent();
                console.log("Seeded tag: ".concat(res.name, " \uD83C\uDF31"));
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/];
        }
    });
}); };
var postSeeder = function () { return __awaiter(void 0, void 0, void 0, function () {
    var techs, tags, posts, _i, posts_1, post, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.tech.findMany()];
            case 1:
                techs = _a.sent();
                return [4 /*yield*/, prisma.tag.findMany()];
            case 2:
                tags = _a.sent();
                posts = [
                    {
                        title: "The History of Java",
                        slug: "the-history-of-java",
                        cover: "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/131px-Java_programming_language_logo.svg.png",
                        summary: "Java is a class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.",
                        content: {
                            type: "doc",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [
                                        {
                                            type: "text",
                                            text: "Java is a class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.",
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                ];
                _i = 0, posts_1 = posts;
                _a.label = 3;
            case 3:
                if (!(_i < posts_1.length)) return [3 /*break*/, 6];
                post = posts_1[_i];
                console.log("Seeding post: ".concat(post.title, " \uD83C\uDF31"));
                return [4 /*yield*/, prisma.post.create({
                        data: {
                            title: post.title,
                            slug: post.slug,
                            cover: post.cover,
                            summary: post.summary,
                            content: post.content,
                            stack: {
                                connect: techs.map(function (tech) { return ({
                                    id: tech.id,
                                }); }),
                            },
                            tags: {
                                connect: tags.map(function (tag) { return ({
                                    id: tag.id,
                                }); }),
                            },
                            authors: {
                                connect: {
                                    email: "zenta@seeder.com",
                                },
                            },
                        },
                    })];
            case 4:
                res = _a.sent();
                console.log("Seeded post: ".concat(res.title, " \uD83C\uDF31"));
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6: return [2 /*return*/];
        }
    });
}); };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var person;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, techSeeder()];
            case 1:
                _a.sent();
                return [4 /*yield*/, tagSeeder()];
            case 2:
                _a.sent();
                return [4 /*yield*/, postSeeder()];
            case 3:
                _a.sent();
                person = {
                    email: "zenta@seeder.com",
                    pin: parseInt(Math.random().toString().slice(2, 8)),
                };
                return [4 /*yield*/, prisma.invitation.upsert({
                        where: {
                            email: person.email,
                        },
                        update: {
                            email: person.email,
                            invitedBy: {
                                connect: {
                                    email: "zenta@seeder.com",
                                },
                            },
                            pin: person.pin,
                        },
                        create: {
                            email: person.email,
                            invitedBy: {
                                connect: {
                                    email: "zenta@seeder.com",
                                },
                            },
                            pin: person.pin,
                        },
                    })];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
