import { describe, expect, it } from "vitest";
import { Scrollbar, ScrollbarOptions } from "../src";

describe("myPackage", () => {

	describe('init', () => {

		it("should apply to provided element", () => {
			const container = document.createElement("div");
			container.id = "mockDivId";

			const options: ScrollbarOptions = {
				styles: { thumbColor: "red" },
			};

			const scrollbar = new Scrollbar(container, options);

			expect(JSON.stringify(scrollbar.options)).toMatch(
				'{"styles":{"thumbColor":"red"}}',
			);

			expect(scrollbar.container).toStrictEqual(container);
			expect(scrollbar.container.id).toMatch("mockDivId");
		});

		it("should apply to document.body", () => {
			const options: ScrollbarOptions = {
				styles: { thumbColor: "blue" },
			};

			const scrollbar = new Scrollbar(document.body, options);

			expect(JSON.stringify(scrollbar.options)).toMatch(
				'{"styles":{"thumbColor":"blue"}}',
			);

			expect(scrollbar.container).toStrictEqual(document.body);
		});
	})

	describe("destroy", () => {
		it("should remove the dataset id", () => {
			const container = document.createElement("div");
			const scrollbar = new Scrollbar(container);
			const tsbId = scrollbar.tsbId;
			expect(container?.dataset['tsbId']).toEqual(tsbId);

			scrollbar.destroy();
			expect(container?.dataset['tsbId']).toEqual(undefined);
		});

		it("should destroy the appended stylesheet", () => {
			const container = document.createElement("div");
			const scrollbar = new Scrollbar(container);
			expect(document.getElementById(scrollbar.stylesheetId)?.nodeName).toEqual('STYLE');

			scrollbar.destroy();
			expect(document.getElementById(scrollbar.stylesheetId)?.nodeName).toEqual(undefined);
		});
	});
});
