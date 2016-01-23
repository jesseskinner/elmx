const generate = require('../dist/generator');

describe('generator', () => {
  const expectGenerated = (s) => expect(generate(s));

  it('ignores normal Elm', () => {
    expectGenerated({
      children: [
        { expr: { code: 'elm code' } }
      ]
    })
    .toEqual(
      'elm code'
    );
  });

  it('generates simple tag nodes', () => {
    expectGenerated({
      children: [
        { expr: { code: 'before-' } },
        { parent: {}, name: 'span', children: [], attributes: [] },
        { expr: { code: '-after' } }
      ]
    })
    .toEqual(
      'before-Html.span [] []-after'
    );
  });

  it('generates tags after list expressions', () => {
    expectGenerated({
      children: [
        {
          parent: {},
          name: 'span',
          attributes: [],
          children: [
            { expr: { list: 'list'} },
            { expr: { text: ', '} },
            {
              parent: {},
              name: 'i',
              attributes: [],
              children: []
            }
          ]
        }
      ]
    })
    .toEqual(
      'Html.span [] (list ++ [Html.text ", ", Html.i [] []])'
    );
  });

  it('concats children with comma', () => {
    expectGenerated({
      children: [
        {
          parent: {},
          name: 'span',
          attributes: [],
          children: [
            { expr: { list: 'l' } },
            { expr: { code: 'a'} },
            { expr: { code: 'b'} }
          ]
        }
      ]
    })
    .toEqual(
      'Html.span [] (l ++ [a, b])'
    );
  });

});