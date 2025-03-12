import { FormatInServicePipe } from './format-in-service.pipe';

describe('FormatInServicePipe', () => {
  it('create an instance', () => {
    const pipe = new FormatInServicePipe();
    expect(pipe).toBeTruthy();
  });

  it('Should return in service if true is given in input', () => {
    const pipe = new FormatInServicePipe();
    expect(pipe.transform('IN_SERVICE')).toEqual('In service');
  });

  it('Should return out of service if is given in input', () => {
    const pipe = new FormatInServicePipe();
    expect(pipe.transform('OUT_OF_SERVICE')).toEqual('Out of service');
  });

  it('Should only accept valid values', () => {
    const pipe = new FormatInServicePipe();
    expect(() => pipe.transform(null as any)).toThrowError();
    expect(() => pipe.transform('test' as any)).toThrowError();
  });
});
