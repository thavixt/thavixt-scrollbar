import { describe, expect, it } from "vitest";
import { Scrollbar, ScrollbarOptions } from "../src";

describe("myPackage", () => {
	it("should return an object with the scrollbar options provided", () => {
		const container = document.createElement("div");
		container.id = "mockDivId";

		const options: ScrollbarOptions = {
			styles: { thumbColor: "red" },
		};

		const scrollbar = new Scrollbar(container, options);

		expect(JSON.stringify(scrollbar.options)).toMatch(
			'{"styles":{"thumbColor":"red"}}',
		);

		expect(scrollbar.container.id).toMatch("mockDivId");
	});
});
