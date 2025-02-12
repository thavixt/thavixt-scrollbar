import { describe, expect, it } from 'vitest';
import ThavixtScrollbar from '../src';

describe('myPackage', () => {
  it('should return an object with the scrollbar options provided', () => {
    const container = document.createElement("div");
    container.id = 'mockDivId';

    const options = {};

    const scrollbar = new ThavixtScrollbar(container, options);

    expect(JSON.stringify(scrollbar.getOptions()))
      .toMatch('{"containerId":"mockDivId","options":{}}');
  });
});
