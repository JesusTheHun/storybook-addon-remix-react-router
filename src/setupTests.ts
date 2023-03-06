import '@testing-library/jest-dom'
import { vi, expect, beforeEach } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";
import { fetch, Request, Response } from "@remix-run/web-fetch";
import {mockLocalStorage} from "./test-utils";

expect.extend(matchers);

vi.stubGlobal("fetch", fetch);
vi.stubGlobal("Request", Request);
vi.stubGlobal("Response", Response);

beforeEach(() => mockLocalStorage());