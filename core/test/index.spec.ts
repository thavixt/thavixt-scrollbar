import { describe, expect, it } from 'vitest';
import { ThavixtScrollbar, ThavixtScrollbarOptions } from '../src';

describe('myPackage', () => {
  it('should return an object with the scrollbar options provided', () => {
    const container = document.createElement("div");
    container.id = 'mockDivId';

    const options: ThavixtScrollbarOptions = { styles: { thumbColor: 'red' } };

    const scrollbar = new ThavixtScrollbar(container, options);

    expect(JSON.stringify(scrollbar.options))
      .toMatch('{"styles":{"thumbColor":"red"}}');

    expect(scrollbar.container.id)
      .toMatch('mockDivId');
  });
});
